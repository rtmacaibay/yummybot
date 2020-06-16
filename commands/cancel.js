module.exports = {
    name: 'cancel',
    description: 'Cancels anything you ask it to cancel',
    aliases: ['c'], 
    args: true,
    usage: '<anything>',
    execute(message, args) {
        var cancel = args.join(' ');

        return message.channel.send(`${cancel} is officially cancelled. #${cancel}isoverparty`);
    }
};