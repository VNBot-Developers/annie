require("dotenv").config();
const login = require("./app/login");
const { Sequelize, sequelize, Op } = require("./database/index");
const logger = require("./app/modules/log");
const { email, password, appStateFile } = require("./config/");
const fs = require("fs");
facebook = ({ models, Op, Sequelize }) => login({ email, password, appState: require(appStateFile) }, function (error, api) {
    if (error) return logger('Đăng nhập thất bại!', 2);
    fs.writeFileSync(appStateFile, JSON.stringify(api.getAppState()));
    logger('Đăng nhập thành công!', 0)
    //Listening
    api.listen(require("./app/listen")({ api, models, Op, Sequelize }))
})
sequelize.authenticate()
    .then(() => logger('Connect database thành công!', 0))
    .then(function () {
        let models = require("./database/model")({ Sequelize, sequelize });
        facebook({ models, Op, Sequelize })
    })
    .catch((e) => {
        logger('Connect database thất bại!', 2);
        logger(`${e}`, 2);
    })