const {ipcRenderer} = require('electron')

const donwload_button = document.getElementById('download-button')
const input = document.getElementById('url-field')

donwload_button.onclick = () => {
    ipcRenderer.sendSync('songurl', input.value)
}