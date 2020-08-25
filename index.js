require("dotenv").config()

const { Client } = require("discord.js");
const client = new Client()

var imageSearch = require('./functions/image-search')
var ytSearch = require('./functions/yt-search')
var clear = require('./functions/clear-messages')

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
  if (msg.content.startsWith("?image")) {
    imageSearch.getImage(msg)
  }
  else if (msg.content.startsWith("?yt")){
    ytSearch.getVideo(msg)
  }
  else if (msg.content.startsWith("?clear")){
    clear.clearMessages(msg)
  }
})

client.login(process.env.BOT_TOKEN)
