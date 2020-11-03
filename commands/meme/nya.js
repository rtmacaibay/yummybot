module.exports = {
    name: 'nya',
    description: 'Another classic Pooncity copypasta', 
    args: false,
    execute(message, args) {
        var output = "Attention: for the month of November (~Nyavember~) we are now NORMALIZING meowing. This is NOT a joke. Anyone refusing to meow will be sent to the ~nya~ dimension. Welcome to the meow zone~~ :3";
        
        message.delete()
            .then(message.channel.send(output));
    }
};