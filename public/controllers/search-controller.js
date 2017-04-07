'use strict';

(() => {

    angular
        .module('app')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$scope', 'SearchService'];

    function SearchController($scope, SearchService) {
        $scope.addSport = addSport;
        $scope.retrieveSport = retrieveSport;
        $scope.deleteSport = deleteSport;
        $scope.updateSport = updateSport;
        $scope.updateWinner = updateWinner;

        function searchOrganizer() {
            SearchService
                .retrieveOrganizer('12')
                .then(function(res) {
                    $scope.sports = res.data.data;
                    console.log(res.data.data);
                }, function(err) {
                    //console.log(err);
                })
        }

        function searchCompetitor() {
            SearchService
                .retrieveCompetitor('12')
                .then(function(res) {
                    $scope.sports = res.data.data;
                }, function(err) {
                    //console.log(err);
                })
        }

        function searchSport() {
            SearchService
                .retrieveSport('12')
                .then(function(res) {
                    $scope.sports = res.data.data;
                }, function(err) {
                    //console.log(err);
                })
        }

        function searchGame() {
            SearchService
                .retrieveGame('12')
                .then(function(res) {
                    $scope.sports = res.data.data;
                }, function(err) {
                    //console.log(err);
                })
        }

        // function searchOrganization() {
        //     SearchService
        //         .retrieveOrganization('12')
        //         .then(function(res) {
        //             $scope.sports = res.data.data;
        //         }, function(err) {
        //             //console.log(err);
        //         })
        // }

        function searchFilter()

    }
})();