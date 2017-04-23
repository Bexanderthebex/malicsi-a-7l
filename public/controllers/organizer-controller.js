'use strict';

(() => {

    angular
        .module('app')
        .controller('OrganizerController', OrganizerController);

    OrganizerController.$inject = ['$scope', '$window', '$routeParams', 'OrganizerService', 'UserService'];

    function OrganizerController($scope, $window, $routeParams, OrganizerService, UserService) {
        $scope.thisOrganizer = {
            orgID: $routeParams.id
        };
        $scope.addGame = addGame;
        $scope.deleteGame = deleteGame;
        $scope.updateGame = updateGame;
        $scope.getRequests = getRequests;
        $scope.getOrganizer = getOrganizer;
        $scope.acceptRequest = acceptRequest;
        $scope.declineRequest = declineRequest;
        $scope.updateOrganizer = updateOrganizer;
        $scope.copyGame = copyGame;
        $scope.copyRequest = copyRequest;
        $scope.getOrganizerPastGames = getOrganizerPastGames;
        $scope.getOrganizerOngoingGames = getOrganizerOngoingGames;
        $scope.getOrganizerUpcomingGames = getOrganizerUpcomingGames;
        $scope.getOrganizerRequests = getOrganizerRequests;

        $scope.organizer = {};
        $scope.game = {};
        $scope.requests = [];
        $scope.newGame = {
            orgID: undefined,
            gameName: undefined,
            startDate: undefined,
            endDate: undefined,
            locat: undefined,
            descrip: undefined
        };

        function copyGame(game) {
            $scope.gameCopy = {
                gameId: game.game_id,
                name: game.name,
                startDate: game.start_date,
                endDate: game.end_date,
                location: game.location,
                description: game.description
            }
        }

        function copyRequest(request) {
            $scope.requestCopy = {
                team_id: request.team_id,
                team_name: request.team_name,
                sport_name: request.sport_name
            }
        }

        function addGame() {
            $scope.newGame.startDate = $('#game-start-date').val();
            $scope.newGame.endDate = $('#game-end-date').val();
            $scope.newGame.orgID = $scope.organizer.id;
            console.log($scope.newGame);
            OrganizerService
                .addGame($scope.newGame) //calls addGame function in OrganizerService
                .then(function (res){ //function block when success sa OrganizerService
                    Materialize.toast('Successfully added new game!', 3000);
                    $scope.newGame = {
                        orgID: undefined,
                        gameName: undefined,
                        startDate: undefined,
                        endDate: undefined,
                        locat: undefined,
                        descrip: undefined
                    };
                    getOrganizerPastGames();
                    getOrganizerOngoingGames();
                    getOrganizerUpcomingGames();
                }, function(err) { //function block when nag-fail yung dapat gawin sa OrganizerService
                    Materialize.toast('New game not added!', 3000);
                })
        }

        function getOrganizerPastGames() {
            UserService
                .getUserInfo()
                .then(function (res){
                    $scope.organizer = res.data;
                    OrganizerService
                        .retrievePastGames($scope.organizer.id)
                        .then(function(res) {
                            $scope.pastGames = res.data;
                            console.log($scope.pastGames);
                        }, function(err) { 
                            Materialize.toast('Games not retrieved.', 3000);
                        })
                }, function(err) {
                    Materialize.toast('error', 3000);
                })
        }

        function getOrganizerOngoingGames() {
            UserService
                .getUserInfo()
                .then(function (res){
                    $scope.organizer = res.data;
                    OrganizerService
                        .retrieveOngoingGames($scope.organizer.id)
                        .then(function(res) {
                            $scope.ongoingGames = res.data;
                            console.log($scope.ongoingGames);
                        }, function(err) { 
                            Materialize.toast('Games not retrieved.', 3000);
                        })
                }, function(err) {
                    Materialize.toast('error', 3000);
                })
        }

        function getOrganizerUpcomingGames() {
            UserService
                .getUserInfo()
                .then(function (res){
                    $scope.organizer = res.data;
                    OrganizerService
                        .retrieveUpcomingGames($scope.organizer.id)
                        .then(function(res) {
                            $scope.upcomingGames = res.data;
                            console.log($scope.upcomingGames);
                        }, function(err) { 
                            Materialize.toast('Games not retrieved.', 3000);
                        })
                }, function(err) {
                    Materialize.toast('error', 3000);
                })
        }

        function getOrganizerRequests() {
            UserService
                .getUserInfo()
                .then(function (res){
                    $scope.organizer = res.data;
                    getRequests();
                }, function(err) {
                    Materialize.toast('error', 3000);
                })
        }

        function deleteGame() {
            OrganizerService
                .deleteGame($scope.gameCopy.gameId) //game id
                .then(function(res) {
                    Materialize.toast('Successfully deleted game!', 3000);
                    retrieveGame();
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
                    Materialize.toast('Failed to update game.', 3000);
                })
        }

        function getRequests() {
            OrganizerService
                .getRequests($scope.organizer.id)
                .then(function(res) {
                    $scope.requests = res.data;
                }, function(err) {
                    Materialize.toast('Error retrieving requests.', 3000);
                })
        }
        
        function getCurrentUser() {		
            UserService		
                .getUserInfo()		
                .then(function (res){		
                    $scope.currentUser = res.data;		
                    if($scope.competitor == []) {
                        $window.location.href = '/';
                    }		
                 }, function(err) {		
                    Materialize.toast('error', 3000);		
                })		
        }

        function getOrganizer() {
            OrganizerService
                .getOrganizer($scope.thisOrganizer.orgID)
                .then(function(res) {
                    $scope.thisOrganizer = res.data;
                }, function(err) {
                    Materialize.toast('Error retrieving organizer!', 3000);
                })
        }

        function acceptRequest() {
            OrganizerService
                .acceptRequest($scope.requestCopy.team_id)
                .then(function(res) {
                    Materialize.toast('Successfully accepted request!', 3000);
                    getOrganizerRequests();
                }, function(err) {
                    Materialize.toast('Failed to accept request!', 3000);
                })
        }

        function declineRequest() {
            OrganizerService
                .declineRequest($scope.requestCopy.team_id)
                .then(function(res) {
                    Materialize.toast('Successfully rejected request!', 3000);
                    getOrganizerRequests();
                }, function(err) {
                    Materialize.toast('Failed to reject request!', 3000);
                })
        }

        function updateOrganizer() {
            OrganizerService
                .updateOrganizer($scope.organizer)
                .then(function(res) {
                    UserService
                        .updateUser($scope.organizer)
                        .then(function(res) {
                            console.log($scope.organizer.password);
                            if($scope.organizer.password) {
                                UserService
                                    .updatePassword($scope.organizer)
                                    .then(function(res) {
                                        Materialize.toast('Successfully updated organizer!', 3000);
                                    }, function(err) {
                                        Materialize.toast('Failed to update organizer!', 3000);
                                    })
                            } else Materialize.toast('Successfully updated organizer!', 3000);
                        }, function(err) {
                            Materialize.toast('Failed to update organizer!', 3000);
                        })
                }, function(err) {
                    Materialize.toast('Failed to update organizer!', 3000);
                })
        }

    }
})();
