module.exports = function({ api, modules, config: { prefix } }) {
    const messageHandle = require("./message/")({ api, modules, config: { prefix } });
    return function({ event }) {
        let contentMessage = event.body;
        if (contentMessage == `${prefix}ping`) return messageHandle.ping({ event })
    }
}
