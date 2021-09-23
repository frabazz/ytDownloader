const {ipcRenderer} = require('electron')

/*
  __            __ 
  \/____________\/
."|8---->/\<----8|".
  |-----(||)-----|
   \_----------_/
     |========|
      :______:

*/
//define DOM elements
const donwload_button = document.getElementById('download-button')
const input = document.getElementById('url-field')
const progress_bar = document.getElementById('progress-bar')
const thumbnail_img = document.getElementById('thumbnail-img')
const thumbnail_title = document.getElementById('thumbnail-title')
const container = document.getElementById('my-container')

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

hide(progress_bar, thumbnail_img, container)


const setProgress = (percentage) => {
    progress_bar.style.width = `${percentage}%`
}

const setThumbnail = (src) => {
    thumbnail_img.src = src
}

const setThumbnailTitle = (title) => {
    thumbnail_title.innerHTML = title
}

//hideProgressBar()

donwload_button.onclick = () => {
    console.log(input.value)
    ipcRenderer.sendSync('songurl', input.value)
    //if(error) => send(error)
}

ipcRenderer.on('info', (event, info) => {
    console.log(`downloadig ${info.title} by ${info.author}`)
    show(thumbnail_img, container)
    setThumbnail(info.thumbnail)
    setThumbnailTitle(info.title)
})
ipcRenderer.on('progress', (event, progress) => {
    show(progress_bar)
    setProgress(progress.percentage)
    console.log(progress)
})