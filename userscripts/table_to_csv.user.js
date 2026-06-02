// ==UserScript==
// @name         Desmo table CSV export
// @namespace    http://tampermonkey.net/
// @version      1.4
// @match        https://www.desmos.com/calculator*
// @grant        none
// @author       sam brunacini
// @description  adds a button to download tables as CSV files
// ==/UserScript==

(function () {
    'use strict';

    const download = (csv, filename='desmos-table.csv') => {
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }

    const isNumber = (x) => {
        return /^-?\d+(\.\d+)?$/.test(x);
    }

    const parseHeader = (latex) => {
        if (!latex) return null;
        latex = latex.replace(/\\([a-zA-Z]+)/g, (_, g) => g);
        const match = latex.match(/^([a-zA-Z]+)_\{(.+)\}$/);
        if (!match) return latex;
        let base = match[1];
        let sub = match[2];
        sub = sub.replace(/([a-z])([A-Z])/g, '$1 $2');
        if (/^[a-z]$/.test(base) && /^[a-z]/.test(sub)) {
            return base + sub;
        }
        return (base + ' ' + sub).trim();
    }

    const toCSV = (headers, rows) => {
        const esc = v =>
            typeof v === 'number'
                ? v
                : `"${String(v).replace(/"/g, '""')}"`;

        return [
            headers.map(h => `"${h}"`).join(','),
            ...rows.map(r => r.map(esc).join(','))
        ].join('\n');
    }

    const getTables = () => {
        const Calc = window.Calc;
        if (!Calc) return [];

        const state = Calc.getState();
        if (!state?.expressions?.list) return [];

        const roots = [
            Calc._calc?.graphSettings?.controller,
            Calc._calc
        ].filter(Boolean);

        const findLiveTableModel = (tableId) => {
            const seen = new WeakSet();

            const walk = (obj, depth = 0) => {
                if (!obj || typeof obj !== 'object') return null;
                if (seen.has(obj)) return null;
                seen.add(obj);

                if (depth > 8) return null;

                if (
                    obj.id === tableId &&
                    Array.isArray(obj.columnModels)
                ) {
                    return obj;
                }

                if (Array.isArray(obj)) {
                    for (const item of obj) {
                        const found = walk(item, depth + 1);
                        if (found) return found;
                    }
                    return null;
                }

                for (const key in obj) {
                    let value;
                    try {
                        value = obj[key];
                    } catch {
                        continue;
                    }
                    const found = walk(value, depth + 1);
                    if (found) return found;
                }

                return null;
            };

            for (const root of roots) {
                const found = walk(root);
                if (found) return found;
            }

            return null;
        };

        return state.expressions.list
            .filter(e => e.type === 'table')
            .map(table => {
            const liveTable = findLiveTableModel(table.id);

            const columns = table.columns.map((col, i) => {
                const liveColumn = liveTable?.columnModels?.[i];
                const formulaColumn = liveTable?.formula?.column_data?.[i];

                let values = [];

                if (Array.isArray(liveColumn?.computedValues) && liveColumn.computedValues.length) {
                    values = liveColumn.computedValues.slice();
                } else if (Array.isArray(formulaColumn?.values) && formulaColumn.values.length) {
                    values = formulaColumn.values.slice();
                } else if (Array.isArray(liveColumn?.values) && liveColumn.values.length) {
                    values = liveColumn.values.slice();
                } else if (Array.isArray(col.values) && col.values.length) {
                    values = col.values.slice();
                }

                return {
                    ...col,
                    values
                };
            });

            return {
                ...table,
                columns
            };
        });
    }

    const extractTable = (table) => {
        const headers = table.columns.map(col =>
                                          parseHeader(col.latex) || 'Column'
                                         );
        const rowCount = Math.max(
            0,
            ...table.columns.map(c => Array.isArray(c.values) ? c.values.length : 0)
        );
        const rows = [];
        for (let i = 0; i < rowCount; i++) {
            const row = table.columns.map(col => {
                const val = col.values?.[i] ?? '';

                if (typeof val === 'number') return val;
                if (isNumber(String(val))) return Number(val);

                return val;
            });

            rows.push(row);
        }
        return { headers, rows };
    }

    const makeButton = (exprId) => {
        const btn = document.createElement('button');
        btn.textContent = '⬇️';

        Object.assign(btn.style, {
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            border: 'none',
            margin: '50px 6px',
            background: '#2f72dc',
            color: 'white',
            cursor: 'pointer'
        });

        btn.onclick = () => {
            const tables = getTables();
            const table = tables.find(t => t.id === exprId);
            if (!table) return;

            const { headers, rows } = extractTable(table);
            const csv = toCSV(headers, rows);

            download(csv, 'desmos-table.csv');
        };

        return btn;
    }

    const inject = () => {
        const tables = getTables();

        document.querySelectorAll('.dcg-expressiontable').forEach(el => {
            if (el.dataset.done) return;

            const exprId = el.getAttribute('expr-id');
            if (!tables.find(t => t.id === exprId)) return;

            const tab = el.querySelector('.dcg-tab');
            if (!tab) return;

            const regression = tab.querySelector('[aria-label="Add Regression"]');
            const zoom = tab.querySelector('[aria-label="Zoom Fit"]');
            const btn = makeButton(exprId);

            if (regression && zoom) {
                tab.insertBefore(btn, zoom.parentElement);
            } else {
                tab.appendChild(btn);
            }

            el.dataset.done = 1;
        });
    }

    new MutationObserver(inject).observe(document.body, {
        childList: true,
        subtree: true
    });

    inject();

})();