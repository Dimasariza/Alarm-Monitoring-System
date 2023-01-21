const { app, BrowserWindow, ipcMain, Menu } = require('electron')
require('@electron/remote/main').initialize()
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')


const path = require('path')
const isDev = require('electron-is-dev')
let win

const { remote } = require('electron');

// const port = new SerialPort({path: 'COM5', 
//     baudRate: 9600
// });

// const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));
// globalThis.myVariable = "1111"

// ipcMain.handle('some-name', async (event, someArgument) => {
//     const result = await doSomeWork(someArgument)
//     return result
// })

// const { ipcMain } = require('electron');
// ipcMain.on('arduino-data', (event, arg) => {
//   event.sender.send('arduino-data', arg);
// });


// function determineCommand(){
//     ipcMain.on('global-variable-update', (event, newValue) => {
//         globalVariable = newValue;
//         event.sender.send('global-variable-update', newValue);
//     });
// }

ipcMain.on('data-request', (event, args) => {
    event.reply('data-response', {data: 'example data'});
});

let icount = 0

function createWindow(){
    win = new BrowserWindow({
        width: 1034,
        height: 650,
        fullscreen: false,
        autoHideMenuBar: false,
        frame:true,
        webPrefrences: {
            enableRemoteModule: true,
            nodeIntegration: true,
            contextIsolation: false, // allow use with Electron 12+
            preload: path.join(__dirname, '../build/preload.js')
        }
    })

    setTimeout(() => {
        icount++
        win.webContents.send('somethingHappened', icount);
    })

    parser.on('data', (data) =>{
        // win.webContents.send('update-counter', data)
        // global.arduinoData = data;
        console.log(data);
    });

    // const menu = Menu.buildFromTemplate([
    //     {
    //       label: app.name,
    //       submenu: [
    //       {
    //         click: () => win.webContents.send('update-counter', 1),
    //         label: 'Increment',
    //       },
    //       {
    //         click: () => win.webContents.send('update-counter', -1),
    //         label: 'Decrement',
    //       }
    //       ]
    //     }
    
    //   ])
    
    //   Menu.setApplicationMenu(menu)
    win.webContents.openDevTools();
    // win.webContents.send('asynchronous-message', {'SAVED': 'File Saved'});

    // win.loadURL(
    //     isDev
    //     ? 'http://localhost:3000'
    //     : `file://${path.join(__dirname, '../build/index.html')}`
    // )

    // parser.on('data', (data) => {
    //     // Send the data to the renderer process
    //     mainWindow.webContents.send('arduino-data', data);
    // });

    win.loadURL(
        `file://${path.join(__dirname, '../build/index.html')}`
    )

    win.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })

    // win.webContents.openDevTools()
}

// app.whenReady().then(createWindow)

app.on('ready', function(){
    ipcMain.on('counter-value', (_event, value) => {
        console.log(value) // will print value to Node console
    })
    createWindow();
});

app.on('window-all-closed', function(){
    if(process.platform !== 'darwin'){
        app.quit()
    }
})

app.on('activate', function(){
    if (mainWindow === null) {
        createWindow()
    }
})