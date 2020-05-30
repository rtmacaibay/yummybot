module.exports = {
    name: 'recruit',
    description: 'Another classic Pooncity copypasta', 
    args: false,
    async execute(message, args) {
        if (message.guild.id === '161941174687498240') {
            let role = await message.guild.roles.fetch('715779742908809226');
            message.delete()
            .then(message.channel.send(`${role} Recruitment event tonight: 5 mans, if you perform and impress you WILL be invited to our team`));
        } else {
            message.delete()
            .then(message.channel.send('Recruitment event tonight: 5 mans, if you perform and impress you WILL be invited to our team'));
        }
    }
};