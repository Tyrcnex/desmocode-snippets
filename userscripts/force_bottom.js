// ==UserScript==
// @name         Force Bottom
// @namespace    
// @version      2026-04-04
// @description  Forces expression list to be on bottom
// @author       Gord1402 (modified by Tyrcnex)
// @match        https://www.desmos.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=desmos.com
// @grant        none
// ==/UserScript==

(async function () {
    'use strict';
    while (!window.Calc) { await new Promise(res => setTimeout(res, 100)) }
    window.Calc.controller.isNarrow = () => true;
})();