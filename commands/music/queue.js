const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'queue',
    description: 'Gets the current queue', 
    aliases: ['q'],
    args: false,
    async execute(message, args) {
        const serverQueue = message.client.queue.get(message.guild.id);
        var embed = new MessageEmbed()
            .setColor('#ffd1dc')
            .setTitle('Music Queue');
        if (!serverQueue) {
            embed.addField(`Nothing is playing.`,`Nothing is playing.`);
            return message.channel.send(embed);
        } else {
            this.sendEmbed(undefined, 0, message, serverQueue);
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
    },

    async sendEmbed(msg, index, orig, serverQueue) {
        if (msg) await msg.edit(this.createQueueEmbed(serverQueue, index));
        else msg = await orig.channel.send(this.createQueueEmbed(serverQueue, index));

        const forward = (reaction, user) => reaction.emoji.name === '➡️' && !user.bot;
        const forward_collector = msg.createReactionCollector(forward, { max: 1, time: 120000 });

        forward_collector.on('collect', async () => {
            let new_index = index + 10;
            if (new_index > serverQueue.songs.length - 1) new_index = 0;

            back_collector.stop();
            await msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));

            this.sendEmbed(msg, new_index, orig, serverQueue);
        });

        const back = (reaction, user) => reaction.emoji.name === '⬅️' && !user.bot;
        const back_collector = msg.createReactionCollector(back, { max: 1, time: 120000 });

        back_collector.on('collect', async () => {
            let new_index = index - 10;
            if (new_index < 0) new_index = (serverQueue.songs.length > 9 && (new_index + 10) == 0 ? serverQueue.songs.length - 10 : 0);

            forward_collector.stop();
            await msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));

            this.sendEmbed(msg, new_index, orig, serverQueue);
        });

        await msg.react('⬅️');
        await msg.react('➡️');
    }
};