const { app, BrowserWindow } = require('electron')
const url = require('url')
const path = require('path')
const { ipcMain } = require('electron')
const Downloader = require('./backend/Downloader').Downloader
const getInfo = require('./backend/Downloader').getInfo
const settingPath = require('./backend/settings.json').path
let win

function createWindow() {
   win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
         nodeIntegration: true,
         contextIsolation: false
      }
   })
   win.loadURL(url.format({
      pathname: path.join(__dirname, 'frontend/index.html'),
      protocol: 'file:',
      slashes: true
   }))
}


const test_url = 'https://www.youtube.com/watch?v=vgBmn1S8Hus'

ipcMain.on('songurl', (event, arg) => {
   const url = arg
   getInfo(url, (error, info) => {
      const sanitizer = (url) => url.replace(/[^a-z0-9]/gi, '_').toLowerCase()
      const title = info.videoDetails.title
      const filename = path.join(__dirname, `${settingPath}/${sanitizer(title)}.mp3`)
      const downloader = new Downloader(
         url, filename
      )
      downloader.on('info', (info) => {
         console.log(info)
         win.webContents.send('info', info)
      })
      downloader.on('progress', (progress) => {
         console.log(progress)
         win.webContents.send('progress', progress)
      })
   })

})

app.on('ready', createWindow)