module.exports = {
    pull_bugs() {
        fetch('http://acnhapi.com:1304/v1/bugs')
        .then(response => response.json())
        .then(data => console.log(data));
    }
};