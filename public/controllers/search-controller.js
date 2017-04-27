'use strict';

(() => {

    angular
        .module('app')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$scope', '$routeParams', '$location', 'SearchService'];

    function SearchController($scope, $routeParams, $location, SearchService) {
        $scope.results = [];
        $scope.competitors = [];
        $scope.organizations = [];
        $scope.games = [];
        $scope.sports = [];
        $scope.organizers = [];
        $scope.search = search;


        function search(sdata) {
            $location.path('/search/' + sdata);
            // searchBy($routeParams.sdata, true, true, true, true, true);
        }

        $scope.searchquery = $routeParams.sdata;
    
        $scope.searchBy = function(searchquery, game, organization, sport, competitor, organizer){
            $scope.results = [];
            $scope.competitors = [];
            $scope.organizations = [];
            $scope.games = [];
            $scope.sports = [];
            $scope.organizers = [];

            if(competitor){
                searchCompetitor(searchquery);
            }

            if(organization){
                searchOrganization(searchquery);
            }

            if(game){
                searchGame(searchquery);
            }

            if(sport){
                searchSport(searchquery);
            }

            if(organizer){
                searchOrganizer(searchquery);
            }
        }

        function searchOrganizer(search){
            SearchService
                .retrieveOrganizer(search)
                .then(function(res){
                    $scope.results.push.apply($scope.results, res.data);
                    $scope.organizers = res.data;
                    console.log($scope.results);
                }, function(err){
                    
                })
        }

        function searchGame(search){
            SearchService
                .retrieveGame(search)
                .then(function(res){
                    $scope.results.push.apply($scope.results, res.data);
                    $scope.games = res.data;
                    console.log($scope.results);
                }, function(err){
                    
                })
        }

        function searchSport(search){
            SearchService
                .retrieveSport(search)
                .then(function(res){
                    $scope.results.push.apply($scope.results, res.data);
                    $scope.sports = res.data;
                    console.log($scope.results);
                }, function(err){                    
                })
        }

        function searchOrganization(search){
            SearchService
                .retrieveOrganization(search)
                .then(function(res){
                    $scope.results.push.apply($scope.results, res.data);
                    $scope.organizations = res.data;
                    console.log($scope.organizations);
                }, function(err){                    
                })
        }

        function searchCompetitor(search){
            SearchService
                .retrieveCompetitor(search)
                .then(function(res){
                    $scope.results.push.apply($scope.results, res.data);
                    $scope.competitors = res.data;
                    console.log($scope.results);
                }, function(err){                    
                })
        }

    }
})();