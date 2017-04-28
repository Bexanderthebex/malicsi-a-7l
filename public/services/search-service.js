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
            retrieveTeam: retrieveTeam,
            retrieveGame: retrieveGame,
            retrieveOrganization: retrieveOrganization,
            retrieveSport: retrieveSport,
            retrieveCompetitor: retrieveCompetitor,
            retrieveAdmin: retrieveAdmin,
            retrieveUser: retrieveUser,
            retrieveSponsor: retrieveSponsor,
            retrieveLogByDateAndUsername: retrieveLogByDateAndUsername
        }

        return service;

        function retrieveTeam(search) {
            let deferred = $q.defer();
            $http({
                method: 'GET',
                params: { 'search': search },
                url: '/team/searchTeam',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

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

        function retrieveSponsor(search) {
            let deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/sponsor/searchSponsor',
				params: {search: search},
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

        function retrieveUser(search) {
            let deferred = $q.defer();
            $http({
                method: 'GET',
                params: {'keyword': search},
                url: '/user/searchUser',
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
                params: { 'keyword': search },
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

        function retrieveLogByDateAndUsername(username, startDate, endDate) {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                params: {'username': username, 'startDate': startDate, 'endDate': endDate},
                url: '/log/searchLog',
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
