'use strict';

(() => {

    angular
        .module('app')
        .controller('CompetitorController', CompetitorController);

    CompetitorController.$inject = ['$scope', 'CompetitorService', 'UserService'];

    function CompetitorController($scope, CompetitorService, UserService) {
        $scope.competitor = {};
        $scope.competitorteams = [];
        $scope.editComp = {};

        $scope.searchCompetitor = searchCompetitor;
        $scope.editCompetitor = editCompetitor;
        $scope.getCompetitor = getCompetitor;
        $scope.getCompetitorTeams = getCompetitorTeams;
        
        function searchCompetitor(id){
            CompetitorService
                .searchCompetitor(id)
                .then(function(res) {
                    $scope.competitor = res;
                }, function(err) {
                    console.log(err);
                })
        }

        function editCompetitor(){
            // $scope.editComp.first_name = $('#firstname').val();
            // $scope.editComp.last_name = $('#lastname').val();
            // $scope.editComp.birthdate = $('#birthdate').val();
            // $scope.editComp.nickname = $('#nickname').val();
            // $scope.editComp.sex = $('#sex').val();
            // $scope.editComp.id = $('#competitorid').val();

            console.log($scope.competitor);
            CompetitorService
                .editCompetitor($scope.competitor)
                .then(function (res){
                    console.log("added");
                }, function(err) {
                    console.log(err);
                })
        }

        function getCompetitor(){
            UserService
                .getUserInfo()
                .then(function(res) {
                    $scope.competitor = res.data;
                    console.log(res.data);
                }, function(err) {
                    console.log(err);
                })
        }

        function getCompetitorTeams(){
            CompetitorService
                .getCompetitorTeams()
                .then(function(res) {
                    $scope.competitorteams = res.data;
                    console.log(res.data);
                }, function(err) {
                    console.log(err);
                })
        }
    }
})();