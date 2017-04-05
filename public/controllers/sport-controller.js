'use strict';

(() => {

    angular
        .module('app')
        .controller('SportController', SportController);

    SportController.$inject = ['$scope', 'SportService'];

    function SportController($scope, SportService) {
        $scope.addMatch = addMatch;
        $scope.editMatch = editMatch;
        $scope.deleteMatch = deleteMatch;
        $scope.retrieveMatches = retrieveMatches;
        $scope.retrieveSport = retrieveSport;
        $scope.newMatch = {
            orgID: undefined,
            gameName: undefined,
            startDate: undefined,
            endDate: undefined,
            locat: undefined,
            descrip: undefined
        };

        function retrieveSport() {
            SportService
                .retrieveSport() //parameter is sport id
                .then(function (res){
                    console.log("retrieved sport");
                }, function(err) {
                    console.log("sport not retrieved");
                })
        }

        function addMatch() {
            SportService
                .addMatch($scope.newMatch)
                .then(function (res){
                    Materialize.toast('Added new match!', 3000); 
                }, function(err) {
                    Materialize.toast('New match not added!', 3000); 
                })
        }

        function editMatch() {
            SportService
                .editMatch()
                .then(function (res){
                    Materialize.toast('Edited match!', 3000); 
                }, function(err) {
                    Materialize.toast('Match not edited!', 3000); 
                })
        }

        function deleteMatch() {
            SportService
                .deleteMatch()
                .then(function (res){
                    Materialize.toast('Deleted match!', 3000); 
                }, function(err) {
                    Materialize.toast('Match not deleted!', 3000); 
                })
        }

        function retrieveMatches() {
            SportService
                .retrieveMatches() //parameter is sport id
                .then(function (res){
                    console.log("retrieved matches");
                }, function(err) {
                    console.log(err);
                })
        }
    }
})();