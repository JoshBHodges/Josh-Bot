const {google} = require('googleapis');
const youtube = google.youtube({
    version:'v3',
    auth:process.env.YOUTUBE_KEY,
})

module.exports = {
    getVideo: function(msg){
        // Get arguments after the command
        const args = msg.content.slice("?yt".length).trim().split(' ')
        var q = args.join(' ')
        console.log("Youtube search: " + q)

        // Send the request to Google API
        youtube.search.list({part:"id,snippet",q: q, maxResults: 1,type:"video"})
        .then( result =>{
                console.log("Youtuibe video ID: " + result.data.items[0].id.videoId)
                msg.channel.send("https://www.youtube.com/watch?v=" + result.data.items[0].id.videoId)
            }
        )
    }
}