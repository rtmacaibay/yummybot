const play = require('./play');

module.exports = {
    name: 'coffin',
    description: 'For when your homie is long gone',
    aliases: ['f', 'rip'], 
    args: false,
    execute(message, args) {
        message.delete()
            .then(message.channel.send('https://tenor.com/view/coffin-dance-ricky-sunglasses-friends-squad-gif-16787280')
                .then(msg => {
                    setTimeout(function () {
                        msg.delete();
                        message.channel.send('https://tenor.com/view/dancing-coffin-dancing-happy-fun-celebrating-gif-16728482');
                    }, 5000)
                            .then(msg => play.execute(msg, ['https://www.youtube.com/watch?v=GhIa4gAhjWE']));
                }));
    }
};