module.exports = {
	name: 'skip',
    description: 'Skips to the next song',
    args: false,
	execute(message, args) {
		const serverQueue = message.client.queue.get(message.guild.id);
        if (!message.member.voice.channel) 
            return message.reply('you have to be in a voice channel to stop the music!');
        if (!serverQueue) 
            return message.channel.send('There is no song that I could skip!');
		serverQueue.connection.dispatcher.end();
	},
};