module.exports = function({ api, modules, config , __GLOBAL}) {
    return function({event}){
        if (__GLOBAL.threadBlocked.indexOf(event.threadID) != -1) {
            return;
        }
    }
}
