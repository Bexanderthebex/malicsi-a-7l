'use strict';

(() => {
    angular.module('app')
           .factory('SportService', SportService);

    SportService.$inject = ['$http', '$q'];

    const headers = {
        'content-type': 'application/x-www-form-urlencoded'
    };

    function SportService($http, $q) {
        const service = {
            addMatch: addMatch,
            editMatch: editMatch,
            deleteMatch: deleteMatch,
            retrieveMatches: retrieveMatches
        }

        return service;

        function addMatch(newMatch) {
            let deferred = $q.defer();
            console.log(newMatch);
            $http({
                method: 'POST',
                params: newMatch,
                url: '/sport/match/addMatch',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });
            
            return deferred.promise;
        }

        function editMatch(match) {
            let deferred = $q.defer();
            console.log(match);
            $http({
                method: 'PUT',
                data: $.param(match),
                url: '/sport/match/editMatch',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });
            
            return deferred.promise;
        }

        function deleteMatch(match) {
            let deferred = $q.defer();
            console.log(match);
            $http({
                method: 'DELETE',
                data: $.param(match),
                url: '/sport/match/deleteMatch',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });
            
            return deferred.promise;
        }

        function retrieveMatches(sport_id) {
            let deferred = $q.defer();
            console.log(sport_id);
            $http({
                method: 'GET',
                params: { 'sportId':sport_id },
                url: '/sport/match/viewMatchInSport',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });
            
            return deferred.promise;
        }

        function retrieveSport(sport_id) {
            let deferred = $q.defer();
            console.log(sport_id);
            $http({
                method: 'GET',
                params: { 'sportID':sport_id },
                url: '/sport/viewSport',
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
