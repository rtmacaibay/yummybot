const { MessageEmbed } = require('discord.js');

const { config } = require('../../config');
const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: config.bonsai, log: 'trace' });

module.exports = {
    name: 'songs',
    description: 'Search up songs in Animal Crossing New Horizons',
    aliases: ['song'], 
    args: true,
    usage: '<song name [Animal Crossing]>',
    async execute(message, args) {
        const query = args.join(' ');

        const { body } = await client.search({
            index: 'songs',
            body: {
                query: {
                    match: {
                        'name.name-USen': {
                            query: query,
                            fuzziness: '1'
                        }
                    }
                }
            }
        });
        
        var embed = new MessageEmbed()
            .setColor('#ffd1dc')
            .setFooter(`Yoojung Bot walked so ${message.guild.me.nickname} can run.`, 'https://i.imgur.com/ZUQSyDN.png');

        if (body.hits.hits.length == 0) {
            embed.setTitle('Not Found!');
            embed.setDescription(`We didn't find ${query} in the fossil database!`);
            embed.setImage('https://i.imgur.com/DMervdl.jpg');
        } else {
            const found = body.hits.hits[0]['_source'];

            embed.setTitle(found['name']['name-USen']);
            embed.addFields(
                { name: 'Buy Price', value: found['buy-price'], inline: true },
                { name: 'Sell Price', value: found['sell-price'], inline: true },
                { name: 'Orderable?', value: found['isOrderable'], inline: true },
                { name: 'Music', value: 'Click the Title'}
            );
            embed.setURL(found['music_uri']);
            embed.setImage(found['image_uri']);
            //embed.setThumbnail(found['icon_uri']);
        }

        message.channel.send(embed);
    }
};