const plural = require('pluralize');

module.exports = {
    name: 'cancel',
    description: 'Cancels anything you ask it to cancel',
    aliases: ['c'], 
    args: true,
    usage: '<anything>',
    execute(message, args) {
        let cancel = args.join(' ');
        let over = args.join('');
        let grammar = plural.isPlural(args[0]) || plural.isPlural(args[args.length-1]) ? 'are' : 'is';

        message.delete()
            .then(message.channel.send(`${cancel} ${grammar} officially cancelled. #${over}${grammar}overparty`));
    }
};