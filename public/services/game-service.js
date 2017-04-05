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
            deleteSport: deleteSport
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

            $http({
                method: 'PUT',
                params: sport, // json
                url: '/sport/updateSport',
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

        function deleteSport(sportId) {
            let deferred = $q.defer();

            let sport = {
                sportID: id
            }

            $http({
                method: 'DELETE',
                params: sport,
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

        
    }
})();
