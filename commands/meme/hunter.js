module.exports = {
    name: 'milfhunter',
    description: 'This is an absolute disgusting copypasta!',
    args: false,
    usage: `<optional: specify a place you've been to with em>`,
    async execute(message, args) {
        let msg = `For this paragraph, Imma need a very related picture. So, back in high school, I was smoking the best weed in the world. `
        msg = msg.concat(`It was so good that I had to share it. So I went to Wal Mart and sold it. However, some police chick robbed me. So I chased her and then killed her. `);
        msg = msg.concat(`Apparently, she was the mom of my best friend, Emilie. So I told Emilie that I killed her mom and she was like, "It's k, I have 10 of them." `);
        msg = msg.concat(`And I was like oh. So then I killed the 8 more. From that day forward, Emilie called me the coolest mom killer ever. Btw the pic is of me back in high school.`);
        msg = msg.concat(` https://i.imgur.com/Q83cCns.jpg`);
        setTimeout(() => {  message.delete()
            .then(message.channel.send(msg)); }
            , 500);
    }
};