const login = require("facebook-chat-api");
module.exports = (op) => new Promise(function(resolve, reject) {
    console.log(op)
    login(op, function(err, api) {
        console.log(op, err, api)
        if (err) return reject(require("./error")({ error: err }));
        
        require("./option")({api})
        
        resolve(api)

    })
})
