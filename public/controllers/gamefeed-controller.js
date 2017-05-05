'use strict';

(() => {

    angular
        .module('app')
        .controller('GameFeedController', GameFeedController);

    GameFeedController.$inject = ['$scope', '$routeParams', 'GameService', 'SearchService', 'OrganizerService', 'UserService'];

    function GameFeedController($scope, $routeParams, GameService, SearchService, OrganizerService, UserService){
        // whole column
        $scope.games = [];
        // two column split
        $scope.splitColumn1 = [];
        $scope.splitColumn2 = [];
        // three column split
        $scope.column1 = [];
        $scope.column2 = [];
        $scope.column3 = [];
        $scope.sortType = 'name';
        $scope.gamefeedInit = gamefeedInit;
        $scope.addGame = addGame;
        $scope.setPending = setPending;
        $scope.deleteGame = deleteGame;
        $scope.editGame = editGame;
        $scope.checkUser = checkUser;
		$scope.searchGame = searchGame;

        UserService.getUserInfo()
        .then((res) => {
            $scope.user = res.data;
        }, (err) => {
            console.log('game feed get current user error', err);
            Materialize.toast('Error getting user data.', 2000);
        });

        function gamefeedInit(){
            $scope.games = [];
            $scope.splitColumn1 = [];
            $scope.splitColumn2 = [];
            $scope.column1 = [];
            $scope.column2 = [];
            $scope.column3 = [];
            retrieveGames();
        }

        function retrieveGames() {
            GameService
                .viewAllGames()
                .then(function(res) {
                    $scope.games = res.data;
                    console.log(res.data);
                    sortBy();
                }, function(err) {
                    console.log(err);
                    // Materialize.toast('', 3000);
                })
        }

        function sortBy(){
            // sort the games
            if($scope.sortType === 'name'){
                sortByName();
            }else if($scope.sortType === 'date'){
                sortByDate();
            }
        }

        function sortByName(){
            $scope.games.sort(function(a, b){
                if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                return 0;
            });
            distributeGame();
        }

        function sortByDate(){
            $scope.games.sort(function(a, b){
                return new Date(b.start_date) - new Date(a.start_date);
            });
            distributeGame();
        }

        function distributeGame(){
            for (var i = 0; i < $scope.games.length; i++) {
                // two column split
                if(i%2 == 0){
                    $scope.splitColumn1.push($scope.games[i]);
                }
                else if(i%2 == 1){
                    $scope.splitColumn2.push($scope.games[i]);
                }

                // three column split
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

        function resetModalData() {
            $scope.gameName = null;
            $scope.location = null;
            $scope.startDate = null;
            $scope.endDate = null;
            $scope.description = null;
        }

        function checkModalData() {
            return $scope.gameName != null
            && $scope.gameName.trim() != ''
            && $scope.location != null
            && $scope.location.trim() != ''
            && $scope.startDate != null
            && $scope.endDate != null
            && $scope.description != null
            && $scope.description.trim() != '';
        }

        function setPending(game) {
            $scope.pending = game;
        }

		function checkUser(game) {
            console.log($scope.user == undefined || $scope.user == null);
			return $scope.user != undefined
				&& $scope.user != null
				&& $scope.user.type == 'O'
                && $scope.user.id == game.organizer_id;
		}

        function addGame() {
            if (!checkModalData()) {
                Materialize.toast('Fill in all fields', 2000)
                return;
            }

            const game = {
                orgID: $scope.user.id,
                gameName: $scope.gameName,
                startDate: $scope.startDate,
                endDate: $scope.endDate,
                locat: $scope.locat,
                descrip: $scope.description
            };

            OrganizerService.addGame(game)
            .then((res) => {
                Materialize.toast('Game added', 2000);
                resetModalData();
                gamefeedInit();
            }, (err) => {
                Materialize.toast('An error occured', 2000);
            });
        }

        function deleteGame() {
            OrganizerService.deleteGame($scope.pending.game_id)
            .then((res) => {
                Materialize.toast('Game deleted', 2000);
                gamefeedInit();
                $scope.pending = null;
            }, (err) => {
                Materialize.toast('An error occured', 2000);
            });
        }

        function editGame() {
            // If a field is empty, use previous value
            let name = $scope.gameName == null
                || $scope.gameName.trim() == ''
                ? $scope.pending.name : $scope.gameName;

            let location = $scope.location == null
                || $scope.location.trim() == ''
                ? $scope.pending.location : $scope.location;

            let description = $scope.description == null
                || $scope.description.trim() == ''
                ? $scope.pending.description : $scope.description;

            let startDate = $scope.startDate == null
                ? $scope.pending.start_date : $scope.startDate;

            let endDate = $scope.endDate == null
                ? $scope.pending.end_date : $scope.endDate;

            const game = {
                gameId: $scope.pending.game_id,
                name: name,
                startDate: startDate,
                endDate: endDate,
                location: location,
                description: description
            };

            OrganizerService.updateGame(game)
            .then((res) => {
                Materialize.toast('Game edited', 2000);
                resetModalData();
                gamefeedInit();
                $scope.pending = null;
            }, (err) => {
                Materialize.toast('An error occured', 2000);
            });
        }

        function searchGame() {
            console.log($scope.gameFeedSearch)
            if ($scope.gameFeedSearch == undefined
                || $scope.gameFeedSearch == null
                || $scope.gameFeedSearch.trim() == '') {
                    gamefeedInit();
                    return;
            }

            SearchService.retrieveGame($scope.gameFeedSearch)
            .then((res) => {
                $scope.games = [];
                $scope.column1 = [];
                $scope.column2 = [];
                $scope.column3 = [];
                $scope.splitColumn1 = [];
                $scope.splitColumn2 = [];
                $scope.games = res.data;
                distributeGame();
            }, (err) => {
                Materialize.toast('An error occured', 2000);
            });
        }
    }
})();