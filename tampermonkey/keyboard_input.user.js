// ==UserScript==
// @name         Full keyboard input for Desmos
// @description  TamperMonkey userscript for listening to all keyboard inputs in Desmos. Type in "K_{eys}=[]" and the keys should start appearing.
// @author       Charlieee1 (modified by Tyrcnex)
// @match        *://www.desmos.com/calculator*
// @match        *://www.desmos.com/geometry*
// @match        *://www.desmos.com/3d*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=desmos.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let keysPressed = [];

    function convertKeyCode(x) {
        return x.keyCode * (x.location == 2 ? -1 : 1);
    }

    function setKeysPressed() {
        const exp = Calc.getExpressions().find(function (exp) {
            return exp.latex && exp.latex.startsWith('K_{eys}=\\left[');
        });
        if (!exp) return;
        exp.latex = "K_{eys}=\\left[" + keysPressed.toString() + "\\right]";
        Calc.setExpression(exp);
    }

    // fallback spam to handle the out of focus bug
    window.onblur = window.onfocus = window.onfocusout = window.onvisibilitychange = function () {
        keysPressed = [];
        setKeysPressed();
    }

    window.onkeydown = function (e) {
        let newCode = convertKeyCode(e);

        if (!keysPressed.includes(newCode)) keysPressed.push(newCode);
        setKeysPressed();
    }

    window.onkeyup = function (e) {
        let idx = keysPressed.indexOf(convertKeyCode(e));
        if (idx == -1) return;

        keysPressed.splice(idx, 1);
        setKeysPressed();
    }

    console.log("Listening for all keyboard inputs!");
})();
