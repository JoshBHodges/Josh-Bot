const ytsr = require('ytsr');

module.exports = {
    getVideo: async function(params){
        var video = ytsr(params,{limit:1})
        .then(result=>{
            console.log("Youtube video: " + result.items[0].link);
            return(result.items[0].link)
        })
        
        return video
    }
}