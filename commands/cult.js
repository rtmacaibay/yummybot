module.exports = {
    name: 'cult',
    description: 'Convert yourself or another user to the cult (admin)', 
    args: false,
    usage: '<Admin: user>',
    execute(message, args) {
        if (!message.guild.me.hasPermission('MANAGE_NICKNAMES') && !message.guild.me.hasPermission('MANAGE_ROLES'))
            return message.channel.send(`I don't have permission to convert you to the cult!`);

        // let role = message.guild.roles.fetch('704560760877088818');

        if (!args.length) {
            message.member.roles.add('704560760877088818').catch(console.error);
            var nickname = message.member.displayName;
            if (this.isVowel(nickname.charAt(0))) {
                return message.member.setNickname(('🅱').concat(nickname));
            } else {
                return message.member.setNickname(('🅱').concat(nickname.slice(1)));
            }
        } else {
            let member = message.guild.members.fetch(args[0]);
            member.roles.add('704560760877088818').catch(console.error);
            var nickname = member.displayName;
            if (this.isVowel(nickname.charAt(0))) {
                return member.setNickname(('🅱').concat(nickname));
            } else {
                return member.setNickname(('🅱').concat(nickname.slice(1)));
            }
        }
    },

    isVowel(letter) {
        return (/^[aeiouy]$/i).test(letter);
    }
};