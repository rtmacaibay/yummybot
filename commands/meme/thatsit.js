module.exports = {
    name: 'thatsit',
    description: 'Another classic Pooncity copypasta', 
    args: false,
    execute(message, args) {
        var output = "I have had ENOUGH. ";
        output = output.concat("you have crossed the line. not only am i angry, im PISSED. ");
        output = output.concat("you fucked up and you will RUE the day that you have wronged me. ");
        output = output.concat("5 years from now you will look back at this moment as the moment your ruined your life. ");
        output = output.concat("youre fucking ded kid from hence forth, my SOLE mission is the destruction of all you hold dear, NEVER again will you be happy.");
        
        if (args.length) {
            var mention = args[0];
            if (mention.startsWith('<@')  && mention.endsWith('>')) {
                mention = mention.slice(2, -1);

                if (mention.startsWith('!')) {
                    mention = mention.slice(1);
                }
            }
            const user = message.client.users.cache.get(mention);

            output = (`${user}, `).concat(output);
        }
        
        message.delete()
            .then(message.channel.send(output));
    }
};