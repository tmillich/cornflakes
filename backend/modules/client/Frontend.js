const fileReader = require('./FileReader');

const appName = 'myapp';

const clientPath = './frontend/angular/dist/' + appName + '/';

module.exports = {
    handleRequest: (res, pathname) => {
        fileReader.sendFile(res, clientPath + pathname);
    }
};