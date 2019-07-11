const music = require("@controllers/music");
module.exports = function ({ api, modules, config, __GLOBAL, User, Thread }) {
    return function ({ event }) {
        const { confirm } = __GLOBAL;
        if (__GLOBAL.threadBlocked.indexOf(event.threadID) != -1) {
            return;
        }
        const { senderID, userID, threadID, reaction, messageID } = event;
        if (confirm.length != 0) {
            const indexOfConfirm = confirm.findIndex(e => e.messageID == messageID && e.author == userID);
            if (indexOfConfirm < 0) return;
            const confirmMessage = confirm[indexOfConfirm];
            switch (confirmMessage.type) {
                case 'ban:thread': {
                    Thread.ban(confirmMessage.target)
                        .then((success) => {
                            if (!success) return api.sendMessage("Không thể ban group này!", threadID);
                            api.sendMessage("Nhóm này đã bị chặn tin nhắn!.", threadID);
                            __GLOBAL.threadBlocked.push(confirmMessage.target);
                            modules.log(confirmMessage.target, 'Ban Thread');
                        })
                    break;
                }
                case 'ban:user': {
                    User
                        .ban(confirmMessage.target.id)
                        .then((success) => {
                            if (!success) return api.sendMessage("Không thể ban người này!", threadID);
                            api.sendMessage({
                                body: `${confirmMessage.target.tag} đã bị ban!`,
                                mentions: [confirmMessage.target]
                            }, threadID);
                            __GLOBAL.userBlocked.push(confirmMessage.target.id);
                            modules.log(confirmMessage.target.id, 'Ban User');
                        })
                    break;
                }
                case 'music': {
                    const { target: { id, name, singer } } = confirmMessage;
                    modules.log(`Phát bài hát '${name}' tại ${threadID}`);
                    api.sendMessage('Đang tải về ⏬, vui lòng chờ trong giây lát.', threadID);
                    music.getInfo(id)
                        .then(function ({ name, singer, thumbnail, link }) {
                            modules.sendAttachment(thumbnail, threadID);
                            modules.sendAttachment(link, threadID, `Bài ${name} của ${singer} phải không?`);
                        })
                        .catch((error) => {
                            modules.log(error, 2);
                        })
                }
            }
            //Xoa confirm
            __GLOBAL.confirm.splice(indexOfConfirm, 1);
            return;
        }
    }
}
