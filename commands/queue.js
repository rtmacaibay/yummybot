const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'queue',
    description: 'Gets the current queue', 
    aliases: ['q'],
    args: false,
    execute(message, args) {
        const serverQueue = message.client.queue.get(message.guild.id);
        var embed = new MessageEmbed()
            .setColor('#ffd1dc')
            .setTitle('Music Queue');
        if (!serverQueue) {
            embed.addField(`Nothing is playing.`,`Nothing is playing.`);
            message.delete()
            .then(message.channel.send(embed));
        } else {
            message.delete();

            let index = 0;

            message.channel.send(this.createQueueEmbed(serverQueue, index))
            .then((newMessage) => {
                const filter = (reaction, user) => {
                    return (reaction.emoji.name === '⬅' || reaction.emoji.name === '➡') && !user.bot;
                };
    
                newMessage.react('⬅️')
                .then(() => newMessage.react('➡️'))
                .then(() => {
                    console.log('Reactions made');
                    const collector = newMessage.createReactionCollector(filter);
    
                    collector.on('collect', (reaction) => {
                        console.log('Reactions collected');
                        const { emoji: { name: emojiName} } = reaction;
                        
                        if (emojiName === '⬅️') index -= 10
                        else index += 10;
    
                        if (index < 0) index = (serverQueue.songs.length > 9 ? serverQueue.songs.length - 10 : 0);
                        else if (index > serverQueue.songs.length - 1) index = 0;
    
                        newMessage.edit(this.createQueueEmbed(serverQueue, index));
                    });
                });
            });
        }

    },

    createQueueEmbed(serverQueue, start) {
        var embed = new MessageEmbed()
            .setColor('#ffd1dc')
            .setTitle('Music Queue'); 

        let counter = 0;
        for (let i = start; i < serverQueue.songs.length; i++) {
            var song = serverQueue.songs[i];
            embed.addField(`${i+1}) Requested by ${song.author.username}`,`[${song.title}](${song.url}) (${song.duration})`);
            if (counter++ == 9) {
                break;
            }
        }

        return embed;
    }
};