'use strict';

(() => {

    angular
        .module('app')
        .controller('OrganizationController', OrganizationController);

    OrganizationController.$inject = ['$scope', '$routeParams', 'OrganizationService', 'UserService'];


    function OrganizationController($scope, $routeParams, OrganizationService, UserService) {
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
        $scope.gamesInOrganization = [];
        $scope.teamModal = {};
        $scope.teamMembers = [];
        $scope.retrieveTeams = retrieveTeams;
        $scope.retrieveTeam = retrieveTeam;
        $scope.joinTeam = joinTeam;
        $scope.initPage = initPage;
        //$scope.retrieveMembers = retrieveMembers;
        //$scope.retrieveTeamStatistics = retrieveTeamStatistics;
        //$scope.retrieveOrganizationStatistics = retrieveOrganizationStatistics;
        $scope.retrieveOrganization = retrieveOrganization;
        $scope.retrieveGamesInOrganization = retrieveGamesInOrganization;
        
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
                    Materialize.toast('Error loading organization');
                    console.log(err);
                })
        }

        function retrieveGamesInOrganization(org_id) {
            OrganizationService
                .getGamesInOrganization(org_id)
                .then(function(res) {
                    $scope.gamesInOrganization = res.data;
                }, function(err) {
                    Materialize.toast('Error loading games');
                    console.log(err);
                })
        }

        function retrieveTeams(org_id) {
            OrganizationService
                .retrieveTeams(org_id)
                .then(function(res) {
                    var teamTemp = res.data;
                    var outer = [];
                    
                    if(teamTemp.length < 1)
                        $('#emptyOrganization').text('No Teams Yet');
                    else{
                        $('#emptyOrganization').text('');
                        while(teamTemp.length) outer.push(teamTemp.splice(0,6));
                        
                    }
                    $scope.teams = outer;
                }, function(err) {
                    Materialize.toast('Error loading teams');
                    console.log(err);
                })
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

        function retrieveTeamStatistics(id) {
            OrganizationService
                .retrieveTeamStatistics(id)
                .then(function(res) {
                    console.log(res.data);
                    if (res.data.ranking == null){
                        $scope.teamStats.first = 0;
                        $scope.teamStats.second= 0;
                        $scope.teamStats.third = 0;
                        $scope.teamStats.total = 0;
                        console.log("Not Available");
                    }

                    else{
                        $scope.teamStats.first = res.data[0];
                        $scope.teamStats.second= res.data[1];
                        $scope.teamStats.third = res.data[2];
                        $scope.teamStats.total = res.data[0] + res.data[1] + res.data[2];
                    }
                }, function(err) {
                    Materialize.toast('Error loading details');
                    console.log(err.data);
                })
        }
        //to be to be to be
        function retrieveOrganizationStatistics(id) {
            OrganizationService
                .getOrganizationRankings(1)
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

    }
})();
