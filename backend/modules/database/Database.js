const User = require('./User')
    , Cornflake = require('./Cornflake');

module.exports = {
    init: async () => {
        console.log("Init script")
    },
    addUser: (body) => {
        const user = new User(body);
        return user.save();
    },
    updateUser: (body ,uid) => {
        const user = new User(body);
        return user.update(uid);
    },
    getUserByEmail: (email) => {
        return User.findByEmail(email);
    },
    deleteUser: (id) => {
        return User.delete(id);
    },
    addCornflake: (body, uid) => {
        const cornflake = new Cornflake(body);
        return cornflake.save(uid);
    },
    updateCornflake: (body, uid) => {
        const cornflake = new Cornflake(body);
        return cornflake.update(uid);
    },
    getCornflake: (id, uid) => {
        return Cornflake.findCornflakeByUser(id, uid);
    },
    deleteCornflake: (id, uid) => {
        return Cornflake.delete(id, uid);
    },
    getAllCornflakes: (uid) => {
        return Cornflake.getAllCornflakes(uid);
    }
};