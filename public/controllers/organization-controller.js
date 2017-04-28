'use strict';

(() => {

    angular
        .module('app')
        .controller('OrganizationController', OrganizationController);

    OrganizationController.$inject = ['$scope', '$routeParams', 'OrganizationService', 'UserService', '$window'];


    function OrganizationController($scope, $routeParams, OrganizationService, UserService, $window) {
        $scope.thisOrganization = {
            organization_id: $routeParams.id
        };
        $scope.currentUser = {};
        $scope.teams = [];
        $scope.temp = [];
        $scope.teamStats = {
            "first" : 0,
            "second" : 0,
            "third" : 0,
            "total" : 0
        };
        $scope.organizationStats = {
            "first" : 0,
            "second" : 0,
            "third" : 0,
            "total" : 0
        };
        $scope.organization = {};
        $scope.viewedGameID;
        $scope.gamesInOrganization = [];
        $scope.teamModal = {};
        $scope.teamMembers = [];
        $scope.pages = [];
        $scope.isMember = 0;
        $scope.totalPages = 1;
        $scope.pagedTeams=[];
        $scope.filteredGames = [];

        $scope.viewedGame = {}; 
        $scope.retrieveTeams = retrieveTeams;
        $scope.retrieveTeam = retrieveTeam;
        $scope.joinTeam = joinTeam;
        $scope.initPage = initPage;
        //$scope.retrieveMembers = retrieveMembers;
        //$scope.retrieveTeamStatistics = retrieveTeamStatistics;
        //$scope.retrieveOrganizationStatistics = retrieveOrganizationStatistics;
        $scope.retrieveOrganization = retrieveOrganization;
        $scope.retrieveGamesInOrganization = retrieveGamesInOrganization;
        $scope.checkTeamMembership = checkTeamMembership;
        $scope.setViewedGame = setViewedGame;
        $scope.setPageView = setPageView;
        $scope.searchInOrg = searchInOrg;
        
        function initPage(org_id){
            UserService
                .getUserInfo()
                .then(function(res) {
                    $scope.currentUser = res.data;
                }, function(err) {
                    console.log(err.data);
                })
        }

        function retrieveOrganization() {
            OrganizationService
                .getOrganization($scope.thisOrganization.organization_id)
                .then(function(res) {
                    $scope.organization = res.data;
                    retrieveOrganizationStatistics($scope.thisOrganization.organization_id);
                }, function(err) {
                    $window.location.href = '/#/error';
                    console.log(err);
                })
        }

        function retrieveGamesInOrganization(org_id) {
            OrganizationService
                .getGamesInOrganization(org_id)
                .then(function(res) {
                    $scope.gamesInOrganization = res.data;
                    $scope.filteredGames = $scope.gamesInOrganization.slice(0);
                    setViewedGame($scope.gamesInOrganization[0]);
                    console.log (res.data);
                }, function(err) {
                    Materialize.toast('Error loading games');
                    console.log(err);
                })
        }

        
        function setViewedGame(game){
            $scope.viewedGame = game;
            $scope.viewedGameID = game.game_id;
            retrieveTeams($scope.thisOrganization.organization_id);
            console.log($scope.viewedGameID);
        }


        function retrieveTeams(org_id) {
            OrganizationService
                .retrieveTeams(org_id)
                .then(function(res) {
                    $scope.teams = [];
                    var temp = res.data;
                    var i=0;
                    console.log($scope.viewedGameID);
                    for(i=0; i<temp.length; i++) {
                        if(temp[i].game_id == $scope.viewedGameID) {
                            temp[i].statistics = {
                                "first" : 0,
                                "second" : 0,
                                "third" : 0,
                                "total" : 0
                            };
                            retrieveTeamStatistics(temp[i].team_id,temp[i].statistics);
                            //temp[i].statistics = retrieveTeamStatistics(temp[i].team_id);
                            console.log(temp[i]);
                            $scope.teams.push(temp[i]);
                        }
                    }
                    
                }, function(err) {
                    Materialize.toast('Error loading teams');
                    console.log(err);
                })

            $scope.totalPages = Math.floor($scope.teams.length/5)==0?1:$scope.teams.length/5;
            for (var i=0;i<$scope.totalPages;i++)
                $scope.pages.push(i)
            setPageView(0);
            console.log($scope.totalPages);

        }

        function setPageView(page){
            $scope.pagedTeams = [];
            console.log($scope.teams);
            console.log(page*5);
            console.log(page*5+5);
            console.log($scope.teams.length);
            if ($scope.teams.length == 0)
                return;
            $scope.pagedTeams = $scope.teams.slice(page*5, (page*5)+5>$scope.teams.length?$scope.teams.length:(page*5)+5);
            console.log($scope.pagedTeams);
        }


        function retrieveTeam(team_id) {
            OrganizationService
                .retrieveTeam(team_id)
                .then(function(res) {
                    $scope.teamModal = res.data;
                    retrieveMembers(team_id);
                    retrieveTeamStatistics(team_id);
                }, function(err) {
                    Materialize.toast('Error loading details');
                    console.log(err);
                })
        }

        function retrieveMembers(team_id) {
            OrganizationService
                .retrieveMembers(team_id)
                .then(function(res) {
                    $scope.teamMembers = res.data;
                    if($scope.teamMembers.length < 1)
                        $('#emptyTeam').text('No Members Yet');
                    else
                        $('#emptyTeam').text('');
                }, function(err) {
                    Materialize.toast('Error loading details');
                    console.log(err);
                })
        }

        function joinTeam(team_id) {
            OrganizationService
                .joinTeam(team_id)
                .then(function(res) {
                    Materialize.toast('Sucessfully joined team');
                }, function(err) {
                    if(err.data.message.valueOf()=='Duplicate entry') {
                        Materialize.toast('Already sent request');
                    } else {
                        Materialize.toast('Error');
                        console.log(err.data.message);
                    }
                })
        }

        function retrieveTeamStatistics(id, stats) {
            OrganizationService
                .retrieveTeamStatistics(id)
                .then(function(res) {
                    
                    console.log(res.data);
                    if (res.data.ranking == null){
                        $scope.teamStats.first = 0;
                        $scope.teamStats.second= 0;
                        $scope.teamStats.third = 0;
                        $scope.teamStats.total = 0;

                        stats.first = 0;
                        stats.second= 0;
                        stats.third = 0;
                        stats.total = 0;
                        console.log("Not Available");
                    }

                    else{
                        $scope.teamStats.first = res.data[0];
                        $scope.teamStats.second= res.data[1];
                        $scope.teamStats.third = res.data[2];
                        $scope.teamStats.total = res.data[0] + res.data[1] + res.data[2];
                        stats.first = res.data[0];
                        stats.second= res.data[1];
                        stats.third = res.data[2];
                        stats.total = res.data[0] + res.data[1] + res.data[2];

                    }
                    console.log(stats);
                    return stats;
                }, function(err) {
                    Materialize.toast('Error loading details');
                    console.log(err.data);
                })
        }
        //to be to be to be
        function retrieveOrganizationStatistics(id) {
            OrganizationService
                .getOrganizationRankings(id)
                .then(function(res) {
                    if (res.data.ranking == null){
                        $scope.organizationStats.first = 0;
                        $scope.organizationStats.second= 0;
                        $scope.organizationStats.third = 0;
                        $scope.organizationStats.total = 0;
                        console.log("Not Available");
                    }
                    else{
                        $scope.organizationStats.first = res.data[0];
                        $scope.organizationStats.second= res.data[1];
                        $scope.organizationStats.third = res.data[2];
                        $scope.organizationStats.total = res.data[0] + res.data[1] + res.data[2];
                    }
                }, function(err) {
                    Materialize.toast('Error loading details');
                    console.log(err.data);
                })
        }

        function checkTeamMembership(team_id) {
            OrganizationService
                .checkTeamMembership(team_id)
                .then(function(res) {
                    if(res.data == []) {
                        // can join to teams; not a member, did not join yet
                        $scope.isMember = -1;
                    } else if(res.data.is_member == 0) {
                        // pending request
                        $scope.isMember = 1;
                    } else if(res.data.is_member == 1) {
                        // already a member
                        $scope.isMember = 0;
                    }

                }, function(err) {
                    console.log(err.data);
                })
        }

        function searchInOrg(input) {
            console.log("halbira");
            var temp =  $scope.gamesInOrganization;
            var i;
            var matches = [];
            var toSearch = input;

            for(i=0; i<temp.length; i++) {
                var reg = new RegExp(toSearch.toLowerCase(), "i");
                if(reg.test(temp[i].name.toLowerCase()) == true) {
                    matches.push(temp[i]);
                }
            }
            $scope.filteredGames = matches.slice(0);
            setViewedGame($scope.filteredGames[0])
            // matches array contains the results
            console.log($scope.filteredGames);
        }

    }
})();
