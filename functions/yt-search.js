const {google} = require('googleapis');
const youtube = google.youtube({
    version:'v3',
    auth:process.env.YOUTUBE_KEY,
})

module.exports = {
    getVideo: async function(params){
        // Send the request to Google API
        var p = youtube.search.list({part:"id,snippet",q: params, maxResults: 1,type:"video"})
        .then( result =>{
                console.log("Youtuibe video ID: " + result.data.items[0].id.videoId)
                return ("https://www.youtube.com/watch?v=" + result.data.items[0].id.videoId)
            }
        )
        return p
    }
}