'use strict';

(() => {

    angular
        .module('app')
        .controller('SportController', SportController);

    SportController.$inject = ['$scope', '$routeParams', 'SportService', 'OrganizerService', 'OrganizationService', 'CompetitorService'];

    function SportController($scope, $routeParams, SportService, OrganizerService, OrganizationService, CompetitorService) {
        $scope.thisSport = {
            sport_id: $routeParams.id
        };
        $scope.copyMatch = copyMatch;
        $scope.addMatch = addMatch;
        $scope.editMatch = editMatch;
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
        $scope.sport = {};
        $scope.game = {};
        $scope.currMatch = [];
        $scope.futureMatch = [];
        $scope.pastMatch = [];
        $scope.matchCopy = [];
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
            sportID: undefined,
        };
       

        $scope.dateTime = Date.now();

        function copyMatch(match) {
            for (var i = 0; i < match.length; i++) {
                $scope.matchCopy.push(match[i]);
                $scope.matchDateCopy = {
                    timeStart: new Date("2014-01-01"+"T"+match[i].time_start+"Z"),
                    timeEnd: new Date("2014-01-01"+"T"+match[i].time_end+"Z"),
                    date: new Date(match[i].match_date+"T"+match[i].time_start+"Z"),
                    remarks: match[i].remarks,
                    matchID: match[i].match_id
                };
                $scope.matchIdCopy = match[i].match_id;
            }
            console.log($scope.matchDateCopy);
        }

        function retrieveSport() {
            SportService
                .retrieveSport($scope.thisSport.sport_id) //parameter is sport id
                .then(function (res){
                    console.log("retrieved sport");
                    $scope.sport = res.data;
                    console.log(res.data);
                    console.log($scope.sport.game_id);
                    retrieveGame($scope.sport.game_id);
                    retrieveSportRankings($scope.sport.sport_id);
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
                    console.log(res.data);
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
                    console.log(res.data);
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
                    console.log(res.data);
                }, function(err) {
                    console.log("sponsors not retrieved");
                })
        }
// --------------------------------------------------------------------
        function retrieveTeamsInMatch(match_id){
            SportService
                .retrieveTeamsInMatch(match_id)
                .then(function (res){
                    console.log("teams in match retrieved");
                    return res.data;
                }), function(err){
                    console.log("teams in match not retrieved");
                }
        }

        function viewCurrentMatch() {
            SportService
                .viewCurrentMatch($scope.thisSport.sport_id)
                .then(function (res){
                 $scope.currMatch = res.data;   
                }), function(err){ 
                    console.log("matches not retrieved");
                }
        }

        function viewPastMatch() {
            SportService
                .viewPastMatch($scope.thisSport.sport_id)
                .then(function (res){
                    console.log("Past match retrieved");
                    for (var i = 0; i < res.data.length; i++) {
                        var tempMatch = res.data[i];
						var  match = {
							timeStart: undefined,
							timeEnd: undefined,
							date: undefined,
							sportID: undefined,
							teams : []
							};
                        match.match_id = tempMatch.match_id;
                        match.timeStart = tempMatch.time_start;
                        match.timeEnd = tempMatch.time_end;
                        match.date = tempMatch.match_date;
                        SportService
                        .retrieveTeamsInMatch(tempMatch.match_id)
                        .then(
                        	function(res){
                        		match.teams = res.data
                        		console.log = match.teams
                        	});
                        
                        console.log(match);
                        $scope.pastMatch.push(match);
                    }

                    console.log($scope.pastMatch);
                }), function(err){
                    console.log("matches not retrieved");
                }
        }

        function viewFutureMatch(){
            SportService
                .viewFutureMatch($scope.thisSport.sport_id)
                .then(function (res){
                    console.log("future matches retrieved");
                    $scope.futureMatch = res.data;
                    console.log(res.data);
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

            console.log($scope.newMatch);

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

        function editMatch() {
            SportService
                .editMatch()
                .then(function (res){
                    Materialize.toast('Edited match!', 3000); 
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
