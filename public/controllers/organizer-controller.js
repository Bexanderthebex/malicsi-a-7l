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
        $scope.duped_password = "";
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
        $scope.getPublicOrganizerPastGames = getPublicOrganizerPastGames;
        $scope.getOrganizerOngoingGames = getOrganizerOngoingGames;
        $scope.getPublicOrganizerOngoingGames = getPublicOrganizerOngoingGames;
        $scope.getOrganizerUpcomingGames = getOrganizerUpcomingGames;
        $scope.getPublicOrganizerUpcomingGames = getPublicOrganizerUpcomingGames;
        $scope.getOrganizerRequests = getOrganizerRequests;
        $scope.getCurrentUser = getCurrentUser;
        $scope.checkGames = checkGames;

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
        $scope.fileItem ={};

        function getCurrentUser() {	
            $(document).ready(function()
            {
                $("#organizer-profile-img").on("error", function(){
                    $(this).attr("src", "/assets/avatar.png");
                });
            });
            UserService		
                .getUserInfo()		
                .then(function (res){		
                    if(res.data.type != 'O') {
                        $window.location.href = '/';
                    } else {
                        $scope.currentUser = res.data;
                    }	
                 }, function(err) {		
                    Materialize.toast('error', 3000);       
                })      
        }

        function getOrganizer() {
            $(document).ready(function()
            {
                $("#organizer-profile-img").on("error", function(){
                    $(this).attr("src", "/assets/avatar.png");
                });
            });
            OrganizerService
                .getOrganizer($scope.thisOrganizer.orgID)
                .then(function(res) {
                    $scope.thisOrganizerInfo = res.data;
                    if($scope.thisOrganizerInfo == []) {
                        $window.location.href = '/#/error';
                    }
                }, function(err) {
                    $window.location.href = '/#/error';
                })
        }

        function copyGame(game) {
            $scope.gameCopy = {
                gameId: game.game_id,
                name: game.name,
                startDate: new Date(game.start_date),
                endDate: new Date(game.end_date),
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
            $scope.newGame.orgID = $scope.organizer.id;
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

        function getPublicOrganizerPastGames() {
            OrganizerService
                .retrievePastGames($scope.thisOrganizer.orgID)
                .then(function(res) {
                    $scope.pastGames = res.data;
                }, function(err) { 
                    Materialize.toast('Games not retrieved.', 3000);
                })
        }

        function getPublicOrganizerOngoingGames() {
            OrganizerService
                .retrieveOngoingGames($scope.thisOrganizer.orgID)
                .then(function(res) {
                    $scope.ongoingGames = res.data;
                }, function(err) { 
                    Materialize.toast('Games not retrieved.', 3000);
                })
        }

        function getPublicOrganizerUpcomingGames() {
            OrganizerService
                .retrieveUpcomingGames($scope.thisOrganizer.orgID)
                .then(function(res) {
                    $scope.upcomingGames = res.data;
                    console.log($scope.upcomingGames);
                }, function(err) { 
                    Materialize.toast('Games not retrieved.', 3000);
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
                    getOrganizerPastGames();
                    getOrganizerOngoingGames();
                    getOrganizerUpcomingGames();
                }, function(err) {
                    Materialize.toast('Error deleting game!', 3000);
                })
        }

        function updateGame() {
            $scope.gameCopy.startDate = $scope.gameCopy.startDate.getFullYear()+"-"+$scope.gameCopy.startDate.getMonth()+"-"+$scope.gameCopy.startDate.getDate();
            $scope.gameCopy.endDate = $scope.gameCopy.endDate.getFullYear()+"-"+$scope.gameCopy.endDate.getMonth()+"-"+$scope.gameCopy.endDate.getDate();
            
            OrganizerService
                .updateGame($scope.gameCopy)
                .then(function(res) {
                    Materialize.toast('Successfully updated game!', 3000);
                    getOrganizerPastGames();
                    getOrganizerOngoingGames();
                    getOrganizerUpcomingGames();
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
            upload();
            OrganizerService
                .updateOrganizer($scope.organizer)
                .then(function(res) {
                    UserService
                        .updateUser($scope.organizer)
                        .then(function(res) {
                            if($scope.organizer.password) {
                                UserService
                                    .updateUserPassword($scope.organizer)
                                    .then(function(res) {
                                        Materialize.toast('Successfully updated organizer!', 3000);
                                    }, function(err) {
                                        Materialize.toast('Failed to update organizer!', 3000);
                                    })
                            } else Materialize.toast('Successfully updated organizer!', 3000);
                            $window.location.reload();
                        }, function(err) {
                            Materialize.toast('Failed to update organizer!', 3000);
                        })
                }, function(err) {
                    Materialize.toast('Failed to update organizer!', 3000);
                })
        }


        function upload(){
            $scope.fileItem.file = document.getElementById("fileItemOrg").files[0];
            $scope.fileItem.file.newname = $scope.organizer.id;
            $scope.fileItem.name=$scope.organizer.id;
            UserService
                .uploader($scope.fileItem)
                .then(function(res){
                    Materialize.toast("Sucessfully uploaded image", 2000);
                },function(err){
                    console.log(err);
                })
        }

        function checkGames() {
            if (($scope.pastGames).length == 0 && ($scope.ongoingGames).length == 0 && ($scope.upcomingGames).length == 0) {
                return false;
            } else {
                return true;
            }
        }

    }
})();
