'use strict'

const express = require('express');
const router = express.Router();

// var profileController = require("../controllers/sample-controller");
// router.get('/getSampleSession', profileController.getSampleSession);

var userController = require("../controllers/user-controller");
var adminController = require('../controllers/admin-controller');

var competitorController = require("../controllers/competitor-controller");
var organizerController = require("../controllers/organizer-controller");
var teamController = require("../controllers/team-controller");

//admin/system routers
router.post('/login', userController.login);
router.post('/organizer', adminController.createOrganizer);
router.post('/register', userController.register);

router.get('/getUserInfo',userController.getUserInfo);

//competitor routers
router.get('/searchCompetitor', competitorController.searchCompetitor);
router.put('/editCompetitor', competitorController.editCompetitor);

//organizer routers
router.get('/searchOrganizer', organizerController.searchOrganizer);
router.put('/editOrganizer', organizerController.editOrganizer);

//team routers
router.post('/createTeam',teamController.createTeam);
router.post('/deleteTeam',teamController.deleteTeam);
router.post('/teamMembershipRequest',teamController.teamMembershipRequest);
router.post('/acceptMembershipRequest',teamController.acceptMembershipRequest);

module.exports = router;
