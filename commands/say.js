module.exports = {
	name: 'say',
    description: 'Says what the user wants',
    args: true,
    usage: '<phrase to say>',
	execute(message, args) {
        let msg = args.join(' ');
        setTimeout(() => {  message.delete().then(message.channel.send(msg)); }, 500);
	}
};