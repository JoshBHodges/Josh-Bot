require("dotenv").config()

const { Client } = require("discord.js");
const client = new Client()

var imageSearch = require('./functions/image-search')
var ytSearch = require('./functions/yt-search')
var clear = require('./functions/clear-messages')
var help = require('./functions/help')

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("guildMemberAdd",(member) => {
  member.send(
      '**Welcome to our server!:video_game: Please read the rules before joining any text or voice channels.**'
  )
});

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
  else if (msg.content.startsWith("?help")){
    help.help(msg)
  }
  
})

client.login(process.env.BOT_TOKEN)
