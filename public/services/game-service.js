'use strict';

(() => {
    angular.module('app')
           .factory('GameService', GameService);

    GameService.$inject = ['$http', '$q'];

    const headers = {
        'content-type': 'application/x-www-form-urlencoded'
    };

    function GameService($http, $q) {
        const service = {
            retrieveSport: retrieveSport,
            addSport: addSport,
            updateSport: updateSport,
            updateWinner: updateWinner,
            deleteSport: deleteSport,
            retrieveAllSports: retrieveAllSports,
            viewGameDetails: viewGameDetails,
            viewPastMatchesInGame: viewPastMatchesInGame,
            viewOngoingMatchesInGame: viewOngoingMatchesInGame,
            viewUpcomingMatchesInGame: viewUpcomingMatchesInGame,
            viewOrgRankings: viewOrgRankings
        }

        return service;

        function retrieveSport(sportId) {
            let deferred = $q.defer();
            console.log(sportId);
            $http({
                method: 'GET',
                params: { 'sportId': sportId },
                url: '/sport/viewSport',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });
            
            return deferred.promise;
        }

        function retrieveAllSports(gameId) {
            let deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/game/viewAllSportsInGame/'+gameId,
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });
            
            return deferred.promise;
        }

        function viewGameDetails(game_id){
            let deferred = $q.defer();
            let game = {
                gameId: game_id
            }

            $http({
                method: 'GET',
                params: game,
                url: '/game/viewGame/',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });
            
            return deferred.promise;
        }

        

        function addSport(sport) {
            let deferred = $q.defer();
            console.log(sport);
            $http({
                method: 'POST',
                data: $.param(sport),
                url: '/sport/createSport',
                headers: headers
            }).then((res) => {
                console.log(res);
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function updateSport(sport) {
            let deferred = $q.defer();

            let editedSport = {
                sportName: sport.sport_name,
                mechanics: sport.mechanics,
                timeStart: sport.time_start,
                timeEnd: sport.time_end,
                startDate: sport.start_date,
                endDate: sport.end_date,
                maxTeams: sport.max_teams,
                scoringSystem: sport.scoring_system,
                sportId: sport.sport_id
            }
            console.log(editedSport);
            $http({
                method: 'PUT',
                data: $.param(editedSport), // json
                url: '/sport/editSport',
                headers: headers
            }).then((res) => {
                console.log(res.data);
                deferred.resolve(res);
            }, (err) => {
                console.log(err);
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function updateWinner(sport) {
            let deferred = $q.defer();

            let ddata = {
                winner: sport.winner,
                sportId: sport.sport_id
            }

            $http({
                method: 'POST',
                params: sport, // json
                url: '/sport/addWinnerSport',
                headers: headers
            }).then((res) => {
                console.log(res.data);
                deferred.resolve(res);
            }, (err) => {
                console.log(err);
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function deleteSport(id) {
            let deferred = $q.defer();

            let sport = {
                sportId: id
            }

            $http({
                method: 'DELETE',
                data: $.param(sport),
                url: '/sport/deleteSport',
                headers: headers
            }).then((res) => {
                console.log(res.data);
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function viewPastMatchesInGame(game_id){
            let deferred = $q.defer();
            let game = {
                gameId: game_id
            }

            $http({
                method: 'GET',
                params: game,
                url: '/game/viewAllPastMatchesInGame',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });
            
            return deferred.promise;
        }
        function viewOngoingMatchesInGame(game_id){
            let deferred = $q.defer();
            let game = {
                gameId: game_id
            }


            $http({
                method: 'GET',
                params: game,
                url: '/game/viewAllOngoingMatchesInGame',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });
            
            return deferred.promise;
        }
        
        function viewUpcomingMatchesInGame(game_id){
            let deferred = $q.defer();
            let game = {
                gameId: game_id
            }

            $http({
                method: 'GET',
                params: game, 
                url: '/game/viewAllUpcomingMatchesInGame',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });
            
            return deferred.promise;
        }
        function viewOrgRankings(gameId) {
            let deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/game/ranks/'+gameId,
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });
            
            return deferred.promise;
        }
    }
})();
