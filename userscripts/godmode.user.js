// ==UserScript==
// @name        Desmos godmode
// @match       *://www.desmos.com/*
// @description Increase the limits on list length, "nested too deeply" error, and shader list limit in ?beta3d mode
// @grant       none
// @run-at      document-start
// @author      Jared Hughes (fireflame), modified by Tyrcnex
// ==/UserScript==

// modified from https://www.reddit.com/r/desmos/comments/mhz8mc/expression_nested_too_deeply_bypass_userscript/

window.Worker = new Proxy(Worker, {
    construct(target, args) {
        if (args[0].startsWith("blob:")) {
            const xhr = new XMLHttpRequest
            xhr.open("GET", args[0], false)
            xhr.send()
            const hooked = xhr.responseText
                .replace(/>= ?32768/g, `>= 1e6`)
                .replace(/> ?100/g, `> 1000`)
                .replace(/1e4/g, `1e6`)
            args[0] = URL.createObjectURL(new Blob([hooked]))
        }
        return new target(...args)
    }
})
