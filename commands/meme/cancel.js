const plural = require('pluralize');

module.exports = {
    name: 'cancel',
    description: 'Cancels anything you ask it to cancel',
    aliases: ['c'], 
    args: true,
    usage: '<anything>',
    execute(message, args) {
        let cancel = args.join(' ');
        let cancels = message.client.cancels;
        let over = args.join('').toLowerCase();
        let grammar = plural.isPlural(args[0]) || plural.isPlural(args[args.length-1]) ? 'are' : 'is';

        if (cancels.has(cancel)) {
            cancels.set(cancel, cancels.get(cancel) + 1);
        } else {
            cancels.set(cancel, 1);
        }
        
        setTimeout(() => {  message.delete().then(message.channel.send(`${cancel} ${grammar} officially cancelled. #${over}${grammar}overparty`)); }, 500);
    }
};