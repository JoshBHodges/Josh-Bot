var ytdl = require('ytdl-core');

var servers = {};

module.exports = {

    play: function(bot,msg,song){

        function playSong(connection,msg){
            var server = servers[msg.guild.id]

            server.dispatcher = connection.play(ytdl(server.queue[0].link, {filter: 'audioonly'}))
            
            bot.user.setPresence({
                    activity:{
                        name: server.queue[0].title,
                        type: 0
                    }
                })

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
        msg.reply(song.title + " Added to the queue!")

        if(bot.voice.connections.size<1){ 
            msg.member.voice.channel.join()
            .then(connection =>{
                playSong(connection,msg)
            })
        }
    },

    next: function(msg){
        var server = servers[msg.guild.id]
        if(server.dispatcher){
            server.dispatcher.end()
        }
        msg.channel.send('**Skipping Song**')
    },
    stop: function(msg){
        var server = servers[msg.guild.id]
        if(msg.guild.voice.connection){
            for(var i = server.queue.length -1; i >=0; i--){
                server.queue.splice(i,1)
            }
            msg.channel.send('**Ending the Queue, Leaving the voice channel**')
            server.dispatcher.end();
        }
        if(msg.guild.connection){
            msg.guild.voice.connection.disconnect()
        }
    },
}