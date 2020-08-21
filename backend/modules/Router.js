const url = require('url')
    , database = require('./database/Database')
    , swagger = require('./client/Swagger')
    , frontend = require('./client/Frontend')
    , statusCode = require('./StatusCode')
    , admin = require('./database/Firebase');

const parseBody = (req) => {
    return new Promise((resolve, reject) => {
        if (req.headers['content-type'].indexOf("application/json") === -1) {
            reject(new Error("No Content-Type Header"))
        }
        let body = "";
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (err) {
                reject(new Error("Parse body: " + body));
            }
        });
    })
};

const checkAuthorisation = (req) => {
    return new Promise((resolve, reject) => {
            const token = req.headers['authorization'];
            if (!token || token === "") {
                const error = new Error("Not Authorized! Authorisation Header is missing");
                error.name = "authorization";
                reject(error);
            }
            admin.auth().verifyIdToken(token)
                .then((decodedToken) => {
                    resolve(decodedToken.uid);
                }).catch(function (error) {
                const error_two = new Error("Not Authorized! Token can not be verified");
                error_two.name = "authorization";
                reject(error_two);
            });
        }
    );
};

// get
const getUser = async (req, res) => {
    if (req.method !== "GET") {
        statusCode.badRequest(res, "No GET Method");
        return;
    }
    const uri = url.parse(req.url);
    const params = new url.URLSearchParams(uri.query);
    try {
        const email = params.get('email');
        if (email === null) {
            statusCode.badRequest(res, "Set wrong parameter");
        } else {
            const user = await database.getUserByEmail(email);
            statusCode.ok(res, JSON.stringify(user))
        }
    } catch (err) {
        if (err.code === "auth/user-not-found") {
            statusCode.notFound(res);
        } else if (err.code === "auth/internal-error") {
            statusCode.serverError(res, err.message)
        } else if (err.code) {
            statusCode.badRequest(res, err.message)
        } else {
            statusCode.badRequest(res, err.toString());
            console.log(err);
        }
    }
};

const getCornflake = async (req, res) => {
    if (req.method !== "GET") {
        statusCode.badRequest(res, "No GET Method");
        return;
    }
    const uri = url.parse(req.url);
    const params = new url.URLSearchParams(uri.query);
    try {
        const uid = await checkAuthorisation(req);
        const id = params.get('id');
        if (id === null) {
            statusCode.badRequest(res, "Set wrong parameter");
            return;
        }
        const cornflake = await database.getCornflake(id, uid);
        if(!cornflake) {
            statusCode.notFound(res);
        }
        statusCode.ok(res, JSON.stringify(cornflake))
    } catch (err) {
        if (err.code === "auth/app-not-authorized") {
            statusCode.notAuthorized(res, err.message);
        } else if (err.code === "auth/internal-error") {
            statusCode.serverError(res, err.message);
        } else if (err.code) {
            statusCode.badRequest(res, err.message);
        } else if (err.name === "authorization") {
            statusCode.notAuthorized(res, err.message)
        } else {
            statusCode.badRequest(res, err.toString());
            console.log(err);
        }
    }
};

const getAllCornflakes = async (req, res) => {
    if (req.method !== "GET") {
        statusCode.badRequest(res, "No GET Method");
        return;
    }
    try {
        const uid = await checkAuthorisation(req);
        const cornflakes = await database.getAllCornflakes(uid);
        statusCode.ok(res, JSON.stringify(cornflakes))
    } catch (err) {
        if (err.code === "auth/app-not-authorized") {
            statusCode.notAuthorized(res, err.message);
        } else if (err.code === "auth/internal-error") {
            statusCode.serverError(res, err.message);
        } else if (err.code) {
            statusCode.badRequest(res, err.message);
        } else if (err.name === "authorization") {
            statusCode.notAuthorized(res, err.message)
        } else {
            statusCode.badRequest(res, err.toString());
            console.log(err);
        }
    }
};

// post
const createUser = async (req, res) => {
    if (req.method !== "POST") {
        statusCode.badRequest(res, "No POST Method");
        return;
    }
    try {
        const body = await parseBody(req);
        const userRecord = await database.addUser(body);
        statusCode.created(res, JSON.stringify(userRecord));
    } catch (err) {
        console.log(err.message);
        if (err.code === "auth/internal-error") {
            statusCode.serverError(res, err.message)
        } else if (err.code) {
            statusCode.badRequest(res, err.message);
        } else {
            statusCode.badRequest(res, err.toString());
            console.log(err);
        }
    }
};

const createCornflake = async (req, res) => {
    if (req.method !== "POST") {
        statusCode.badRequest(res, "No POST Method");
        return;
    }
    try {
        const uid = await checkAuthorisation(req);
        const body = await parseBody(req);
        body.id = body.name.replace(/[^\w]/gi, '') + body.producer.replace(/[^\w]/gi, '');
        const cornflake = await database.getCornflake(body.id, uid);
        if (cornflake) {
            statusCode.badRequest(res, "Cornflake with id: " + body.id + " already exists");
            return;
        }
        await database.addCornflake(body, uid);
        const savedCornflake = await database.getCornflake(body.id, uid);
        statusCode.created(res, JSON.stringify(savedCornflake));
    } catch (err) {
        if (err.code === "auth/app-not-authorized") {
            statusCode.notAuthorized(res, err.message);
        } else if (err.code === "auth/internal-error") {
            statusCode.serverError(res, err.message);
        } else if (err.code) {
            statusCode.badRequest(res, err.message);
        } else if (err.name === "authorization") {
            statusCode.notAuthorized(res, err.message)
        } else {
            statusCode.badRequest(res, err.toString());
            console.log(err);
        }
    }
};

