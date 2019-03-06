module.exports = function ({ api, modules, config, __GLOBAL }) {
    let { prefix } = config;
    return function ({ event }) {
        let { body: contentMessage } = event;
        //Resume
        if (__GLOBAL.threadBlocked.indexOf(event.threadID) != -1) {
            if (contentMessage == `${prefix}unblock` && config.admins.includes(event.senderID)) {
                let indexOfThread = __GLOBAL.threadBlocked.indexOf(event.threadID);
                //Clear from blocked
                __GLOBAL.threadBlocked.splice(indexOfThread, 1);
                return;
            }
            else return;
        }

        if (contentMessage == `${prefix}ping`) {
            return api.sendMessage(`${config.botName} has already!`, event.threadID);
        }


        if (contentMessage == `${prefix}help`) {
            event.isGroup && api.sendMessage(`Vui lòng kiểm tra tin nhắn riêng`, threadID);
            api.sendMessage(`<Đang cập nhật....>`, senderID);
            return;
        }
    }
}
