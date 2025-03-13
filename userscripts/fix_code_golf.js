// ==UserScript==
// @name         fix codegolf
// @namespace    http://tampermonkey.net/
// @version      2024-11-13
// @description  auto-disabls cg on new tabs, adds a toggle hotkey (alt + q)
// @author       ronwnor
// @match        https://www.desmos.com/calculator*
// @match        https://www.desmos.com/3d*
// @match        https://www.desmos.com/geometry*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=desmos.com
// @grant        none
// ==/UserScript==

(() => {
    let interval = setInterval(() => {
        // wait for calc && desmodder to load
        if ((typeof Calc == "undefined") || (typeof DesModder == "undefined")) return;
        clearInterval(interval);

        // auto-disable the plugin on new tabs
        DSM.disablePlugin("code-golf");

        // toggle the plugin on alt+q
        document.querySelector(".dcg-exppanel-outer").onkeydown =
        document.body.onkeydown = (e) => {
            if (e.altKey && e.key == 'q') {
                DSM.togglePlugin("code-golf");
            }
        }
    }, 200);
})();