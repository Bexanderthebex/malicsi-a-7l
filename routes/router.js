'use strict'

let express = require('express');
let router = express.Router();
let crypto = require('crypto');
let bcrypt = require('bcrypt');

let userController = require("../controllers/user-controller");
let adminController = require('../controllers/admin-controller');

function sha256Hash(req, res, next) {
    if (req.body.password == undefined) {
        res.status(404).send({ 'message' : 'Incorrect credentials'});
    } else {
        let hash = crypto.createHash('sha256');
        hash.update(req.body.password);
        req.body.password = hash.digest('hex');
        next();
    }
}

function bcryptHash(req, res, next) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
       if (!err) {
           req.body.password = hash;
           next();
       } else {
           console.log(err);
           res.status(404).send('Error in bcrypt');
       }
    });
}

// Example usage: router.post('/r/anime', checkUser('O'), createGame);
function checkUser(type) {
    return (req, res, next) => {
        if (req.session.user !== undefined && (req.session.user.type === type || req.session.user.type === 'A')) {
            next();
        } else {
            res.status(401).send({'message': 'Unauthorized access.'});
        }
    };
}

router.post('/login', sha256Hash, userController.login);
router.post('/organizer', adminController.createOrganizer);
router.post('/register', sha256Hash, bcryptHash, userController.register);
router.get('/user/:id', userController.returnInfo);
router.put('/user/update', userController.update)
//router.put('/user/active', checkUser('A'), adminController.changeActivity);

module.exports = router;
