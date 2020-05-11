module.exports = {
    name: 'prefix',
    description: 'Sets the prefix of the bot for the current server',
    args: true,
    usage: '<anything>',
    execute(message, args) {
        message.client.prefix.set(message.guild.id, args[0]);
    }
};