module.exports = {
    name: 'meow',
    description: 'For all your degenerate needs', 
    args: false,
    execute(message, args) {
        var output = `${message.author} is meowing~ Please meow~ or nya~~ back! (^ ◕ᴥ◕ ^)`;
        
        setTimeout(() => {  message.delete().then(message.channel.send(output)); }, 500);
    }
};