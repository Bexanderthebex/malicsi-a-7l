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
        $scope.addSport = addSport;
        $scope.retrieveSport = retrieveSport;
        $scope.deleteSport = deleteSport;
        $scope.updateSport = updateSport;
        $scope.updateWinner = updateWinner;
        $scope.retrieveAllSports = retrieveAllSports;
        $scope.passSport = passSport;
        $scope.viewGameDetails = viewGameDetails;
        $scope.sport = {};
        $scope.sports = [];
        $scope.sportCopy = {};
        $scope.game = {};


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
            console.log("To delete sport " + sport.sportId);
            GameService
                .deleteSport(sport.sportId)
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

    }
})();