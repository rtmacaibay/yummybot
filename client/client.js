const { Client, Collection, Intents } = require('discord.js');

module.exports = class extends Client {
	constructor(config) {
		super({ws: { intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES'] }});

		this.commands = new Collection();

		this.queue = new Map();

		this.ratings = new Map();

		this.token = config.token;

		this.prefix = config.prefix;
	}
};