// ==UserScript==
// @name         Desmos Local
// @version      0.4
// @description  Allow for saving Desmos graphs as JSON files and importing Desmos graphs saved as JSON or TXT files.
// @author       tyrcnex & ronwnor
// @match        https://*.desmos.com/calculator*
// @match        https://*.desmos.com/geometry*
// @match        https://*.desmos.com/3d*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=desmos.com
// @grant        none
// ==/UserScript==

// wait for calc
await new Promise(res => setInterval(() => Calc && res(), 200));

function createButtons() {
    const saveBtn = document.createElement("div");
    saveBtn.className = "dcg-unstyled-button dcg-action-save dcg-btn-blue";
    const loadBtn = saveBtn.cloneNode();
    saveBtn.innerText = "Save JSON";
    loadBtn.innerText = "Load JSON";

    saveBtn.onclick = handleSave;
    loadBtn.onclick = handleImport;

    return { saveBtn, loadBtn };
}

// opens a custom save dialog
function handleSave(e) {
    e.preventDefault();
    e.stopPropagation();
    // open save dialog
    Calc._calc.globalHotkeys.shellController.openSaveDialog();

    // rename dialog header
    document.querySelector("#save-dialog h1").innerText = "Save as JSON";

    // get the form element
    let form = document.querySelector("#save-dialog form");
    // ...and kill it, and replace it with its clone.
    // we must do this to purge the *event listeners*
    form.parentNode.appendChild(form.cloneNode(true));
    form.remove();
    form = document.querySelector("#save-dialog form");

    // clone the save button as a copy button
    let saveBtn = form.querySelector("button");
    let copyBtn = saveBtn.cloneNode();
    copyBtn.innerText = "Copy";
    saveBtn.before(copyBtn);

    // handle the clicc.
    form.onsubmit = e => {
        // prevent exiting the page etc
        e.preventDefault();

        let stateJSON = JSON.stringify(Calc.getState(), null, 4);

        if (e.submitter.innerText == "Copy") {
            //copy the state to clipboard
            navigator.clipboard.writeText(stateJSON);
            // show toast
            Calc.controller.dispatch({
                type: "toast/show",
                toast: { message: "copied state to clipboard" },
            });
        } else {
            // get the inputted title
            let input = form.querySelector("input");
            let title = input.value;

            // download the graph state
            download(stateJSON, title + ".json");
        }

        // finally, close the modal.
        // shellController.closeModal() doens't work for some reason,
        // so I'm using the dispatcher instead.
        Calc._calc.globalHotkeys.shellController.dispatch({ type: "close-modal" });
    };
}

// imports a file and sets the graph state
async function handleImport(e) {
    e.preventDefault();
    e.stopPropagation();
    // get the input element
    let input = document.querySelector("#importInput");
    if (!input) {
        input = document.createElement("input");
        input.id = "importInput";
        input.type = "file";
        input.accept = ".json, .txt";
    }
    // load the JSON, and setState
    input.onchange = async f => {
        // file reader API, I'm not too familiar with it
        let file = f.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file);

        reader.onload = readerEvent => {
            let fileContent = readerEvent.target.result;
            let parsedObj;
            try {
                parsedObj = JSON.parse(fileContent);
            } catch (err) {
                // show toast in case of error
                Calc.controller.dispatch({
                    type: "toast/show",
                    toast: { message: err },
                });
                console.error(err);
                return;
            }

            // set the state from the file
            Calc.setState(parsedObj, { allowUndo: true });

            // show toast like vanilla desmos
            Calc.controller.dispatch({
                type: "toast/show",
                toast: {
                    message: `opened "${file.name}"`,
                    undoCallback: Calc.undo,
                },
            });
        };
    };

    input.click();
}

// download string as json file
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

// pc
let saveBtnContainer = document.querySelector(".save-btn-container");

// mobile: clone the title bar and create a custom button container
let graphsTitleBar = document.querySelector(".dcg-mygraphs-section-title-container");
let jsonTitleBar = graphsTitleBar.cloneNode(true);
let mobileSaveBtnContainer = document.createElement("div");
graphsTitleBar.before(jsonTitleBar);
jsonTitleBar.after(mobileSaveBtnContainer);
jsonTitleBar.firstChild.innerText = "local save";

mobileSaveBtnContainer.className = "save-btn-container graph-link-container";
mobileSaveBtnContainer.style.display = "flex";
mobileSaveBtnContainer.style.justifyContent = "space-around";
mobileSaveBtnContainer.style.padding = "14px";
mobileSaveBtnContainer.style.height = "auto";

saveBtnContainer.style.display = "flex";
saveBtnContainer.style.gap = "5px";

// append the buttons to both containers
[saveBtnContainer, mobileSaveBtnContainer].forEach(container => {
    let { saveBtn, loadBtn } = createButtons();
    container.append(saveBtn, loadBtn);
});