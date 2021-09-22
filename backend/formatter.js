const getInfo = require('./downloader').getInfo
const ytpl = require('ytpl');

const isPlaylist = (url, callback) => {//callback true if found, else false
    const playlist = ytpl(url, {pages : Infinity})
        .then((results) => callback(true))
        .catch((error) => callback(false))
}

const isYoutube = (url, callback) => {
    getInfo(url, (error, info) => {
        if(!error){
            callback(true)
            return
        }
        isPlaylist(url, (found) => {
            if(found)callback(true)
            else callback(false)
        })

    })
}

const getPlaylist = (url, callback) => {
    const playlist = ytpl(url, {pages : Infinity}).then(
        (results) => {
            const urls = []
            results.items.forEach(result => {
                urls.push(result.shortUrl)
            });
            callback(urls)
        }
    )
}


exports.isYoutube = isYoutube
exports.isPlaylist = isPlaylist

const test_url = "https://www.youtube.com/watch?v=FIfhgM_Uok8&list=PLwSsuNRMA-xYOqMdWR_96WL2ApNUFldj3"
getPlaylist(test_url, (results) => console.log(results))
//const results = ytpl('https://www.youtube.com/watch?v=OasjwepNJyI', { pages: Infinity }).then((results) => console.log(results));