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
        $scope.goToCompetitor = goToCompetitor;
        $scope.goToOrganization = goToOrganization;
        $scope.goToSport = goToSport;
        $scope.goToOrganizer = goToOrganizer;
        $scope.goToGame = goToGame;
        $scope.sortBy = sortBy;

        function search(sdata) {
            $scope.atoz = 'atoz';
            $location.path('/search/' + sdata);
            $('#nav-search-bar').sideNav('hide');
            // searchBy($routeParams.sdata, true, true, true, true, true);
        }

        function goToCompetitor(sdata) {
            $location.path('/competitor/profile/' + sdata);
        }

        function goToOrganization(sdata) {
            $location.path('/organization/' + sdata);
        }

        function goToSport(sdata) {
            $location.path('/sports/' + sdata);
        }

        function goToOrganizer(sdata) {
            $location.path('/organizer/profile/' + sdata);
        }

        function goToGame(sdata) {
            $location.path('/game/' + sdata);
        }

        $scope.searchquery = $routeParams.sdata;

        function sortBy(sortMethod){
            if(sortMethod === 'atoz'){
                sortAtoZ();   
            }else{
                sortZtoA();
            }
        }

        function sortAtoZ(){
            $scope.games.sort(function(a, b){
                if(a.name < b.name) return -1;
                if(a.name > b.name) return 1;
                return 0;
            });

            $scope.organizations.sort(function(a, b){
                if(a.name < b.name) return -1;
                if(a.name > b.name) return 1;
                return 0;
            });

            $scope.sports.sort(function(a, b){
                if(a.sport_name < b.sport_name) return -1;
                if(a.sport_name > b.sport_name) return 1;
                return 0;
            });

            $scope.organizers.sort(function(a, b){
                if(a.name < b.name) return -1;
                if(a.name > b.name) return 1;
                return 0;
            });

            $scope.competitors.sort(function(a, b){
                if(a.first_name < b.first_name) return -1;
                if(a.first_name > b.first_name) return 1;
                return 0;
            });
        }

        function sortZtoA(){
            $scope.games.sort(function(a, b){
                if(a.name > b.name) return -1;
                if(a.name < b.name) return 1;
                return 0;
            });

            $scope.organizations.sort(function(a, b){
                if(a.name > b.name) return -1;
                if(a.name < b.name) return 1;
                return 0;
            });

            $scope.sports.sort(function(a, b){
                if(a.sport_name > b.sport_name) return -1;
                if(a.sport_name < b.sport_name) return 1;
                return 0;
            });

            $scope.organizers.sort(function(a, b){
                if(a.name > b.name) return -1;
                if(a.name < b.name) return 1;
                return 0;
            });

            $scope.competitors.sort(function(a, b){
                if(a.first_name > b.first_name) return -1;
                if(a.first_name < b.first_name) return 1;
                return 0;
            });
        }
    
        $scope.searchBy = function(searchquery){
            $scope.results = [];
            $scope.competitors = [];
            $scope.organizations = [];
            $scope.games = [];
            $scope.sports = [];
            $scope.organizers = [];

            searchCompetitor(searchquery);
            searchOrganization(searchquery);
            searchGame(searchquery);
            searchSport(searchquery);
            searchOrganizer(searchquery);

            $scope.searchfor = searchquery;
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