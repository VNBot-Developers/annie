module.exports = {
    email: process.env.EMAIL || '',
    password: process.env.PASSWORD || '',
    preset: process.env.PREFIX || '',
    developer: {
        uid: 100009859624773,
        email: 'clonebmn2itt@gmail.com',
        github: 'Notekunn'
    },
    appStateFile: './appstate.json',
    swear: {
        limit: 2
    },
    admins: (process.env.ADMINS || '').split('_')
}
