module.exports = function({ Sequelize, sequelize }) {
    return {
        model: {
            user: require("./models/user")({ sequelize, Sequelize }),
            thread: require("./models/thread")({ sequelize, Sequelize }),
            log: require("./models/log")({ sequelize, Sequelize })
        },
        use: function(modelName) {
            return this.model[`${modelName}`];
        }
    }

}