'use strict';

(() => {

    angular
        .module('app')
        .controller('OrganizerController', OrganizerController);

    OrganizerController.$inject = ['$scope', 'OrganizerService'];

    function OrganizerController($scope, OrganizerService) {
        $scope.addGame = addGame;
        $scope.retrieveGame = retrieveGame;
        $scope.deleteGame = deleteGame;
        $scope.updateGame = updateGame;
        $scope.getRequests = getRequests;
        $scope.requests = [];
        $scope.games = [];
        $scope.newGame = {
            orgID: '12',
            gameName: undefined,
            startDate: undefined,
            endDate: undefined,
            locat: undefined,
            descrip: undefined
        };
  
        function addGame() {
            $scope.newGame.startDate = $('#start-date').val();
            $scope.newGame.endDate = $('#end-date').val();
            console.log($scope.newGame);
            OrganizerService
                .addGame($scope.newGame)
                .then(function (res){
                    console.log("added");
                }, function(err) {
                    console.log(err);
                })
                // $route.reload();
        }

        function retrieveGame(id) {
            OrganizerService
                .retrieveGame(id)
                .then(function(res) {
                    $scope.games = res;
                }, function(err) {
                    console.log(err);
                })
        }

        function deleteGame(id) {
            OrganizerService
                .deleteGame(id)
                .then(function(res) {
                    console.log("deleted");
                }, function(err) {
                    console.log(err.data);
                })
        }

        function updateGame(game) {
            OrganizerService
                .updateGame(game)
                .then(function(res) {
                    console.log("updated");
                }, function(err) {
                    console.log(err.data);
                })
        }

        function getRequests() {
            OrganizerService
                .getRequests()
                .then(function(res) {
                    console.log(res.data);
                    $scope.requests = res.data;
                }, function(err) {
                    console.log(err.data);
                })
        }

    }
})();