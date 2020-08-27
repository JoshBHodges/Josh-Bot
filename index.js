require("dotenv").config()

const { Client } = require("discord.js");
const bot = new Client()

var imageSearch = require('./functions/image-search')
var ytSearch = require('./functions/yt-search')
var clear = require('./functions/clear-messages')
var help = require('./functions/help')

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`)
})

bot.on("guildMemberAdd",(member) => {
  member.send(
      '**Welcome to our server!:video_game: Please read the rules before joining any text or voice channels.**'
  )
});

bot.on("message", msg => {
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

bot.login(process.env.BOT_TOKEN)
