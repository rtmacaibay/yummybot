module.exports = {
    name: 'reactmessage',
    description: 'Reacts to a message with a message',
    aliases: ['reactm','rm'],
    args: true,
    usage: '<words>',
    async execute(message, args) {
        let lastTwo = await message.channel.messages.fetch({limit: 2});
        let map = new Map();
        for (var i = 0; i < args.length; i++) {
            for (var j = 0; j < args[i].length; j++) {
                var c = args[i].toLowerCase().charAt(j);
                if (c >= '0' && c <= '9') {
                    continue;
                }
                if (map.has(c)) {
                    if (map.get(c) == 0) {
                        map.set(c, 1);
                    }
                } else {
                    map.set(c, 0);
                }
                const letter = c + '_' + map.get(c);
                const emoji = message.guild.emojis.cache.find(emoji => emoji.name === letter);
                lastTwo.last().react(emoji);
            }
        }
        lastTwo.first().delete();
    }
};