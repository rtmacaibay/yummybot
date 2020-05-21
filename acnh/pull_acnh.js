const fetch = require('fetch');

module.exports = {
    pull_bugs() {
        await fetch('http://acnhapi.com:1304/v1/bugs')
        .then(response => response.json())
        .then(data => console.log(data));
    }
};