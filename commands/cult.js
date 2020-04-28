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
            var new_nick = '';
            const words = nickname.split(' ');

            for (let i = 0; i < words.length; i++) {
                if (this.isVowel(nickname.charAt(0))) {
                    new_nick = new_nick.concat(('🅱').concat(words[i]));
                } else {
                    new_nick = new_nick.concat(('🅱').concat(words[i].slice(1)));
                }
            }
            return message.member.setNickname(new_nick);
        } else {
            let member = message.guild.member(args[0]).catch(console.error);
            member.roles.add('704560760877088818').catch(console.error);
            var nickname = member.displayName;
            var new_nick = '';
            const words = nickname.split(' ');

            for (let i = 0; i < words.length; i++) {
                if (this.isVowel(nickname.charAt(0))) {
                    new_nick = new_nick.concat(('🅱').concat(words[i]));
                } else {
                    new_nick = new_nick.concat(('🅱').concat(words[i].slice(1)));
                }
            }
            return message.member.setNickname(new_nick);
        }
    },

    isVowel(letter) {
        return (/^[aeiouy]$/i).test(letter);
    }
};