const defaultHeader = {'Content-type': 'application/json'};

const errorHeader = {'Content-type': 'application/json'};

const finishResponse = (res, data, header, statusCode) => {
    try {
        if(typeof data === "string" &&
            ( statusCode === 400 || statusCode === 401 || statusCode === 403 || statusCode === 404 || statusCode === 500)) {
            res.statusCode = statusCode;
            res.statusMessage = data;
        } else if (header) {
            res.writeHead(statusCode, header);
        } else {
            res.writeHead(statusCode, defaultHeader);
        }
        if (data) {
            res.write(data, "utf8");
        }
        res.end();
    } catch (error) {
        console.log("INTERNAL ERROR STATUS CODE " + error);
    }
};

module.exports = {
    ok: (res, data, header) => finishResponse(res, data, header, 200),
    created: (res, data, header) => finishResponse(res, data, header, 201),
    badRequest: (res, data) => finishResponse(res, data, errorHeader, 400),
    notAuthorized: (res, data) => finishResponse(res, data, errorHeader, 401),
    forbidden: (res, data) => finishResponse(res, data, errorHeader, 403),
    notFound: (res, data, header) => finishResponse(res, data, header, 404),
    serverError: (res, data) => finishResponse(res, data, errorHeader, 500)
};