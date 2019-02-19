const modules = require("./modules");
const config = require("../config");
const GLOBAL_LOG = new Object({
    threadBlocked: new Array(),
    userBlocked: new Array(),
    swearList: new Array()
});
module.exports = async function ({ api, models }) {
    const User = models.use('user');
    const Thread = models.use('thread');
    GLOBAL_LOG.threadBlocked = await Thread.findAll({ where: { block: true } }).then(e => e.map(e => e.get({ plain: true })))
    GLOBAL_LOG.userBlocked = await User.findAll({ where: { block: true } }).then(e => e.map(e => e.get({ plain: true })))
    const handleMessage = require("./handle/message")({ api, modules, config, GLOBAL_LOG });
    const handleEvent = require("./handle/event")({ api, modules, config, GLOBAL_LOG });
    const handleMessageReaction = require("./handle/message_reaction")({ api, modules, config, GLOBAL_LOG });
    modules.log(config.prefix || '<none>', '[ prefix ]');
    modules.log(`${api.getCurrentUserID()} - ${config.botName}`, '[ UID ]');
    modules.log('Bắt đầu listen!');
    return function (error, event) {
        if (error) return;
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
