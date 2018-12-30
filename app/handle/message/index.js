module.exports = function({ api, config, modules }) {
    return {
        ping: require("./ping")({api, config})
    }
}
