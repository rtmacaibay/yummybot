module.exports = {
    name: 'roll',
    description: 'To roll a dice', 
    args: false,
    execute(message, args) {
        let number = Math.floor((Math.random() * 6) + 1);

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