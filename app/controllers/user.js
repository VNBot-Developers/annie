const logger = require("@logger");
module.exports = function ({ models, api }) {
    const User = models.use('user');
    function getUsers(where = {}) {
        return User.findAll({ where })
            .then(e => e.map(e => e.get({ plain: true })))
            .catch(() => [])
    }
    function createUser(id) {
        api.getUserInfo(id, (err, result) => {
            if (err) {
                logger(err, 2);
                return;
            }
            const info = JSON.stringify(result[id]);
            User.findOrCreate({ where: { uid: id }, defaults: { info } })
            .then(([user, created]) => {
                if(created) return logger(id, 'New User');
            })
            .catch(e => logger(e, 2))
        })
    }
    return {
        getUsers,
        createUser
    }
}