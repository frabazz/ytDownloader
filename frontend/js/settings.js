//la node integration salva la vita lols
const { shell } = require('electron')
const path = require('path')

const revealButton = document.getElementById('reveal-file')
const settingsPath = require('../../backend/settings.json').path

revealButton.onclick = () => {
    const downloadsPath = path.join(__dirname, '/../../' + settingsPath)
    console.log(downloadsPath)
    shell.openPath(downloadsPath)
}