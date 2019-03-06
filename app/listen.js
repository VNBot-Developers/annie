const modules = require("./modules");
const config = require("../config");
const __GLOBAL = new Object({
    threadBlocked : new Array(),
    userBlocked: new Array(),
    swearList: new Array()
});
module.exports = function({ api, models }) {
    let UserModel = models.use('user');
    let ThreadModel = models.use('thread');
    ThreadModel.findAll({ where: { block: true }})
    .then(e => {
        __GLOBAL.threadBlocked = e.map(e => e.get({
            plain: true
        }))
    });

    UserModel.findAll({ where: { block: true }})
    .then(e => {
        __GLOBAL.userBlocked = e.map(e => e.get({
            plain: true
        }))
    })
    const handleMessage = require("./handle/message")({ api, modules, config, __GLOBAL });
    const handleEvent = require("./handle/event")({ api, modules, config, __GLOBAL });
    const handleMessageReaction = require("./handle/message_reaction")({ api, modules, config, __GLOBAL });
    modules.log(config.prefix || '<none>', '[ prefix ]');
    modules.log(`${api.getCurrentUserID()} - ${config.botName}`, '[ UID ]');
    modules.log('Bắt đầu listen!');
    return function(error, event) {
        if(error) return modules.log(error , 2);
        switch (event.type) {
            case 'message':
                handleMessage({ event })
                break;
            case 'event':
                handleEvent({ event })
                break;
            case 'message_reaction':
                handleMessageReaction({ event })
                break;
        }
    }
}
