const ytpl = require('ytpl')
const getInfo = require('./downloader').getInfo

const getPlaylist = (url, callback) => {
    ytpl(url, {pages : Infinity})
        .then((playlist) => {
            let videos = []
            const items = playlist.items
            items.forEach((video) => {
                videos.push(video.shortUrl)
            })
            callback(videos)
        })
}

const isPlaylist = (url, callback) => {
    ytpl(url)
        .then((videos) => callback(true))
        .catch((error) => callback(false))

}

const isYoutube = (url, callback) => {//callback(isYoutube, isPLaylist)
    getInfo(url, (error, info) => {
        if(!error)callback(true, false)
        else{
            isPlaylist(url, (isPlaylist) => {
                isPlaylist ? callback(true) : callback(false)
            })
        }
    })
}

