'use strict'

var express = require('express');
var router = express.Router();

// var profileController = require("../controllers/sample-controller");
// router.get('/getSampleSession', profileController.getSampleSession);

var userController = require("../controllers/user-controller");
var adminController = require('../controllers/admin-controller');
var sportController = require("../controllers/sport-controller");
var matchController = require("../controllers/match-controller");


router.post('/login', userController.login);
router.post('/organizer', adminController.createOrganizer);
router.post('/register', userController.register);
router.post('/createSport', sportController.createSport);
router.post('/addMatch', matchController.addMatch);
router.get('/sport/:sportID', sportController.viewSportDetails);


module.exports = router;