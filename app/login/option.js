module.exports = function({ api }) {
    const options = {
        forceLogin: true,
        listenEvents: true,
        logLevel: "silent",
        updatePresence: false,
        selfListen: false
    }
    api.setOptions(options);
}
