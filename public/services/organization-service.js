'use strict';

(() => {
    angular.module('app')
           .factory('OrganizationService', OrganizationService);

    OrganizationService.$inject = ['$http', '$q'];

    const headers = {
        'content-type': 'application/x-www-form-urlencoded'
    };

        function OrganizationService($http, $q) {
        const service = {
            retrieveTeams : retrieveTeams,
            joinTeam : joinTeam,
            retrieveTeamStatistics : retrieveTeamStatistics,
            getOrganizationRankings: getOrganizationRankings,
            getOrganization: getOrganization,
            getGamesInOrganization: getGamesInOrganization
        }

        return service;


        function getOrganizationRankings(org_id) {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                params: { "org_id": org_id },
                url: '/team/getOrganizationRankings',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function retrieveTeams(org_id) {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                params: { "org_id": org_id },
                url: '/team/getTeamsOnOrganization',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function retrieveTeamStatistics(team_id) {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                params: { "team_id": team_id },
                url: '/team/teamStatistics',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function getOrganizationRankings(org_id) {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                params: { "org_id": org_id },
                url: '/team/teamStatistics',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function joinTeam(team_id) {
            let deferred = $q.defer();
            console.log(game);
            $http({
                method: 'POST',
                data: $.param({'team_id' : team_id}),
                url: '/team/teamMembershipRequest',
                headers: headers
            }).then((res) => {
                console.log(res);
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function getOrganization(org_id) {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                params: { 'organization_id': org_id },
                url: '/organization/getOrganization',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function getGamesInOrganization(org_id) {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                params: { 'organization_id': org_id },
                url: '/organization/getGamesInOrganization',
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
