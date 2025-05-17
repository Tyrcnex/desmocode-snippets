// ==UserScript==
// @name         Desmos Local
// @version      0.5
// @description  Allow for saving Desmos graphs as JSON files and importing Desmos graphs saved as JSON or TXT files.
// @author       tyrcnex & ronwnor
// @match        https://*.desmos.com/calculator*
// @match        https://*.desmos.com/geometry*
// @match        https://*.desmos.com/3d*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=desmos.com
// @grant        none
// ==/UserScript==

// compiled with ts, then modified a bit

// wait for calc
await new Promise((res) => setInterval(() => Calc && res(), 200)).then(setup);
function setup() {
    createContainers().forEach((container) => {
        let { saveBtn, loadBtn } = createButtons();
        container.append(saveBtn, loadBtn);
    });
}
function createButtons() {
    const saveBtn = document.createElement("button");
    saveBtn.className = "dcg-unstyled-button dcg-action-save dcg-save-button dcg-btn-blue";
    const loadBtn = saveBtn.cloneNode();
    saveBtn.textContent = "Save JSON";
    loadBtn.textContent = "Load JSON";
    saveBtn.onclick = handleSave;
    loadBtn.onclick = handleImport;
    return { saveBtn, loadBtn };
}
function createContainers() {
    // pc
    let oldSaveBtnContainer = document.querySelector(".save-btn-container");
    // mobile
    let oldGraphsTitleBar = document.querySelector(".dcg-mygraphs-section-title-container");

    let saveBtnContainer = oldSaveBtnContainer.cloneNode(true);
    saveBtnContainer.innerHTML = "";
    let graphsTitleBar = oldGraphsTitleBar.cloneNode(true);
    oldSaveBtnContainer.after(saveBtnContainer);

    let jsonTitleBar = graphsTitleBar.cloneNode(true);
    let mobileSaveBtnContainer = document.createElement("div");
    oldGraphsTitleBar.before(jsonTitleBar);
    jsonTitleBar.after(mobileSaveBtnContainer);
    jsonTitleBar.firstChild.innerText = "local save";
    mobileSaveBtnContainer.className = "save-btn-container graph-link-container";
    mobileSaveBtnContainer.style.display = "flex";
    mobileSaveBtnContainer.style.justifyContent = "space-around";
    mobileSaveBtnContainer.style.padding = "14px";
    mobileSaveBtnContainer.style.height = "auto";
    saveBtnContainer.style.display = "flex";
    saveBtnContainer.style.gap = "5px";
    saveBtnContainer.style.margin = "0px 5px";
    return [saveBtnContainer, mobileSaveBtnContainer];
}
function handleSave(e) {
    e.preventDefault();
    const modal = openModal();
    modal.header.innerText = "Save as JSON";
    modal.button0.innerText = "Copy";
    modal.button1.innerText = "Save";
    modal.form.onsubmit = (e) => {
        e.preventDefault();
        const graphState = JSON.stringify(Calc.getState(), null, 4);
        if (e.submitter?.innerText == "Copy") {
            navigator.clipboard.writeText(graphState);
            toast("copied state to clipboard");
        } else {
            const title = modal.input.value;
            download(graphState, title + ".json");
        }
        modal.close();
    };
}
function handleImport(e) {
    e.preventDefault();
    const dropZone = createDropZone();
    const modal = openModal();
    modal.header.after(dropZone.element);
    modal.header.remove();
    modal.button0.innerText = "Import";
    modal.button1.innerText = "Open";
    modal.input.value = "";
    modal.input.placeholder = "Or paste here...";
    modal.input.maxLength = 1_000_000_000;
    const graph = {};
    dropZone.input.onchange = async (e) => {
        // @ts-ignore
        const file = e.target?.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e) => {
            const fileContent = e.target?.result;
            graph.state = fileContent;
            graph.title = file.name;
            dropZone.updateLabel(graph.title, file.size);
        };
    };
    dropZone.element.ondrop = async (e) => {
        e.preventDefault();
        const file = e.dataTransfer?.files?.[0];
        if (!file) return;
        graph.state = await file.text();
        graph.title = file.name;
        dropZone.updateLabel(graph.title, file.size);
    };
    modal.input.onchange = () => {
        const content = modal.input.value;
        if (content.length == 0) return;
        graph.state = content;
        graph.title = "Untitled Graph";
        dropZone.updateLabel(graph.title, graph.state.length);
    };
    modal.input.onpaste = (e) => {
        e.preventDefault();
        e.stopPropagation();
        graph.state = e.clipboardData.getData("text/plain");
        graph.title = "Untitled Graph";
        dropZone.updateLabel(graph.title, graph.state.length);
    };
    modal.form.onsubmit = (e) => {
        e.preventDefault();
        let parsedState;
        try {
            parsedState = JSON.parse(graph.state);
        } catch (err) {
            toast(err);
            console.error(err);
            return;
        }
        if (e.submitter?.innerText == "Open") {
            Calc.setState(parsedState, { allowUndo: true });
            toast(`opened ${graph.title}`, { undoCallback: Calc.undo });
        } else {
            let state = mergeStates(Calc.getState(), parsedState);
            Calc.setState(state, { allowUndo: true });
            toast(`imported ${graph.title}`, { undoCallback: Calc.undo });
        }
        modal.close();
    };
}
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
function openModal() {
    Calc._calc.globalHotkeys.shellController.openSaveDialog();
    const modal = document.querySelector("#save-dialog");
    let oldForm = modal.querySelector("#save-dialog form");
    // ...and kill it, and replace it with its clone.
    // we must do this to purge the *event listeners*
    const form = oldForm.cloneNode(true);
    oldForm.parentNode.appendChild(form);
    oldForm.remove();
    let header = modal.querySelector("h1");
    // clone the save button as a copy button
    let button0 = form.querySelector("button");
    let button1 = button0.cloneNode();
    button0.before(button1);
    let input = form.querySelector("input");
    let close = () =>
        Calc._calc.globalHotkeys.shellController.dispatch({ type: "close-modal" });
    return {
        modal,
        header,
        form,
        input,
        button0,
        button1,
        close,
    };
}
function createDropZone() {
    const dropZoneElement = document.createElement("div");
    const dropZoneLabel = document.createElement("span");
    const dropZoneInput = document.createElement("input");
    dropZoneElement.onclick = () => dropZoneInput.click();
    dropZoneLabel.innerText = "Drop JSON here";
    dropZoneInput.type = "file";
    dropZoneInput.accept = ".json, .txt";
    dropZoneInput.style.display = "none";
    dropZoneElement.style = `
  width: 100%;
  margin-bottom: 20px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px #bbb dashed;
  border-radius: 5px;
  color: #aaa;
  cursor: pointer;
`;
    dropZoneElement.append(dropZoneLabel, dropZoneInput);
    const updateLabel = (name, size) => {
        dropZoneLabel.innerText = `${name} (${size} bytes)`;
    };
    return {
        element: dropZoneElement,
        input: dropZoneInput,
        updateLabel,
    };
}
function mergeStates(baseState, newState) {
    const expressions = newState.expressions.list;
    let folderIdsMap = new Map(
        expressions
            .filter((e) => e.type == "folder")
            .map((e) => [e.id, Calc.controller.generateId()])
    );
    expressions.forEach((e) => {
        if (e.type == "folder") {
            e.id = folderIdsMap[e.id];
            return;
        }
        if (e.type == "expression") {
            e.id = Calc.controller.generateId();
            if (e.folderId) {
                e.folderId = folderIdsMap[e.folderId];
            }
        }
    });
    baseState.expressions.list.push(...expressions);
    return baseState;
}
function toast(message, opts) {
    Calc.controller.dispatch({
        type: "toast/show",
        toast: { message, ...opts },
    });
}