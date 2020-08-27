require("dotenv").config()

const { Client } = require("discord.js");
const bot = new Client()
const PREFIX = '?'

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
  if (msg.content.startsWith("?")) {
    let args = msg.content.substring(PREFIX.length).split(" ");
    let command = args.shift()
    let params = args.join(' ')

    switch (command) {
      case 'image':
        imageSearch.getImage(msg)
        break;
      case 'yt':
        ytSearch.getVideo(msg)
        break;
      case 'clear':
        clear.clearMessages(msg)
        break;
      case 'help':
        help.help(msg)
        break;
      default:
        break;
    }
  }
  
})

bot.login(process.env.BOT_TOKEN)
