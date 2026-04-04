// ==UserScript==
// @name         desmo md in notes
// @namespace    http://tampermonkey.net/
// @version      2.3
// @description  md notes with lists, code blocks, syntax highlighting, autolinks
// @match        https://www.desmos.com/calculator*
// @author       Sam Brunacini
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const loadHighlightJS = (callback) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
        script.onload = callback;
        document.head.appendChild(script);

        const style = document.createElement('link');
        style.rel = 'stylesheet';
        style.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css';
        document.head.appendChild(style);
    }

    const injectStyles = () => {
        const style = document.createElement('style');
        style.innerHTML = `
            .dcg-displayTextarea h1,
            .dcg-displayTextarea h2,
            .dcg-displayTextarea h3 {
                margin: 4px 0;
                font-weight: 600;
            }

            .dcg-displayTextarea p {
                margin: 2px 0;
            }

            .dcg-displayTextarea ul {
                margin: 4px 0 4px 16px;
                padding: 0;
            }

            .dcg-displayTextarea li {
                margin: 2px 0;
            }

            .dcg-displayTextarea pre {
                background: #f3f3f3;
                padding: 6px 8px;
                border-radius: 4px;
                overflow-x: auto;
                margin: 4px 0;
                font-size: 12px;
            }

            .dcg-displayTextarea code {
                background: #f3f3f3;
                padding: 2px 4px;
                border-radius: 3px;
                font-size: 12px;
            }

            .dcg-displayTextarea pre code {
                background: none;
                padding: 0;
            }
        `;
        document.head.appendChild(style);
    }

    const parseMarkdown = (md) => {
        md = md
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
        const codeBlocks = [];

        md = md.replace(/```(\w+)?\n?([\s\S]*?)```/g, (_, lang, code) => {
            const id = codeBlocks.length;
            codeBlocks.push({
                lang,
                code: code.trim()
            });
            return `%%CODEBLOCK_${id}%%`;
        });

        md = md
            .replace(/^### (.*)$/gim, "<h3>$1</h3>")
            .replace(/^## (.*)$/gim, "<h2>$1</h2>")
            .replace(/^# (.*)$/gim, "<h1>$1</h1>");

        md = md.replace(/(?:^|\n)(- .+(?:\n- .+)*)/g, (match) => {
            const items = match
                .trim()
                .split('\n')
                .map(line => `<li>${line.replace(/^- /, '')}</li>`)
                .join('');
            return `<ul>${items}</ul>`;
        });

        md = md
            .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
            .replace(/\*(.*?)\*/g, "<i>$1</i>")
            .replace(/`(.*?)`/g, "<code>$1</code>");

        md = md.replace(/\[(.*?)\]\((.*?)\)/g,
            `<a href="$2" target="_blank">$1</a>`
        );

        // dont break existing graphs with links
        md = md.replace(
            /(^|[^"'>])(https?:\/\/[^\s<]+)/g,
            '$1<a href="$2" target="_blank">$2</a>'
        );

        md = md.replace(
            /(^|[^"'>])\b(www\.[^\s<]+)/g,
            '$1<a href="http://$2" target="_blank">$2</a>'
        );

        md = md.replace(/\n{2,}/g, "<br>");

        md = md.replace(/%%CODEBLOCK_(\d+)%%/g, (_, i) => {
            const { lang, code } = codeBlocks[i];
            const cls = lang ? ` class="language-${lang}"` : "";
            return `<pre><code${cls}>${code}</code></pre>`;
        });

        return md;
    }

    const highlightCode = (container) => {
        if (!window.hljs) return;

        const blocks = container.querySelectorAll('pre code');

        blocks.forEach(block => {
            if (block.dataset.highlighted) return;

            window.hljs.highlightElement(block);
            block.dataset.highlighted = "true";
        });
    }

    const renderMarkdownNotes = () => {
        if (!window.Calc) return;

        const state = window.Calc.getState();
        const expressions = state?.expressions?.list;
        if (!expressions) return;

        const noteMap = new Map();
        for (const e of expressions) {
            if (e.type === 'text') {
                noteMap.set(String(e.id), e);
            }
        }

        const nodes = document.querySelectorAll(
            '.dcg-expressionitem.dcg-expressiontext'
        );

        nodes.forEach(node => {
            const id = node.getAttribute('expr-id');
            const note = noteMap.get(id);
            if (!note) return;

            const display = node.querySelector('.dcg-displayTextarea');
            if (!display) return;

            const raw = note.text || "";

            if (display.dataset.mdRendered === raw) return;

            display.innerHTML = parseMarkdown(raw);
            display.dataset.mdRendered = raw;

            highlightCode(display);
        });
    }

    const init = () => {
        const interval = setInterval(() => {
            if (window.Calc && document.querySelector('.dcg-expressionlist')) {
                clearInterval(interval);

                injectStyles();

                loadHighlightJS(() => {
                    renderMarkdownNotes();

                    window.Calc.observeEvent('change', () => {
                        renderMarkdownNotes();
                    });
                });
            }
        }, 300);
    }

    init();
})();