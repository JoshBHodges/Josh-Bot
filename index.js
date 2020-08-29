require("dotenv").config()

const { Client } = require("discord.js");
const bot = new Client()
const PREFIX = '?'

var imageSearch = require('./functions/image-search')
var ytSearch = require('./functions/yt-search')
var clear = require('./functions/clear-messages')
var help = require('./functions/help')
var music = require('./functions/music')

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
        imageSearch.getImage(msg,params)
        break;

      case 'yt':
        ytSearch.getVideo(params).then(result =>{
          console.log(result)
            msg.channel.send(result.link)
          }
        )
        break;

      case 'clear':
        clear.clearMessages(msg,params)
        break;

      case 'help':
        help.help(msg)
        break;

      case 'music':
        let command2 = params.split(" ")[0]
        switch (command2) {
          case 'play':
            ytSearch.getVideo(params.substring(command2.length)).then(result =>{
                music.play(bot,msg,result)
              }
            )
            break;
        
          case 'next':
            music.next(msg)
            break;
          
          case 'stop':
            music.stop(msg)
            break;

          default:
            msg.reply('**That is not a valid music command!**')
            break;
            
        }
        break;

      default:
        msg.reply("**That is not a valid command!**")
        break;
    }
  }
  
})

bot.login(process.env.BOT_TOKEN)
