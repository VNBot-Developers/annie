const fs = require('fs');
module.exports = function ({ api, modules, config, __GLOBAL, User, Thread }) {
    let { prefix, ENDPOINT, admins } = config;
    return function ({ event }) {
        let { body: contentMessage, senderID, threadID } = event;
        senderID = parseInt(senderID);
        threadID = parseInt(threadID);

        /* ================ BAN & UNBAN ==================== */

        if (__GLOBAL.userBlocked.includes(senderID)) {
            return;
        }
        // Unban thread
        if (__GLOBAL.threadBlocked.includes(threadID)) {
            if (contentMessage == `${prefix}unban thread` && admins.includes(senderID)) {
                const indexOfThread = __GLOBAL.threadBlocked.indexOf(threadID);
                if (indexOfThread == -1) return api.sendMessage("Nhóm này chưa bị chặn!", threadID);
                Thread.unban(threadID)
                    .then(success => {
                        //Clear from blocked
                        __GLOBAL.threadBlocked.splice(indexOfThread, 1);
                        if (success) return api.sendMessage("Nhóm này đã được bỏ chặn!", threadID);
                        api.sendMessage("Không thể bỏ chặn nhóm này!", threadID);
                    })

                return;
            }
            return;
        }

        // Unban user
        if (contentMessage.indexOf(`${prefix}unban`) == 0 && admins.includes(senderID)) {
            const mentions = Object.keys(event.mentions);
            if (mentions.length == 0) return api.sendMessage('Vui lòng tag những người cần unban', threadID);
            mentions.forEach(mention => {
                const indexOfUser = __GLOBAL.userBlocked.indexOf(parseInt(mention));
                if (indexOfUser == -1) return api.sendMessage({
                    body: `${event.mentions[mention]} chưa bị ban, vui lòng ban trước!`,
                    mentions: [{
                        tag: event.mentions[mention],
                        id: mention
                    }]
                }, threadID);

                //Clear from blocked
                __GLOBAL.userBlocked.splice(indexOfUser, 1);
                User.unban(mention)
                    .then(success => {
                        if (success) return api.sendMessage({
                            body: `Đã unban ${event.mentions[mention]}!`,
                            mentions: [{
                                tag: event.mentions[mention],
                                id: mention
                            }]
                        }, threadID);
                        api.sendMessage("Không thể unban người này!", threadID);
                    })

            })
            return;
        }

        // Ban thread
        if (contentMessage == `${prefix}ban thread` && admins.includes(senderID)) {

            api.sendMessage("Bạn có chắc muốn ban group này ?", threadID, function (error, info) {
                if (error) return modules.log(error, 2);
                __GLOBAL.confirm.push({
                    type: "ban:thread",
                    messageID: info.messageID,
                    target: parseInt(threadID),
                    author: senderID
                })
            });
            return;

        }

        // Ban user
        if (contentMessage.indexOf(`${prefix}ban`) == 0 && admins.includes(senderID)) {

            const mentions = Object.keys(event.mentions);
            if (mentions.length == 0) return api.sendMessage('Vui lòng tag những người cần ban!', threadID);
            mentions.forEach(mention => {
                if (admins.includes(mention)) return api.sendMessage('Bạn không đủ thẩm quyền để ban người này?', threadID);
                api.sendMessage(
                    {
                        body: `Bạn có chắc muốn ban ${event.mentions[mention]}?`,
                        mentions: [{
                            tag: event.mentions[mention],
                            id: mention
                        }]
                    },
                    threadID,
                    function (error, info) {
                        if (error) return modules.log(error, 2);
                        __GLOBAL.confirm.push({
                            type: "ban:user",
                            messageID: info.messageID,
                            target: {
                                tag: event.mentions[mention],
                                id: parseInt(mention)
                            },
                            author: senderID
                        })
                    });
            })
            return;

        }

        /* ==================== SMTHING ================ */
        if(modules.checkCrap(contentMessage)){
            api.sendMessage(`Không đươc nói bậy!`, threadID);
            return;
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
            api.createPoll("Linh có xinh không? ", threadID, {
                "Không": false,
                "Có": true
            }, (err) => {
                if (err) return modules.log(err, 2)
            });
            return;
        }
        if (contentMessage.indexOf(`${prefix}say`) == 0) {

            let text = contentMessage.slice(prefix.length + 3, contentMessage.length).trim();
            modules.sendAttachment(ENDPOINT.GOOGLE_TTS + encodeURI(text), threadID, function (err) {
                if (err) modules.log(err, 2);
            })
            return;
        }
    }
}
