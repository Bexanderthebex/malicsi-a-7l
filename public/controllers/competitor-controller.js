'use strict';

(() => {

    angular
        .module('app')
        .controller('CompetitorController', CompetitorController);

    CompetitorController.$inject = ['$scope', '$window', '$routeParams', 'CompetitorService', 'UserService', 'GameService'];

    function CompetitorController($scope, $window, $routeParams, CompetitorService, UserService, GameService) {
        $scope.thisCompetitor = {
            competitor_id: $routeParams.id
        };
        $scope.competitor = {};
        $scope.userinfo = {};

        $scope.team = {
            team_name: null,
            sport_id: null,
            organization_id: null,
            max_members: 0

        };

        $scope.competitorteams = [];
        $scope.competitorgames = [];
        $scope.coachedteam = [];
        $scope.pendingRequests = [];
        $scope.rank = [];
        $scope.rankings = {
            "first" : 0,
            "second" : 0,
            "third" : 0,
            "total" : 0
        };
        $scope.sport_id = [];
        $scope.listgames = [];
        $scope.game = [];
        $scope.sports = [];
        $scope.organizations = [];

        $scope.searchCompetitor = searchCompetitor;
        $scope.getCompetitor = getCompetitor;
        $scope.getCompetitorTeams = getCompetitorTeams;
        $scope.getCompetitorTeamsPublic = getCompetitorTeamsPublic;
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
        
        function searchCompetitor(){
            CompetitorService
                .searchCompetitor($scope.thisCompetitor.competitor_id)
                .then(function(res) {
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
                    for(var i = 0; i < $scope.competitorteams.length; i++){
                        console.log($scope.competitorteams[i].game_id);
                        GameService
                            .viewGameDetails($scope.competitorteams[i].game_id)
                            .then(function(res) {
                                $scope.competitorgames.push(res.data);
                                console.log($scope.competitorgames);
                            }, function(err) {
                                console.log(err);
                            })
                    }
                }, function(err) {
                    console.log(err);
                })
        }

        function getCompetitorTeamsPublic(){
            // UserService
            //     .getUserInfo()
            //     .then(function(res) {
            //         $scope.userinfo = res.data;
            //         console.log("id: " + $scope.userinfo.id);
            //     }, function(err) {
            //         console.log(err);
            //     })
            CompetitorService
                .getCompetitorTeamsPublic($scope.thisCompetitor.competitor_id)
                .then(function(res) {
                    $scope.competitorteams = res.data;
                    for(var i = 0; i < $scope.competitorteams.length; i++){
                        console.log($scope.competitorteams[i].game_id);
                        GameService
                            .viewGameDetails($scope.competitorteams[i].game_id)
                            .then(function(res) {
                                $scope.competitorgames.push(res.data);
                                console.log($scope.competitorgames);
                            }, function(err) {
                                console.log(err);
                            })
                    }
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

        function getTeamRankings(id){
            CompetitorService
                .getTeamRankings($scope.RankingSportID, id)
                .then(function (res){
                    $scope.rank = res.data;
                    if ($scope.rank == [] || $scope.rank == undefined){
                        $scope.rankings.first = 0;
                        $scope.rankings.second= 0;
                        $scope.rankings.third = 0;
                        console.log("Rankings Unavailable");
                    }
                    else if($scope.rank.length == 3){
                        $scope.rankings.first = $scope.rank[0].ranks;
                        $scope.rankings.second= $scope.rank[1].ranks;
                        $scope.rankings.third = $scope.rank[2].ranks;
                    }
                    else if($scope.rank.length == 2){
                        $scope.rankings.first = $scope.rank[0].ranks;
                        $scope.rankings.second= $scope.rank[1].ranks;
                        $scope.rankings.third = 0;
                    }
                    else{
                        $scope.rankings.first = $scope.rank[0].ranks;
                        $scope.rankings.second= 0;
                        $scope.rankings.third = 0;
                    }
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
                }, function(err) {
                    console.log(err);
                })
        }

        function deleteTeam(team_id){
            console.log(team_id);
            CompetitorService
                .deleteTeam(team_id)
                .then(function (res){
                    Materialize.toast('Team Deletion Success', 4000);
                }, function(err) {
                    console.log(err);
                })
            getCoachedTeam();
        }

        function acceptMembershipRequest(){
            
            CompetitorService
                .acceptMembershipRequest($scope.pendingRequests.team_id, $scope.pendingRequests.id)
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
            console.log("team_id: "+$scope.pendingRequests.team_id + "id: "+$scope.pendingRequests.id);
            CompetitorService
                .deleteMembershipRequest($scope.pendingRequests.team_id, $scope.pendingRequests.id)
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