'use strict'

var express = require('express');
var router = express.Router();

// var profileController = require("../controllers/sample-controller");
// router.get('/getSampleSession', profileController.getSampleSession);

var userController = require("../controllers/user-controller");
var adminController = require('../controllers/admin-controller');

router.post('/login', userController.login);
router.post('/organizer', adminController.createOrganizer);
router.post('/register', userController.register);
router.post('/user/update', userController.update);

module.exports = router;
