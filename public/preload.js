// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// window.addEventListener('DOMContentLoaded', () => {
//     for (const versionType of['chrome', 'electron', 'node']) {
//         document.getElementById(`${versionType}-version`).innerText = process.versions[versionType]
//     }

//     document.getElementById('serialport-version').innerText = require('serialport/package').version

// })
// global.arduinoData = null;
// global.globalVariable = null;
const { contextBridge, ipcRenderer } = require('electron')

let indexBridge = {
    onUpdateCounter: (callback) => ipcRenderer.on('somethingHappened', callback)
}
contextBridge.exposeInMainWorld('indexBridge', indexBridge)

// const { ipcMain } = require('electron');
// ipcMain.on('get-arduino-data', (event) => {
//   event.returnValue = global.arduinoData;
// });