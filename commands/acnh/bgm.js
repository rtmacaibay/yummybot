const { MessageEmbed } = require('discord.js');

const { config } = require('../../config');
const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: config.bonsai, log: 'trace' });

module.exports = {
    name: 'backgroundmusic',
    description: 'Search up background music in Animal Crossing New Horizons',
    aliases: ['bgm'], 
    args: true,
    usage: '<bgm name [Animal Crossing]>',
    async execute(message, args) {
        const query = args.join(' ');

        const { body } = await client.search({
            index: 'bgm',
            size: 30,
            body: {
                query: {
                    multi_match: {
                        query: query,
                        fuzziness: '1',
                        fields: ['file-name', 'weather']
                    }
                }
            }
        });
        
        const list = body.hits.hits;

        if (list.length == 0) {
            var embed = new MessageEmbed()
                .setColor('#ffd1dc')
                .setFooter(`Yoojung Bot walked so ${message.guild.me.nickname} could run.`, 'https://i.imgur.com/ZUQSyDN.png')
                .setTitle('Not Found!')
                .setDescription(`We didn't find ${query} in the background music database!`)
                .setImage('https://i.imgur.com/DMervdl.jpg');
            message.channel.send(embed);
        } else {
            if (list.length > 1) {
                this.sendEmbed(undefined, 0, message, list);
            } else {
                message.channel.send(this.createEmbed(list, 0, message));
            }
           
        }
    },

    createEmbed(list, index, orig) {
        var embed = new MessageEmbed()
            .setColor('#ffd1dc')
            .setFooter(`Yoojung Bot walked so ${orig.guild.me.nickname} can run.`, 'https://i.imgur.com/ZUQSyDN.png');
        
        const found = list[index]['_source'];

        embed.setTitle(found['file-name']);
        embed.addFields(
            { name: 'Hour', value: found['hour'], inline: true },
            { name: 'Weather', value: found['weather'], inline: true }
        );
        embed.setURL(`http://acnhapi.com/v1/hourly/${found['id']}`);

        return embed;
    },

    async sendEmbed(msg, index, orig, list) {
        if (msg) await msg.edit(this.createEmbed(list, index, orig));
        else msg = await orig.channel.send(this.createEmbed(list, index, orig));

        const forward = (reaction, user) => reaction.emoji.name === '➡️' && !user.bot;
        const forward_collector = msg.createReactionCollector(forward, { max: 1, time: 120000 });

        forward_collector.on('collect', async () => {
            let new_index = index + 1;
            if (new_index > list.length - 1) new_index = 0;

            back_collector.stop();
            await msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));

            this.sendEmbed(msg, new_index, orig, list);
        });

        const back = (reaction, user) => reaction.emoji.name === '⬅️' && !user.bot;
        const back_collector = msg.createReactionCollector(back, { max: 1, time: 120000 });

        back_collector.on('collect', async () => {
            let new_index = index - 1;
            if (new_index < 0) new_index = list.length - 1;

            forward_collector.stop();
            await msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));

            this.sendEmbed(msg, new_index, orig, list);
        });

        await msg.react('⬅️');
        await msg.react('➡️');
    }
};