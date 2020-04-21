module.exports = {
    name: 'remove',
    description: 'Removes a specified song in the queue', 
    aliases: ['rv'],
    args: true,
    usage: '<song position in queue>',
    execute(message, args) {
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!message.member.voice.channel) 
            return message.reply('you have to be in a voice channel to stop the music!');
        if (!serverQueue) 
            return message.channel.send('There is no song that I could skip!');
        if (args[0] < 2 || args[0] > serverQueue.songs.length)
            return message.channel.send(`I can't remove a song at position ${args[0]}!`);
        
        var songs = [];
        var song_index = 0;
        var song_removed;
        for (var i in serverQueue.songs)
            const new_song = {
                title: serverQueue.songs[i].title,
                url: serverQueue.songs[i].url
            };
            if (i != args[0]-1)
                songs[song_index++] += new_song;
            else 
                song_removed = serverQueue.songs[i];

        serverQueue.songs = songs;        
    }
};