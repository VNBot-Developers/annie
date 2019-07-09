const path = require("path")
module.exports = {
    development: false,
    email: process.env.EMAIL || '',
    password: process.env.PASSWORD || '',
    prefix: process.env.PREFIX || '',
    botName: process.env.BOT_NAME || 'Annie',
    developer: {
        uid: 100009859624773,
        email: 'clonebmn2itt@gmail.com',
        github: 'Notekunn'
    },
    database: {
        postgres: {
            database: process.env.DB_NAME,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            host: process.env.DB_HOST,
        },
        sqlite: {
            storage: path.resolve(__dirname, "./data.sqlite"),
        },
    },
    appStateFile: path.resolve(__dirname, '../appstate.json'),
    swear: {
        limit: 2
    },
    admins: (process.env.ADMINS || '').split('_'),
    ENDPOINT: require('./api')
}