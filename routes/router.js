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
let competitorController = require("../controllers/competitor-controller");
let organizerController = require("../controllers/organizer-controller");
let teamController = require("../controllers/team-controller");
let organizationController = require("../controllers/organization-controller");
let uploadController = require("../controllers/upload-controller");

function sha256Hash(req, res, next) {
    console.log(req.body);
    if (req.body.password == undefined) {
        res.status(404).send({ 'message' : 'Incorrect credentials'});
    } else {
        console.log("Hi");
        let hash = crypto.createHash('sha256');
        hash.update(req.body.password);
        req.body.password = hash.digest('hex');
        next();
    }
}

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
router.post('/register', sha256Hash, bcryptHash, userController.register);
router.post('/register/createOrganizer', checkUser('A'), sha256Hash, bcryptHash, adminController.createOrganizer);
router.post('/register/createAdmin', checkUser('A'), sha256Hash, bcryptHash, adminController.createAdmin);
router.get('/logout', userController.logout);
router.get('/user', userController.getUserInfo);
router.get('/user/searchAdmin', checkUser('A'), adminController.searchAdmin);
router.get('/user/searchUser', userController.searchUser);
router.get('/user/:id', userController.getUserInfo);
router.put('/user/:id/active', checkUser('A'), adminController.changeActivity);
router.put('/user/update', userController.update);
router.put('/user/updatePassword', sha256Hash, bcryptHash, userController.updatePassword);
router.post('/user/getUsersByType', checkUser('A'), adminController.getUsersByType);
router.post('/user/getAllUsers', checkUser('A'), adminController.getAllUsers);

//competitor routers
router.get('/competitor/searchCompetitor', competitorController.searchCompetitor);
router.put('/competitor/editCompetitor', competitorController.editCompetitor);
router.get('/competitor/getCompetitorTeams', competitorController.getCompetitorTeams);
router.get('/competitor/getCompetitorTeamsPublic', competitorController.getCompetitorTeamsPublic);
router.get('/competitor/getCompetitorOrganization', competitorController.getCompetitorOrganization);
router.get('/competitor/getCompetitor', competitorController.getCompetitor);
router.put('/competitor/editCompetitorBio', competitorController.editCompetitorBio);
router.get('/competitor/getCompetitorRanking', competitorController.getCompetitorRanking);

//organizer routers
router.get('/organizer/searchOrganizer', organizerController.searchOrganizer);
router.get('/organizer/findGames',organizerController.findGames);
router.get('/organizer/findSport',organizerController.findSport);
router.get('/organizer/findTeam',organizerController.findTeam);
router.put('/organizer/editOrganizer', organizerController.editOrganizer);
router.get('/organizer/getRequest', organizerController.getRequest);
router.put('/organizer/processRequest', organizerController.processRequest);
router.get('/organizer/getPendingParticipation', organizerController.getPendingParticipation);
router.get('/organizer/findGames',organizerController.findGames);
router.get('/organizer/getOrganizer',organizerController.getOrganizer);
router.delete('/organizer/deleteTeam',organizerController.deleteTeam);

// organization
router.get('/organization/getOrganization',teamController.getOrganization);
router.get('/organization/getGamesInOrganization',teamController.getGamesInOrganization);
router.get('/organization/search',organizationController.searchOrganization);
router.put('/organization/editOrganization', organizationController.editOrganization);
router.post('/organization/addOrganization', organizationController.addOrganization);
router.delete('/organization/deleteOrganization', organizationController.deleteOrganization)

// team routers
router.get('/team/teamStatistics',teamController.getTeamStatistics);
router.post('/team/createTeam',teamController.createTeam);
router.delete('/team/deleteTeam',teamController.deleteTeam);
router.delete('/team/deleteMembershipRequest',teamController.deleteMembershipRequest);
router.post('/team/teamMembershipRequest',teamController.teamMembershipRequest);
router.post('/team/acceptMembershipRequest',teamController.acceptMembershipRequest);
router.get('/team/countTeamInSports',teamController.countTeamInSports);
router.get('/team/searchTeam',teamController.searchTeam);
router.get('/team/getTeamMembers',teamController.getTeamMembers);
router.get('/team/getTeam',teamController.getTeam);
router.get('/team/getCoachedTeams',teamController.getCoachedTeam);
router.get('/team/getTeamsOnOrganization',teamController.getTeamsOnOrganization);
router.get('/team/getOrganizationRankings',teamController.getOrganizationRankings);
router.get('/team/displayPendingMembershipRequest',teamController.displayPendingMembershipRequest);
router.get('/team/getMembershipRequest',teamController.getMembershipRequest);

