'use strict'

var express = require('express');
var router = express.Router();

var profileController = require("../controllers/sample-controller");
router.get('/getSampleSession', profileController.getSampleSession);

var matchController = require("../controllers/match-controller");
router.post('/addMatch', matchController.addMatch);

module.exports = router;