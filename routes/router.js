'use strict'

let express = require('express');
let router = express.Router();
let crypto = require('crypto');
let bcrypt = require('bcrypt');

let userController = require("../controllers/user-controller");
let adminController = require('../controllers/admin-controller');

function hashPassword(req, res, next) {
    let hash = crypto.createHash('sha256');
    hash.update(req.body.password);
    bcrypt.hash(hash.digest('hex'), 10, (err, hash) => {
        if (!err) {
            req.body.password = hash;
            next();
        } else {
            console.log(err);
        }
    });
}

router.post('/login', hashPassword, userController.login);
router.post('/organizer', adminController.createOrganizer);
router.post('/register', hashPassword, userController.register);
router.post('/user/update', userController.update)

module.exports = router;
