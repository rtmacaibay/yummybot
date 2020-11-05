const plural = require('pluralize');

module.exports = {
    name: 'cancelstats',
    description: 'Tells you the \'cancel\' stats of a particular query',
    aliases: ['cs'], 
    args: true,
    usage: '<anything>',
    execute(message, args) {
        let cancel = args.join(' ');
        let cancels = message.client.cancels;
        let count = cancels.has(cancel) ? cancels.get(cancel) : 0;
        let grammar = plural.isPlural(args[0]) || plural.isPlural(args[args.length-1]) ? 'have' : 'has';

        setTimeout(() => {  message.delete().then(message.channel.send(`${cancel} ${grammar} been cancelled ${count} times.`)); }, 500);
    }
};