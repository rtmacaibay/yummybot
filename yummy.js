const fs = require('fs');
const Discord = require('discord.js');
const Client = require('./client/client.js');
const { config } = require('./config.js');

const client = new Client();
client.commands = new Discord.Collection();

const prefix = config.prefix;
const token = config.token;

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if ((message.content.toLowerCase().includes('fuck') || message.content.toLowerCase().includes('shit')) && !message.author.bot)
        message.channel.send(`${message.author}, hey relax. You just need some yummy. Do you got that yummy?`);
    if (!message.content.startsWith(prefix) || message.author.bot) 
        return;
    
    console.log(message.content);

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) 
        return;

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply(`We don't got the yummy for that command.`);
    }
});

client.login(token);