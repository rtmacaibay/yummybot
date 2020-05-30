const { MessageEmbed } = require('discord.js');

const fetch = require('node-fetch');

const { config } = require('../../config');
const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: config.bonsai, log: 'trace' });

module.exports = {
    name: 'items',
    description: 'Search up for bugs in Animal Crossing New Horizons',
    aliases: ['houseware', 'wallmounted', 'misc', 'furniture', 'i', 'h'], 
    args: false,
    async execute(message, args) {
        const query = args.join(' ');

        const { body } = await client.search({
            index: 'items',
            body: {
                query: {
                    match: {
                        'name': {
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

        if (body.hits.hits.length == 0 || !body.hits.hits[0]['_source']['image_uri'].includes('furniture')) {
            embed.setTitle('Not Found!');
            embed.setDescription(`We didn't find ${query} in the furniture database!`);
            embed.setImage('https://i.imgur.com/DMervdl.jpg');
        } else {
            const found = body.hits.hits[0]['_source'];

            embed.setTitle(found['name'].replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }));
            embed.addFields(
                { name: 'Variants', value: found['variants'] },
                { name: 'DIY?', value: found['isDIY'], inline: true },
                { name: 'Customizable?', value: found['customizable'], inline: true },
                { name: 'Size', value: found['size'], inline: true },
                { name: 'Interactive?', value: found['interactive'], inline: true },
                { name: `Source`, value: found['source'], inline: true },
                { name: `Details`, value: found['source-detail'] !== '' ? found['source-detail'] : '\u200B' },
                { name: 'Miles Price', value: found['miles-price'], inline: true },
                { name: 'Buy Price', value: found['buy-price'], inline: true },
                { name: 'Sell Price', value: found['sell-price'], inline: true }
            );
            embed.setImage(found['image_uri']);
            //embed.setThumbnail(found['icon_uri']);
        }

        message.channel.send(embed);
    }
};