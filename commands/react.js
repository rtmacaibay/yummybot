module.exports = {
    name: 'react',
    description: 'Reacts to the last message via the message provided', 
    args: true,
    usage: '<custom emoji name>',
    async execute(message, args) {
        const emoji = message.guild.emojis.cache.find(emoji => emoji.name === args[0]);
        if (!emoji) throw 'Undefined Emoji';
        let lastTwo = await message.channel.messages.fetch({limit: 2});
        lastTwo.last().react(emoji);
        lastTwo.first().delete();
    },
};