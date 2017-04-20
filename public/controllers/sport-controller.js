'use strict';

(() => {

    angular
        .module('app')
        .controller('SportController', SportController);

    SportController.$inject = ['$scope', '$routeParams', 'SportService', 'OrganizerService'];

    function SportController($scope, $routeParams, SportService, OrganizerService) {
        $scope.thisSport = {
            sport_id: $routeParams.id
        };
        $scope.addMatch = addMatch;
        $scope.editMatch = editMatch;
        $scope.deleteMatch = deleteMatch;
        $scope.retrieveMatches = retrieveMatches;
        $scope.retrieveSport = retrieveSport;
        $scope.retrieveSportRankings = retrieveSportRankings;
        $scope.checkRankings = checkRankings;
        $scope.viewPastMatchesInSport = viewPastMatchesInSport;
        $scope.viewOngoingMatchesInSport = viewOngoingMatchesInSport;
        $scope.viewUpcomingMatchesInSport = viewUpcomingMatchesInSport;
        $scope.checkPastMatches = checkPastMatches;
        $scope.checkOngoingMatches = checkOngoingMatches;
        $scope.checkUpcomingMatches = checkUpcomingMatches;

        $scope.sport = {};
        $scope.game = {};
        $scope.rankings = [];
        $scope.pastMatches = [];
        $scope.ongoingMatches = [];
        $scope.upcomingMatches = [];
        $scope.temp = [];
        $scope.match_id_tracker = [];
        $scope.newMatch = {
            timeStart: undefined,
            timeEnd: undefined,
            date: undefined,
            sportID: undefined
        };

        function checkPastMatches(){
            if($scope.pastMatches.length == 0 ) return true;
            else false;
        }
        function checkOngoingMatches(){
            if($scope.ongoingMatches.length == 0 ) return true;
            else false;
        }
        function checkUpcomingMatches(){
            if($scope.upcomingMatches.length == 0 ) return true;
            else false;
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
                .retrieveSportRankings(sport_id) //parameter is sport id
                .then(function (res){
                    console.log("retrieved rankings");
                    $scope.rankings = res.data;
                    console.log(res.data);
                }, function(err) {
                    console.log("rankings not retrieved");
                })
        }

        function checkRankings() {
            if (($scope.rankings).length == 0) {
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
            $scope.newMatch.timeStart = addZero(ts.getHours()) + ':' + addZero(ts.getMinutes()) + ':' + addZero(ts.getSeconds());
            $scope.newMatch.timeEnd = addZero(te.getHours()) + ':' + addZero(te.getMinutes()) + ':' + addZero(te.getSeconds());
            $scope.newMatch.sportID = $scope.sport.sport_id;
            console.log($scope.newMatch);
            SportService
                .addMatch($scope.newMatch)
                .then(function (res){
                    Materialize.toast('Added new match!', 3000); 
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
                .deleteMatch()
                .then(function (res){
                    Materialize.toast('Deleted match!', 3000); 
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

        function viewPastMatchesInSport(){
            SportService
                .viewPastMatchesInSport($scope.thisSport.sport_id)
                .then(function(res){
                    console.log("past matches retrieved for sport#"+ $scope.thisSport.sport_id);
                    console.log(res.data);
                    $scope.temp = res.data;
                    for (var i = $scope.temp.length - 1; i >= 0; i--) {
                        for(var j = $scope.temp.length - 2; j>=0; j--){
                            if($scope.temp[i].match_id == $scope.temp[j].match_id && $scope.temp[i].team_id != $scope.temp[j].team_id && $scope.match_id_tracker.indexOf($scope.temp[i].match_id)==-1){
                                $scope.mergedMatch = {
                                    team1_name: $scope.temp[i].team_name,
                                    team1_id: $scope.temp[i].team_id,
                                    team2_name: $scope.temp[j].team_name,
                                    team2_id: $scope.temp[j].team_id,
                                    match_date: $scope.temp[i].match_date,
                                    time_start: $scope.temp[i].time_start,
                                    time_end: $scope.temp[i].time_end,
                                    match_id: $scope.temp[i].match_id
                                };
                            $scope.pastMatches.push($scope.mergedMatch);
                            $scope.match_id_tracker.push($scope.temp[i].match_id);
                            }
                        }
                    }
                    console.log($scope.pastMatches);                                   
                }, function(err){
                    console.log(err.data);
                    Materialize.toast('Failed to retrieve past matches!', 3000);
                })
        }

        function viewOngoingMatchesInSport(){
            SportService
                .viewOngoingMatchesInSport($scope.thisSport.sport_id)
                .then(function(res){
                    console.log("ongoing matches retrieved for sport#"+ $scope.thisSport.sport_id);
                    console.log(res.data);
                    $scope.temp = res.data;
                    for (var i = $scope.temp.length - 1; i >= 0; i--) {
                        for(var j = $scope.temp.length - 2; j>=0; j--){
                            if($scope.temp[i].match_id == $scope.temp[j].match_id && $scope.temp[i].team_id != $scope.temp[j].team_id && $scope.match_id_tracker.indexOf($scope.temp[i].match_id)==-1){
                                $scope.mergedMatch = {
                                    team1_name: $scope.temp[i].team_name,
                                    team1_id: $scope.temp[i].team_id,
                                    team2_name: $scope.temp[j].team_name,
                                    team2_id: $scope.temp[j].team_id,
                                    match_date: $scope.temp[i].match_date,
                                    time_start: $scope.temp[i].time_start,
                                    time_end: $scope.temp[i].time_end,
                                    match_id: $scope.temp[i].match_id
                                };
                            $scope.ongoingMatches.push($scope.mergedMatch);
                            $scope.match_id_tracker.push($scope.temp[i].match_id);
                            }
                        }
                    }
                    console.log($scope.ongoingMatches);

                }, function(err){
                    console.log(err.data);
                    Materialize.toast('Failed to retrieve ongoing matches!', 3000);
                })
        }
        function viewUpcomingMatchesInSport(){
            SportService
                .viewUpcomingMatchesInSport($scope.thisSport.sport_id)
                .then(function(res){
                    console.log("upcoming matches retrieved for sport#"+ $scope.thisSport.sport_id);
                    console.log(res.data);
                    $scope.temp = res.data;
                    for (var i = $scope.temp.length - 1; i >= 0; i--) {
                        for(var j = $scope.temp.length - 2; j>=0; j--){
                            if($scope.temp[i].match_id == $scope.temp[j].match_id && $scope.temp[i].team_id != $scope.temp[j].team_id && $scope.match_id_tracker.indexOf($scope.temp[i].match_id)==-1){
                                $scope.mergedMatch = {
                                    team1_name: $scope.temp[i].team_name,
                                    team1_id: $scope.temp[i].team_id,
                                    team2_name: $scope.temp[j].team_name,
                                    team2_id: $scope.temp[j].team_id,
                                    match_date: $scope.temp[i].match_date,
                                    time_start: $scope.temp[i].time_start,
                                    time_end: $scope.temp[i].time_end,
                                    match_id: $scope.temp[i].match_id
                                };
                            $scope.upcomingMatches.push($scope.mergedMatch);
                            $scope.match_id_tracker.push($scope.temp[i].match_id);
                            }
                        }
                    }

                }, function(err){
                    console.log(err.data);
                    Materialize.toast('Failed to retrieve upcoming matches!', 3000);
                })
        }
    }
})();