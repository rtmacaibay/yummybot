module.exports = {
    name: 'fuck',
    description: 'Another classic Pooncity copypasta', 
    args: false,
    execute(message, args) {
        setTimeout(() => {  message.delete().then(`That's it. ${message.author} is fucking.`); }, 500);
    }
};