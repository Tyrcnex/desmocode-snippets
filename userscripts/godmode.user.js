// ==UserScript==
// @name        Desmos godmode with lists
// @match       *://www.desmos.com/*
// @description Increase the limits on list length, "nested too deeply" error, shader list length, and restriction uniforms
// @grant       none
// @version     1.4
// @run-at      document-start
// @author      jared-hughes + tyrcnex
// ==/UserScript==

// modified from https://www.reddit.com/r/desmos/comments/mhz8mc/expression_nested_too_deeply_bypass_userscript/

window.Worker = new Proxy(Worker, {
    construct(target, args) {
        if (args[0].startsWith("blob:")) {
            const xhr = new XMLHttpRequest
            xhr.open("GET", args[0], false)
            xhr.send()
            console.log(xhr.responseText);
            const hooked = xhr.responseText
                .replace(/>= ?32768/g, `>= 1e6`) // nested too deeply
                .replace(/1e4/g, `1e6`) // regular list limit
                .replace(/> ?100/g, `> 10000`) // shader list limit
                .replace(/(?<!\=)=200/g, `=1e6`) // restriction uniforms limit
            args[0] = URL.createObjectURL(new Blob([hooked]))
        }
        return new target(...args)
    }
})