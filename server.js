require('dotenv').config()
const http = require('http')
    , router = require('./backend/modules/Router')
    , database = require('./backend/modules/database/Database')
    , swagger = require('./backend/modules/client/Swagger')
    , frontend = require('./backend/modules/client/Frontend')
    , errorpage = require('./backend/modules/client/ErrorPageHandling')
    , statusCode = require('./backend/modules/StatusCode')
    , url = require('url')
    , EventEmitter = require('events')
    , port = 8080;

const PORT = process.env.PORT || port;

const emitter = new EventEmitter();

database.init();
router.init(emitter);

http.createServer((req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (!emitter.emit(pathname, req, res)) {
        if (pathname.indexOf('/swagger/') !== -1) {
            swagger.handleRequest(res, pathname)
        } else {
            frontend.handleRequest(res, pathname)
        }
    }
}).listen(PORT);

console.log('listening on ' + PORT);