// game routers
router.get('/game/searchGame', gameController.searchForGameByKeyword);
router.get('/game/viewGame',  gameController.viewGameDetails);
router.get('/game/viewAllGames',  gameController.viewAllGames);
router.get('/game/viewAllPastMatchesInGame', gameController.viewAllPastMatchesInGame);
router.get('/game/viewAllOngoingMatchesInGame', gameController.viewAllOngoingMatchesInGame);
router.get('/game/viewAllUpcomingMatchesInGame', gameController.viewAllUpcomingMatchesInGame);
router.get('/game/viewUpcomingOngoing', gameController.viewUpcomingOngoingGames);
router.get('/game/viewUpcomingOngoingGamesNotLimited', gameController.viewUpcomingOngoingGamesNotLimited);
router.get('/game/viewAllSportsInGame/:gameId', gameController.viewAllSportsInGame);
router.get('/game/countGameOrganizer/:organizerId', gameController.countGameOrganizer);
router.get('/game/ranks/:gameId', gameController.retrieveOrgRankings);
router.post('/game/createGame',  gameController.createGame);
router.put('/game/updateGame',  gameController.updateGame);
router.post('/game/addOrganizationToGame', gameController.addOrganizationToGame);
router.get('/game/viewAllOrganizationForGame', gameController.viewAllOrganizationForGame);
router.get('/game/viewAllOrganizationInGame', gameController.viewAllOrganizationInGame);
router.delete('/game/deleteGame/',  gameController.deleteGame);
router.delete('/game/deleteOrganizationFromGame', gameController.deleteOrganizationFromGame)
router.get('/game/viewAllOngoingGames', gameController.viewAllOngoingGames);
router.get('/game/viewAllUpcomingGames', gameController.viewAllUpcomingGames);
router.get('/game/viewAllRecentGames', gameController.viewAllRecentGames);
router.get('/game/viewGameOrganizerDetails', gameController.viewGameOrganizerDetails);

// game-sponsor routers
router.get('/game/viewSponsor',  sponsorController.viewSponsor);
router.get('/game/viewSponsorInSport',  sponsorController.viewSponsorInSport);
router.get('/game/viewSponsorInGame',  sponsorController.viewSponsorInGame);
router.get('/game/viewSponsorNotInGame', sponsorController.viewSponsorNotInGame);
router.post('/game/addSponsorToGame',  sponsorController.addSponsorToGame);
router.delete('/game/deleteSponsorFromGame',  sponsorController.deleteSponsorFromGame);

// sponsor routers
router.get('/sponsor/viewAll', sponsorController.viewAllSponsor);
router.get('/sponsor/searchSponsor', sponsorController.searchSponsor);
router.put('/sponsor/editSponsor',  sponsorController.editSponsorDetails);
router.post('/sponsor/addSponsor', sponsorController.addSponsor);
router.delete('/sponsor/deleteSponsor', sponsorController.deleteSponsor);

//sport routers
router.get('/game/sport/countSportByGame/:gameID', sportController.countSportByGame);
router.get('/sport/viewSport', sportController.viewSportDetails);
router.get('/sport/ranks/:sportId', sportController.retrieveSportRankings);
router.get('/sport/comranks/:sportId/:id', sportController.retrieveCompetitorSportRankings);
router.get('/sport/match/viewCurrentMatch', matchController.viewCurrentMatch); 
router.get('/sport/match/viewPastMatch', matchController.viewPastMatch); 
router.get('/sport/match/viewFutureMatch', matchController.viewFutureMatch);
router.get('/sport/search', sportController.searchForSportByKeyword);
router.post('/sport/createSport', sportController.createSport);
router.post('/sport/addWinnerSport', sportController.addWinnerSport);
router.put('/sport/editSport', sportController.editSport);
router.delete('/sport/deleteSport', sportController.deleteSport);

//match routers
router.get('/game/sport/countMatchBySport/:sportID', matchController.countMatchBySport);
router.get('/sport/match/viewMatchInSport',  matchController.viewMatchInSport);
router.get('/sport/match/viewAllMatch', matchController.viewAllMatch);
router.get('/sport/match/viewCurrentMatch', matchController.viewCurrentMatch);
router.get('/sport/match/viewPastMatch', matchController.viewPastMatch);
router.get('/sport/match/viewUpcomingMatch', matchController.viewFutureMatch);
router.get('/sport/match/retrieveMatchWinner/:sportId', matchController.retrieveMatchWinner);
router.get('/sport/match/viewMatchDetails', matchController.viewMatchDetails);
router.post('/sport/match/addMatch',  matchController.addMatch);
router.put('/sport/match/editMatch', matchController.editMatch);
router.put('/sport/match/editTeamRankingInMatch', matchController.editTeamRankingInMatch);
router.delete('/sport/match/deleteMatch', matchController.deleteMatch);

// log routers
router.get('/log/viewAllLogs', checkUser('A'), logController.viewAllLogs);
router.post('/log/viewLogsByDate', checkUser('A'), logController.viewLogsByDate);
router.get('/log/viewUserLogs',logController.viewUserLogs);
router.post('/log/createLog',logController.createLog);
router.get('/log/searchLog', checkUser('A'), logController.searchLog);

//upload router
router.post('/uploadImg',uploadController.imageUpload);

module.exports = router;
