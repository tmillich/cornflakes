const admin = require('./Firebase')
const between = (num, min, max) => {
    return num >= min && num <= max;
};

const regex = {
    name: new RegExp('[A-Z][a-zA-Z- ]*'),
    producer: new RegExp('[A-Z][a-zA-Z- ]*'),
    age_group: (age_group) => between(age_group, 0, 2),
    type: (type) => between(type, 0, 3)
};

var number = 0;

const validate = (data) => {
    if (!data) {
        throw new Error("No Data");
    }
    if (!data.id || !typeof data.id === 'string') {
        throw new Error("Wrong id");
    }
    if (!data.name || !typeof data.name === 'string' || !regex.name.test(data.name)) {
        throw new Error("Wrong Name");
    }
    if (!data.producer || !typeof data.producer === 'string' || !regex.producer.test(data.producer)) {
        throw new Error("Wrong Producer");
    }
    if (!typeof data.age_group === 'number' || !regex.age_group(data.age_group)) {
        throw new Error("Wrong Age Group");
    }
    if (!typeof data.type === 'number' || !regex.type(data.type)) {
        throw new Error("Wrong Type");
    }
    if (data.about && !typeof data.about === 'string') {
        throw new Error("Wrong about");
    }
    return data;
};

function Cornflake(data) {
    this.data = validate(data);

    this.save = (uid) => {
        return admin.database().ref("server/cornflake_management/" + uid + "/cornflakes/" + this.data.id).set(this.data);
    };

    this.update = (uid) => {
        var id = this.data.id;
        return admin.database().ref("server/cornflake_management/" + uid + "/cornflakes/" + id).update(this.data);
    }
}

Cornflake.findCornflakeByUser = (id, uid) => {
    var ref = admin.database().ref("server/cornflake_management/" + uid + "/cornflakes/" + id);
    return new Promise(function (resolve, reject) {
        ref.once("value", function (snapshot) {
            resolve(snapshot.val());
        }, (err) => {
            reject(err);
        });
    });
};

Cornflake.delete = (id, uid) => {
    return admin.database().ref("server/cornflake_management/" + uid + "/cornflakes/" + id).remove();
};

Cornflake.getAllCornflakes = (uid) => {
    var ref = admin.database().ref("server/cornflake_management/" + uid + "/cornflakes");
    return new Promise(function (resolve, reject) {
        ref.once("value", function (snapshot) {
            var array = [];
            snapshot.forEach((element) => {
                array.push(element);
            });
            resolve(array);
        }, (err) => {
            reject(err);
        });
    });
};

module.exports = Cornflake;