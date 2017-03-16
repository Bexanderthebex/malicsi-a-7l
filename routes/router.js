'use strict'

var express = require('express');
var router = express.Router();

// var profileController = require("../controllers/sample-controller");
// router.get('/getSampleSession', profileController.getSampleSession);

var userController = require("../controllers/user-controller");
var adminController = require('../controllers/admin-controller');
var gameController = require('../controllers/game-controller');
var sponsorController = require('../controllers/sponsor-controller')
var sportController = require("../controllers/sport-controller");
var matchController = require("../controllers/match-controller");

function checkUser(req, res, next) {
	console.log(req.session.user);
	if (req.session.user !== undefined && (req.session.user.type === 'O' || req.session.user.type === 'A')) {
		next();
	} else {
		res.status(403).send('Forbidden');
	}
}

router.post('/login', userController.login);
router.post('/organizer', adminController.createOrganizer);
router.post('/register', userController.register);
router.get('/game/:game_id', gameController.viewGameDetails)
router.post('/game/addSponsor', sponsorController.addSponsorToGame);
router.post('/createSport', checkUser, sportController.createSport);
router.post('/addMatch', checkUser, matchController.addMatch);
router.post('/editSport', checkUser, sportController.editSport);
router.post('/addWinnerSport', checkUser, sportController.addWinnerSport);
router.get('/sport/:sportID', sportController.viewSportDetails);
router.put('/game/sponsor/:sponsor_id', checkUser, sponsorController.editSponsorDetails);
router.delete('/game/sponsor/:sponsor_id', checkUser, sponsorController.deleteSponsorFromGame);
router.delete('/deleteSport', checkUser, sportController.deleteSport);

module.exports = router;