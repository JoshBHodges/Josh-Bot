var ytSearch = require('./yt-search')
var ytdl = require('ytdl-core')

var servers = {};

module.exports = {

    play: function(msg,song){
        console.log('Song to play: ' + song)

        function playSong(connection,msg){
            var server = servers[msg.guild.id]

            server.dispatcher = connection.play(ytdl(server.queue[0], {filter: 'audioonly'}))
            server.queue.shift()
            server.dispatcher.on('finish',()=>{
                if(server.queue[0]){
                    playSong(connection,msg)
                }
                else{
                    msg.channel.send("**No more songs in the Queue!**")
                    connection.disconnect()
                }
            })
        }

        //Check if in a voice channel
        if(!msg.member.voice.channel){
            msg.reply('\n**You need to be in a voice channel to play music**')
            return;
        }

        if(!servers[msg.guild.id]){
            servers[msg.guild.id] = {
                queue:[]
            }
        }

        var server = servers[msg.guild.id]
        server.queue.push(song)

        if(!msg.member.voice.connection){ 
            msg.member.voice.channel.join()
            .then(connection =>{
                playSong(connection,msg)
            })
        }
    },

    next: function(){

    },
}