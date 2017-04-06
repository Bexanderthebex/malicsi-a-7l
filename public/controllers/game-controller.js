'use strict';

(() => {

    angular
        .module('app')
        .controller('GameController', GameController);

    GameController.$inject = ['$scope', '$routeParams', 'GameService'];

    function GameController($scope, $routeParams, GameService) {
        $scope.thisGame = {
            game_id: $routeParams.id
        };
        $scope.addSport = addSport;
        $scope.retrieveSport = retrieveSport;
        $scope.deleteSport = deleteSport;
        $scope.updateSport = updateSport;
        $scope.updateWinner = updateWinner;
        $scope.sport = {};
        $scope.sports = [];

        $scope.newSport = {
            sport_id: undefined,
            sport_name: undefined, 
            mechanics: undefined, 
            max_teams: undefined, 
            scoring_system: undefined, 
            game_id: $scope.thisGame.game_id
        };

        function addSport() {
            $scope.newSport.time_start = $('#start-time').val();
            $scope.newSport.time_end = $('#end-time').val();
            $scope.newSport.start_date = $('#start-date').val();
            $scope.newSport.end_date = $('#end-date').val();
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