const { MessageEmbed } = require('discord.js');

const { config } = require('../../config');
const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: config.bonsai, log: 'trace' });

module.exports = {
    name: 'bugs',
    description: 'Search up for bugs in Animal Crossing New Horizons',
    aliases: ['b'], 
    args: false,
    async execute(message, args) {
        const query = args.join(' ');

        const { body } = await client.search({
            index: 'acnh',
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
            .setFooter(`Yoojung Bot walked so ${message.guild.me.nickname} can run`, 'https://i.imgur.com/ZUQSyDN.png');

        if (body.hits.hits.length == 0) {
            embed.setTitle('Not Found!');
            embed.setDescription(`We didn't find ${query} in the bug database!`);
            embed.setImage('https://i.imgur.com/DMervdl.jpg');
        } else {
            const found = body.hits.hits[0]['_source'];
            const avail = found['availability'];
            const northMonth = avail['isAllYear'] ? 'All-Year' : avail['month-northern'];
            const southMonth = avail['isAllYear'] ? 'All-Year' : avail['month-southern'];
            const time = avail['isAllDay'] ? 'All-Day' : avail['time'];
            embed.setTitle(found['name']['name-USen'].replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }));
            embed.setDescription(`Blathers: "${found['museum-phrase']}"`);
            embed.addFields(
                { name: 'Availability', value: '\u200B' },
                { name: 'Northern', value: northMonth, inline: true },
                { name: 'Southern', value: southMonth, inline: true },
                { name: 'Time', value: time, inline: true },
                { name: 'Rarity', value: avail['rarity'], inline: true },
                { name: 'Location', value: avail['location'], inline: true },
                { name: 'Price', value: found['price'], inline: true },
                { name: 'Flick\'s Price', value: found['price-flick'], inline: true },
                { name: '\u200B', value: `*${found['catch-phrase']}*` }
            );
            //embed.setImage(found['image_uri']);
            embed.setThumbnail(found['icon_uri']);
        }

        message.channel.send(embed);
    }
};