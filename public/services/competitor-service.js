'use strict';

(() => {
    angular.module('app')
           .factory('CompetitorService', CompetitorService);

    CompetitorService.$inject = ['$http', '$q'];

    const headers = {
        'content-type': 'application/x-www-form-urlencoded'
    };

    function CompetitorService($http, $q) {
        const service = {
            searchCompetitor: searchCompetitor,
            editCompetitor: editCompetitor,
            getCompetitor: getCompetitor,
            getCompetitorTeams: getCompetitorTeams
        }

        return service;

        function searchCompetitor(id) {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                params: { "competitorId": id },
                url: '/competitor/: competitorId',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function editCompetitor(competitor){
            let deferred = $q.defer();

            $http({
                method: 'PUT',
                data: $.param(competitor),
                url: '/competitor/editCompetitor',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function getCompetitor(id){
            let deferred = $q.defer();

            $http({
                method: 'GET',
                data: $.param(id),
                url: '/competitor/getCompetitor',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function getCompetitorTeams(id){
            let deferred = $q.defer();

            $http({
                method: 'GET',
                params: id,
                url: '/competitor/getCompetitorTeams',
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
