const modules = require("./modules");
const config = require("../config");
const GLOBAL = new Object({
    threadBlocked : new Array(),
    userBlocked: new Array(),
    swearList: new Array()
});
module.exports = function({ api }) {
    const handleMessage = require("./handle/message")({ api, modules, config, GLOBAL });
    const handleEvent = require("./handle/event")({ api, modules, config, GLOBAL });
    const handleMessageReaction = require("./handle/message_reaction")({ api, modules, config, GLOBAL });
    return function(error, event) {
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
