module.exports = function ({ api, modules, config: {botName}, GLOBAL_LOG }) {
    return function ({ event }) {
        switch (event.logMessageType) {
            case "log:subscribe":
                let addedUserInfo = event.logMessageData.addedParticipants[0];

                if (addedUserInfo.userFbId == api.getCurrentUserID()) {

                    api.sendMessage("Bot " + botName + " connected!\nStart listen!", event.threadID);
                    api.changeNickname(botName, event.threadID, api.getCurrentUserID(), (err) => {
                        if (err) return modules.log(err.error);
                    });
                }

                break;
            case "log:unsubscribe":

                let leftUserID = event.logMessageData.leftParticipantFbId;

                if (config.admins.includes(leftUserID)) {



                    api.addUserToGroup(leftUserID, event.threadID, (error) => {

                        error && modules.log(error, 2)
                    });

                    api.sendMessage({
                        body: " Đừng làm thế ! Anh ấy là người tốt",
                    }, event.threadID);
                }
                break;
            case "log:thread-icon":
                break;
            case "log:user-nickname":
                break;
            case "log:thread-color":
                break;
        }
    }
}
