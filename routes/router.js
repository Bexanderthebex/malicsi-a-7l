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

router.post('/register', sha256Hash, bcryptHash, userController.register);
router.get('/logout', userController.logout);
router.get('/user/:id', userController.returnInfo);
router.put('/user/update', userController.update);
router.put('/user/:id/active', checkUser('A'), adminController.changeActivity);

//competitor routers
router.get('/competitor/searchCompetitor', competitorController.searchCompetitor);
router.put('/competitor/editCompetitor', competitorController.editCompetitor);

//organizer routers
router.get('/organizer/searchOrganizer', organizerController.searchOrganizer);
router.put('/organizer/editOrganizer', organizerController.editOrganizer);

//team routers
router.get('/team/teamStatistics',teamController.getTeamStatistics);
router.post('/team/createTeam',teamController.createTeam);
router.post('/team/deleteTeam',teamController.deleteTeam);
router.post('/team/teamMembershipRequest',teamController.teamMembershipRequest);
router.post('/team/acceptMembershipRequest',teamController.acceptMembershipRequest);

//game routers
router.get('/game/viewGame',  gameController.viewGameDetails);
router.get('/game/countGameOrganizer/:organizerId', gameController.countGameOrganizer);
router.post('/game/createGame',  gameController.createGame);
router.post('/game/addSponsor',  sponsorController.addSponsorToGame);
router.put('/game/updateGame',  gameController.updateGame);
router.put('/game/editSponsor',  sponsorController.editSponsorDetails);
router.delete('/game/deleteGame/',  gameController.deleteGame);
router.delete('/game/deleteSponsor',  sponsorController.deleteSponsorFromGame);


//sport routers
router.get('/sport/viewSport', sportController.viewSportDetails);
router.post('/sport/createSport', sportController.createSport);
router.put('/sport/editMatch', matchController.editMatch);
router.put('/sport/editTeamRankingInMatch', matchController.editTeamRankingInMatch);
router.post('/sport/addWinnerSport', sportController.addWinnerSport);
router.put('/sport/editSport', sportController.editSport);
router.delete('/sport/deleteSport', sportController.deleteSport);
router.get('/game/sport/:gameId', gameController.viewAllSportsInGame);

//match routers
router.get('/sport/match/viewMatchInSport',  matchController.viewMatchInSport);
router.get('/sport/match/viewAllMatch', matchController.viewAllMatch);
router.post('/sport/match/addMatch',  matchController.addMatch);


module.exports = router;

