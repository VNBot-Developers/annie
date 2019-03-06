require("dotenv").config();
const login = require("./app/login");
const { Sequelize, sequelize, Op } = require("./database/index");
const logger = require("./app/modules/log");
const { email, password, appStateFile } = require("./config/");
const fs = require("fs");
facebook = ({ Op, models }) => login({ email, password, appState: require(appStateFile) }, function (error, api) {
    if (error) return logger(error, 2);
    fs.writeFileSync(appStateFile, JSON.stringify(api.getAppState()));
    logger('Đăng nhập thành công!', 0);
    //Listening
    api.listen(require("./app/listen")({ api, Op, models }))
})
sequelize.authenticate()
    .then(() => logger('Connect database thành công!', 0))
    .then(() => {
        let models = require("./database/model")({ Sequelize, sequelize });
        facebook({ Op, models });
    })
    .catch((e) => {
        logger('Connect database thất bại!', 2);
        logger(`${e}`, 2);
    })