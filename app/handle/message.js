module.exports = function({ api, modules, config, GLOBAL }) {
    const messageHandle = require("./message/")({ api, modules, config, GLOBAL });
    let { prefix } = config;
    console.log(config, GLOBAL)
    return function({ event }) {
        let { body: contentMessage } = event;
        //Resume
        if (GLOBAL.threadBlocked.indexOf(event.threadID) != -1) {
            if (contentMessage == `${prefix}unblock` && config.admins.includes(event.senderID)) {
                let indexOfThread = GLOBAL.threadBlocked.indexOf(event.threadID);
                //Clear from blocked
                GLOBAL.threadBlocked.splice(indexOfThread, 1);
               return;
            }
            else return;
        }

        if (contentMessage == `${prefix}ping`) return messageHandle.ping({ event })
    }
}
