module.exports = {
    name: '???',
    description: 'Another classic Pooncity copypasta', 
    args: false,
    execute(message, args) {
        var output = "Bitch what? Speak. Spit it the fuck out. What do you wanna say? ";
        output = output.concat("I'm listening. We're all waiting, and you're doing nothing. ");
        output = output.concat("This is nonsense, you can't even use words anymore. ");
        output = output.concat("Go the hell outside for once damn. Goddamn, get a job or something.");
        
        message.delete()
            .then(message.channel.send(output));
    }
};