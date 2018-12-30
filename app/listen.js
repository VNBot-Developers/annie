module.exports = function({api}){
    return function (error, event){
        api.sendMessage(event.body, event.threadID);
    }
}