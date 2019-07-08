const logger = require("@logger");
module.exports = function ({ models, api }) {
    const Thread = models.use('thread');
    function getThreads(where = {}) {
        return Thread.findAll({ where })
            .then(e => e.map(e => e.get({ plain: true })))
            .catch(() => [])
    }
    function createThread(threadID) {
        Thread.findOrCreate({ where: { threadID }, defaults: {} })
            .then(([user, created]) => {
                if (created) return logger(threadID, 'New Thread');
            })
            .catch(e => logger(e, 2))
    }
    return {
        getThreads,
        createThread
    }
}