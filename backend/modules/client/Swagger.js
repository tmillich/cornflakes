const fileReader = require('./FileReader');

const clientPath = './frontend/swagger/';

module.exports = {
    handleRequest: (res, pathname) => {
        var file = pathname.split('/');
        fileReader.sendFile(res, clientPath + file[file.length - 1]);
    }
};
