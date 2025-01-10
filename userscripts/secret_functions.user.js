// ==UserScript==
// @name         Secret Desmos functions
// @description  Unlocks secret functions (top secret), they just don't work until you enable them in Mathquill
// @run-at       document-start
// @author       Naitronbomb
// @match        https://www.desmos.com/3d*
// @grant        none
// ==/UserScript==

let oldConf = Calc.controller.getMathquillConfig;

Calc.controller.getMathquillConfig = e => {
    let conf = oldConf.call(Calc.controller, e);
    conf.autoOperatorNames += " hypot polyGamma rtxsqpone rtxsqmone validateSampleCount sortPerm argmin argmax";
    // hypot(a,b) -> sqrt(a^2+b^2)
    // polyGamma(order, x)
    // rtxsqpone(x) -> sqrt(x^2+1)
    // rtxsqmone(x) -> sqrt(x^2-1)
    // validateSampleCount is, in the words of Naitronbomb, "screwd up"
    // sortPerm(a) -> sort([1...a.count], a) - 1
    // argmin(a) -> [1...a.count][a=a.min][1]
    // argmax(a) -> b[b.count] with b=[1...a.count][a=a.max]
    return conf;
}
