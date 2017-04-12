'use strict';

(() => {
    angular.module('app')
           .factory('SearchService', SearchService);

    SearchService.$inject = ['$http', '$q'];

    const headers = {
        'content-type': 'application/x-www-form-urlencoded'
    };

    function SearchService($http, $q) {
        const service = {
            retrieveOrganizer: retrieveOrganizer,
            retrieveGame: retrieveGame,
            retrieveOrganization: retrieveOrganization,
            retrieveSport: retrieveSport,
            retrieveCompetitor: retrieveCompetitor,
            retrieveAdmin: retrieveAdmin
        }

        return service;

        function retrieveOrganizer(search) {
            let deferred = $q.defer();
            $http({
                method: 'GET',
                params: { 'search': search },
                url: '/organizer/searchOrganizer',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function retrieveGame(search) {
            let deferred = $q.defer();
            $http({
                method: 'GET',
                params: { 'keyword': search },
                url: '/game/searchGame',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function retrieveSport(search) {
            let deferred = $q.defer();
            $http({
                method: 'GET',
                params: { 'keyword': search },
                url: '/sport/search',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function retrieveOrganization(search) {
            let deferred = $q.defer();
            $http({
                method: 'GET',
                params: { 'search': search },
                url: '/organization/search',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function retrieveCompetitor(search) {
            let deferred = $q.defer();
            $http({
                method: 'GET',
                params: { 'search': search },
                url: '/competitor/searchCompetitor',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

		function retrieveAdmin(search) {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                params: { 'search': search },
                url: '/user/searchAdmin',
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
