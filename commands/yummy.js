module.exports = {
    name: 'yummy',
    description: 'Yummy Generator', 
    args: false,
    execute(message, args) {
        let output = 'You got that ';
        if (!args.length) {
            output = output.concat('yummy');
        } else if (args[0] > 331) {
            message.channel.send(`${message.author}, you can only yummy up to 331 times.`);
            return;
        } else {
            for (var i = 0; i < args[0]; i++) {
                output = output.concat ('yummy ');
            }
        }
        message.channel.send(output);
    },
};