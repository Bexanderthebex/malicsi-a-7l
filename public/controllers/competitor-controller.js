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

        $scope.team = {
            team_name: null,
            sport_id: null,
            organization_id: null,
            max_members: 0

        };

        $scope.competitorteams = [];
        $scope.coachedteam = [];
        $scope.pendingRequests = [];
        $scope.rank = [];
        $scope.sport_id = [];
        $scope.listgames = [];
        $scope.game = [];
        $scope.sports = [];
        $scope.organizations = [];

        $scope.searchCompetitor = searchCompetitor;
        $scope.getCompetitor = getCompetitor;
        $scope.getCompetitorTeams = getCompetitorTeams;
        $scope.getCompetitorOrganization = getCompetitorOrganization;
        $scope.editCompetitor = editCompetitor;
        $scope.editCompetitorBio = editCompetitorBio;
        $scope.createTeam = createTeam;
        $scope.getCoachedTeam = getCoachedTeam;
        $scope.getTeamMembers = getTeamMembers;
        $scope.getPendingRequests = getPendingRequests;
        $scope.getTeamRankings = getTeamRankings;
        $scope.listAllGames = listAllGames;
        $scope.listAllSportAndOrganization = listAllSportAndOrganization;
        $scope.deleteTeam = deleteTeam;
        $scope.acceptMembershipRequest = acceptMembershipRequest;
        $scope.deleteMembershipRequest = deleteMembershipRequest;
        
        function searchCompetitor(id){
            CompetitorService
                .searchCompetitor($scope.thisCompetitor.competitor_id)
                .then(function(res) {
                    //console.log(res.data);
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
                    if($scope.competitor == []) {
                        $window.location.href = '/';
                    }
                }, function(err) {
                    console.log(err);
                })
        }

        function getCompetitorTeams(){
            CompetitorService
                .getCompetitorTeams()
                .then(function(res) {
                    $scope.competitorteams = res.data;
                }, function(err) {
                    console.log(err);
                })
        }

        function getCompetitorOrganization(){
            CompetitorService
                .getCompetitorOrganization()
                .then(function(res) {
                    $scope.competitororgs = res.data;
                }, function(err) {
                    console.log(err);
                })
        }

        function editCompetitor(){
            $scope.competitor.birthday = $scope.bday.getFullYear()+"-"+($scope.bday.getMonth()+1)+"-"+$scope.bday.getDate();
           
            console.log($scope.competitor);
            CompetitorService
                .editCompetitor($scope.competitor)
                .then(function (res){
                    // Materialize.toast('Successfully edited!', 3000);
                }, function(err) {
                    Materialize.toast('Unsuccessful edit!', 3000);
                    console.log(err);
                })

            UserService
                .updateUser($scope.competitor)
                .then(function (res){
                    // Materialize.toast('Successfully edited!', 3000);
                }, function(err) {
                    Materialize.toast('Unsuccessful edit!', 3000);
                    console.log(err);
                })

            UserService
                .updateUserPassword($scope.competitor)
                .then(function (res){
                    Materialize.toast('Successfully edited!', 3000);
                }, function(err) {
                    Materialize.toast('Unsuccessful edit!', 3000);
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

        function createTeam(){
            console.log($scope.team);
            $scope.team.sport_id = $scope.team.sport_id.sport_id;
            $scope.team.team_organization = $scope.team.team_organization.organization_id;
            
            CompetitorService
                .createTeam($scope.team)
                .then(function (res){
                    Materialize.toast('Successfully created a team!', 3000);
                    // $window.location.href = "/competitor/profile";
                }, function(err) {
                    console.log(err);
                })

            CompetitorService
                .getCoachedTeam()
                .then(function (res){
                    $scope.coachedteam = res.data;
                }, function(err) {
                    console.log(err);
                })

            CompetitorService
                .getCoachedTeam()
                .then(function (res){
                    // console.log(res.data);
                    $scope.coachedteam = res.data;
                }, function(err) {
                    console.log(err);
                })

            // CompetitorService
            //     .getTeamMembers(id)
            //     .then(function (res){
            //         $scope.teammembers = res.data;
            //        // console.log("members: ");
            //         //console.log($scope.teammembers);
            //     }, function(err) {
            //         console.log(err);
            //     })

        }

        function getCoachedTeam(){
            CompetitorService
                .getCoachedTeam()
                .then(function (res){
                    $scope.coachedteam = res.data;
                    // console.log($scope.coachedteam);
                }, function(err) {
                    console.log(err);
                })
        }

        function getTeamMembers(id){
            CompetitorService
                .getTeamMembers(id)
                .then(function (res){
                    $scope.teammembers = res.data;
                }, function(err) {
                    console.log(err);
                })
        }

        function getPendingRequests(){
            CompetitorService
                .getPendingRequests()
                .then(function (res){
                    $scope.pendingRequests = res.data;
                    console.log($scope.pendingRequests);
                }, function(err) {
                    console.log(err);
                })
        }

        function listAllGames(){
            CompetitorService
                .listAllGames()
                .then(function (res){
                    $scope.listgames = res.data;
                }, function(err) {
                    console.log(err);
                })
        }

        function getTeamRankings(){
            CompetitorService
                .getTeamRankings($scope.sport_id.sport_id)
                .then(function (res){
                    $scope.rank = res.data;
                }, function(err) {
                    console.log(err);
                })
        }

        function listAllSportAndOrganization(){
            CompetitorService
                .viewAllSportsInGame($scope.game.game_id)
                .then(function (res){
                    $scope.sports = res.data;
                    // console.log($scope.sports);
                }, function(err) {
                    console.log(err);
                })

            CompetitorService
                .viewAllOrganizationInGame($scope.game.game_id)
                .then(function (res){
                    $scope.organizations = res.data;
                    // console.log($scope.organizations);
                }, function(err) {
                    console.log(err);
                })
        }

        function deleteTeam(){
            // console.log($scope.team.team_id);
            CompetitorService
                .deleteTeam($scope.team.team_id)
                .then(function (res){
                    $scope.rank = res.data;
                }, function(err) {
                    console.log(err);
                })
        }

        function acceptMembershipRequest(){
            console.log($scope.pendingRequests.team_id);
            CompetitorService
                .acceptMembershipRequest($scope.pendingRequests.team_id)
                .then(function (res){
                    Materialize.toast('Application Success', 4000);
                }, function(err) {
                    console.log(err);
                })

            CompetitorService
                .getPendingRequests()
                .then(function (res){
                    $scope.pendingRequests = res.data;
                    console.log($scope.pendingRequests);
                }, function(err) {
                    console.log(err);
                })
        }

        function deleteMembershipRequest(){
            console.log($scope.pendingRequests.team_id);
            CompetitorService
                .deleteMembershipRequest($scope.pendingRequests.team_id)
                .then(function (res){
                    Materialize.toast('Application Declined', 4000);
                }, function(err) {
                    console.log(err);
                })

            CompetitorService
                .getPendingRequests()
                .then(function (res){
                    $scope.pendingRequests = res.data;
                    console.log($scope.pendingRequests);
                }, function(err) {
                    console.log(err);
                })
        }


    }
})();