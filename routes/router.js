'use strict'

const express = require('express');
const router = express.Router();

const competitorController = require("../controllers/competitor-controller");
const organizerController = require("../controllers/organizer-controller");

router.get('/searchCompetitor', competitorController.searchCompetitor);
router.get('/searchOrganizer', organizerController.searchOrganizer);

module.exports = router;