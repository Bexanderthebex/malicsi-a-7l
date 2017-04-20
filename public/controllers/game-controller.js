'use strict';

(() => {

    angular
        .module('app')
        .controller('GameController', GameController);

    GameController.$inject = ['$scope', '$routeParams', 'GameService'];

    function GameController($scope, $routeParams,  GameService) {
        $scope.thisGame = {
            game_id: $routeParams.gameId
        };
        $scope.addZero = addZero;
        $scope.addSport = addSport;
        $scope.clearNewSport = clearNewSport;
        $scope.retrieveSport = retrieveSport;
        $scope.deleteSport = deleteSport;
        $scope.deleteOrganizationFromGame = deleteOrganizationFromGame;
        $scope.updateSport = updateSport;
        $scope.updateWinner = updateWinner;
        $scope.retrieveAllSports = retrieveAllSports;
        $scope.passSport = passSport;
        $scope.viewGameDetails = viewGameDetails;
        $scope.viewPastMatchesInGame = viewPastMatchesInGame;
        $scope.viewOngoingMatchesInGame = viewOngoingMatchesInGame;
        $scope.viewUpcomingMatchesInGame = viewUpcomingMatchesInGame;
        $scope.retrieveMatchesInGame = retrieveMatchesInGame;
        $scope.viewOrgRankings = viewOrgRankings;
        $scope.checkRankings = checkRankings;
        $scope.checkPastMatches = checkPastMatches;
        $scope.checkOngoingMatches = checkOngoingMatches;
        $scope.checkUpcomingMatches = checkUpcomingMatches;
        $scope.viewSponsoringInstitutions = viewSponsoringInstitutions;
        // $scope.deleteSponsoringInstitution = deleteSponsoringInstitution;
        // $scope.addSponsoringInstitution = addSponsoringInstitution;
        $scope.viewOtherSponsoringInstitutions = viewOtherSponsoringInstitutions;
        $scope.initializeSponsoringInstitutions = initializeSponsoringInstitutions;
        $scope.checkSponsors = checkSponsors;
        $scope.passSponsorAdd = passSponsorAdd;
        $scope.passSponsorDelete = passSponsorDelete;
        $scope.checkGameDescription = checkGameDescription;
        $scope.checkGameLocation = checkGameLocation;
        $scope.addOrganizationToGame = addOrganizationToGame;
        $scope.viewAllOrganizationForGame = viewAllOrganizationForGame;
        $scope.viewAllOrganizationInGame = viewAllOrganizationInGame;
        $scope.showCheckedSponsors = showCheckedSponsors;
        $scope.addMultipleSponsors = addMultipleSponsors;
        $scope.deleteMultipleSponsors = deleteMultipleSponsors;
        $scope.checkValidSponsorAdd = checkValidSponsorAdd;
        $scope.checkValidSponsorDel = checkValidSponsorDel;


        $scope.sport = {};
        $scope.sports = [];
        $scope.sportCopy = {};
        $scope.game = {};
        $scope.pastMatches = [];
        $scope.ongoingMatches = [];
        $scope.upcomingMatches = [];
        $scope.temp = [];
        $scope.match_id_tracker = [];
        $scope.organizationRanks = [];
        $scope.tempOrgs = [];
        $scope.sponsors = [];
        $scope.otherSponsors = [];
        $scope.checkedSponsors = [];
        $scope.checkedSponsorsAdd = [];
        $scope.checkedSponsorsDel = [];
        $scope.validSponsorAdd = false;
        $scope.validSponsorDel = false;
        $scope.sponsorAdd = {};
        $scope.sponsorCopy = {};
        $scope.newOrg = {
            org_name: undefined,
            org_rank: undefined
        }

        $scope.newSport = {
            sportName: undefined, 
            mechanics: undefined,
            timeStart: undefined,
            timeEnd: undefined,
            startDate: undefined,
            endDate: undefined, 
            maxTeams: undefined, 
            scoringSystem: undefined, 
            gameID: $scope.thisGame.game_id
        };

        //add existing sponsor to game
        $scope.newSponsorGame = {
            sponsorId: undefined,
            gameId: undefined, 
            name: undefined,
            description: undefined,
            checked: false
        }


        $scope.mergedMatch = {
            team1_id: undefined,
            team1_name: undefined,
            match_id: undefined,
            team2_id: undefined,
            team2_name: undefined,
            time_start: undefined,
            time_end: undefined, 
            match_date: undefined,
            match_id: undefined
        }

        $scope.newOrganizationInGame = {
            orgId: undefined,
            gameId: $scope.thisGame.game_id
        }

        $scope.organizationInGame = {
            orgId: undefined,
            gameId: $scope.thisGame.game_id
        };

        $scope.selectedScoring = undefined;
        $scope.scoringSystemPresets = ["Tally Score", "Round Robin", "Elimination"];

        function addSport() {
            $scope.newSport.sportName = $('#addName').val();
            $scope.newSport.timeStart = $('#addStartTime').val();
            $scope.newSport.timeEnd = $('#addEndTime').val();
            $scope.newSport.startDate = $('#addStartDate').val();
            $scope.newSport.endDate = $('#addEndDate').val();
            $scope.newSport.mechanics = $('#addDescription').val();
            $scope.newSport.maxTeams = $('#addMaxTeams').val();
            $scope.newSport.scoringSystem = $scope.selectedScoring;
            console.log($scope.newSport);
            GameService
                .addSport($scope.newSport)
                .then(function (res){
                    console.log("added");
                    Materialize.toast("Successfully added the sport!", 3000);
                    clearNewSport();
                    retrieveAllSports();
                }, function(err) {
                    console.log(err);
                    Materialize.toast("Failed to add the sport!", 3000);
                })
        }

        function addZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }

        function checkRankings(){
            if($scope.organizationRanks.length == 0 ) return true;
            else false;
        }
        function checkPastMatches(){
            if($scope.pastMatches.length == 0 ) return true;
            else false;
        }
        function checkOngoingMatches(){
            if($scope.ongoingMatches.length == 0 ) return true;
            else false;
        }
        function checkUpcomingMatches(){
            if($scope.upcomingMatches.length == 0 ) return true;
            else false;
        }
        function checkSponsors(){
            if($scope.sponsors.length == 0 ) return true;
            else false;
        }
        function checkGameDescription(){
            if($scope.game.description == undefined) return true;
            else false;
        }
        function checkGameLocation(){
            if($scope.game.location == undefined) return true;
            else false;
        }
        function checkOrganization(){
            if($scope.checkOrganization.length == 0) return true;
            else false;
        }

        function addOrganizationToGame(newOrganizationInGame){
           $scope.newOrganizationInGame.orgId = ("#orgID").val();
           GameService
                .addOrganizationToGame(newOrganizationInGame)
                .then(function (res){
                    console.log("added organization to game");
                    Materialize.toast("Successfully added the Organization!", 3000);
                }, function(err) {
                    console.log(err);
                    Materialize.toast("Failed to add the Organization!", 3000);
                }) 
        function checkValidSponsorAdd(){
            var countAdd=0;
            for(var i = 0; i<$scope.otherSponsors.length; i++){
                if($scope.otherSponsors[i].checked==true) countAdd++;
            }
            if(countAdd>0) $scope.validSponsorAdd=true;
            else $scope.validSponsorAdd=false;
        }
        function checkValidSponsorDel(){
            var countDel=0;
            for(var i = 0; i<$scope.sponsors.length; i++){
                if($scope.sponsors[i].checked==true) countDel++;
            }
            if(countDel>0) $scope.validSponsorDel=true;
            else $scope.validSponsorDel=false;
        }


        function passSport(sport){
            $scope.sportCopy = {
                sport_id: sport.sport_id,
                sport_name: sport.sport_name,
                mechanics: sport.mechanics,
                winner: sport.winner,
                time_start: new Date("2014-01-01T"+sport.time_start+"+08:00"),
                time_end: new Date("2014-01-01T"+sport.time_end+"+08:00"),
                start_date: new Date(sport.start_date+"T00:00:00Z"),
                end_date: new Date(sport.end_date+"T00:00:00Z"),
                max_teams: sport.max_teams,
                scoring_system: sport.scoring_system,
                game_id: sport.game_id
            };
            $scope.selectedScoring = sport.scoring_system;
            console.log(sport);
        }

        function passSponsorAdd(sponsor){
            console.log(JSON.parse(sponsor));
            let parsed = JSON.parse(sponsor);
            $scope.sponsorAdd = {
                name: parsed.name,
                description: parsed.description,
                sponsor_id: parsed.sponsor_id
            }
            console.log($scope.sponsorAdd);
        }

        function passSponsorDelete(sponsor){
            console.log(sponsor);
            
            $scope.sponsorCopy = {
                name: sponsor.name,
                description: sponsor.description,
                sponsor_id: sponsor.sponsor_id,
                game_id: $scope.thisGame.game_id
            }
            console.log($scope.sponsorCopy);
        }


        function clearNewSport(){
            $scope.newSport = {
                sportName: undefined, 
                mechanics: undefined,
                timeStart: undefined,
                timeEnd: undefined,
                startDate: undefined,
                endDate: undefined, 
                maxTeams: undefined, 
                scoringSystem: undefined, 
                gameID: $scope.thisGame.game_id
            };
            $('#addName').val("");
            $('#addStartTime').val("");
            $('#addEndTime').val("");
            $('#addStartDate').val("");
            $('#addEndDate').val("");
            $('#addDescription').val("");
            $('#addMaxTeams').val("");
        }

        function retrieveSport() {
            GameService
                .retrieveSport('12')
                .then(function(res) {
                    $scope.sports = res.data.data;
                    console.log($scope.sports);
                    console.log(res.data.data);
                }, function(err) {
                    //console.log(err);
                })
        }

        function retrieveAllSports() {
            GameService
                .retrieveAllSports($scope.thisGame.game_id)
                .then(function(res) {
                    $scope.sports = res.data;
                }, function(err) {
                    console.log(err);
                    Materialize.toast('Failed to retrieve sports!', 3000);
                })
        }


        function deleteSport(sport) {
            console.log("To delete sport " + sport.sport_id);
            GameService
                .deleteSport(sport.sport_id)
                .then(function(res) {
                    console.log("deleted");
                    Materialize.toast('Successfully deleted the sport!', 3000);
                    retrieveAllSports();
                }, function(err) {
                    console.log(err.data);
                    Materialize.toast('Failed to delete sport!', 3000);
                })
        }

        function deleteOrganizationFromGame(organizationInGame) {
            console.log("To delete organization " + organizationInGame);
            GameService
                .deleteOrganizationFromGame($scope.thisGame.game_id, organizationInGame)
                .then(function(res) {
                    console.log("deleted");
                    Materialize.toast('Successfully deleted the organization from current game!', 3000);
                }, function(err) {
                    console.log(err.data);
                    Materialize.toast('Failed to delete organization!', 3000);
                })
        }

        function updateSport(sport) {
            sport.time_start = sport.time_start.getHours()+":"+sport.time_start.getMinutes() +":"+ sport.time_start.getSeconds();
            sport.time_end = sport.time_end.getHours()+ ":" +sport.time_end.getMinutes() + ":" + sport.time_end.getSeconds();
            sport.start_date = sport.start_date.getFullYear()+"-"+(sport.start_date.getMonth()+1)+"-"+sport.start_date.getDate();
            sport.end_date = sport.end_date.getFullYear()+"-"+(sport.end_date.getMonth()+1)+"-"+sport.end_date.getDate();
            sport.scoring_system = $scope.selectedScoring;
            console.log(sport);
            GameService
                .updateSport(sport)
                .then(function(res) {
                    console.log("updated");
                    Materialize.toast('Successfully updated the sport!', 3000);
                    retrieveAllSports();
                }, function(err) {
                    console.log(err.data);
                    Materialize.toast('Failed to update the sport!', 3000);
                })
        }

        function updateWinner(sport) {
            GameService
                .updateWinner(sport)
                .then(function(res) {
                    console.log("updated");
                }, function(err) {
                    console.log(err.data);
                })
        }

        function viewGameDetails(){
            GameService
                .viewGameDetails($scope.thisGame.game_id)
                .then(function(res){
                    console.log("game details retrieved for game#"+ $scope.thisGame.game_id);
                    console.log(res.data);
                    $scope.game = res.data;
                }, function(err){
                    console.log(err.data);
                    Materialize.toast('Failed to retrieve game details!', 3000);
                })
        }

        function viewAllOrganizationForGame(){
            GameService
                .viewAllOrganizationForGame($scope.thisGame.game_id)
                .then(function(res){
                    console.log("Available organizations retrieved for game#"+ $scope.thisGame.game_id);
                    console.log(res.data);
                    $scope.temp = res.data;
                    for (var i = scope.temp.length -1; i>= 0; i--){
                        $scope.availableOrg = $scope.temp[i].name;
                        $scope.push($scope.availableOrg);
                    }
                }, function(err){
                    console.log(err.data);
                    Materialize.toast('Failed to retrieve Available Organizations!', 3000);
                })
        }

        function viewAllOrganizationForGame(){
            GameService
                .viewAllOrganizationInGame($scope.thisGame.game_id)
                .then(function(res){
                    console.log("Organizations In Game Retrieved"+ $scope.thisGame.game_id);
                    console.log(res.data);
                    $scope.temp = res.data;
                    for (var i = scope.temp.length -1; i>= 0; i--){
                        $scope.availableOrg = $scope.temp[i].name;
                        $scope.push($scope.orgInGame);
                    }
                }, function(err){
                    console.log(err.data);
                    Materialize.toast('Failed to retrieve Organizations in Game!', 3000);
                })
        }


        function retrieveMatchesInGame(){
            viewPastMatchesInGame();
            viewOngoingMatchesInGame();
            viewUpcomingMatchesInGame();
        }

        function viewPastMatchesInGame(){
            GameService
                .viewPastMatchesInGame($scope.thisGame.game_id)
                .then(function(res){
                    console.log("past matches retrieved for game#"+ $scope.thisGame.game_id);
                    console.log(res.data);
                    $scope.temp = res.data;
                    for (var i = $scope.temp.length - 1; i >= 0; i--) {
                        for(var j = $scope.temp.length - 2; j>=0; j--){
                            if($scope.temp[i].match_id == $scope.temp[j].match_id && $scope.temp[i].team_id != $scope.temp[j].team_id && $scope.match_id_tracker.indexOf($scope.temp[i].match_id)==-1){
                                $scope.mergedMatch = {
                                    team1_name: $scope.temp[i].team_name,
                                    team1_id: $scope.temp[i].team_id,
                                    team2_name: $scope.temp[j].team_name,
                                    team2_id: $scope.temp[j].team_id,
                                    match_date: $scope.temp[i].match_date,
                                    time_start: $scope.temp[i].time_start,
                                    time_end: $scope.temp[i].time_end,
                                    match_id: $scope.temp[i].match_id
                                };
                            $scope.pastMatches.push($scope.mergedMatch);
                            $scope.match_id_tracker.push($scope.temp[i].match_id);
                            }
                        }
                    }
                    console.log($scope.pastMatches);                                   
                }, function(err){
                    console.log(err.data);
                    Materialize.toast('Failed to retrieve past matches!', 3000);
                })
        }

        function viewOngoingMatchesInGame(){
            GameService
                .viewOngoingMatchesInGame($scope.thisGame.game_id)
                .then(function(res){
                    console.log("ongoing matches retrieved for game#"+ $scope.thisGame.game_id);
                    console.log(res.data);
                    $scope.temp = res.data;
                    for (var i = $scope.temp.length - 1; i >= 0; i--) {
                        for(var j = $scope.temp.length - 2; j>=0; j--){
                            if($scope.temp[i].match_id == $scope.temp[j].match_id && $scope.temp[i].team_id != $scope.temp[j].team_id && $scope.match_id_tracker.indexOf($scope.temp[i].match_id)==-1){
                                $scope.mergedMatch = {
                                    team1_name: $scope.temp[i].team_name,
                                    team1_id: $scope.temp[i].team_id,
                                    team2_name: $scope.temp[j].team_name,
                                    team2_id: $scope.temp[j].team_id,
                                    match_date: $scope.temp[i].match_date,
                                    time_start: $scope.temp[i].time_start,
                                    time_end: $scope.temp[i].time_end,
                                    match_id: $scope.temp[i].match_id
                                };
                            $scope.ongoingMatches.push($scope.mergedMatch);
                            $scope.match_id_tracker.push($scope.temp[i].match_id);
                            }
                        }
                    }
                    console.log($scope.ongoingMatches);

                }, function(err){
                    console.log(err.data);
                    Materialize.toast('Failed to retrieve ongoing matches!', 3000);
                })
        }
        function viewUpcomingMatchesInGame(){
            GameService
                .viewUpcomingMatchesInGame($scope.thisGame.game_id)
                .then(function(res){
                    console.log("upcoming matches retrieved for game#"+ $scope.thisGame.game_id);
                    console.log(res.data);
                    $scope.temp = res.data;
                    for (var i = $scope.temp.length - 1; i >= 0; i--) {
                        for(var j = $scope.temp.length - 2; j>=0; j--){
                            if($scope.temp[i].match_id == $scope.temp[j].match_id && $scope.temp[i].team_id != $scope.temp[j].team_id && $scope.match_id_tracker.indexOf($scope.temp[i].match_id)==-1){
                                $scope.mergedMatch = {
                                    team1_name: $scope.temp[i].team_name,
                                    team1_id: $scope.temp[i].team_id,
                                    team2_name: $scope.temp[j].team_name,
                                    team2_id: $scope.temp[j].team_id,
                                    match_date: $scope.temp[i].match_date,
                                    time_start: $scope.temp[i].time_start,
                                    time_end: $scope.temp[i].time_end,
                                    match_id: $scope.temp[i].match_id
                                };
                            $scope.upcomingMatches.push($scope.mergedMatch);
                            $scope.match_id_tracker.push($scope.temp[i].match_id);
                            }
                        }
                    }

                }, function(err){
                    console.log(err.data);
                    Materialize.toast('Failed to retrieve upcoming matches!', 3000);
                })
        }

        function viewOrgRankings(){
            GameService
                .viewOrgRankings($scope.thisGame.game_id)
                .then(function(res){
                    console.log("organization rankings retrieved for game#"+ $scope.thisGame.game_id);
                    console.log(res.data);
                    $scope.tempOrgs = res.data;
                    for(var i = 0; i<$scope.tempOrgs.length; i++){      
                        $scope.newOrg = {
                            org_name: $scope.tempOrgs[i].org_name,
                            org_rank: i+1
                        }
                        $scope.organizationRanks.push($scope.newOrg);
                    }
                    console.log($scope.organizationRanks);
                }, function(err){
                    console.log(err.data);
                    Materialize.toast('Failed to retrieve organization rankings!', 3000);
                })
        }

        function initializeSponsoringInstitutions(){
            viewSponsoringInstitutions();
            viewOtherSponsoringInstitutions();
        }

        function viewSponsoringInstitutions(){
            GameService
                .viewSponsoringInstitutions($scope.thisGame.game_id)
                .then(function(res){
                    console.log("sponsoring institutions retrieved for game#"+ $scope.thisGame.game_id);
                    for (var i = 0; i< res.length; i++){
                        $scope.newSponsorGame = {
                            sponsorId: res[i].sponsor_id,
                            gameId: $scope.thisGame.game_id,
                            name: res[i].name,
                            description: res[i].description,
                            checked: false
                        };

                        $scope.sponsors.push($scope.newSponsorGame);

                }, function(err){
                    console.log(err.data);
                    Materialize.toast('Failed to retrieve sponsoring institutions!', 3000);
                })
        }
        
        function viewOtherSponsoringInstitutions(){
            GameService
                .viewOtherSponsoringInstitutions($scope.thisGame.game_id)
                .then(function(res){
                    console.log("other sponsoring institutions retrieved for game#"+ $scope.thisGame.game_id);
                   
                    $scope.sponsorAdd = {};
                    // $scope.otherSponsors = res;
                    // console.log(angular.extend($scope.otherSponsors, res));
                    for (var i = 0; i< res.length; i++){
                        $scope.newSponsorGame = {
                            sponsorId: res[i].sponsor_id,
                            gameId: $scope.thisGame.game_id,
                            name: res[i].name,
                            description: res[i].description,
                            checked: false
                        };

                        $scope.otherSponsors.push($scope.newSponsorGame);
                    }
                     console.log($scope.otherSponsors);
                }, function(err){
                    console.log(err.data);
                    Materialize.toast('Failed to retrieve sponsoring institutions!', 3000);
                })
        }

        // function addSponsoringInstitution(sponsor_id){
        //     GameService
        //         .addSponsoringInstitution(sponsor_id, $scope.thisGame.game_id)
        //         .then(function(res){
        //             console.log("added sponsor institution");
        //             // console.log(res);
        //         }, function(err){
        //             console.log(err.data);
        //             Materialize.toast('Failed to add sponsoring institution!', 3000);
        //         })
        // }

        // function deleteSponsoringInstitution(sponsor_id){
        //     GameService
        //         .deleteSponsoringInstitution(sponsor_id, $scope.thisGame.game_id)
        //         .then(function(res){
        //             console.log("deleted sponsor insitution#"+ $scope.thisGame.game_id);
        //             // console.log(res);
        //         }, function(err){
        //             console.log(err.data);
        //             Materialize.toast('Failed to delete sponsoring institution  !', 3000);
        //         })
        // }

        function showCheckedSponsors(){
            for(var i=0; i<$scope.otherSponsors.length; i++){
                if($scope.otherSponsors[i].checked==true){
                    $scope.checkedSponsors.push ($scope.otherSponsors[i].sponsorId);
                }
            }
            console.log($scope.checkedSponsors);
        }

        function addMultipleSponsors(){
            console.log("adding multiple sponsors:")
            for(var i=0; i<$scope.otherSponsors.length; i++){
                if($scope.otherSponsors[i].checked==true) $scope.checkedSponsorsAdd.push($scope.otherSponsors[i])
            }
            GameService
                .addMultipleSponsoringInstitutions($scope.checkedSponsorsAdd)
                .then(function(res){
                    $scope.sponsors = [];
                    $scope.otherSponsors = [];
                    $scope.checkedSponsorsAdd = [];
                    viewSponsoringInstitutions();
                    viewOtherSponsoringInstitutions();
                    checkValidSponsorAdd();
                    console.log("done adding");
                }, function(err){
                    console.log(err.data);
                    Materialize.toast('Failed to add new sponsoring institutions!', 3000);
                })
        }

        function deleteMultipleSponsors(){
            for(var i=0; i<$scope.sponsors.length; i++){
                if($scope.sponsors[i].checked==true) $scope.checkedSponsorsDel.push($scope.sponsors[i]);
            }
            GameService
                .deleteMultipleSponsoringInstitutions($scope.checkedSponsorsDel)
                .then(function(res){
                    // console.log("deleted sponsoring institutions");
                    $scope.sponsors = [];
                    $scope.otherSponsors = [];
                    $scope.checkedSponsorsDel = [];
                    viewSponsoringInstitutions();
                    viewOtherSponsoringInstitutions();
                    checkValidSponsorDel();
                    console.log("done deleting");
                }, function(err){
                    console.log(err.data);
                    Materialize.toast('Failed to delete sponsoring institutions!', 3000);
                })
        }

    }
})();
