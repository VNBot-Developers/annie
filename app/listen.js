const modules = require("@modules");
const config = require("@config");
module.exports = function ({ api, models , __GLOBAL}) {
    // const User = models.use('user');
    // const Thread = models.use('thread');
    const User = require("@controllers/user")({ models, api });    
    const Thread = require("@controllers/thread")({ models, api });
    (async function init() {
        modules.log('Khởi tạo biến môi trường.');
        __GLOBAL.userBlocked = (await User.getUsers({ block: true })).map(e => e.uid)
        __GLOBAL.threadBlocked = (await Thread.getThreads({ block: true })).map(e => e.threadID)
        modules.log('Khởi tạo biến môi trường xong.');
    })();
    const handleMessage = require("./handle/message")({ api, modules, config, __GLOBAL });
    const handleEvent = require("./handle/event")({ api, modules, config, __GLOBAL });
    const handleMessageReaction = require("./handle/message_reaction")({ api, modules, config, __GLOBAL });
    modules.log(config.prefix || '<none>', '[ prefix ]');
    modules.log(`${api.getCurrentUserID()} - ${config.botName}`, '[ UID ]');
    modules.log('Bắt đầu listen!');
    return function (error, event) {
        if (error) return modules.log(error, 2);
        switch (event.type) {
            case 'message':
                handleMessage({ event, __GLOBAL })
                break;
            case 'event':
                handleEvent({ event, __GLOBAL })
                break;
            case 'message_reaction':
                handleMessageReaction({ event, __GLOBAL })
                break;
            default:
                return;
                break;
        }

        User.createUser(event.senderID);
        Thread.createThread(event.threadID);
    }
}
