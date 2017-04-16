'use strict';

(() => {

    angular
        .module('app')
        .controller('GameFeedController', GameFeedController);

    GameFeedController.$inject = ['$scope', '$routeParams', 'GameService', 'SearchService'];

    function GameFeedController($scope, $routeParams,  GameService, SearchService){
        $scope.games = [];
        $scope.column1 = [];
        $scope.column2 = [];
        $scope.column3 = [];
        $scope.gamefeedInit = gamefeedInit;
<<<<<<< HEAD
        $scope.statusSort = true;

        function gamefeedInit(value){
            $scope.statusSort = value;
            $scope.games = [];
            $scope.column1 = [];
            $scope.column2 = [];
            $scope.column3 = [];
            console.log("asdf");
            retrieveGames(value);
        }



        function retrieveGames(value) {
=======

        function gamefeedInit(){
            retrieveGames();
        }

        function retrieveGames() {
>>>>>>> 9c95485b035026ef96a9cea66f8a7aacb4e9560c
            GameService
                .viewAllGames()
                .then(function(res) {
                    $scope.games = res.data;
<<<<<<< HEAD
                    sortBy(value);
                    distributeGame();
=======
                    sortBy();
                    
>>>>>>> 9c95485b035026ef96a9cea66f8a7aacb4e9560c

                }, function(err) {
                    console.log(err);
                    // Materialize.toast('', 3000);
                })
        }

        function sortBy(value){
            console.log("joiurishs")
            console.log(value)
            // sort the games
            if(value == "true"){
                sortByName();
            }else{
                sortByDate();
            }
        }

        function sortByName(){
            $scope.games.sort(function(a, b){
                if(a.name < b.name) return -1;
                if(a.name > b.name) return 1;
                return 0;
            });
<<<<<<< HEAD

            console.log("reflect daw");
            console.log($scope.games);
=======
            distributeGame();
>>>>>>> 9c95485b035026ef96a9cea66f8a7aacb4e9560c
        }

        function sortByDate(){
            $scope.games.sort(function(a, b){
                var aDate = new Date(a.start_date);
                var bDate = new Date(b.start_date);
                var currentDate = new Date(Date.now());

                var integerADate = aDate.getFullYear() * 10000 + aDate.getMonth() * 100 + aDate.getDay();
                var integerBDate = bDate.getFullYear() * 10000 + bDate.getMonth() * 100 + bDate.getDay();

                return (currentDate - integerADate > currentDate - integerBDate ? a : b);
            });
            distributeGame();
        }

        function distributeGame(){
            for (var i = 0; i < $scope.games.length; i++) {
                if(i%3 == 0){
                    $scope.column1.push($scope.games[i]);
                }
                else if(i%3 == 1){
                    $scope.column2.push($scope.games[i]);
                }
                else if(i%3 == 2){
                    $scope.column3.push($scope.games[i]);
                }
            }
        }


        function searchGame() {
            SearchService
                .retrieveGames($scope.thisGame.game_id)
                .then(function(res) {
                    $scope.sports = res.data;
                }, function(err) {
                    console.log(err);
                    Materialize.toast('Failed to retrieve sports!', 3000);
                })
        }

        function searchGame(search){
            SearchService
                .retrieveGame(search)
                .then(function(res){
                    $scope.games = res.data;
                    retrieveGames("false");
                }, function(err){
                    
                })
        }

    }
})();
