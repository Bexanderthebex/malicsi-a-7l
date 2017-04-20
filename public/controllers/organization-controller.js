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
        $scope.currentUser = [];
        $scope.teams = [];
        $scope.temp = [];
        $scope.teamStats = [];
        $scope.organizationStats = [];
        $scope.organization = {};
        $scope.gamesInOrganization = [];
        $scope.retrieveTeams = retrieveTeams;
        $scope.joinTeam = joinTeam;
        $scope.initPage = initPage;
        $scope.retrieveTeamStatistics = retrieveTeamStatistics;
        $scope.retrieveOrganizationStatistics = retrieveOrganizationStatistics;
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
                    console.log("Data:");
                    console.log(res.data);
                    $scope.organization = res.data;
                }, function(err) {
                    console.log(err);
                })
        }

        function retrieveGamesInOrganization(org_id) {
            OrganizationService
                .getGamesInOrganization(org_id)
                .then(function(res) {
                    console.log(res.data);
                    $scope.gamesInOrganization = res.data;
                }, function(err) {
                    console.log(err);
                })
        }

        function retrieveTeams(org_id) {
            OrganizationService
                .retrieveTeams(org_id)
                .then(function(res) {
                    $scope.teams = res.data;
                    console.log($scope.teams);
                }, function(err) {
                    console.log(err);
                })
        }

        function joinTeam(team_id) {
            OrganizationService
                .joinTeam(1,team_id)
                .then(function(res) {
                    console.log("Joined");
                }, function(err) {
                    console.log(err.data);
                })
        }

        function retrieveTeamStatistics(id) {
            OrganizationService
                .retrieveTeamStatistics(id)
                .then(function(res) {
                    $scope.teamStats = res.data;
                }, function(err) {
                    console.log(err.data);
                })
        }
        //to be to be to be
        function retrieveOrganizationStatistics(id) {
            OrganizationService
                .getOrganizationRankings(1)
                .then(function(res) {
                    console.log(res.data);
                    $scope.organizationStats = res.data;
                }, function(err) {
                    console.log(err.data);
                })
        }

    }
})();
