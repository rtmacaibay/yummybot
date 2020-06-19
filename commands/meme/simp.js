module.exports = {
    name: 'simp',
    description: 'For alerting others of the simp',
    args: false,
    usage: '<optional: specify something to simp for>',
    async execute(message, args) {
        if (!args.length) {
            let lastTwo = await message.channel.messages.fetch({limit: 2});
            lastTwo.first().delete();
            let user = lastTwo.last().author;
            message.channel.send(`ATTN: ${message.author} is simping for ${user}!`);
        } else {
            let target = args.join(' ');
            message.delete()
            .then(message.channel.send(`ATTN: ${message.author} is simping for ${target}!`));
        }
    }
};