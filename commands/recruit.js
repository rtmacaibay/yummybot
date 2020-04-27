module.exports = {
    name: 'recruit',
    description: 'Another classic Pooncity copypasta', 
    args: false,
    execute(message, args) {
        message.delete()
            .then(message.channel.send('Recruitment event tonight: 5 mans, if you perform and impress you WILL be invited to our team'));
    }
};