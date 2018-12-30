module.exports = function({ api, config: { botName } }) {
    return function({ event }) {
        api.sendMessage(`${process.env.BOT_NAME} has already!`, event.threadID);
    }
}
