module.exports = {
    clearMessages: function (msg,params){
        var amount = params
        amount = Number(amount) + 1
        console.log("Clear " + amount + " messages")

        // Check it is a number
        if (!amount) return msg.reply('You haven\'t given an amount of messages which should be deleted!');
        if (isNaN(amount)) return msg.reply('The amount parameter isn`t a number!');

        // Check it is within constraints
        if (amount > 100) return msg.reply('You can`t delete more than 100 messages at once!');
        if (amount < 1) return msg.reply('You have to delete at least 1 message!');

        // Remove messages
        msg.channel.messages.fetch({ limit: amount }).then(messages => { 
            msg.channel.bulkDelete(messages)
        });
    }
}