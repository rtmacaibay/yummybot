const fs = require('fs');
const Discord = require('discord.js');
const Client = require('./client/client.js');
const { config } = require('./config.js');

const client = new Client(config);
client.commands = new Discord.Collection();

const prefix = client.prefix;
const token = client.token;

const mainCommands = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of mainCommands) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// const musicCommands = fs.readdirSync('./commands/music').filter(file => file.endsWith('.js'));

// for (const file of musicCommands) {
//     const command = require(`./commands/music/${file}`);
//     client.commands.set(command.name, command);
// }

const acnhCommands = fs.readdirSync('./commands/acnh').filter(file => file.endsWith('.js'));

for (const file of acnhCommands) {
    const command = require(`./commands/acnh/${file}`);
    client.commands.set(command.name, command);
}

const memeCommands = fs.readdirSync('./commands/meme').filter(file => file.endsWith('.js'));

for (const file of memeCommands) {
    const command = require(`./commands/meme/${file}`);
    client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity(`${prefix}help & Yummy by Justin Bieber`, {
        type: 'LISTENING',
        url: 'https://github.com/rtmacaibay/yummybot'
    })
    .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
    .catch(console.error);
});

client.on('message', message => {
    const msg = message.content;

    var curses = 0;
    curses += (msg.match(/fuck/g) || []).length;
    curses += (msg.match(/shit/g) || []).length;
    curses += (msg.match(/bitch/g) || []).length;
    
    if (curses >= 5 && !message.author.bot)
        message.channel.send(`${message.author}, hey relax. You just need some yummy. Do you got that yummy?`);
    if (((msg.toLowerCase().includes('bobert') || msg.toLowerCase().includes('robert')) && msg.toLowerCase().includes('simp')) && !message.author.bot) {
        let name = msg.toLowerCase().includes('bobert') ? 'Bobert' : 'Robert';
        message.channel.send(`Thing about ${name} is he doesn't simp. In fact, he never simps.`);
        return;
    }
    if (!msg.startsWith(prefix) || message.author.bot) 
        return;
    
    console.log(`[${message.author.username}]: ${message.content}`);

    const args = msg.slice(prefix.length).split(/ +/);
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

    if (!cooldowns.has(commandName)) cooldowns.set(commandName, new Discord.Collection());

    const now = Date.now();
    const timestamps = cooldowns.get(commandName);
    const cooldownAmount = (command.cooldown || .5) * 1000;

    if (timestamps.has(message.author.id) && !message.member.hasPermission('ADMINISTRATOR')) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`pleast wait ${timeLeft.toFixed(1)} more second(s) before reusing the '${commandName}' command.`);
        }
    } else {
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply(`We don't got the yummy for that command.`);
    }
});

client.login(token);