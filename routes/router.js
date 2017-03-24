'use strict'

let express = require('express');
let router = express.Router();
let crypto = require('crypto');
let bcrypt = require('bcrypt');

let userController = require("../controllers/user-controller");
let adminController = require('../controllers/admin-controller');
let gameController = require('../controllers/game-controller');
let sponsorController = require('../controllers/sponsor-controller')
let sportController = require("../controllers/sport-controller");
let matchController = require("../controllers/match-controller");

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
router.put('/user/active', checkUser('A'), adminController.changeActivity);

router.get('/game/:game_id', gameController.viewGameDetails);
router.post('/game/sponsor/addSponsor', sponsorController.addSponsorToGame);
router.post('/createSport', sportController.createSport);
router.post('/game/addSponsor', sponsorController.addSponsorToGame);
router.post('/createGame' gameController.createGame);
router.post('/updateGame/:game_id' gameController.updateGame);
router.post('/addMatch', matchController.addMatch);
router.post('/editSport', sportController.editSport);
router.post('/addWinnerSport', sportController.addWinnerSport);
router.get('/sport/:sportID', sportController.viewSportDetails);
router.put('/game/sponsor', sponsorController.editSponsorDetails);
router.delete('/deleteGame/:game_id' gameController.deleteGame);
router.delete('/game/deleteSponsor/', checkUser, sponsorController.deleteSponsorFromGame);
router.delete('/deleteSport', checkUser, sportController.deleteSport);

module.exports = router;
