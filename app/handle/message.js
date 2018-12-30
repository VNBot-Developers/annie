module.exports = function({ api, modules, config }) {
    const messageHandle = require("./message/")({ api, modules, config });
    let { prefix } = config;
    return function({ event }) {
        let contentMessage = event.body;
        if (contentMessage == `${prefix}ping`) return messageHandle.ping({ event })
    }
}
