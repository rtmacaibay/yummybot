module.exports = {
    name: 'meow',
    description: 'For all your degenerate needs', 
    args: false,
    execute(message, args) {
        var output = `${message.author} is ⓜⓔⓞⓦⓘⓝⓖ. Please ⓜⓔⓞⓦ or ⓝⓨⓐ back!`;
        
        message.delete()
            .then(message.channel.send(output));
    }
};