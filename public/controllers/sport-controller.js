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
        $scope.copyMatch = copyMatch;
        $scope.addMatch = addMatch;
        $scope.editMatch = editMatch;
        $scope.deleteMatch = deleteMatch;
        $scope.retrieveMatches = retrieveMatches;
        $scope.retrieveSport = retrieveSport;
        $scope.retrieveSportRankings = retrieveSportRankings;
        $scope.checkRankings = checkRankings;
        $scope.viewCurrentMatch = viewCurrentMatch;         //newly added function
        $scope.viewPastMatch = viewPastMatch;               //newly added function
        $scope.viewFutureMatch = viewFutureMatch;           //newly added function
        $scope.sport = {};
        $scope.game = {};
        $scope.currMatch = [];
        $scope.futureMatch = [];
        $scope.pastMatch = [];
        $scope.rankings = [];
        $scope.newMatch = {
            timeStart: undefined,
            timeEnd: undefined,
            date: undefined,
            sportID: undefined
        };

        function copyMatch(match) {
            // copy match - will be accessed inside edit
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

        function viewCurrentMatch() {
            SportService
                .viewCurrentMatch($scope.thisSport.sport_id)
                .then(function (res){
                    console.log("current matches retrieved");
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
                    $scope.pastMatch = res.data;
                    console.log(res.data);
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
    }
})();
