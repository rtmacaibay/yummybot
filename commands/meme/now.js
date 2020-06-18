module.exports = {
    name: 'now',
    description: 'A classic Pooncity copypasta', 
    args: false,
    execute(message, args) {
        message.delete()
            .then(message.channel.send('NOW QUICK HURRY THE FUCK UP IM TIRED OF WAITING RESULTS NOW NOW FAST HOLY FUCK FAST NOW QUICK NOW NOW NOW NOW'))
            .catch(console.error);
    }
};