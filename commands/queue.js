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
            var start;
            if (!args.length) {
                start = 0;
            } else {
                start = args[0];
            }
            let counter = 0;
            for (let i = start; i < serverQueue.songs.length; i++) {
                var song = serverQueue.songs[i];
                embed.addField(`${i+1}) Requested by ${song.author.username}`,`[${song.title}](${song.url}) (${song.duration})`);
                if (counter++ == 9) {
                    break;
                }
            }

            message.delete()
            .then(this.getReactions(message.channel.send(embed)));
        }

    },

    getReactions(message) {
        message.react('⬅️').then(() => message.react('➡️'))
        .then(() => {
            const filter = (reaction) => {
                return (reaction.emoji.name === '⬅' || reaction.emoji.name === '➡') && !msg.author.bot;
            };
            console.log('Reactions made');
            const collector = message.createReactionCollector(filter);

            collector.on('collect', (reaction) => {
                console.log('Reactions collected');
                const { emoji: { name: emojiName} } = reaction;
                
                if (emojiName === '⬅️') {
                    if (start >= 10) {
                        this.execute(message, [start - 10]);
                    }
                } else {
                    if (serverQueue.songs.length >= start + 10) {
                        this.execute(message, [start + 10]);
                    }
                }
            });
        });
    }
};