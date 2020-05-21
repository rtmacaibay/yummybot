const pull = require('../../acnh/pull_acnh');

module.exports = {
    name: 'acbugs',
    description: 'Search up for bugs in Animal Crossing New Horizons',
    aliases: ['ab'], 
    args: false,
    execute(message, args) {
        pull.pull_bugs();
    }
};