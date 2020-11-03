module.exports = {
    name: 'nyammy',
    description: 'Another classic Pooncity copypasta', 
    args: false,
    execute(message, args) {
        var output = "";

        if (!args.length) {
            output = output.concat('ⓝya babe!');
        } else if (args[0] > 165) {
            message.channel.send(`${message.author}, you can only nyammy up to 165 times.`);
            return;
        } else {
            for (var i = 0; i < args[0]; i++) {
                output = output.concat ('ⓝya babe! ');
            }
        }
        
        message.delete()
            .then(message.channel.send(output));
    }
};