var express = require('express')
var router = express.Router()
router.use(require('cookie-parser')())
var UTILS = require('../../utils/utils')
var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(UTILS.UPLOAD_PATH)
        cb(null, UTILS.UPLOAD_PATH)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
   
var upload = multer({ storage: storage })

// Models
var User = require('../../models/User')

var CONFIG = require('../../config')
var UTILS = require('../../utils/utils')
var async = require('async')

var authenticateUser = require('../../models/User').authenticateUser

// GET USER INFO
router.get('/info', authenticateUser, (req, res) => {
    console.log('** User authenticated!')
    console.log('@INFO COOKIES ->', req.signedCookies.refresh_token)
    console.log('@REQ COOKIES ->', req.headers.cookie)

    User.getUserInfo(req.decoded.uid, (error, result) => {
        if (error) {
            console.log('error.message', error.message)
            return res.send(error)
        }

        const info = {
            id: result.user.id,
            fullname: result.user.fullname,
            username: result.user.username,
            email: result.user.email
        }

        res.send({ result: true, info });
    })
})

// GET USER INFO
router.post('/share-post', authenticateUser, upload.array('photos', 6), (req, res) => {
    console.log('PHOTOS:', req.files)
    console.log('BODY:', req.body)
    res.send(true);
})

module.exports = router;