'use strict'

var express = require('express');
var router = express.Router();

var profileController = require("../controllers/sample-controller");
router.get('/getSampleSession', profileController.getSampleSession);

var sportController = require("../controllers/sport-controller");
router.post('/createSport', sportController.createSport);

module.exports = router;