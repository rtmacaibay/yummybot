module.exports = {
    name: 'fuck',
    description: 'Another classic Pooncity copypasta', 
    args: false,
    execute(message, args) {
        message.delete()
            .then(message.channel.send(`That's it. ${message.author} is fucking.`))
            .catch(console.error);
    }
};