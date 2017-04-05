'use strict';

(() => {

    angular
        .module('app')
        .controller('OrganizerController', OrganizerController);

    OrganizerController.$inject = ['$scope', '$window', 'OrganizerService'];

    function OrganizerController($scope, $window, OrganizerService) {
        //"declare" functions para magamit sa view
        $scope.addGame = addGame;
        $scope.retrieveGame = retrieveGame;
        $scope.deleteGame = deleteGame;
        $scope.updateGame = updateGame;
        $scope.getRequests = getRequests;
        $scope.getOrganizer = getOrganizer;
        $scope.acceptRequest = acceptRequest;
        $scope.updateOrganizer = updateOrganizer;
        $scope.copy = copy;

        //kumabaga "declare" or "initialize" "variables" para mag-access sa front-end yung mga data
        $scope.organizer = {};
        $scope.game = {};
        $scope.requests = [];
        $scope.games = [];
        $scope.newGame = {
            orgID: undefined,
            gameName: undefined,
            startDate: undefined,
            endDate: undefined,
            locat: undefined,
            descrip: undefined
        };

        function copy(game) {
            $scope.gameCopy = {
                gameId: game.game_id,
                name: game.name,
                startDate: game.start_date,
                endDate: game.end_date,
                location: game.location,
                description: game.description
            }
        }

        function addGame() {
            $scope.newGame.startDate = $('#start-date').val();
            $scope.newGame.endDate = $('#end-date').val();
            console.log($scope.newGame);
            OrganizerService
                .addGame($scope.newGame) //calls addGame function in OrganizerService
                .then(function (res){ //function block when success sa OrganizerService
                    console.log("added");
                    Materialize.toast('Successfully added new game!', 3000);
                }, function(err) { //function block when nag-fail yung dapat gawin sa OrganizerService
                    Materialize.toast('New game not added!', 3000);
                })
                // $route.reload();
        }

        function retrieveGame() {
            OrganizerService
                .retrieveGame('12') //parameters depend on kung ano kailangan ng back-end controllers
                .then(function(res) { //function block when success in service
                    $scope.games = res.data.data; //ilalagay sa $scope.games yung res na nakuha sa back-end
                    //$scope para ma-access siya sa frontend
                    //accessible sa front-end yung mga $scope using ng-model
                    console.log($scope.games);
                    console.log(res.data.data);
                }, function(err) { //function block when failed
                    Materialize.toast('Games not retrieved.', 3000);
                })
        }

        function deleteGame() {
            OrganizerService
                .deleteGame(id)
                .then(function(res) {
                    Materialize.toast('Successfully deleted game!', 3000);
                }, function(err) {
                    Materialize.toast('Error deleting game!', 3000);
                })
        }

        function updateGame() {
            OrganizerService
                .updateGame($scope.gameCopy)
                .then(function(res) {
                    Materialize.toast('Successfully updated game!', 3000);
                    $scope.retrieveGame();
                }, function(err) {
                    console.log(err.data);
                })
        }

        function getRequests(id) {
            OrganizerService
                .getRequests('12')
                .then(function(res) {
                    console.log(res.data.data);
                    $scope.requests = res.data.data;
                }, function(err) {
                    Materialize.toast('Error retrieving requests.', 3000);
                })
        }

        function getOrganizer(id) {
            OrganizerService
                .getOrganizer('12')
                .then(function(res) {
                    console.log(res.data);
                    $scope.organizer = res.data;
                }, function(err) {
                    Materialize.toast('Error retrieving organizer!', 3000);
                })
        }

        function acceptRequest() {
            OrganizerService
                .acceptRequests('12')
                .then(function(res) {
                    Materialize.toast('Successfully accepted request!', 3000);
                }, function(err) {
                    Materialize.toast('Failed to accept request!', 3000);
                })
        }

        function updateOrganizer() {
            OrganizerService
                .updateOrganizer($scope.organizer)
                .then(function(res) {
                    console.log("updated organizer");
                    Materialize.toast('Successfully updated organizer!', 3000);
                }, function(err) {
                    Materialize.toast('Failed to update organizer!', 3000);
                })
        }

    }
})();