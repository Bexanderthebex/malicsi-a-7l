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
        $scope.getOrganizer = getOrganizer;
        $scope.acceptRequest = acceptRequest;
        $scope.organizer = {};
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

        function retrieveGame() {
            OrganizerService
                .retrieveGame('12')
                .then(function(res) {
                    $scope.games = res.data.data;
                    console.log($scope.games);
                    console.log(res.data.data);
                }, function(err) {
                    //console.log(err);
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

        function getRequests(id) {
            OrganizerService
                .getRequests('12')
                .then(function(res) {
                    console.log(res.data.data);
                    $scope.requests = res.data.data;
                }, function(err) {
                    
                })
        }

        function getOrganizer(id) {
            OrganizerService
                .getOrganizer('12')
                .then(function(res) {
                    console.log(res.data);
                    $scope.organizer = res.data;
                }, function(err) {

                })
        }

        function acceptRequest() {
            OrganizerService
                .acceptRequests('12')
                .then(function(res) {
                    console.log("accepted");
                }, function(err) {
                    console.log("error");
                })
        }

        function updateOrganizer() {
            OrganizerService
                .updateOrganizer(organizer)
                .then(function(res) {
                    console.log("updated organizer");
                }, function(err) {
                    console.log("error updating organizer");
                })
        }

    }
})();