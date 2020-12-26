module.exports = {
    name: 'roll',
    description: 'To roll a dice', 
    args: false,
    execute(message, args) {
        let number = 3;

        if (args.length != 0) {
            number = parseInt(args[0]);
        }
        
        message.delete().then(
            message.channel.send('Rolling...').then(
                msg => {
                    setTimeout(() => {
                        msg.delete().then(message.channel.send(`It's a ${number}.`));
                    }, 5000);
                }
            )
        )
    }
};