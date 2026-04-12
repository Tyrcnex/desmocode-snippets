// ==UserScript==
// @name         Desmos Import/Export
// @description  Adds buttons to all Desmos calculators to import and export projects to files.
// @author       https://github.com/the-can-of-soup
// @icon         data:image/png;base64,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
// @namespace    https://github.com/the-can-of-soup
// @version      1.1
// @match        https://www.desmos.com/*
// @run-at       document-body
// @grant        none
// ==/UserScript==

// Alternative icon 1: https://www.desmos.com/assets/img/apps/graphing/favicon.ico
// Alternative icon 2: https://www.google.com/s2/favicons?sz=64&domain=desmos.com

(function(){
  'use strict';

  let Calc;
  let calcType;
  let fileExts;
  let calcTypeUserFriendly;
  let isMiniCalc;

  // LOGIC

  const version = '1.1';
  const saveFormatVersion = 1;

  const calcTypeFileExts = {
    calculator:   ['desg', 'desmosg', 'desmos'],
    scientific:   ['dess', 'desmoss', 'dessci', 'desmossci', 'desmos'],
    fourfunction: ['des4', 'desmos4', 'des4f', 'desmos4f', 'desmos'],
    matrix:       ['desm', 'desmosm', 'desmos'],
    geometry:     ['desgeo', 'desmosgeo', 'desmos'],
    ['3d']:       ['des3', 'desmos3', 'des3d', 'desmos3d', 'desmos'],
  };

  const calcTypesUserFriendly = {
    calculator: 'Graphing Calculator',
    scientific: 'Scientific Calculator',
    fourfunction: 'Four-Function Calculator',
    matrix: 'Matrix Calculator',
    geometry: 'Geometry Tool',
    ['3d']: '3D Graphing Calculator',
  }

  const miniCalcTypes = [
    'scientific',
    'fourfunction',
    'matrix',
  ];

  function filenameSanitize(text) {
    return text
      .replaceAll('/', '')
      .replaceAll('\\', '')
      .replaceAll(':', '')
      .replaceAll('*', '')
      .replaceAll('?', '')
      .replaceAll('"', '')
      .replaceAll('<', '')
      .replaceAll('>', '')
      .replaceAll('|', '');
  }

  const saveDataUpgraders = {
    // Each key is a save format version number, and each value is a corresponding function
    // that will take two arguments (save data with that format verson, and the filename of the
    // file that held that save data) and should modify the save data in-place to upgrade its
    // version by 1. It should not modify the version number of the save data, as that is handled
    // automatically.

    [0]: function(saveData, filename) {
      saveData._ = 'Generated by Desmos Import/Export userscript by the-can-of-soup on GitHub.';
      saveData.title = filename;
    },
  };

  function upgradeSaveData(filename, saveData, targetVersion = null) {
    if (targetVersion === null) targetVersion = saveFormatVersion;

    while (saveData.formatVersion < targetVersion) {
      saveDataUpgraders[saveData.formatVersion](saveData, filename);
      saveData.formatVersion++;
    }
  }

  function exportToPlaintext(version = null) {
    if (Calc === undefined) return;
    if (version === null) version = saveFormatVersion;

    const saveData = {
      formatVersion: version
    };

    const state = getGraphState();
    const thumbnailURI = getGraphThumbnailURI();
    const title = getGraphTitle();

    switch (version) {
      case 0:
        saveData.calculatorType = calcType;
        saveData.thumbnailURI = thumbnailURI;
        saveData.state = state;
        break;
      case 1:
        saveData._ = 'Generated by Desmos Import/Export userscript by the-can-of-soup on GitHub.';
        saveData.calculatorType = calcType;
        saveData.title = title;
        saveData.thumbnailURI = thumbnailURI;
        saveData.state = state;
        break;
    }

    let text = JSON.stringify(saveData);

    console.log(`[Desmos Import/Export] Exported graph "${title ?? 'Untitled'}" successfully.`);
    if (!isMiniCalc) toast('Exported graph successfully.');
    return {
      text,
      title,
    };
  }

  function importFromPlaintext(filename, text, version = null) {
    if (Calc === undefined) return;
    if (version === null) version = saveFormatVersion;

    function fail(text) {
      console.warn(`[Desmos Import/Export] Failed to import file "${filename}": ${text}`);
      toast(`Failed to import file! ${text}`);
      return undefined;
    }

    // Parse JSON
    let saveData;
    try {
      saveData = JSON.parse(text);
    } catch (error) {
      fail(`Error parsing JSON: ${error.message}`);
      return;
    }

    // Validate format version
    if (typeof saveData.formatVersion !== 'number') return fail(`"formatVersion" key is not a number`);
    if (!Number.isInteger(saveData.formatVersion)) return fail(`"formatVersion" key is not an integer`);
    if (saveData.formatVersion < 0) return fail(`"formatVersion" key is negative`);
    if (saveData.formatVersion > version) return fail(`File was created by a newer version of Desmos Import/Export. Please update your userscript to load it.`);

    // Upgrade to desired version
    upgradeSaveData(filename, saveData, version);

    // Get basic metadata
    let fileCalcType;
    let name = filename;
    switch (version) {
      case 0:
        fileCalcType = saveData.calculatorType;
        break;
      case 1:
        fileCalcType = saveData.calculatorType;
        if (saveData.title !== null) name = saveData.title;
        break;
    }
    let fileCalcTypeUserFriendly = calcTypesUserFriendly[fileCalcType];

    // Validate environment using metadata
    if (fileCalcType !== calcType) return fail(`This file contains a project for ${fileCalcTypeUserFriendly}, so it cannot be loaded in ${calcTypeUserFriendly}.`);

    // Confirm unsaved changes
    let graphSaveInfo = getGraphSaveInfo();
    if (!graphSaveInfo.isSaved) {
      let confirmMessage = `You have unsaved changes. Are you sure you want to load "${name}"?`;
      if (isMiniCalc) confirmMessage = `Are you sure you want to load "${name}"?`;
      if (!confirm(confirmMessage)) return;
    }

    // Import the file
    if (!isMiniCalc) newGraph();
    switch (version) {
      case 0:
        setGraphState(saveData.state);
        break;
      case 1:
        setGraphState(saveData.state);
        setGraphTitle(saveData.title);
        break;
    }
    if (!isMiniCalc) pokeGraph();

    // Success message
    console.log(`[Desmos Import/Export] Imported graph "${name}" from file "${filename}" successfully.`);
    if (!isMiniCalc) toast(`Imported graph "${name}" successfully.`);
  }

  // DESMOS API

  function getGraphState() {
    return Calc.getState();
  }

  function setGraphState(state) {
    Calc.setState(state);
  }

  function getGraphThumbnailURI() {
    return Calc.makeThumbnail?.() ?? null;
  }

  function toast(text) {
    if (isMiniCalc) {
      alert(text);
      return;
    }
    Calc._calc.globalHotkeys.shellController.showApiToast(text);
  }

  function getGraphTitle() {
    if (isMiniCalc) return null;
    return Calc._calc.globalHotkeys.shellController.graphsController.getCurrentGraphTitle();
  }

  function setGraphTitle(title) {
    if (isMiniCalc) return;
    Calc._calc.globalHotkeys.shellController.graphsController.getCurrentGraph().title = title;
  }

  function getGraphSaveInfo() {
    if (isMiniCalc) {
      return {
        isLoggedIn: false,
        isSaved: false,
        isLinkedToAnAccount: false,
        isMine: false,
      };
    }
    return {
      isLoggedIn: Calc._calc.globalHotkeys.shellController.isLoggedIn(),
      isSaved: !Calc._calc.globalHotkeys.shellController.graphsController.hasUnsavedChanges(),
      isLinkedToAnAccount: Calc._calc.globalHotkeys.shellController.graphsController.getCurrentGraph().type === 'my-graph',
      isMine: Calc._calc.globalHotkeys.shellController.graphsController.wasCurrentGraphEverSavedByYou(),
    };
  }

  function saveChanges() {
    Calc._calc.globalHotkeys.shellController.simpleSave();
  }

  function openRenameMenu() {
    Calc._calc.globalHotkeys.shellController.openSaveDialog();
  }

  function newGraph() {
    Calc._calc.globalHotkeys.shellController.graphsController.clearGraph();
  }

  function pokeGraph() {
    Calc.controller._hasUnsavedChanges = true;
    Calc.controller.dispatch({ type: 'tick' }); // trigger UI update (thanks to @ronwnor in the Desmos Unofficial discord server)
  }

  // GUI

  const buttonsContainer = document.createElement('div');
  buttonsContainer.style = 'margin-left: 10px;';

  const importButtonContainer = document.createElement('div');
  importButtonContainer.classList.add('save-btn-container');
  importButtonContainer.style = 'display: inline-block;';
  importButtonContainer.innerHTML = `
  <div class="dcg-tooltip-hit-area-container dcg-do-not-blur dcg-cursor-default" handleevent="true" tabindex="-1" ontap="">
    <button aria-describedby="dcg-graph-title-text" ontap="" class="dcg-unstyled-button dcg-action-save dcg-save-button tooltip-offset dcg-btn-blue">
      Import
    </button>
    <input type="file" hidden></input>
  </div>
  `;
  const importButton = importButtonContainer.firstElementChild.firstElementChild;
  const importUploadInput = importButtonContainer.firstElementChild.lastElementChild;

  const exportButtonContainer = document.createElement('div');
  exportButtonContainer.classList.add('save-btn-container');
  exportButtonContainer.style = 'display: inline-block; margin-left: 10px;';
  exportButtonContainer.innerHTML = `
  <div class="dcg-tooltip-hit-area-container dcg-do-not-blur dcg-cursor-default" handleevent="true" tabindex="-1" ontap="">
    <button aria-describedby="dcg-graph-title-text" ontap="" class="dcg-unstyled-button dcg-action-save dcg-save-button tooltip-offset dcg-btn-blue">
      Export
    </button>
  </div>
  `;
  const exportButton = exportButtonContainer.firstElementChild.firstElementChild;

  buttonsContainer.appendChild(importButtonContainer);
  buttonsContainer.appendChild(exportButtonContainer);

  function handleMutations(mutations) {
    for (let mutation of mutations) {
      for (let addedNode of mutation.addedNodes) {
        handleAddedNode(addedNode);
      }
    }
  }

  let header = null;
  let headerLeftContainer = null;

  function handleAddedNode(addedNode) {
    for (let childNode of addedNode.childNodes) {
      handleAddedNode(childNode);
    }

    if (addedNode instanceof Element) {
      if (!isMiniCalc && addedNode.classList.contains('dcg-header')) {
        header = addedNode;
        headerLeftContainer = addedNode.getElementsByClassName('align-left-container')[0];

        handleHeaderInit();
      }
      if (isMiniCalc && addedNode.id === 'main') {
        // Inject buttons
        addedNode.appendChild(buttonsContainer);
      }
    }
  }

  function handleHeaderInit() {
    // Inject buttons
    headerLeftContainer.appendChild(buttonsContainer);
  }

  function downloadText(text, filename, mimeType = 'text/plain') {
    let link = document.createElement('a');
    link.href = `data:${mimeType};base64,${btoa(text)}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  function importButtonClicked() {
    if (Calc === undefined) return;
    importUploadInput.accept = fileExts.map(ext => `.${ext}`).join(',');
    importUploadInput.click();
  }

  function exportButtonClicked() {
    if (Calc === undefined) return;
    let result = exportToPlaintext();
    downloadText(result.text, `${filenameSanitize(result.title ?? 'Untitled')}.${fileExts[0]}`, 'application/json');
  }

  async function fileUploaded(){
    if (Calc === undefined) return;
    if (importUploadInput.files.length < 1) return;
    const file = importUploadInput.files[0];

    let text;
    try {
      text = await file.text();
    } catch (error) {
      console.warn(`[Desmos Import/Export] Error reading text for file "${file.name}": ${error.message}`);
      toast(`Invalid file! Error reading text: ${error.message}`);
      return;
    }

    importFromPlaintext(file.name, text);
  }

  // MAIN

  function init() {
    // Get calculator type
    calcType = document.location.pathname.split('/')[1];
    fileExts = calcTypeFileExts[calcType];
    if (fileExts === undefined) return;
    calcTypeUserFriendly = calcTypesUserFriendly[calcType];
    isMiniCalc = miniCalcTypes.includes(calcType);

    // Change style of buttons if this is a mini calculator
    if (isMiniCalc) {
      buttonsContainer.style = 'position: absolute; top: 5px; right: 5px;';
      exportButtonContainer.style = 'display: inline-block; margin-left: 6px;';
      importButton.style = 'display: flex; align-items: center; padding-right: 10px; padding-left: 10px; height: 30px;';
      exportButton.style = 'display: flex; align-items: center; padding-right: 10px; padding-left: 10px; height: 30px;';
    }

    // Bind buttons
    importButton.onclick = importButtonClicked;
    exportButton.onclick = exportButtonClicked;

    // Bind file upload
    importUploadInput.addEventListener('change', fileUploaded);

    // Register mutation observer and call it on every element that currently exists already
    let observer = new MutationObserver(handleMutations);
    handleMutations([{addedNodes: document.querySelectorAll('*')}]);
    observer.observe(document.body, {subtree: true, childList: true});

    // Init message
    console.log(`[Desmos Import/Export] Version: ${version} | Save format version: ${saveFormatVersion} | Calculator type: ${calcTypeUserFriendly}`);
  }

  function main() {
    console.log(`[Desmos Import/Export] Calc now exists; main started.`);
  }

  // ENTRY POINT

  // Init immediately
  init();

  // Run once Calc exists
  const calcWaitInterval = setInterval(function(){
    if (typeof window.Calc !== 'undefined') {
      clearInterval(calcWaitInterval);
      // eslint-disable-next-line no-undef
      Calc = window.Calc;
      main();
    }
  }, 500);
})();
