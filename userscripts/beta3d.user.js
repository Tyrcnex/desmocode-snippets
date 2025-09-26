// ==UserScript==
// @name         Beta3D
// @version      0.1
// @description  add beta3d feature only
// @author       Tyrcnex
// @match        https://www.desmos.com/3d*
// @grant        none
// ==/UserScript==

const c = setInterval(_ => {
    if (!window.Calc) return;
    clearInterval(c);
    Calc._calc.graphSettings.config.beta3d = true;
}, 2000);