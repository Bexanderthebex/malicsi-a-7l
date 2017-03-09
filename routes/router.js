'use strict'

var express = require('express');
var router = express.Router();

// var profileController = require("../controllers/sample-controller");
// router.get('/getSampleSession', profileController.getSampleSession);

var userController = require("../controllers/user-controller");

router.post('/login', userController.login);
router.post('/register', userController.register);


module.exports = router;