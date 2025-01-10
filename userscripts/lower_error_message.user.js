// ==UserScript==
// @name         Lower error functions
// @description  lowers the dang error message so you can actually see the expression
// @run-at       document-start
// @author       Naitronbomb
// @match        https://www.desmos.com/3d*
// @grant        none
// ==/UserScript==

const transformAmount = "10px";

let style = document.createElement("style");
style.innerHTML = `.dcg-tooltip-message-container, .dcg-tooltip-arrow {transform: translate(0, ${transformAmount});}`;

document.head.appendChild(style);
