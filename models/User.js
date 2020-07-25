// var firebase = require('../utils/firebase').firebase;
var auth = require('../utils/firebase').auth
var adminAuth = require('../utils/firebase').adminAuth
var db = require('../utils/firebase').firestore
var UTILS = require('../utils/utils')
var CONFIG = require('../config')
var jwt = require('jsonwebtoken')

let userRef = db.collection('users');
var user = {};

user.userSignUp = (data, cb) => {
    auth.createUserWithEmailAndPassword(data.email, data.password)
        .then(ref => cb(null, ref.user))
        .catch(error => cb(error.message, null));
}

user.userSignIn = (data, cb) => {
    auth.signInWithEmailAndPassword(data.email, data.password)
        .then(ref => cb(null, ref.user))
        .catch(error => cb(error, null));
}

user.authenticateUser = (req, res, next) => {
    console.log('** Authenticating user', req.headers.authorization)
    if (req.headers.authorization) {
        const token = UTILS.getKeyUsingBearer(req.headers.authorization)
        if (token) {
            user.verifyAuthToken(token, (error, decoded) => {
                if (error) {
                    console.log('error.message', error.message)
                    res.status(401).send({
                        error: error,
                        message: error.message,
                        auth: false
                    });
                    return;
                }
                console.log('** Token verified!', decoded);
                req.decoded = decoded;
                next();
            })
        } else {
            res.status(401).send({  
                error: { message: 'Authorization Header missing.' },
                message: 'Unauthorized request.',
                auth : false
            });
        }
    } else {
        res.status(401).send({  
            error: { message: 'Authorization Header missing.' },
            message: 'Unauthorized request.',
            auth : false
        });
    }
}

user.generateAuthToken = (uid, cb) => {
    if (!uid) cb({message: 'Invalid UID'}, null)
    let token = jwt.sign({uid}, CONFIG.secret, { expiresIn: '1m' })
    cb(null, token);
}

user.verifyAuthToken = (token, cb) => {
    jwt.verify(token, CONFIG.secret, (error, decoded) => {
        if (error) {
            cb(error, null)
        } else {
            cb(null, decoded)
        }
    })
}

user.refreshAuthToken = (data, cb) => {
    // UID, ref_token
    const decoded = jwt.decode(data.token)
    if (data.refresh_token) {
        user.generateAuthToken(decoded.uid, (error, token) => {
            if (error) {
                console.log('error generating new token', error.message)
                cb(error, null)
            } else {
                console.log('new token', token)
                cb(null, token)
            }
        })
    } else {
        console.log('no refresh token')
        cb({ message: 'Invalid token'}, null)
    }
}

user.getUserInfo = (uid, cb) => {
    userRef.where('uid', '==', uid).get()
        .then(snapshot => {
            let user = snapshot.docs.map(doc => {
                let item = doc.data();
                item.id = doc.id;
                return item;
            })
            if (user.length > 0) {
                cb(null, {uid, user: user[0]})
            } else {
                cb({ status: 401, message: 'User not found.' }, null)
            }
        })
        .catch(error => {
            cb(error, null)
        })
}

user.generateCustomToken = (data, cb) => {
    const additionalClaims = {
        user_id: data.user_id
    }
    adminAuth.createCustomToken(data.uid, additionalClaims)
    .then(customToken => cb(null, customToken))
    .catch(error => cb(error, null));
}

user.checkInfoDuplicate = (info, cb) => {
    userRef.where(info.fieldName, '==', info.fieldValue).get()
        .then(res => {
            let user = res.docs.map(doc => {
                return doc.data()
            })
            if (user.length > 0) { // Field is taken/duplicate
                cb({code: 'duplicate/'+info.fieldName}, null)
            } else { // Field is available
                cb(null, true)
            }
        })
        .catch(res => {
            cb(null, true)
        })
}

user.checkUsernameDuplicate = (username, cb) => {
    userRef.where('username', '==', username).get()
        .then(res => {
            let user = res.docs.map(doc => {
                return doc.data()
            })
            if (user.length > 0) { // Username is taken
                cb({username: 'Username is already taken'}, null)
            } else { // Username is available
                cb(null, true)
            }
        })
        .catch(res => {
            cb(null, true)
        })
}

user.checkEmailDuplicate = (email, cb) => {
    userRef.where('email', '==', email).get()
        .then(res => {
            let user = res.docs.map(doc => {
                return doc.data()
            })
            if (user.length > 0) { // Email is taken
                cb({email: 'Email address is already in use by another account'}, null)
            } else { // Email is available
                cb(null, true)
            }
        })
        .catch(res => {
            cb(null, true)
        })
}

user.addUserDocuments = (data, cb) => {
    const new_doc = {
        uid: data.uid,
        username: data.username,
        email: data.email
    }
    userRef.add(new_doc)
        .then(ref => cb(null, {user_id: ref.id, ...new_doc}))
        .catch(error => cb(error.message, null))
}

module.exports = user;