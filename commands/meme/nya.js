module.exports = {
    name: 'nya',
    description: 'Another classic Pooncity copypasta', 
    args: false,
    execute(message, args) {
        var output = "Attention: for the month of November (~Nyavember~) we are now normalizing meowing. This is not a joke. Anyone refusing to meow will be sent to the ~nya~ dimension. Welcome to the meow zone~~";
        
        message.delete()
            .then(message.channel.send(output));
    }
};