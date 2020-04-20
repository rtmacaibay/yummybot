module.exports = {
    name: 'queue',
    description: 'Gets the current queue', 
    args: false,
    execute(message, args) {
        const serverQueue = message.client.queue.get(message.guild.id);
        let output = 'Now Playing: ';
        for (var song in serverQueue.songs) {
            output += `**${song}**\n`;
        }

        return message.channel.send(output);
    }
};