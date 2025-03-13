const [min, max] = [0, 2] // replace with proper range
const step = 1 / 32 // replace step
const ID = "1" // id of slider

await fetch("https://html2canvas.hertzen.com/dist/html2canvas.min.js")
    .then((e) => e.text())
    .then(eval)
    .then(async _ => {
        let ss = [];
        // let graf = document.querySelector(".dcg-sliding-interior");

        for (let i = min; i < max; i += step) {
            Calc.controller.dispatch({
                type: "adjust-slider-by-dragging-thumb",
                id: ID,
                target: i,
            });
            await Calc.asyncScreenshot({ width: 0, height: 0 });
            await new Promise(r => setTimeout(r, 10));
            await html2canvas(document.body).then(canvas => ss.push(canvas.toDataURL()));
        }

        if (window.DesModder) DesModder.exposedPlugins["video-creator"].frames = ss;
    });