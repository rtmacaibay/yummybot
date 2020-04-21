const ytdl = require('ytdl-core');

module.exports = {
    name: 'play',
    description: 'Plays a song in the channel.', 
    aliases: ['p'],
    args: true,
    usage: '<song url>',
    async execute(message, args) {
        try {
            const queue = message.client.queue;
            const serverQueue = queue.get(message.guild.id);

            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                return message.channel.send(`${message.author}, you need to be in a voice channel to play music!`);
            }

            const permissions = voiceChannel.permissionsFor(message.client.user);
            if(!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
                return message.channel.send("I need the permissions to join and speak in your voice channel!");
            }

            const songInfo = await ytdl.getInfo(args[0]);
            const song = {
                title: songInfo.title,
                url: songInfo.video_url
            };

            if (!serverQueue) {
                const queueConstruct = {
                    textChannel: message.channel,
                    voiceChannel: voiceChannel,
                    connection: null,
                    songs: [],
                    volume: 2,
                    playing: true
                };

                queue.set(message.guild.id, queueConstruct);

                queueConstruct.songs.push(song);

                try {
                    var connection = await voiceChannel.join();
                    queueConstruct.connection = connection;
                    this.play(message, queueConstruct.songs[0]);
                } catch (err) {
                    console.log(err);
                    queue.delete(message.guild.id);
                    return message.channel.send(err);
                }
            } else {
                serverQueue.songs.push(song);
                return message.channel.send(`${song.title} has been added to the queue!`); 
            }
        } catch (error) {
            console.log(error);
            message.channel.send('Invalid link');
        }
    },

    play(message, song) {
        const guild = message.guild;
        const queue = message.client.queue;
        const serverQueue = queue.get(guild.id);

        if (!song) {
            serverQueue.voiceChannel.leave();
            queue.delete(guild.id);
            return;
        }

        const dispatcher = serverQueue.connection
            .play(ytdl(song.url))
            .on('finish', () => {
                serverQueue.songs.shift();
                this.play(message, serverQueue.songs[0]);
            })
            .on('error', error => console.error(error));
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 10);
        serverQueue.textChannel.send(`Started playing: **${song.title}**`);
    }
};