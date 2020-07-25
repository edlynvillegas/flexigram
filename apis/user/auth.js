var express = require('express')
var router = express.Router()
router.use(require('cookie-parser')())
var User = require('../../models/User')
var CONFIG = require('../../config')
var UTILS = require('../../utils/utils')
var async = require('async')
var { v5: uuidv5 } = require('uuid')

var authenticateUser = require('../../models/User').authenticateUser

// SIGN UP
router.post('/sign-up', (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username
    }
    async.waterfall([
        (callback) => {
            // Check username if has duplicate
            console.log('** Checking username duplicate...')
            User.checkInfoDuplicate({fieldName: 'username', fieldValue: data.username}, (error, result) => {
                if (error) {
                    callback(UTILS.generateFormErrorMessage(error), null)
                } else {
                    callback(null, true)
                }
            })
        },
        (result, callback) => {
            if (result) {
                // Check email if has duplicate
                console.log('** Checking email duplicate...')
                User.checkInfoDuplicate({fieldName: 'email', fieldValue: data.email}, (error, result) => {
                    if (error) {
                        callback(UTILS.generateFormErrorMessage(error), null)
                    } else {
                        callback(null, true)
                    }
                })
            } else {
                console.log('Cant proceed checking email. Error:', result)
                callback(null, true)
            }
        },
        (result, callback) => {
            // Create User
            if (result) {
                User.userSignUp(data, (error, result) => {
                    if (error) {
                        callback(error, null)
                    } else {
                        data.uid = result.uid;
                        callback(null, true)
                    }
                })
            } else {
                callback(result, null)
            }
        },
        (result, callback) => {
            if (result) {
                // Add user details to documents
                User.addUserDocuments(data, callback)
            } else {
                callback(true, null)
            }
        }
    ], (error, result) => {
        if (error) {
            return res.send(error)
        }
        console.log('SIGN UP SUCCESSFULLY', result)
        
        // Generate JWT Token
        User.generateAuthToken(result.uid, (error, token) => {
            if (error) {
                return res.send({ auth: false, message: 'Error authenticating user'})
            }
            let refresh_token = uuidv5(result.uid, CONFIG.namespace)
            
            res.cookie('refresh_token', refresh_token, { httpOnly: true, signed: true, maxAge: 432000000 }) // 5 days
            console.log('** Refresh token saved!')
    
            return res.send({ auth: true, user: result, token });
        })
    })
})

// SIGN IN
router.post('/sign-in', (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password
    }
    const role = 'user';
    let info = {}
    if (!data.email || !data.password) return res.send({ auth: false, message: 'Invalid fields' })
    async.waterfall([
        (callback) => {
            // Sign in user
            console.log('** User signing in...')
            User.userSignIn(data, (error, result) => {
                if (error) callback(UTILS.generateFormErrorMessage(error), null)
                else callback(null, result.uid)
            })
        },
        (uid, callback) => {
            // Get user's info
            console.log('** Fetching user id...')
            User.getUserInfo(uid, callback)
        }
    ], (error, payload) => {
        if (error) {
            return res.send(error)
        }
        info = {
            id: payload.user.id,
            username: payload.user.username,
            email: payload.user.email
        }
        console.log('** User authenticated!')
        
        // Generate JWT Token
        User.generateAuthToken(payload.uid, (error, token) => {
            if (error) {
                return res.send({ auth: false, message: 'Error authenticating user'})
            }
            let refresh_token = uuidv5(payload.uid, CONFIG.namespace)
            
            res.cookie('refresh_token', refresh_token, { httpOnly: true, signed: true, maxAge: 432000000 }) // 5 days
            console.log('** Refresh token saved!')
    
            return res.send({ auth: true, info, token });
        })
    })
})

// VERIFY AUTH TOKEN
router.get('/verify-token/:token', (req, res) => {
    const token = req.params.token;
    
    async.waterfall([
        callback => {
            console.log('** Verifying token..')
            User.verifyAuthToken(token, (error, result) => {
                if (error) {
                    callback(null, {verified: false, decoded: result})
                } else {
                    callback(null, {verified: true, decoded: result})
                }
            })
        },
        (data, callback) => {
            if (!data.verified) { // auth 
                console.log('** Generating new token..')
                // console.log('req.headers ->', req.headers)
                // var cookies = UTILS.parseCookies(req.headers.cookie)

                console.log('PARSED COOKIES', req.signedCookies)
                const info = {
                    token,
                    refresh_token: req.signedCookies.refresh_token
                }
                User.refreshAuthToken(info, (error, token) => {
                    if (error) callback(error, null)
                    else callback(null, {token})
                })
            } else {
                callback(null, true)
            }
        }
    ], (error, result) => {
        if (error) {
            return res.status(401).send({
                auth: false,
                message: error.message
            })
        }
        if (result.token) {
            return res.send({
                auth: true,
                message: 'Generated new token',
                token: result.token // new token
            })
        }
        res.send({
            auth: true,
            message: 'User is authenticated'
        })
    })
})

// SIGN IN
router.get('/refresh-token/:token', (req, res) => {
    const token = req.params.token;

    const info = {
        token,
        refresh_token: req.signedCookies.refresh_token
    }
    console.log('/refresh-token', info)
    User.refreshAuthToken(info, (error, token) => {
        if (error) res.send(false)
        else res.send({ ref_token: token})
    })
})

// Logout user
router.get('/logout', (req, res) => {
    res.cookie('refresh_token', '', { maxAge: 0, overwrite: true })
    console.log('cookie-parser saved:', req.signedCookies)
    console.log('req.headers.cookie:', req.headers.cookie)
    
    res.send({auth: false});
})
  
module.exports = router;