module.exports = {
    name: 'jump',
    description: 'Jumps to a specified song in the queue', 
    aliases: ['j'],
    args: true,
    usage: '<song position in queue>',
    execute(message, args) {
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!message.member.voice.channel) 
            return message.reply('you have to be in a voice channel to stop the music!');
        if (!serverQueue) 
            return message.channel.send('There is no song that I could skip!');
        if (args[0] < 2 || args[0] > serverQueue.songs.length)
            return message.channel.send(`I can't jump to a song at position ${args[0]}!`);
        
        for (var i in serverQueue.songs)
            if (i != args[0]-2)
                return serverQueue.connection.dispatcher.end();
            else 
                serverQueue.songs.shift();  
    }
};