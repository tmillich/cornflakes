const admin = require('./Firebase');

const validate = (data) => {
    if (!data) {
        throw new Error("No Data");
    }
    if (data.uid && typeof data.uid !== 'string') {
        throw new Error("Wrong uid");
    }
    if (!data.email || typeof data.email !== 'string') {
        throw new Error("Wrong username");
    }
    if (data.emailVerified && typeof data.emailVerified !== 'boolean') {
        throw new Error("Wrong emailVerified");
    }
    if (data.phoneNumber && typeof data.phoneNumber !== 'string' && (new RegExp('^\\+[1-9]\\d{1,14}$')).test(data.phoneNumber)) {
        throw new Error("Wrong Phone Number");
    }
    if (data.password && typeof data.password !== 'string' && (new RegExp('.{6,100}')).test(data.password)) {
        throw new Error("Wrong Password");
    }
    if (!data.displayName || typeof data.displayName !== 'string') {
        throw new Error("Wrong Display Name");
    }
    if (data.photoURL && typeof data.photoURL !== 'string') {
        throw new Error("Wrong Photo URL");
    }
    if (data.disabled && typeof data.disabled !== 'boolean') {
        throw new Error("Wrong Disabled");
    }
    return data;
};

function User(data) {
    this.data = validate(data);

    this.save = () => {
        if (this.data.phoneNumber) {
            return admin.auth().createUser({
                email: this.data.email,
                phoneNumber: this.data.phoneNumber,
                password: this.data.password,
                displayName: this.data.displayName
            });
        }
        return admin.auth().createUser({
            email: this.data.email,
            password: this.data.password,
            displayName: this.data.displayName
        });
    };


    this.update = (uid) => {
        if (this.data.phoneNumber) {
            return admin.auth().updateUser(uid, {
                email: this.data.email,
                phoneNumber: this.data.phoneNumber,
                displayName: this.data.displayName
            })
        }
        return admin.auth().updateUser(uid, {
            email: this.data.email,
            displayName: this.data.displayName
        })
    };
}


User.findByEmail = (email) => {
    return admin.auth().getUserByEmail(email);
};

User.delete = (uid) => {
    return admin.auth().deleteUser(uid);
};

module.exports = User;