// ==UserScript==
// @name         Better 3D
// @version      0.2
// @description  add beta3d query + shader things + much more
// @run-at       document-start
// @author       Tyrcnex
// @match        https://www.desmos.com/3d*
// @grant        none
// ==/UserScript==

(f => f(f))(waitCalc => setTimeout(_ => window.Calc ? better3d() : waitCalc(), 200));
function better3d() {
    // query params
    Calc._calc.graphSettings.config.beta3d = true;

    //shader modification
    const shaderSource = WebGL2RenderingContext.prototype.shaderSource;
    WebGL2RenderingContext.prototype.shaderSource = function (shader, source) {
        // gamma correct shaders
        const colors = [
            "vec3(clamp(v, 0.0, 1.0) * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), clamp(s, 0.0, 1.0)))",
            "clamp(vec3(r,g,b),0.0,255.0)/255.0",
        ];
        for (const color of colors) {
            source = source.replace(
                `return ${color};`,
                `vec3 color = ${color}; return mix(pow((color + 0.055) / 1.055, vec3(2.4)), color / 12.92, lessThanEqual(color, vec3(0.04045)));`,
            );
        }

        // reduce specular by 50%
        // source = source.replace("+ totalSpecular", "+ 0.5 * totalSpecular")
        // shaderSource.call(this, shader, source);
    };

    // change background color
    // const state = Calc.getState()
    // state.graph.backgroundColor3d = "#000000";
    // Calc.setState(state);
}
