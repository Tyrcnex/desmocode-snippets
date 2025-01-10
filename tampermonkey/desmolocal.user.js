// ==UserScript==
// @name         Desmos Local
// @version      0.3
// @description  Allow for saving Desmos graphs as JSON files and importing Desmos graphs saved as JSON or TXT files.
// @author       Tyrcnex
// @match        https://*.desmos.com/calculator*
// @match        https://*.desmos.com/geometry*
// @match        https://*.desmos.com/3d*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=desmos.com
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    const waitForCalc = setInterval(() => {
        if (Calc) {
            clearInterval(waitForCalc);
            run();
        }
    }, 2000);

    function download(content, filename) {
        let file = new Blob([content], { type: "application/json" });
        let link = document.createElement("a");
        let url = URL.createObjectURL(file);
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }, 0);
    }

    function appendButtons() {
        let buttonContainer = document.getElementsByClassName("save-btn-container")[0];
        let clonableContainer = buttonContainer.firstChild;

        let saveFileContainer = clonableContainer.cloneNode(true);
        saveFileContainer.style.marginLeft = "5px";
        let saveFileButton = saveFileContainer.firstChild;
        saveFileButton.classList.remove("dcg-disabled");
        saveFileButton.classList.add("dcg-btn-blue");
        saveFileButton.innerHTML = "Save JSON";
        saveFileButton.onclick = () => {
            download(JSON.stringify(Calc.getState(), null, 4), `graph.json`);
        };
        buttonContainer.appendChild(saveFileContainer);

        let importFileContainer = clonableContainer.cloneNode(true);
        importFileContainer.style.marginLeft = "5px";
        let importFileButton = importFileContainer.firstChild;
        importFileButton.classList.remove("dcg-disabled");
        importFileButton.classList.add("dcg-btn-blue");
        importFileButton.innerHTML = "Import JSON";
        importFileButton.onclick = async () => {
            let input = document.getElementById("importInput");
            if (!input) {
                input = document.createElement("input");
                input.id = "importInput";
                input.type = "file";
                input.accept = ".json";
            }

            input.onchange = async (e) => {
                let file = e.target.files[0];
                let reader = new FileReader();
                reader.readAsText(file);
                reader.onload = (readerEvent) => {
                    let fileContent = readerEvent.target.result;
                    let parseObj;
                    try {
                        parseObj = JSON.parse(fileContent);
                    } catch (err) {
                        Calc.controller.dispatch({
                            type: "toast/show",
                            toast: { message: err },
                        });
                        return console.error(err);
                    }
                    Calc.setState(parseObj);
                };
            };

            input.click();
        };
        buttonContainer.appendChild(importFileContainer);

        const buttonShowHide = () => {
            saveFileContainer.style.display = window.innerWidth < 900 ? "none" : "";
            importFileContainer.style.display = window.innerWidth < 1100 ? "none" : "";
        };

        buttonShowHide();
        window.onresize = buttonShowHide;
    }

    function run() {
        appendButtons();

        setInterval(() => {
            let buttonContainer = document.getElementsByClassName("save-btn-container")[0];
            if ([...buttonContainer.childNodes].length < 2) {
                appendButtons();
            }
        }, 1000);
    }
})();
