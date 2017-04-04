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
        $scope.games = [];
        $scope.game = {};
  
        function addGame(game) {
            OrganizerService
                .addGame(game)
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
        }

    }
})();