const fetch = require('node-fetch');

module.exports = {
    async pull_bugs() {
        await fetch(`http://acnhapi.com:1304/v1/bugs`)
        .then(response => response.json())
        .then(json => console.log(json));
    }
};