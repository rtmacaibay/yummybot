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
            return message.channel.send(embed);
        } else {
            let index = 0;
            
            message.channel.send(this.createQueueEmbed(serverQueue, index))
            .then( (m) => {
                m.react('⬅️')
                .then( async () => {
                    await m.react('➡️');
                    let forward = m.createReactionCollector( (reaction, user) => 
                        reaction.emoji.name === '➡️' && user.id != m.author.id, { time: 120000 });
                    let back = m.createReactionCollector( (reaction, user) => 
                        reaction.emoji.name === '⬅️' && user.id != m.author.id, { time: 120000 });

                    forward.on('collect', () => {
                        index += 10;
                        
                        if (index > serverQueue.songs.length - 1) index = 0;

                        m.edit(this.createQueueEmbed(serverQueue, index));

                        forward.empty();
                    });

                    back.on('collect', () => {
                        index -= 10;

                        if (index < 0) index = (serverQueue.songs.length > 9 ? serverQueue.songs.length - 10 : 0);

                        m.edit(this.createQueueEmbed(serverQueue, index));

                        back.empty();
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