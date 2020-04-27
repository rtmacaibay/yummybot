module.exports = {
    name: 'clean',
    description: 'Deletes a number of messages that are no more than two weeks old', 
    args: true,
    usage: '<positive integer>',
    execute(message, args) {
        if (parseInt(args[0])) {
            if (args[0] < 1) {
                message.channel.send(`You didn't specific a positive numeric argument, ${message.author}!`);
                return;
            }
            message.channel.bulkDelete(parseInt(args[0]) + 1)
                .then(messages => message.channel.send(`The Yummy has taken ${messages.size} messages to the beyond.`))
                .catch(console.error);
            setTimeout(function() {
                message.channel.lastMessage.delete();
            }, 3000);
        } else {
            message.channel.send(`You didn't specific a positive numeric argument, ${message.author}!`);
        }
    }
};