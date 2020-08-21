const fileReader = require('./FileReader');

const clientPath = './frontend/errorpage';

module.exports = {
    handleRequest: (res, pathname) => {
        fileReader.sendFile(res, clientPath + pathname.replace("/error", ""));
    }
};


