require("dotenv").config()
const GoogleImages = require("google-images");
const { Client } = require("discord.js");

const client = new Client()
const googleImages = new GoogleImages(process.env.GOOGLE_SE_KEY, process.env.GOOGLE_API);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
  if (msg.content.startsWith(".image")) {

    // Get image search arguments for the query
    const args = msg.content.slice(".image".length).trim().split(' ')
    var q = '';
    args.forEach(element => {
        q += element + ' '
    });
    console.log(q)

    // Send request to google images with query
    googleImages.search(q)
    .then(images => { 
        msg.channel.send(images[Math.floor(Math.random() * images.length)].url);
    });

  }
})

client.login(process.env.BOT_TOKEN)
