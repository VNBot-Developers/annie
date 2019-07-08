const fs = require('fs');
module.exports = function ({ api, modules, config, __GLOBAL }) {
    let { prefix } = config;
    return function ({ event }) {
        let { body: contentMessage, senderID, threadID } = event;
        //Resume

        if (__GLOBAL.userBlocked.includes(parseInt(senderID))) {
            return;
        }
        if (__GLOBAL.threadBlocked.includes(parseInt(threadID))) {
            if (contentMessage == `${prefix}unblock` && config.admins.includes(senderID)) {
                let indexOfThread = __GLOBAL.threadBlocked.indexOf(threadID);
                //Clear from blocked
                __GLOBAL.threadBlocked.splice(indexOfThread, 1);
                return;
            }
            else return;
        }

        if (contentMessage == `${prefix}ping`) {
            api.sendMessage(`${config.botName} has already!`, threadID);
            return;
        }


        if (contentMessage == `${prefix}help`) {
            event.isGroup && api.sendMessage(`Vui lòng kiểm tra tin nhắn riêng`, threadID);
            api.sendMessage(`<Đang cập nhật....>`, senderID);
            return;
        }
        if (contentMessage == `${prefix}linh`) {
            api.getUserInfo(event.senderID, function (err, ret) {
                const info = ret[event.senderID]
                api.sendMessage(`Chào cậu, ${info.name}`, threadID)
            })
            return;
        }
        if (contentMessage.indexOf(`${prefix}say`) == 0) {

            let text = contentMessage.slice(prefix.length + 3, contentMessage.length).trim();
            modules.saveAttachment('http://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=' + encodeURI(text))
                .then(path => {
                    api.sendMessage({ body: '', attachment: fs.createReadStream(path) }, threadID, () => {
                        fs.unlinkSync(path)
                    });
                }).catch(e => {
                    throw e;
                })
            return;
        }
    }
}
