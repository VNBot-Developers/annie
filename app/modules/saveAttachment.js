const md5 = require("md5");
const request = require("request-promise").defaults({ encoding: null, timeout: 10 * 1000 });
const fileType = require('file-type');
const fs = require("fs");
module.exports = async function(op) {
    try {
        let buffer = await request(op);
        let { ext, mime } = fileType(buffer);
        if (['audio', 'image', 'video'].indexOf(mime.split('/')[0]) == -1) throw Error('Only support audio, image, video file');
        let path = __dirname + `/temp/${md5(new Date() + Math.random())}.${ext}`;
        fs.writeFileSync(`${path}`, buffer);
        return path;
    }
    catch (e) {
        return e + '';
    }
}
