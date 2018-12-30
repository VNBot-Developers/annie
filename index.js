const login = require("./app/login");
const { email, password, appStateFile } = require("./config/");
const fs = require("fs");
login({ email, password, appState: require(appStateFile) }, function(error, api) {
    if (error) return console.error(error);
    fs.writeFileSync(appStateFile, JSON.stringify(api.getAppState()));

    //Listening
    api.listen(require("./app/listen")({ api }))
})
