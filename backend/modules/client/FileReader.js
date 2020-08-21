const fs = require("fs")
    , statusCode = require('../StatusCode');

const readFile = (res, filename) => {
    fs.readFile(filename, (error, content) => {
        if (error) {
            readFile(res,'./frontend/angular/dist/myapp/index.html');
        } else {
            if (filename.indexOf('.html') !== -1) {
                statusCode.ok(res, content, {'Content-type': 'text/html'});
            } else if (filename.indexOf('.css') !== -1) {
                statusCode.ok(res, content, {'Content-type': 'text/css'});
            } else if (filename.indexOf('.jpg') !== -1) {
                statusCode.ok(res, content, {'Content-type': 'image/jpeg'});
            } else if (filename.indexOf('.png') !== -1) {
                statusCode.ok(res, content, {'Content-type': 'image/png'});
            } else if (filename.indexOf('.json') !== -1) {
                statusCode.ok(res, content, {'Content-type': 'application/json'});
            } else if (filename.indexOf('.js') !== -1) {
                statusCode.ok(res, content, {'Content-type': 'application/javascript'});
            } else if (filename.indexOf('.txt') !== -1 || filename.indexOf('yaml') !== -1) {
                statusCode.ok(res, content, {'Content-type': 'text/plain'});
            } else if (filename.indexOf('.ico') !== -1) {
                statusCode.ok(res, content, {'Content-type': 'image/x-icon'});
            } else if (filename.indexOf('.ttf') !== -1) {
                statusCode.ok(res, content, {'Content-type': 'application/octet-stream'});
            } else if (filename.indexOf('.woff') !== -1) {
                statusCode.ok(res, content, {'Content-type': 'application/font-woff'});
            } else if (filename.indexOf('.svg') !== -1) {
                statusCode.ok(res, content, {'Content-type': 'image/svg+xml'});
            } else if (filename.indexOf('.woff2') !== -1) {
                statusCode.ok(res, content, {'Content-type': 'application/font-woff2'});
            } else if (filename.indexOf('.eot') !== -1) {
                statusCode.ok(res, content, {'Content-type': 'application/vnd.ms-fontobject'});
            } else if (filename.indexOf('.gif') !== -1) {
                statusCode.ok(res, content, {'Content-type': 'image/gif'});
            } else {
                statusCode.notFound(res);
            }
        }
    })
};

module.exports = {
    sendFile: readFile
};