const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'queue',
    description: 'Gets the current queue', 
    args: false,
    execute(message, args) {
        const serverQueue = message.client.queue.get(message.guild.id);
        let output = 'Now Playing: ';
        var embed = new MessageEmbed()
            .setColor('#ffd1dc')
            .setTitle('Music Queue');
        for (let i = 0; i < serverQueue.songs.length; i++) {
            embed.addField(`${i+1}: ${serverQueue.songs[i].title}`);
        }

        return message.channel.send(embed);
    }
};