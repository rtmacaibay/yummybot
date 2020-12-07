module.exports = {
    name: 'em',
    description: 'For inviting em back!',
    args: false,
    usage: `<optional: specify a place you've been to with em>`,
    async execute(message, args) {
        let place = 'the fashion show mall';
        if (args.length) {
            place = args.join(' ');
        }
        setTimeout(() => {  message.delete()
            .then(message.channel.send(`Hey Em, if youre cool with having that nickname, I had a good time at ${place} last week and my friends and I were planning to go there again on Saturday just to hang out. Wanna come?`)); }
            , 500);
    }
};