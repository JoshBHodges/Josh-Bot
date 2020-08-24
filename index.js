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
    if (q=="Kieran October "){
      msg.channel.send("https://scontent.flhr1-1.fna.fbcdn.net/v/t31.0-8/18358937_1538929776117187_2983952100613780840_o.jpg?_nc_cat=100&_nc_sid=09cbfe&_nc_ohc=15b85MF2NSEAX-g4ZGo&_nc_ht=scontent.flhr1-1.fna&oh=e861d46bf3f04d73be09c77ec3d32fdf&oe=5F6AD281")
    }
    else{
      // Send request to google images with query
      googleImages.search(q)
      .then(images => { 
          msg.channel.send(images[Math.floor(Math.random() * images.length)].url);
      });
    }
  }

  else if (msg.content.startsWith(".yt")){
    // Get arguments
    const args = msg.content.slice(".yt".length).trim().split(' ')
    var q = '';
    args.forEach(element => {
        q += element + ' '
    });
    console.log("Youtube search: " + q)

    youtube.search.list({part:"id,snippet",q: q, maxResults: 1,type:"video"})
    .then( result =>{
        console.log(result.data.items[0])
        console.log("Youtuibe video ID: " + result.data.items[0].id.videoId)
        msg.channel.send("https://www.youtube.com/watch?v=" + result.data.items[0].id.videoId)
      }
    )
  }

})

client.login(process.env.BOT_TOKEN)
