module.exports = {
    name: 'yummy',
    description: 'Yummy Generator',
    cooldown: 10,
    args: false,
    usage: `<optional: number of 'yummys' you want (up to 331)>`,
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
        
        setTimeout(() => {  message.delete().then(message.channel.send(output)); }, 500);
    }
};