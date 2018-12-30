const modules = require("./modules");
const config = require("../config");
module.exports = function({ api }) {
    const handleMessage = require("./handle/message")({ api, modules, config });
    const handleEvent = require("./handle/event")({ api, modules, config });
    const handleMessageReaction = require("./handle/message_reaction")({ api, modules, config });
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
