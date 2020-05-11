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
                if (map.get(c)) {
                    map.set(c, map.get(c) + 1);
                } else {
                    map.set(c, 0);
                }
                const letter = c + '_' + map.get(c);
                console.log(map.get(c));
                var server;
                switch (map.get(c)) {
                    case 0:
                        server = '709481570230337596';
                        break;
                    case 1:
                        server = '709511617598980227';
                        break;
                    case 2:
                        server = '709511828530790592';
                        break;
                    default:
                        server = '709511962995851305';
                }
                console.log(server);
                const emoji = message.client.guilds.resolve(server).emojis.cache.find(emoji => emoji.name === letter);
                if (emoji)
                    lastTwo.last().react(emoji);
            }
        }
        lastTwo.first().delete();
    }
};