module.exports = {
	name: 'say',
    description: 'Says what the user wants',
    args: true,
    usage: '<phrase to say>',
	execute(message, args) {
        let msg = args.join(' ');
        message.channel.send(msg);
        message.delete();
	}
};