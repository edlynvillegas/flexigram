var auth = require('../utils/firebase').auth;
var admin = {};

admin.createUser = (data, cb) => {
    auth.createUserWithEmailAndPassword(data.email, data.password)
        .then(ref => cb(null, true))
        .catch(error => cb(error.message, null));
}

module.exports = admin;