module.exports = {
    name: 'nya',
    description: 'For all your degenerate needs', 
    args: false,
    execute(message, args) {
        var output = `Nya~! ${message.author} just nya'd! Please meow~ or nya~~ back! (^ ◕ᴥ◕ ^)`;
        
        setTimeout(() => {  message.delete().then(message.channel.send(output)); }, 500);
    }
};