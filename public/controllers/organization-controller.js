'use strict';

(() => {

    angular
        .module('app')
        .controller('OrganizationController', OrganizationController);

    OrganizationController.$inject = ['$scope', 'OrganizationService'];

    function OrganizationController($scope, OrganizationService) {
        $scope.teams = [];
        $scope.teamStats = [];
        $scope.retrieveTeams = retrieveTeams;
        $scope.joinTeam = joinTeam;
        $scope.retrieveTeamStatistics = retrieveTeamStatistics;
        $scope.retrieveOrganizationStatistics = retrieveOrganizationStatistics;

        function retrieveTeams(org_id) {
            OrganizationService
                .retrieveTeams(org_id)
                .then(function(res) {
                    $scope.teams = res.data;
                }, function(err) {
                    console.log(err);
                })
        }

        function joinTeam(id,team_id) {
            OrganizationService
                .joinTeam(id,team_id)
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
        function retrieveOrganizationStatistics() {
            OrganizationService
                .getOrganizationRankings()
                .then(function(res) {
                    console.log(res.data);
                    $scope.requests = res.data;
                }, function(err) {
                    console.log(err.data);
                })
        }


    }
})();