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
            getOrganizer: getOrganizer,
            updateOrganizer: updateOrganizer,
            acceptRequest: acceptRequest,
            declineRequest: declineRequest
        }

        return service;

        function retrieveGame(org_id) {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                params: { 'id': org_id },
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
                data: $.param(game), // json
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

            $http({
                method: 'DELETE',
                data: $.param({ gameId: id }),
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
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function acceptRequest(teamId) {
            let deferred = $q.defer();

            $http({ 
                method: 'PUT',
                data: $.param({ 'team_id': teamId }),
                url: '/organizer/processRequest',
                headers: headers
            }).then((res) => {
                console.log(res.data);
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function declineRequest(teamId) {
            let deferred = $q.defer();

            $http({ 
                method: 'DELETE',
                data: $.param({ 'team_id': teamId }),
                url: '/organizer/deleteTeam',
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

        function updateOrganizer(organizer) {
            let deferred = $q.defer();

            $http({
                method: 'PUT',
                data: $.param(organizer),
                url: '/organizer/editOrganizer',
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
