module.exports = {
    name: 'queue',
    description: 'Gets the current queue', 
    args: false,
    execute(message, args) {
        const serverQueue = message.client.queue.get(message.guild.id);
        let output = 'Now Playing: ';
        for (var i in serverQueue.songs) {
            var pos = i+1;
            output += `**${pos}: ${serverQueue.songs[i].title}**\n`;
        }

        return message.channel.send(output);
    }
};