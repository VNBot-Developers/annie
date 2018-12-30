module.exports = function({ api, config: { botName } }) {
    return function({ event }) {
        api.sendMessage(`${botName} has already!`, event.threadID);
    }
}
