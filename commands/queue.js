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
            embed.addField('',`Nothing is playing.`);
            message.delete()
                .then(message.channel.send(embed))
        } else {
            var start;
            if (!args.length) {
                start = 0;
            } else {
                start = args[0];
            }
            let counter = 0;
            for (let i = start; i < serverQueue.songs.length; i++) {
                embed.addField('',`${i+1}) ${serverQueue.songs[i].title}`);
                if (counter++ == 9) {
                    break;
                }
            }

            message.delete()
                .then(message.channel.send(embed)
                        .then(msg => {
                            msg.react('⬅️').then(() => msg.react('➡️'));
                            const filter = (reaction) => {
                                return ['⬅️', '➡️'].includes(reaction.emoji.name);
                            };

                            msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                                .then(collected => {
                                    const reaction = collected.first();

                                    if (reaction.emoji.name === '⬅️') {
                                        if (start >= 10) {
                                            this.execute(msg, [start - 10]);
                                        }
                                    } else {
                                        if (serverQueue.songs.length >= start + 10) {
                                            this.execute(msg, [start + 10]);
                                        }
                                    }
                                })
                        }));
        }

    }
};