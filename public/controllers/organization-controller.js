'use strict';

(() => {

    angular
        .module('app')
        .controller('OrganizationController', OrganizationController);

    OrganizationController.$inject = ['$scope', 'OrganizationService', 'UserService'];


    function OrganizationController($scope, OrganizationService, UserService) {
        $scope.currentUser = [];
        $scope.teams = [];
        $scope.teamStats = [];
        $scope.organizationStats = [];
        $scope.retrieveTeams = retrieveTeams;
        $scope.joinTeam = joinTeam;
        $scope.initPage = initPage;
        $scope.retrieveTeamStatistics = retrieveTeamStatistics;
        $scope.retrieveOrganizationStatistics = retrieveOrganizationStatistics;

        function initPage(org_id){
            console.log("::DD");
            UserService
                .getUserInfo()
                .then(function(res) {
                    console.log(":D");
                    console.log(res.data);
                    $scope.currentUser = res.data;
                }, function(err) {
                    console.log(err.data);
                })

        }

        function retrieveTeams(org_id) {
            OrganizationService
                .retrieveTeams(org_id)
                .then(function(res) {
                    $scope.teams = res.data;
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
            console.log("WAAA");
            OrganizationService
                .getOrganizationRankings(id)
                .then(function(res) {
                    console.log(res.data);
                    $scope.organizationStats = res.data;
                }, function(err) {
                    console.log(err.data);
                })
        }


    }
})();