'use strict';

(() => {

    angular
        .module('app')
        .controller('CompetitorController', CompetitorController);

    CompetitorController.$inject = ['$scope', 'CompetitorService'];

    function CompetitorController($scope, CompetitorService) {
        $scope.competitor = [];
        $scope.competitorteams = [];
        $scope.editComp = {
            first_name: undefined,
            last_name: undefined,
            birthdate: undefined,
            nickname: undefined,
            sex: undefined,
            id: undefined
        }

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
            $scope.editComp.first_name = $('#firstname').val();
            $scope.editComp.last_name = $('#lastname').val();
            $scope.editComp.birthdate = $('#birthdate').val();
            $scope.editComp.nickname = $('#nickname').val();
            $scope.editComp.sex = $('#sex').val();
            $scope.editComp.id = $('#competitorid').val();

            CompetitorService.editCompetitor($scope.editComp).then(function (res){
                    console.log("added");
                }, function(err) {
                    console.log(err);
                })
        }

        function getCompetitor(id){
            CompetitorService
                .getCompetitor(id)
                .then(function(res) {
                    $scope.competitor = res;
                }, function(err) {
                    console.log(err);
                })
        }

        function getCompetitorTeams(id){
            CompetitorService
                .getCompetitorTeams(id)
                .then(function(res) {
                    $scope.competitorteams = res;
                }, function(err) {
                    console.log(err);
                })
        }
    }
})();