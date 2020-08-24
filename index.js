require("dotenv").config()
const GoogleImages = require("google-images");
const { Client } = require("discord.js");
const {google} = require('googleapis');

const client = new Client()
const googleImages = new GoogleImages(process.env.GOOGLE_SE_KEY, process.env.GOOGLE_API);

const youtube = google.youtube({
  version:'v3',
  auth:process.env.YOUTUBE_KEY,
})

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
  // Get image search arguments for the query
  if (msg.content.startsWith(".image")) {
    const args = msg.content.slice(".image".length).trim().split(' ')
    var q = '';
    args.forEach(element => {
        q += element + ' '
    });
    console.log("Image search: " + q)

    // Send request to google images with query
    googleImages.search(q)
    .then(images => { 
        msg.channel.send(images[Math.floor(Math.random() * images.length)].url);
    });
  }

  else if (msg.content.startsWith(".yt")){
    // Get arguments
    const args = msg.content.slice(".yt".length).trim().split(' ')
    var q = '';
    args.forEach(element => {
        q += element + ' '
    });
    console.log("Youtube search: " + q)

    youtube.search.list({part:'id,snippet'}, {q: q, maxResults: 10})
    .then( result =>{
        console.log("Youtuibe video ID: " + result.data.items[1].id.videoId)
        msg.channel.send("https://www.youtube.com/watch?v=" + result.data.items[1].id.videoId)
      }
    )
  }

})

client.login(process.env.BOT_TOKEN)
