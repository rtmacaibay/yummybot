module.exports = {
    name: 'nyammy',
    description: 'A twist on a classic JB line', 
    args: false,
    execute(message, args) {
        var output = "";

        if (!args.length) {
            output = output.concat('ⓝⓨⓐ~~ babe!');
        } else if (args[0] > 165) {
            message.channel.send(`${message.author}, you can only nyammy up to 165 times.`);
            return;
        } else {
            for (var i = 0; i < args[0]; i++) {
                output = output.concat ('ⓝⓨⓐ~~ babe!');
            }
        }
        
        message.delete()
            .then(message.channel.send(output));
    }
};