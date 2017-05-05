'use strict';

(() => {

    angular
        .module('app')
        .controller('SportController', SportController);

    SportController.$inject = ['$scope', '$routeParams', 'SportService', 'OrganizerService', 'OrganizationService', 'CompetitorService', 'UserService'];

    function SportController($scope, $routeParams, SportService, OrganizerService, OrganizationService, CompetitorService, UserService) {
        $scope.thisSport = {
            sport_id: $routeParams.id
        };
        $scope.enableMatch = true;
        $scope.copyMatch = copyMatch;
        $scope.addMatch = addMatch;
        $scope.editMatch = editMatch;
        $scope.editTeamRanking = editTeamRanking;
        $scope.deleteMatch = deleteMatch;
        $scope.retrieveMatches = retrieveMatches;
        $scope.retrieveSport = retrieveSport;
        $scope.retrieveSportRankings = retrieveSportRankings;
        $scope.retrieveSponsors = retrieveSponsors;
        $scope.checkRankings = checkRankings;
        $scope.checkMatches = checkMatches;
        $scope.checkSponsors = checkSponsors;
        $scope.viewCurrentMatch = viewCurrentMatch;         //newly added function
        $scope.viewPastMatch = viewPastMatch;               //newly added function
        $scope.viewFutureMatch = viewFutureMatch;           //newly added function
        $scope.retrieveTeamsInMatch = retrieveTeamsInMatch;
        $scope.getCurrentUser = getCurrentUser;
        $scope.sport = {};
        $scope.game = {};
        $scope.currMatch = [];
        $scope.futureMatch = [];
        $scope.pastMatch = [];
        $scope.matchCopy = {};
        $scope.matchDateCopy = {};
        $scope.rankings = [];
        $scope.rankingsSport = [];
        $scope.rankingsOrganization = [];
        $scope.sportSponsors = [];
        $scope.teams = [];
        $scope.newMatch = {
            timeStart: undefined,
            timeEnd: undefined,
            date: undefined,
            matchID: undefined,
            sportID: undefined
        };
        $scope.user = {}
        $scope.dateTime = Date.now();

        function getCurrentUser() { 
            UserService     
                .getUserInfo()      
                .then(function (res){       
                    if(res.data.type != 'O') {
                        $scope.enableMatch = false;
                    }
                    $scope.user = res.data; 
                    console.log($scope.user);
                    console.log($scope.enableMatch);
                 }, function(err) {     
                    Materialize.toast('error', 3000);       
                })      
        }

        function copyMatch(match) {
            if ($scope.game.organizer_id !== $scope.user.id) return;
            console.log(match);
            $scope.matchCopy = {
                timeStart: new Date(match.date+"T"+match.timeStart+"Z"),
                timeEnd: new Date(match.date+"T"+match.timeEnd+"Z"),
                date: new Date(match.date+"T"+match.timeStart+"Z"),
                matchID: match.match_id,
                teams : []
            }
            for (var i = 0; i < match.teams.length; i++) {
                $scope.matchCopy.teams.push(match.teams[i]);
            }
            $scope.matchIdCopy = match.match_id;
            console.log($scope.matchCopy);
            $('#match-edit-modal').modal('open');
        }

        function retrieveSport() {
            SportService
                .retrieveSport($scope.thisSport.sport_id) //parameter is sport id
                .then(function (res){
                    console.log("retrieved sport");
                    $scope.sport = res.data;
                    retrieveGame($scope.sport.game_id);
                    retrieveSportRankings($scope.sport.sport_id);
                    retrieveSponsors($scope.sport.sport_id);
                }, function(err) {
                    console.log("sport not retrieved");
                })
        }

        function retrieveGame(game_id) {
            console.log(game_id);
            SportService
                .retrieveGame(game_id) //parameter is sport id
                .then(function (res){
                    console.log("retrieved game");
                    $scope.game = res.data;
                }, function(err) {
                    console.log("sport not retrieved");
                })
        }

        function retrieveSportRankings(sport_id) {
            SportService
                .retrieveSportRankings($scope.thisSport.sport_id) //parameter is sport id
                .then(function (res){
                    console.log("retrieved rankings");
                    $scope.rankingsSport = res.data;
                    console.log($scope.rankingsSport);
                }, function(err) {
                    console.log("rankings not retrieved");
                })
        }

        function retrieveMatchWinner(sport_id) {
            SportService
                .retrieveMatchWinner(sport_id) //parameter is sport id
                .then(function (res){
                    console.log("retrieved match winners");
                    $scope.rankings = res.data;
                }, function(err) {
                    console.log("match winners not retrieved");
                })
        }

        function retrieveSponsors(sport_id) {
            SportService
                .retrieveSponsors(sport_id) //parameter is sport id
                .then(function (res){
                    console.log("retrieved sponsors");
                    $scope.sportSponsors = res.data;
                }, function(err) {
                    console.log("sponsors not retrieved");
                })
        }
// --------------------------------------------------------------------
        function retrieveTeamsInMatch(match){
            SportService
                .retrieveTeamsInMatch(match.match_id)
                .then(function (res){
                    console.log("teams in match retrieved", match);
                    match.teams = res.data;
                }), function(err){
                    console.log("teams in match not retrieved");
                }
        }

        function viewCurrentMatch() {
            SportService
                .viewCurrentMatch($scope.thisSport.sport_id)
                .then(function (res){
                    $scope.currMatch = [];
                  for (var i = 0; i < res.data.length; i++) {
                        var tempMatch = res.data[i];
						var  match = {
							match_id : undefined,
							timeStart: undefined,
							timeEnd: undefined,
							date: undefined,
							remarks : undefined,
							maxTeams : undefined,
							teams : []
							};
                        match.match_id = tempMatch.match_id;
                        match.timeStart = tempMatch.time_start;
                        match.timeEnd = tempMatch.time_end;
                        match.date = tempMatch.match_date;
                        match.remarks = tempMatch.remarks;
                        match.maxTeams = tempMatch.max_teams;
                        retrieveTeamsInMatch(match)
                        $scope.currMatch.push(match);
                    }  
                    console.log("Current matches retrieved");
                }), function(err){ 
                    console.log("matches not retrieved");
                }
        }

        function viewPastMatch() {
            SportService
                .viewPastMatch($scope.thisSport.sport_id)
                .then(function (res){
                     $scope.pastMatch = [];
                    for (var i = 0; i < res.data.length; i++) {
                        var tempMatch = res.data[i];
						var  match = {
							match_id : undefined,
							timeStart: undefined,
							timeEnd: undefined,
							date: undefined,
							remarks : undefined,
							maxTeams : undefined,
							teams : []
							};
                        match.match_id = tempMatch.match_id;
                        match.timeStart = tempMatch.time_start;
                        match.timeEnd = tempMatch.time_end;
                        match.date = tempMatch.match_date;
                        match.remarks = tempMatch.remarks;
                        match.maxTeams = tempMatch.max_teams;
                        retrieveTeamsInMatch(match)
                        $scope.pastMatch.push(match);
                    } 

        	        console.log("Past matches retrieved");

                }), function(err){
                    console.log("matches not retrieved");
                }
        }

        function viewFutureMatch(){
            SportService
                .viewFutureMatch($scope.thisSport.sport_id)
                .then(function (res){
                    console.log("future matches retrieved");
                    $scope.futureMatch = [];
                    for (var i = 0; i < res.data.length; i++) {
                        var tempMatch = res.data[i];
						var  match = {
							match_id : undefined,
							timeStart : undefined,
							timeEnd : undefined,
							date : undefined,
							remarks : undefined,
							maxTeams : undefined,
							teams : []
							};
                        match.match_id = tempMatch.match_id;
                        match.timeStart = tempMatch.time_start;
                        match.timeEnd = tempMatch.time_end;
                        match.date = tempMatch.match_date;
                        match.remarks = tempMatch.remarks;
                        match.maxTeams = tempMatch.max_teams;
                        retrieveTeamsInMatch(match)   
                        $scope.futureMatch.push(match);
                        console.log("Upcoming matches retrieved");
                   		console.log(res);

                }
                }), function(err){
                    console.log("matches not retrieved");
                }
        }
// -----------------------------------------------------------------------------------

        function checkRankings() {
            if (($scope.rankingsSport).length == 0) {
                return false;
            } else {
                return true;
            }
        }

        function checkMatches() {
            if (($scope.pastMatch).length == 0 && ($scope.currMatch).length == 0 && ($scope.futureMatch).length == 0) {
                return false;
            } else {
                return true;
            }
        }

        function checkSponsors() {
            if (($scope.sportSponsors).length == 0) {
                return false;
            } else {
                return true;
            }
        }

        function addZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }

        function addMatch() {
            var ts = new Date($scope.timeStart);
            var te = new Date($scope.timeEnd);
            var d = new Date($scope.date);
            $scope.newMatch.timeStart = addZero(ts.getHours()) + ':' + addZero(ts.getMinutes()) + ':' + addZero(ts.getSeconds());
            $scope.newMatch.timeEnd = addZero(te.getHours()) + ':' + addZero(te.getMinutes()) + ':' + addZero(te.getSeconds());
            $scope.newMatch.date = d.getFullYear() + '-' + addZero(d.getMonth()+1) + '-' + addZero(d.getDate());
            $scope.newMatch.sportID = $scope.sport.sport_id;

            if (ts > te
                || ts < new Date(ts.toDateString() + ' ' + $scope.sport.time_start)
                || te > new Date(te.toDateString() + ' ' + $scope.sport.time_end)
            ) {
                Materialize.toast('Invalid match time', 2000);
                return;
            }

            if (new Date($scope.newMatch.date) < new Date($scope.sport.start_date)
                || new Date($scope.newMatch.date) > new Date($scope.sport.end_date)
            ) {
                Materialize.toast('Invalid match date', 2000);
                return;
            }

            SportService
                .addMatch($scope.newMatch)
                .then(function (res){
                    Materialize.toast('Added new match!', 3000);
                    viewPastMatch();
                    viewCurrentMatch();
                    viewFutureMatch();
                }, function(err) {
                    Materialize.toast('New match not added!', 3000); 
                })
        }

        function editMatch(match) {
            var ts = new Date(match.timeStart);
            var te = new Date(match.timeEnd);
            var d = new Date(match.date);
            $scope.editMatch.timeStart = addZero(ts.getHours()) + ':' + addZero(ts.getMinutes()) + ':' + addZero(ts.getSeconds());
            $scope.editMatch.timeEnd = addZero(te.getHours()) + ':' + addZero(te.getMinutes()) + ':' + addZero(te.getSeconds());
            $scope.editMatch.date = d.getFullYear() + '-' + addZero(d.getMonth()+1) + '-' + addZero(d.getDate());
            $scope.editMatch.remarks = match.remarks;
            $scope.editMatch.matchID = match.matchID;

            SportService
                .editMatch($scope.editMatch)
                .then(function (res){
                    Materialize.toast('Edited match!', 3000); 
                    viewPastMatch();
                    viewCurrentMatch();
                    viewFutureMatch();
                }, function(err) {
                    Materialize.toast('Match not edited!', 3000); 
                })
        }

        function editTeamRanking(team) {
            SportService
                .editTeamRanking($scope.matchIdCopy, team.team_id, team.ranking)
                .then(function (res){
                    Materialize.toast('Team Ranking Updated!', 3000); 
                }, function(err) {
                    Materialize.toast('Match not edited!', 3000); 
                })
        }

        function deleteMatch() {
            SportService
                .deleteMatch($scope.matchIdCopy)
                .then(function (res){
                    Materialize.toast('Deleted match!', 3000);
                    viewFutureMatch();
                    viewCurrentMatch();
                    viewPastMatch();
                }, function(err) {
                    Materialize.toast('Match not deleted!', 3000); 
                })
        }

        function retrieveMatches() {
            SportService
                .retrieveMatches() //parameter is sport id
                .then(function (res){
                    console.log("retrieved matches");
                }, function(err) {
                    console.log(err);
                })
        }
    }
})();
