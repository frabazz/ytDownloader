const fs = require('fs');
const ytdl = require('ytdl-core');
let EventEmitter = require('events').EventEmitter

test_url = "https://www.youtube.com/watch?v=Ej0ME8xdiF8"


class Downloader extends EventEmitter{
    getInfo = (url, callback) => {
        ytdl.getInfo(url).then((info) => callback(info))
    } 

    constructor(url, filename){
        super()
        this.getInfo(url, (info) => {
            const infos = {
                author : info.videoDetails.author.name,
                title : info.videoDetails.title,
            }
            this.emit('info', {
                title : infos.title,
                author : infos.author
            })
            var stream = ytdl.downloadFromInfo(info, {
                quality: 'highestaudio'
            }).on('progress', (chunks, donwloaded, total) => {
                this.emit('progress',
                    {percentage : Math.round((donwloaded/total)*100)}
                )
                //console.log((donwloaded/total)*100)
            })
            stream.pipe(fs.createWriteStream(filename))
        })
    }
}
const downloadVideo = (url) => {
    getInfo(url, (info) => {
        const formats = () => {
            codecs = new Array()
            info.formats.forEach(format => {
                const codec = {
                    codec : format.mimeType,
                    isAudio : (format.hasAudio && !format.hasVideo)
                }
                codecs.push(codec)
            })
            return codecs
        }
        const infos = {
            author : info.videoDetails.author.name,
            title : info.videoDetails.title,
            formats : formats()
        }
        var stream = ytdl.downloadFromInfo(info, {
            quality: 'highestaudio'
        }).on('progress', (chunks, donwloaded, total) => {
            console.log((donwloaded/total)*100)
        })
        stream.pipe(fs.createWriteStream('audio.mp3'))

    })
}

/*const downloader = new Downloader(test_url, "gazzè.mp3")
downloader.on('info', (info) => console.log(`scaricando ${info.title} di ${info.author}`))
downloader.on('progress', (progress) => console.log(progress.percentage))
*/
const getInfo = (url, callback) => {
    const promise = ytdl.getInfo(url)
        promise
            .then((info) => callback(false, info))
            .catch((error) => callback(true, null))
} 
getInfo('https://www.youtube.com/watch?v=vgBmn1S8Hus', (err, info) => {
    if(err)console.log("video not found")
    else console.log(info)
})

/*url = "https://www.youtube.com/watch?v=vgBmn1S8Hus"
const stream = ytdl(url, {filter : 'audioonly'})
ytdl.getInfo(url).then((info) => console.log(info))*/
//.pipe(fs.createWriteStream('video.mp4'));