const {ipcRenderer} = require('electron')

const donwload_button = document.getElementById('download-button')
const input = document.getElementById('url-field')
const progress_bar = document.getElementById('progress-bar')
const thumbnail_img = document.getElementById('thumbnail-img')

const isDownloading = false;

const hide = (...elements) => {
    elements.forEach(element => {
        element.style.display = 'none'
    });
}
const show = (...elements) => {
    elements.forEach(element => {
        element.style.display = 'block'
    });
}

hide(progress_bar, thumbnail_img)


const setProgress = (percentage) => {
    progress_bar.style.width = `${percentage}%`
}

const setThumbnail = (src) => {
    thumbnail_img.src = src
}

//hideProgressBar()

donwload_button.onclick = () => {
    console.log(input.value)
    ipcRenderer.sendSync('songurl', input.value)
    //if(error) => send(error)
}

ipcRenderer.on('info', (event, info) => {
    console.log(`downloadig ${info.title} by ${info.author}`)
    show(thumbnail_img)
    setThumbnail(info.thumbnail)
})
ipcRenderer.on('progress', (event, progress) => {
    show(progress_bar)
    setProgress(progress.percentage)
    console.log(progress)
})