module.exports = {
    name: 'simp',
    description: 'For alerting others of the simp',
    args: false,
    usage: '<optional: specify something to simp for>',
    async execute(message, args) {
        let output = ``;
        if (!args.length) {
            let lastTwo = await message.channel.messages.fetch({limit: 2});
            let user = lastTwo.last().author;
            output = `ATTN: ${message.author} is simping for ${user}!`;
        } else {
            let target = args.join(' ');
            output = `ATTN: ${message.author} is simping for ${target}!`;
        }

        setTimeout(() => {  message.delete().then(message.channel.send(output)); }, 500);
    }
};