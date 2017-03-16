'use strict'

const express = require('express');
const router = express.Router();

// var profileController = require("../controllers/sample-controller");
// router.get('/getSampleSession', profileController.getSampleSession);

var userController = require("../controllers/user-controller");
var adminController = require('../controllers/admin-controller');

var competitorController = require("../controllers/competitor-controller");
var organizerController = require("../controllers/organizer-controller");

router.post('/login', userController.login);
router.post('/organizer', adminController.createOrganizer);
router.post('/register', userController.register);

router.get('/searchCompetitor', competitorController.searchCompetitor);
router.get('/searchOrganizer', organizerController.searchOrganizer);
router.post('/editCompetitor', competitorController.editCompetitor);
router.post('/editOrganizer', organizerController.editOrganizer);

module.exports = router;
