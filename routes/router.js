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
let logController = require("../controllers/log-controller");

function checkUser(req, res, next) {
  console.log(req.session.user);
  if (req.session.user !== undefined && (req.session.user.type === 'O' || req.session.user.type === 'A')) {
    next();
  } else {
    res.status(403).send('Forbidden');
  }
}

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

var competitorController = require("../controllers/competitor-controller");
var organizerController = require("../controllers/organizer-controller");
var teamController = require("../controllers/team-controller");

//admin/system routers
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

//overall user routers
router.post('/login', sha256Hash, userController.login);
router.post('/organizer', adminController.createOrganizer);

router.post('/register', sha256Hash, bcryptHash, userController.registerCompetitor);
router.get('/logout', userController.logout);
router.get('/user/:id', userController.getUserInfo);
router.put('/user/update', sha256Hash, bcryptHash, userController.update);
router.put('/user/:id/active', checkUser('A'), adminController.changeActivity);

//competitor routers
router.get('/competitor/searchCompetitor', competitorController.searchCompetitor);
router.put('/competitor/editCompetitor', competitorController.editCompetitor);

//organizer routers
router.get('/organizer/searchOrganizer', organizerController.searchOrganizer);
router.put('/organizer/editOrganizer', organizerController.editOrganizer);

//team routers
router.post('/team/createTeam',teamController.createTeam);
router.post('/team/deleteTeam',teamController.deleteTeam);
router.post('/team/teamMembershipRequest',teamController.teamMembershipRequest);
router.post('/team/acceptMembershipRequest',teamController.acceptMembershipRequest);

//game routers
router.get('/game/:gameId', checkUser, gameController.viewGameDetails)
router.post('/game/createGame', checkUser, gameController.createGame);
router.post('/game/addSponsor', checkUser, sponsorController.addSponsorToGame);
router.put('/game/updateGame', checkUser, gameController.updateGame);
router.put('/game/editSponsor', checkUser, sponsorController.editSponsorDetails);
router.delete('/game/deleteGame/', checkUser, gameController.deleteGame);
router.delete('/game/deleteSponsor', checkUser, sponsorController.deleteSponsorFromGame);

//sport routers
router.get('/sport/:sportId', checkUser, sportController.viewSportDetails);
router.post('/sport/createSport', checkUser, sportController.createSport);
router.post('/sport/addMatch', checkUser, matchController.addMatch);
router.post('/sport/addWinnerSport', checkUser, sportController.addWinnerSport);
router.put('/sport/editSport', checkUser, sportController.editSport);
router.delete('/sport/deleteSport', checkUser, sportController.deleteSport);

//log routers
router.get('/log/viewAllLogs', checkUser, logController.viewAllLogs);
router.post('/log/viewLogsByDate', checkUser, logController.viewLogsByDate);

module.exports = router;