import ytDW from './utils/youtubeDownloader'
import React, { Component } from 'react'
var YouTube = require('youtube-node');
export class App extends Component {
  render() {
    return (
      <div>
        <h1>Text</h1>
      </div>
    )
  }
  async componentDidMount(){
    var youtube = new YouTube();
    youtube.setKey("key");
    youtube.search('monke', 4, function(error, result) {
      if (error) {
        console.log(error);
      }
      else {
        var videos = result["items"];
        for(var i = 0;i < videos.length;i++) {
          console.log(videos[i]["snippet"].title);
        }
      }
    });
  }
}

export default App
