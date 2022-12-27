const { app, BrowserWindow } = require('electron')
require('@electron/remote/main').initialize()

const path = require('path')
const isDev = require('electron-is-dev')

function createWindow(){
    const win = new BrowserWindow({
        width: 1034,
        height: 610,
        fullscreen: true,
        autoHideMenuBar: true,
        frame:false,
        webPrefrences: {
            enableRemoteModule: true,
            nodeIntegration: true
        }
    })

    // win.loadURL(
    //     isDev
    //     ? 'http://localhost:3000'
    //     : `file://${path.join(__dirname, '../build/index.html')}`
    // )

    win.loadURL(
        `file://${path.join(__dirname, '../build/index.html')}`
    )

    // win.webContents.openDevTools()
}

// app.whenReady().then(createWindow)

app.on('ready', createWindow)

app.on('window-all-closed', function(){
    if(process.platform !== 'darwin'){
        app.quit()
    }
})

app.on('activate', function(){
    if(BrowserWindow.getAllWindows.length === 0) createWindow()
})