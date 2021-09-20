const fs = require('fs');
const ytdl = require('ytdl-core');
let EventEmitter = require('events').EventEmitter

test_url = "https://www.youtube.com/watch?v=Ej0ME8xdiF8"

getInfo = (url, callback) => {
    ytdl.getInfo(url).then((info) => callback(info))
} 

class Downloader extends EventEmitter{
    getInfo = (url, callback) => {
        ytdl.getInfo(url).then((info) => callback(info))
    } 

    constructor(url, filename){
        super()
        this.getInfo(url, (info) => {
            console.log(info.videoDetails.thumbnails)
            const infos = {
                author : info.videoDetails.author.name,
                title : info.videoDetails.title,
                thumbnail : info.videoDetails.thumbnails.at(-1).url
            }
            this.emit('info', {
                title : infos.title,
                author : infos.author,
                thumbnail : infos.thumbnail
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

exports.Downloader = Downloader
exports.getInfo = getInfo
/*url = "https://www.youtube.com/watch?v=vgBmn1S8Hus"
const stream = ytdl(url, {filter : 'audioonly'})
ytdl.getInfo(url).then((info) => console.log(info))*/
//.pipe(fs.createWriteStream('video.mp4'));