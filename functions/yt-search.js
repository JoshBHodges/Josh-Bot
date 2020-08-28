const ytsr = require('ytsr');

module.exports = {
    getVideo: async function(params){
        
        video = ytsr.getFilters(params)
        .then(filters =>{
            let options = {
                limit:1,
                nextpageRef: filters.get('Type').find(o => o.name === 'Video').ref,
            }
            video = ytsr(params,options)
            .then(result=>{
                return(result.items[0].link)
            })
            return video
        })
        return video
    }
}