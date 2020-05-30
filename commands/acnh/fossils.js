const { MessageEmbed } = require('discord.js');

const { config } = require('../../config');
const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: config.bonsai, log: 'trace' });

module.exports = {
    name: 'fossils',
    description: 'Search up fossils in Animal Crossing New Horizons',
    aliases: ['fossil', 'fos'], 
    args: true,
    usage: '<fossil name [Animal Crossing]>',
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
            .setFooter(`Yoojung Bot walked so ${message.guild.me.nickname} can run.`, 'https://i.imgur.com/ZUQSyDN.png');

        if (body.hits.hits.length == 0 || !body.hits.hits[0]['_source']['image_uri'].includes('fossils')) {
            embed.setTitle('Not Found!');
            embed.setDescription(`We didn't find ${query} in the fossil database!`);
            embed.setImage('https://i.imgur.com/DMervdl.jpg');
        } else {
            const found = body.hits.hits[0]['_source'];

            embed.setTitle(found['name']['name-USen'].replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }));
            embed.setDescription(`Blathers: *"${found['museum-phrase']}"*`);
            embed.addFields(
                { name: 'Price', value: found['price'] }
            );
            embed.setImage(found['image_uri']);
            //embed.setThumbnail(found['icon_uri']);
        }

        message.channel.send(embed);
    }
};