//delete
const deleteUser = async (req, res) => {
    if (req.method !== "DELETE") {
        statusCode.badRequest(res, "No DELETE Method");
        return;
    }
    const uri = url.parse(req.url);
    const params = new URLSearchParams(uri.query);

    try {
        const email = params.get('email');
        if (email === null) {
            statusCode.badRequest(res, "Set wrong Parameter");
        } else {
            const user = await database.getUserByEmail(email);
            const uid = await checkAuthorisation(req);
            if (uid !== user.uid) {
                statusCode.notAuthorized(res, "User can not delete other User");
                return;
            }
            await database.deleteUser(user.uid);
            statusCode.ok(res, JSON.stringify(user));
        }
    } catch (err) {
        if (err.code === "auth/user-not-found") {
            statusCode.notFound(res);
        } else if (err.code === "auth/internal-error") {
            statusCode.serverError(res, err.message)
        } else if (err.code) {
            statusCode.badRequest(res, err.message);
        } else if (err.name === "authorization") {
            statusCode.notAuthorized(res, err.message)
        } else {
            statusCode.badRequest(res, err.toString());
            console.log(err);
        }
    }
};

const deleteCornflake = async (req, res) => {
    if (req.method !== "DELETE") {
        statusCode.badRequest(res, "No DELETE Method");
        return;
    }
    const uri = url.parse(req.url);
    const params = new URLSearchParams(uri.query);

    try {
        const uid = await checkAuthorisation(req);
        const id = params.get('id');
        if (id === null) {
            statusCode.badRequest(res, "Set wrong Parameter");
        } else {
            await database.deleteCornflake(id, uid);
            statusCode.ok(res);
        }
    } catch (err) {
        if (err.code === "auth/app-not-authorized") {
            statusCode.notAuthorized(res, err.message);
        } else if (err.code === "auth/internal-error") {
            statusCode.serverError(res, err.message);
        } else if (err.code) {
            statusCode.badRequest(res, err.message);
        } else if (err.name === "authorization") {
            statusCode.notAuthorized(res, err.message)
        } else {
            statusCode.badRequest(res, err.toString());
            console.log(err);
        }
    }
};

//put
const updateUser = async (req, res) => {
    if (req.method !== "PUT") {
        statusCode.badRequest(res, "No PUT Method");
        return;
    }
    try {
        const body = await parseBody(req);
        const uid = await checkAuthorisation(req);
        if (uid !== body.uid) {
            statusCode.notAuthorized(res, "Users are not allowed to update other user");
            return;
        }
        const user = await database.updateUser(body, uid);
        statusCode.ok(res, JSON.stringify(user));
    } catch (err) {
        if (err.code === "auth/internal-error") {
            statusCode.serverError(res, err.message)
        } else if (err.code) {
            statusCode.badRequest(res, err.message);
        } else if (err.name === "authorization") {
            statusCode.notAuthorized(res, err.message)
        } else {
            statusCode.badRequest(res, err.toString());
            console.log(err);
        }
    }
};

const updateCornflake = async (req, res) => {
    if (req.method !== "PUT") {
        statusCode.badRequest(res, "No PUT Method");
        return;
    }
    try {
        const uid = await checkAuthorisation(req);
        const body = await parseBody(req);
        await database.updateCornflake(body, uid);
        const cornflake = await database.getCornflake(body.id, uid);
        statusCode.ok(res, JSON.stringify(cornflake));
    } catch (err) {
        if (err.code === "auth/app-not-authorized") {
            statusCode.notAuthorized(res, err.message);
        } else if (err.code === "auth/internal-error") {
            statusCode.serverError(res, err.message);
        } else if (err.code) {
            statusCode.badRequest(res, err.message);
        } else if (err.name === "authorization") {
            statusCode.notAuthorized(res, err.message)
        } else {
            statusCode.badRequest(res, err.toString());
            console.log(err);
        }
    }
};

module.exports = {
    init: (emitter) => {
        // user
        emitter.on("/api/user", getUser);
        emitter.on("/api/user/add", createUser);
        emitter.on("/api/user/update", updateUser);
        emitter.on("/api/user/delete", deleteUser);

        //cornflakes
        emitter.on("/api/cornflake", getCornflake);
        emitter.on("/api/cornflake/add", createCornflake);
        emitter.on("/api/cornflake/update", updateCornflake);
        emitter.on("/api/cornflake/delete", deleteCornflake);
        emitter.on("/api/cornflake/all", getAllCornflakes);

        //frontend
        emitter.on("/", (req, res) => frontend.handleRequest(res, "index.html"));
        emitter.on("/swagger", (req, res) => swagger.handleRequest(res, "index.html"));
        emitter.on("/timonmillich", (req, res) => frontend.handleRequest(res, "index.html"));
        emitter.on("/landingpage/cornflaketable", (req, res) => frontend.handleRequest(res, "index.html"));
    }
};