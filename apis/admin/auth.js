var express = require('express');
var router = express.Router();
var Admin = require('../../models/Admin');

// POST
router.post('/', (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password,
        displayName: req.body.username
    }
    Admin.createNewAdmin(data, (error, result) => {
        if (error) {
            return res.send({
                result: false,
                message: error
            })
        }

        res.send({
            result: true,
            message: 'Admin successfully added!'
        })
    })
})

module.exports = router;