module.exports = {
    name: 'rate',
    description: 'Rates anything you ask it to rate',
    aliases: ['r'], 
    args: true,
    usage: '<anything>',
    execute(message, args) {
        var ratings = message.client.ratings;
        var rating;
        var query = args.join(' ').toLowerCase();
        if (ratings.has(query)) {
            rating = ratings.get(query);
        } else {
            var score = Math.floor(Math.random() * 11);

            if (score == 10 && Math.floor(Math.random() * 11) == 10) {
                score = 11;
            }

            rating = `${score}/10`;
            ratings.set(query, rating);
        }

        return message.channel.send(`I rate ${query} a ${rating}`);
    }
};