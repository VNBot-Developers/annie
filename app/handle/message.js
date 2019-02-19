const fs = require("fs");
module.exports = function ({ api, modules, config, GLOBAL_LOG }) {
    let { prefix } = config;
    return function ({ event }) {
        let { body: contentMessage } = event;
        //Resume
        if (GLOBAL_LOG.threadBlocked.indexOf(event.threadID) != -1) {
            if (contentMessage == `${prefix}unblock` && config.admins.includes(event.senderID)) {
                let indexOfThread = GLOBAL_LOG.threadBlocked.indexOf(event.threadID);
                //Clear from blocked
                GLOBAL_LOG.threadBlocked.splice(indexOfThread, 1);
                return;
            }
            else return;
        }

        if (contentMessage == `${prefix}ping`) {
            api.sendMessage(`${config.botName} has already to work!`, event.threadID);
            return;
        }

        if (contentMessage == `${prefix}help`) {
            event.isGroup && api.sendMessage(`Vui lòng kiểm tra tin nhắn riêng`, threadID);
            api.sendMessage(`<Đang cập nhật....>`, senderID);
            return;
        }

        // if (contentMessage == `${prefix}test`) {
        //     modules.saveAttachment("https://i.imgur.com/dWO1208.jpg")
        //         .then((path) => api.sendMessage({
        //             body: "Ảnh đây ạ",
        //             attachment: fs.createReadStream(path)
        //         }, event.threadID))
        //         .catch(e => api.sendMessage(`Có lỗi xảy ra\n${e}`, event.threadID))
        // }
    }
}
