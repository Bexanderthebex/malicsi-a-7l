'use strict';

(() => {

    angular
        .module('app')
        .controller('CompetitorController', CompetitorController);

    CompetitorController.$inject = ['$scope', '$window', '$routeParams', 'CompetitorService', 'UserService', 'GameService', 'SearchService', 'OrganizationService'];

    function CompetitorController($scope, $window, $routeParams, CompetitorService, UserService, GameService, SearchService, OrganizationService) {
        $scope.thisCompetitor = {
            competitor_id: $routeParams.id
        };
        $scope.pendingRequested = {};
        $scope.teamAccordion = {};
        $scope.competitor = {};
        $scope.userinfo = {};
        $scope.scoutedApplicant = {};
        $scope.membercount = 0;
        $scope.competitorteams = [];
        $scope.competitorgames = [];
        $scope.coachedteam = [];
        $scope.pendingRequests = [];
        $scope.rank = [];
        $scope.team = {
            team_name: null,
            sport_id: null,
            organization_id: null,
            max_members: 0

        };
        $scope.dup_password ="";
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
        $scope.roaster = [];

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
        $scope.getRecruitRoaster = getRecruitRoaster;
        $scope.setScoutedApplicant = setScoutedApplicant;
        $scope.recruitNewMember = recruitNewMember;
        $scope.isFull= isFull;
        $scope.kickMember = kickMember;
        $scope.setPendingRequest = setPendingRequest;
        // $scope.competitor.$setPristine();
        // $scope.competitor.$setUntouched();

        function initChip(){
            $('.chips').material_chip();

            $('.chips-initial').material_chip({
            data: $scope.teammembers,
            });

            $('.chips').on('chip.delete', function(e, chip){
            kickMember($scope.toKickFrom,$scope.toKickID)
            });
        }

        function searchCompetitor(){
            CompetitorService
                .searchCompetitor($scope.thisCompetitor.competitor_id)
                .then(function(res) {
                    $scope.competitor = res.data;
                    if($scope.competitor == []) {
                        $window.location.href = '/#/error';
                    }
                }, function(err) {
                    $window.location.href = '/#/error';
                })
        }

        function getCompetitor(){
            UserService
                .getUserInfo()
                .then(function(res) {
                    $scope.competitor = res.data;
                    $scope.bday =  new Date($scope.competitor.birthday)
                    if($scope.competitor == []) {
                        $window.location.href = '/';
                    }
                }, function(err) {
                    $window.location.href = '/#/error';
                })
        }

        function getCompetitorTeams(){
            CompetitorService
                .getCompetitorTeams()
                .then(function(res) {
                    $scope.competitorteams = res.data;
                    for(var i = 0; i < $scope.competitorteams.length; i++){
                        GameService
                            .viewGameDetails($scope.competitorteams[i].game_id)
                            .then(function(res) {
                                if(!$scope.competitorgames.find( function find(game){ return game.name === res.data.name })) {
                                    $scope.competitorgames.push(res.data);
                                }
                            }, function(err) {
                                console.log(err);
                            })
                    }
                }, function(err) {
                    console.log(err);
                })
        }

        function getCompetitorTeamsPublic(){
            CompetitorService
                .getCompetitorTeamsPublic($scope.thisCompetitor.competitor_id)
                .then(function(res) {
                    $scope.competitorteams = res.data;
                    for(var i = 0; i < $scope.competitorteams.length; i++){
                        GameService
                            .viewGameDetails($scope.competitorteams[i].game_id)
                            .then(function(res) {
                                if(!$scope.competitorgames.find( function find(game){ return game.name === res.data.name })) {
                                    $scope.competitorgames.push(res.data);
                                }
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
                    Materialize.toast('Successfully edited!', 3000);
                }, function(err) {
                    Materialize.toast('Unsuccessful edit!', 3000);
                    console.log(err);
                })

            UserService
                .updateUserPassword($scope.competitor)
                .then(function (res){
                    //Materialize.toast('Successfully edited!', 3000);
                }, function(err) {
                    //Materialize.toast('Unsuccessful edit!', 3000);
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
                    $scope.membercount = res.data.length;
                }, function(err) {
                    console.log(err);
                })
        }

        function getPendingRequests(){
            CompetitorService
                .getPendingRequests()
                .then(function (res){
                    console.log("\n\n\n\n");
                    console.log(res.data);
                    $scope.pendingRequests = res.data;
                }, function(err) {
                    console.log(err);
                })
        }

        function listAllGames(){
            CompetitorService
                .listUpcomingOngoingGamesNotLimited()
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
            if (isFull($scope.pendingRequests.team_id)){
                Materialize.toast("Team is Already Full");
                return;
            }


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
                }, function(err) {
                    console.log(err);
                })
        }

        function deleteMembershipRequest(team_id,id){
            CompetitorService
                .deleteMembershipRequest(team_id, id)
                .then(function (res){
                    Materialize.toast('Application Declined', 4000);
                }, function(err) {
                    console.log(err);
                })

            CompetitorService
                .getPendingRequests()
                .then(function (res){
                    $scope.pendingRequests = res.data;
                }, function(err) {
                    console.log(err);
                })
        }

        function kickMember(team_id,id){
            if (confirm("Confirm Removing This Member") == true) {
                console.log(team_id);
                console.log(id);
                CompetitorService
                    .deleteMembershipRequest(team_id, id)
                    .then(function (res){
                        Materialize.toast('Kicked a Member', 4000);
                        getTeamMembers(team_id);
                    }, function(err) {
                        console.log(err);
                    })
            }

        }

        function setPendingRequest(pr){
            $scope.pendingRequested.team_id=pr.team_id;
            $scope.pendingRequested.id=pr.id;
            $scope.pendingRequested.first_name=pr.first_name;
            $scope.pendingRequested.team_name=pr.team_name
        }
        
        function isFull(team_id){
            getTeamMembers(team_id);
            var max;
            OrganizationService
            .retrieveTeam(team_id)
            .then(function (res){
               max = (res.data.max_members);
                if (membercount>= max)
                    return true;
                else
                    return false;
            }, function(err) {
                console.log(err);
            })
        }

        function getRecruitRoaster(team){
            $scope.teamAccordion = team;
            var allCompetitor = [];
            $scope.roaster = [];
            SearchService
                .retrieveCompetitor('')
                .then(function (res){
                    allCompetitor = res.data;
                    console.log($scope.teammembers);                
                    console.log(allCompetitor);
                    var i;
                    var teammembersids = [];
                    var allCompetitorids = [];
                    for(i=0;i<res.data.length;i++){
                        allCompetitorids.push(allCompetitor[i].id);
                    }
                    for(i=0;i<$scope.teammembers.length;i++){
                        teammembersids.push($scope.teammembers[i].id);
                    }                                        


                    for(i=0;i<res.data.length;i++){
                        var j;
                        if (teammembersids.includes(allCompetitorids[i]))
                            continue;
                        else
                            $scope.roaster.push(allCompetitor[i]);
                    }
                }, function(err) {
                    console.log(err);
                })    
        }

        function setScoutedApplicant(competitor){
            $scope.scoutedApplicant = {
                first_name: competitor.first_name, 
                last_name: competitor.last_name, 
                nickname: competitor.nickname, 
                id: competitor.id,
                team_id: $scope.teamAccordion.team_id,
                team_name: $scope.teamAccordion.team_name
            }
        }

        function recruitNewMember(){
            console.log($scope.scoutedApplicant.id);
            CompetitorService
                .addTeamMember($scope.scoutedApplicant.team_id, $scope.scoutedApplicant.id)
                .then(function (res){
                    Materialize.toast('Application Success', 4000);
                }, function(err) {
                    console.log(err);
                })
            console.log($scope.scoutedApplicant.team_id);
            getTeamMembers($scope.scoutedApplicant.team_id);
            getRecruitRoaster($scope.teamAccordion);
        }
        


    }
})();