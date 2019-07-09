const logger = require("@logger");
module.exports = function ({ models, api }) {
    const User = models.use('user');
    function getUsers(where = {}) {
        return User.findAll({ where })
            .then(e => e.map(e => e.get({ plain: true })))
            .catch((error) => {
                logger(error, 2);
                return [];
            })
    }
    function createUser(id) {
        api.getUserInfo(id, (err, result) => {
            if (err) return logger(err, 2);
            const info = JSON.stringify(result[id]);
            User.findOrCreate({ where: { uid: id }, defaults: { info } })
                .then(([user, created]) => {
                    if (created) return logger(id, 'New User');
                })
                .catch((error) => {
                    logger(error, 2);
                })
        })
    }
    function ban() {
        return
    }
    return {
        getUsers,
        createUser
    }
}