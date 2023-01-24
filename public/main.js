const { app, BrowserWindow, ipcMain, Menu } = require('electron')
require('@electron/remote/main').initialize()

const path = require('path')
const isDev = require('electron-is-dev')
  
let win

function createWindow(){
    win = new BrowserWindow({
        width: 1024,
        height: 600,
        fullscreen: false,
        autoHideMenuBar: true,
        frame:false,
        webPrefrences: {
            enableRemoteModule: true,
            nodeIntegration: true,
            contextIsolation: false, // allow use with Electron 12+
            preload: path.join(__dirname, '../build/preload.js')
        }
    })

   
    // win.webContents.openDevTools();

    // win.loadURL(
    //     isDev
    //     ? 'http://localhost:3000'
    //     : `file://${path.join(__dirname, '../build/index.html')}`
    // )

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
    // ipcMain.on('counter-value', (_event, value) => {
    //     console.log(value) // will print value to Node console
    // })
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