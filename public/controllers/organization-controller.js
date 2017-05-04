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
        $scope.quitTeam = quitTeam;
        //$scope.retrieveMembers = retrieveMembers;
        //$scope.retrieveTeamStatistics = retrieveTeamStatistics;
        //$scope.retrieveOrganizationStatistics = retrieveOrganizationStatistics;
        $scope.retrieveOrganization = retrieveOrganization;
        $scope.retrieveGamesInOrganization = retrieveGamesInOrganization;
        //$scope.checkTeamMembership = checkTeamMembership;
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
                    $scope.viewedGame = $scope.gamesInOrganization[0];
                    $scope.viewedGameID = $scope.gamesInOrganization[0].game_id;
                    retrieveTeams($scope.thisOrganization.organization_id);
                }, function(err) {
                    Materialize.toast('Error loading games');
                    console.log(err);
                })
        }

        
        function setViewedGame(game){
            $scope.viewedGame = game;
            $scope.viewedGameID = game.game_id;
            retrieveTeams($scope.thisOrganization.organization_id);
        }


        function retrieveTeams(org_id) {
            OrganizationService
                .retrieveTeams(org_id)
                .then(function(res) {
                    $scope.teams = [];
                    $scope.pages = [];
                    var temp = res.data;
                    var i=0;
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
                            $scope.teams.push(temp[i]);
                        }
                    }
                    $scope.totalPages = Math.floor($scope.teams.length/5)==0?1:$scope.teams.length/5;
                    for (var i=0;i<$scope.totalPages;i++) $scope.pages.push(i);
                    var page = 0;
                    $scope.pagedTeams = [];
                    if ($scope.teams.length == 0)
                        return;
                    $scope.pagedTeams = $scope.teams.slice(page*5, (page*5)+5>$scope.teams.length?$scope.teams.length:(page*5)+5);
                }, function(err) {
                    Materialize.toast('Error loading teams');
                    console.log(err);
                })
        }

        function setPageView(page){
            $scope.pagedTeams = [];
            if ($scope.teams.length == 0)
                return;
            $scope.pagedTeams = $scope.teams.slice(page*5, (page*5)+5>$scope.teams.length?$scope.teams.length:(page*5)+5);
        }


        function retrieveTeam(team_id) {
            OrganizationService
                .retrieveTeam(team_id)
                .then(function(res) {
                    $scope.teamModal = res.data;
                    retrieveMembers(team_id);
                    retrieveTeamStatistics(team_id);
                    checkTeamMembership(team_id);
                }, function(err) {
                    Materialize.toast('Error loading details');
                    console.log(err);
                })
        }

        function retrieveMembers(team_id) {
            OrganizationService
                .retrieveMembers(team_id)
                .then(function(res) {
                    let i;
                    let len = res.data.length;
                    for (i = 0 ; i< len; i++){
                        if (res.data[i].is_member == 1)
                            $scope.teamMembers.push(res.data[i]);
                    }
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

            if ($scope.isMember == -1){
                OrganizationService
                    .joinTeam(team_id)
                    .then(function(res) {
                        Materialize.toast('Sucessfully sent request',3000);
                        retrieveTeam(team_id);
                    }, function(err) {
                        if(err.data.message.valueOf()=='Duplicate entry') {
                            Materialize.toast('Already sent request',3000);
                        } else {
                            Materialize.toast('Error');
                            console.log(err.data.message);
                        }
                    })
            }
            else if ($scope.isMember == 0)
                Materialize.toast('Already sent request',3000);
        }

        function retrieveTeamStatistics(id, stats) {
            OrganizationService
                .retrieveTeamStatistics(id)
                .then(function(res) {
                    let i;
                    let st = 0;
                    let nd = 0;
                    let rd = 0;
                    for (i = 0; i < 3;i++){
                        st = res.data[i]==undefined?st:res.data[i].ranking == 1?res.data[i].rankCount:st; 
                        nd = res.data[i]==undefined?nd:res.data[i].ranking == 2?res.data[i].rankCount:nd;
                        rd = res.data[i]==undefined?rd:res.data[i].ranking == 3?res.data[i].rankCount:rd; 
                    } 
                
                    
                    $scope.teamStats.first = st;
                    $scope.teamStats.second= nd;
                    $scope.teamStats.third = rd;
                    $scope.teamStats.total = st + nd + rd;
                    stats.first = st;
                    stats.second= nd;
                    stats.third = rd;
                    stats.total = st + nd + rd;

                    return stats;
                }, function(err) {
                    Materialize.toast('Error loading details');
                    console.log(err.data);
                })
        }
        //to be to be to be
        function retrieveOrganizationStatistics(id) {
            OrganizationService
                .retrieveOrganizationRankings(id)
                .then(function(res) {
                    let i;
                    let st = 0;
                    let nd = 0;
                    let rd = 0;
                    for (i = 0; i < 3;i++){
                        st = res.data[i]==undefined?st:res.data[i].ranking == 1?res.data[i].rankCount:st; 
                        nd = res.data[i]==undefined?nd:res.data[i].ranking == 2?res.data[i].rankCount:nd;
                        rd = res.data[i]==undefined?rd:res.data[i].ranking == 3?res.data[i].rankCount:rd; 
                    } 
                    /*if (res.data.ranking == null){
                        $scope.organizationStats.first = 0;
                        $scope.organizationStats.second= 0;
                        $scope.organizationStats.third = 0;
                        $scope.organizationStats.total = 0;
                        console.log("Not Available");
                    }
                    else{


*/
                        $scope.organizationStats.first = st;
                        $scope.organizationStats.second= nd;
                        $scope.organizationStats.third = rd;
                        $scope.organizationStats.total = st + nd + rd;
                    //}
                }, function(err) {
                    Materialize.toast('Error loading details');
                    console.log(err.data);
                })
        }

        function checkTeamMembership(team_id) {
            OrganizationService
                .checkTeamMembership($scope.currentUser.id,team_id)
                .then(function(res) {
                    if(res.data.length == 0) {
                        // can join to teams; not a member, did not join yet
                        $scope.isMember = -1;
                    } else {
                        // pending request = 0, member = 1
                        $scope.isMember = res.data.is_member;
                    }
                }, function(err) {
                    console.log(err.data);
                })
        }

        function quitTeam(team_id) {
            OrganizationService
                .quitTeam($scope.currentUser.id,team_id)
                .then(function(res) {
                    Materialize.toast("Successfully left the team", 3000);
                }, function(err) {
                    console.log(err.data);
                })
                retrieveTeam(team_id);
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
