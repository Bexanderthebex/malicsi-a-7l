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
        $scope.retrieveSport = retrieveSport;
        $scope.deleteSport = deleteSport;
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
        $scope.sport = {};
        $scope.sports = [];
        $scope.sportCopy = {};
        $scope.game = {};
        $scope.pastMatches = [];
        $scope.ongoingMatches = [];
        $scope.upcomingMatches = [];
        $scope.temp = [];
        $scope.match_id_tracker = [];
        $scope.organizations = [];
        $scope.tempOrgs = [];

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

        function addSport() {
            $scope.newSport.sportName = $('#addName').val();
            $scope.newSport.timeStart = $('#addStartTime').val();
            $scope.newSport.timeEnd = $('#addEndTime').val();
            $scope.newSport.startDate = $('#addStartDate').val();
            $scope.newSport.endDate = $('#addEndDate').val();
            $scope.newSport.mechanics = $('#addDescription').val();
            $scope.newSport.maxTeams = $('#addMaxTeams').val();
            $scope.newSport.scoringSystem = $('#addScoringSystem').val();
            console.log($scope.newSport);
            GameService
                .addSport($scope.newSport)
                .then(function (res){
                    console.log("added");
                    Materialize.toast("Successfully added the sport!", 3000);
                }, function(err) {
                    console.log(err);
                    Materialize.toast("Failed to add the sport!", 3000);
                })
                // $route.reload();
        }

        function addZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }


        function passSport(sport){
            $scope.sportCopy = {
                sport_id: sport.sport_id,
                sport_name: sport.sport_name,
                mechanics: sport.mechanics,
                winner: sport.winner,
                time_start: sport.time_start,
                time_end: sport.time_end,
                start_date: sport.start_date,
                end_date: sport.end_date,
                max_teams: sport.max_teams,
                scoring_system: sport.scoring_system,
                game_id: sport.game_id
            };
            console.log(sport);
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

        function updateSport(sport) {            
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
                    console.log(res.data[0]);
                    $scope.game = res.data[0];
                }, function(err){
                    console.log(err.data);
                    Materialize.toast('Failed to retrieve game details!', 3000);
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
                            if($scope.temp[i].match_id == $scope.temp[j].match_id && $scope.temp[i].team_id != $scope.temp[j        ].team_id && $scope.match_id_tracker.indexOf($scope.temp[i].match_id)==-1){
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
                        $scope.organizations.push($scope.newOrg);
                    }
                    console.log($scope.organizations);
                }, function(err){
                    console.log(err.data);
                    Materialize.toast('Failed to retrieve organization rankings!', 3000);
                })
        }
        



    }
})();