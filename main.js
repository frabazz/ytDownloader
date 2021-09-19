const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')
const {ipcMain} = require('electron')

let win

function createWindow() {
   win = new BrowserWindow({
      width: 800, 
      height: 600,
      webPreferences : {
         nodeIntegration : true,
         contextIsolation : false
      }
   })
   win.loadURL(url.format ({
      pathname: path.join(__dirname, 'frontend/index.html'),
      protocol: 'file:',
      slashes: true
   }))
}

// Event handler for asynchronous incoming messages
// Event handler for synchronous incoming messages
ipcMain.on('songurl', (event, arg) => {
   
   event.returnValue = 'sync pong'
})

app.on('ready', createWindow)