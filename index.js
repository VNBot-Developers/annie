require("dotenv").config();
const login = require("@app/login");
const { Sequelize, sequelize, Op } = require("@database");
const logger = require("@logger");
const { email, password, appStateFile } = require("@config");
const fs = require("fs");
const __GLOBAL = new Object({
    threadBlocked: new Array(),
    userBlocked: new Array(),
    swearList: new Array()
});
facebook = ({ Op, models }) => login({ email, password, appState: require(appStateFile) }, function (error, api) {
    if (error) return logger(error, 2);
    fs.writeFileSync(appStateFile, JSON.stringify(api.getAppState(), null, '\t'));
    logger('Đăng nhập thành công!', 0);
    //Listening
    api.listen(require("@app/listen")({ api, Op, models, __GLOBAL }))
})
sequelize.authenticate()
    .then(() => logger('Connect database thành công!', 0))
    .then(() => {
        let models = require("@database/model")({ Sequelize, sequelize });
        facebook({ Op, models});
    })
    .catch((e) => {
        logger('Connect database thất bại!', 2);
        // logger(`${e}`, 2);
        console.error(e);
    })