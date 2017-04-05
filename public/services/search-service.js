'use strict';

(() => {
    angular.module('app')
           .factory('SearchService', SearchService);

    searchService.$inject = ['$http', '$q'];

    const headers = {
        'content-type': 'application/x-www-form-urlencoded'
    };

    function SearchService($http, $q) {
        const service = {
            retrieveOrganizer: retrieveOrganizer,
            retrieveCompetitor: retrieveCompetitor,
            retrieveSport: retrieveSport,
            retrieveGame: retrieveGame
        }

        return service;

        function retrieveOrganizer(search) {
            let deferred = $q.defer();
            console.log(search);
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

        function retrieveCompetitor(search) {
            let deferred = $q.defer();
            console.log(search);
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

        // function retrieveSport(search) {
        //     let deferred = $q.defer();
        //     console.log(search);
        //     $http({
        //         method: 'GET',
        //         params: { 'search': search },
        //         url: '/competitor/searchCompetitor',
        //         headers: headers
        //     }).then((res) => {
        //         deferred.resolve(res);
        //     }, (err) => {
        //         deferred.reject(err);
        //     });
            
        //     return deferred.promise;
        // }

        function retrieveGame(search) {
            let deferred = $q.defer();
            console.log(search);
            $http({
                method: 'GET',
                params: { 'keyword': search },
                url: '/game/search/:keyword',
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
