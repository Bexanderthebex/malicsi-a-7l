'use strict';

(() => {
    angular.module('app')
           .factory('OrganizerService', OrganizerService);

    OrganizerService.$inject = ['$http', '$q'];

    const headers = {
        'content-type': 'application/x-www-form-urlencoded'
    };

    function OrganizerService($http, $q) {
        const service = {
            retrieveGame: retrieveGame,
            addGame: addGame,
            updateGame: updateGame,
            deleteGame: deleteGame,
            getRequests: getRequests,
            getOrganizer: getOrganizer
        }

        return service;

        function retrieveGame(gameId) {
            let deferred = $q.defer();
            console.log(gameId);
            $http({
                method: 'GET',
                params: { 'id': gameId },
                url: '/organizer/findGames',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });
            
            return deferred.promise;
        }

        function addGame(game) {
            let deferred = $q.defer();
            console.log(game);
            $http({
                method: 'POST',
                data: $.param(game),
                url: '/game/createGame',
                headers: headers
            }).then((res) => {
                console.log(res);
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function updateGame(game) {
            let deferred = $q.defer();

            $http({
                method: 'PUT',
                params: game, // json
                url: '/game/updateGame',
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

        function deleteGame(id) {
            let deferred = $q.defer();

            let game = {
                gameId: id
            }

            $http({
                method: 'DELETE',
                params: game,
                url: '/game/deleteGame',
                headers: headers
            }).then((res) => {
                console.log(res.data);
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function getRequests(id) {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                params: { 'organizer_id': id },
                url: '/organizer/getPendingParticipation',
                headers: headers
            }).then((res) => {
                console.log(res.data.data);
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function acceptRequests(teamId) {
            let deferred = $q.defer();

            $http({ 
                method: 'PUT',
                params: teamId,
                url: '/organizer/acceptRequest',
                headers: headers
            }).then((res) => {
                console.log(res.data);
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }
        
        function getOrganizer(id) {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                params: { 'search': id },
                url: '/organizer/getOrganizer',
                headers: headers
            }).then((res) => {
                console.log(res.data);
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }
    }
})();
