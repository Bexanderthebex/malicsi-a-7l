'use strict';

(() => {

    angular
        .module('app')
        .controller('CompetitorController', CompetitorController);

    CompetitorController.$inject = ['$scope', '$window', '$routeParams', 'CompetitorService', 'UserService'];

    function CompetitorController($scope, $window, $routeParams, CompetitorService, UserService) {
        $scope.thisCompetitor = {
            competitor_id: $routeParams.id
        };
        $scope.competitor = {};
        $scope.competitorteams = {};
        $scope.coachedteam = {};
        $scope.organization = {};
        $scope.team = {};
        $scope.team2 = {};
        $scope.teammembers = {};


        $scope.searchCompetitor = searchCompetitor;
        $scope.getCompetitor = getCompetitor;
        $scope.getCompetitorTeams = getCompetitorTeams;
        $scope.getCompetitorOrganization = getCompetitorOrganization;
        $scope.editCompetitor = editCompetitor;
        $scope.editCompetitorBio = editCompetitorBio;
        // $scope.createTeam = createTeam;
        $scope.getCoachedTeam = getCoachedTeam;
        $scope.getTeamMembers = getTeamMembers;
        $scope.deleteTeam = deleteTeam;

        function searchCompetitor(id){
            CompetitorService
                .searchCompetitor($scope.thisCompetitor.competitor_id)
                .then(function(res) {
                    console.log(res.data);
                    $scope.competitor = res.data;
                }, function(err) {
                    console.log(err);
                })
        }

        function getCompetitor(){
            UserService
                .getUserInfo()
                .then(function(res) {
                    $scope.competitor = res.data;
                    console.log($scope.competitor);
                }, function(err) {
                    console.log(err);
                })
        }

        function getCompetitorTeams(){
            CompetitorService
                .getCompetitorTeams()
                .then(function(res) {
                    $scope.competitorteams = res.data;
                    console.log($scope.competitorteams);
                }, function(err) {
                    console.log(err);
                })
        }

        function getCompetitorOrganization(){
            CompetitorService
                .getCompetitorOrganization()
                .then(function(res) {
                    $scope.competitororgs = res.data;
                    console.log(res.data);
                }, function(err) {
                    console.log(err);
                })
        }

        function editCompetitor(){
            $scope.competitor.birthday = $scope.bday.getFullYear()+"-"+($scope.bday.getMonth()+1)+"-"+$scope.bday.getDate();
            // console.log($scope.competitor.birthday);
            CompetitorService
                .editCompetitor($scope.competitor)
                .then(function (res){
                    Materialize.toast('Successfully edited!', 3000);
                    // $window.location.href = '/#/competitor/profile';
                }, function(err) {
                    console.log(err);
                })
        }


        function editCompetitorBio(){
            CompetitorService
                .editCompetitorBio($scope.competitor)
                .then(function (res){
                    Materialize.toast('Successfully edited bio!', 3000);
                    //$window.location.href = '/#/competitor/profile';
                }, function(err) {
                    console.log(err);
                })
        }

        // function createTeam(){
        //     CompetitorService
        //         .createTeam($scope.competitor)
        //         .then(function (res){
        //             Materialize.toast('Successfully created a team!', 3000);
        //             //$window.location.href = '/#/competitor/profile';
        //         }, function(err) {
        //             console.log(err);
        //         })
        // }

        function getCoachedTeam(){
            CompetitorService
                .getCoachedTeam()
                .then(function (res){
                    console.log(res.data);
                    $scope.coachedteam = res.data;
                }, function(err) {
                    console.log(err);
                })
        }

        function getTeamMembers(id){
            // console.log("id: " + id);
            CompetitorService
                .getTeamMembers(id)
                .then(function (res){
                    $scope.teammembers = res.data;
                    // console.log("members: ");
                    // console.log($scope.teammembers);
                }, function(err) {
                    console.log(err);
                })
        }

        function deleteTeam(team_id){
            console.log("team_id: " + team_id);
            CompetitorService
                .deleteTeam(team_id)
                .then(function (res){
                    console.log(res);
                    Materialize.toast('Successfully deleted team!', 3000);
                    getCoachedTeam();
                }, function(err) {
                    console.log(err);
                })

        }

    




    }
})();