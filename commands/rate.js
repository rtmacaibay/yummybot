module.exports = {
    name: 'rate',
    description: 'Rates anything you ask it to rate',
    aliases: ['r'], 
    args: true,
    usage: '<anything>',
    execute(message, args) {
        var ratings = message.client.ratings;
        var rating;
        var query = args.join(' ');
        if (ratings.has(query)) {
            rating = ratings.get(query);
        } else {
            rating = `${Math.floor(Math.random() * 11)}/10`
            ratings.set(query, rating);
        }

        return message.channel.send(`I rate ${query} a ${rating}`);
    }
};