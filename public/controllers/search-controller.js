'use strict';

(() => {

    angular
        .module('app')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$scope', '$routeParams', '$location', 'SearchService'];

    function SearchController($scope, $routeParams, $location, SearchService) {
        $scope.results = [];
        $scope.competitors = [];
        $scope.competitors1 = [];
        $scope.competitors2 = [];
        $scope.competitors3 = [];
        $scope.organizations = [];
        $scope.organizations1 = [];
        $scope.organizations2 = [];
        $scope.organizations3 = [];
        $scope.games = [];
        $scope.games1 = [];
        $scope.games2 = [];
        $scope.games3 = [];
        $scope.sports = [];
        $scope.sports1 = [];
        $scope.sports2 = [];
        $scope.sports3 = [];
        $scope.organizers = [];
        $scope.organizers1 = [];
        $scope.organizers2 = [];
        $scope.organizers3 = [];
        $scope.search = search;
        $scope.goToCompetitor = goToCompetitor;
        $scope.goToOrganization = goToOrganization;
        $scope.goToSport = goToSport;
        $scope.goToOrganizer = goToOrganizer;
        $scope.goToGame = goToGame;
        $scope.sortBy = sortBy;
        $scope.atoz = 'atoz';

        $scope.searchquery = $routeParams.sdata;

        function search(sdata) {
            if ($scope.searchbox == undefined
                || $scope.searchbox == null
                || $scope.searchbox.trim() == '') {
                    searchInit();
                    return;
            }
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

        function searchInit() {
            $scope.competitors1 = [];
            $scope.competitors2 = [];
            $scope.competitors3 = [];
            $scope.organizations1 = [];
            $scope.organizations2 = [];
            $scope.organizations3 = [];
            $scope.games1 = [];
            $scope.games2 = [];
            $scope.games3 = [];
            $scope.sports1 = [];
            $scope.sports2 = [];
            $scope.sports3 = [];
            $scope.organizers1 = [];
            $scope.organizers2 = [];
            $scope.organizers3 = [];
            distributeResults();
        }

        function distributeResults(){
            for (var i = 0; i < $scope.games.length; i++) {
                if(i%3 == 0){
                    $scope.games1.push($scope.games[i]);
                }
                else if(i%3 == 1){
                    $scope.games2.push($scope.games[i]);
                }
                else if(i%3 == 2){
                    $scope.games3.push($scope.games[i]);
                }
            }
            for (var i = 0; i < $scope.sports.length; i++) {
                if(i%3 == 0){
                    $scope.sports1.push($scope.sports[i]);
                }
                else if(i%3 == 1){
                    $scope.sports2.push($scope.sports[i]);
                }
                else if(i%3 == 2){
                    $scope.sports3.push($scope.sports[i]);
                }
            }
            for (var i = 0; i < $scope.competitors.length; i++) {
                if(i%3 == 0){
                    $scope.competitors1.push($scope.competitors[i]);
                }
                else if(i%3 == 1){
                    $scope.competitors2.push($scope.competitors[i]);
                }
                else if(i%3 == 2){
                    $scope.competitors3.push($scope.competitors[i]);
                }
            }
            for (var i = 0; i < $scope.organizations.length; i++) {
                if(i%3 == 0){
                    $scope.organizations1.push($scope.organizations[i]);
                }
                else if(i%3 == 1){
                    $scope.organizations2.push($scope.organizations[i]);
                }
                else if(i%3 == 2){
                    $scope.organizations3.push($scope.organizations[i]);
                }
            }
            for (var i = 0; i < $scope.organizers.length; i++) {
                if(i%3 == 0){
                    $scope.organizers1.push($scope.organizers[i]);
                }
                else if(i%3 == 1){
                    $scope.organizers2.push($scope.organizers[i]);
                }
                else if(i%3 == 2){
                    $scope.organizers3.push($scope.organizers[i]);
                }
            }
        }

        function sortBy(){
            if($scope.atoz === 'atoz'){
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

            searchInit();
        }

        function sortZtoA(){
            console.log($scope.games);
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

            searchInit();
        }
    
        $scope.searchBy = function(searchquery){
            if ($scope.searchquery == undefined
                || $scope.searchquery == null
                || $scope.searchquery.trim() == '') {
                    searchInit();
                    return;
            }

            $scope.results = [];
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
                    $scope.organizers = [];
                    $scope.results.push.apply($scope.results, res.data);
                    $scope.organizers = res.data;
                    console.log($scope.results);
                    sortBy('atoz');
                }, function(err){
                    
                })
        }

        function searchGame(search){
            SearchService
                .retrieveGame(search)
                .then(function(res){
                    $scope.games = [];
                    $scope.results.push.apply($scope.results, res.data);
                    $scope.games = res.data;
                    console.log($scope.results);
                    sortBy('atoz');
                }, function(err){
                    
                })
        }

        function searchSport(search){
            SearchService
                .retrieveSport(search)
                .then(function(res){
                    $scope.sports = [];
                    $scope.results.push.apply($scope.results, res.data);
                    $scope.sports = res.data;
                    console.log($scope.results);
                    sortBy('atoz');
                }, function(err){                    
                })
        }

        function searchOrganization(search){
            SearchService
                .retrieveOrganization(search)
                .then(function(res){
                    $scope.organizations = [];
                    $scope.results.push.apply($scope.results, res.data);
                    $scope.organizations = res.data;
                    console.log($scope.organizations);
                    sortBy('atoz');
                }, function(err){                    
                })
        }

        function searchCompetitor(search){
            SearchService
                .retrieveCompetitor(search)
                .then(function(res){
                    $scope.competitors = [];
                    $scope.results.push.apply($scope.results, res.data);
                    $scope.competitors = res.data;
                    console.log($scope.results);
                    sortBy('atoz');
                }, function(err){                    
                })
        }

    }
})();