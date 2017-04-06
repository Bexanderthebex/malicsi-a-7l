'use strict';

(() => {

    angular
        .module('app')
        .controller('GameController', GameController);

    GameController.$inject = ['$scope', '$routeParams', 'GameService'];

    function GameController($scope, $routeParams, GameService) {
        $scope.thisGame = {
            game_id: $routeParams.gameId
        };
        $scope.addSport = addSport;
        $scope.retrieveSport = retrieveSport;
        $scope.deleteSport = deleteSport;
        $scope.updateSport = updateSport;
        $scope.updateWinner = updateWinner;
        $scope.retrieveAllSports = retrieveAllSports;
        $scope.sport = {};
        $scope.sports = [];



        $scope.newSport = {
            sportName: undefined, 
            mechanics: undefined,
            timeStart: undefined,
            timeEnd: undefined,
            startDate: undefined,
            endDate: undefined, 
            maxTeams: undefined, 
            scoringSystem: undefined, 
            gameID: $scope.thisGame.game_id
        };

        function addSport() {
            $scope.newSport.sportName = $('#name').val();
            $scope.newSport.timeStart = $('#start-time').val();
            $scope.newSport.timeEnd = $('#end-time').val();
            $scope.newSport.startDate = $('#start-date').val();
            $scope.newSport.endDate = $('#end-date').val();
            $scope.newSport.mechanics = $('#description').val();
            $scope.newSport.maxTeams = $('#maxTeams').val();
            $scope.newSport.scoringSystem = $('#scoring-system').val();
            console.log($scope.newSport);
            GameService
                .addSport($scope.newSport)
                .then(function (res){
                    console.log("added");
                }, function(err) {
                    console.log(err);
                })
                // $route.reload();
        }

        function retrieveSport() {
            GameService
                .retrieveSport('12')
                .then(function(res) {
                    $scope.sports = res.data.data;
                    console.log($scope.sports);
                    console.log(res.data.data);
                }, function(err) {
                    //console.log(err);
                })
        }

        function retrieveAllSports() {
            GameService
                .retrieveAllSports($scope.thisGame.game_id)
                .then(function(res) {
                    $scope.sports = res.data;
                }, function(err) {
                    console.log(err);
                })
        }


        function deleteSport(id) {
            GameService
                .deleteSport(id)
                .then(function(res) {
                    console.log("deleted");
                }, function(err) {
                    console.log(err.data);
                })
        }

        function updateSport(sport) {
            GameService
                .updateSport(sport)
                .then(function(res) {
                    console.log("updated");
                }, function(err) {
                    console.log(err.data);
                })
        }

        function updateWinner(sport) {
            GameService
                .updateWinner(sport)
                .then(function(res) {
                    console.log("updated");
                }, function(err) {
                    console.log(err.data);
                })
        }

    }
})();