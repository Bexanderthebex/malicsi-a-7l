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
            retrieveTeam : retrieveTeam,
            retrieveMembers : retrieveMembers,
            retrieveTeamStatistics : retrieveTeamStatistics,
            retrieveOrganizationRankings: retrieveOrganizationRankings,
            getOrganization: getOrganization,
            getGamesInOrganization: getGamesInOrganization,
            updateOrganization: updateOrganization,
			deleteOrganization: deleteOrganization,
            checkTeamMembership: checkTeamMembership,
            quitTeam: quitTeam
        }

        return service;


        function retrieveOrganizationRankings(org_id) {
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

        function retrieveTeam(team_id) {
            let deferred = $q.defer();
            $http({
                method: 'GET',
                params: { "team_id": team_id },
                url: '/team/getTeam',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function retrieveMembers(team_id) {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                params: { "team_id": team_id },
                url: '/team/getTeamMembers',
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
            $http({
                method: 'POST',
                data: $.param({'team_id' : team_id}),
                url: '/team/teamMembershipRequest',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function checkTeamMembership(id,team_id) {
            let deferred = $q.defer();
            $http({
                method: 'GET',
                params: {
                    "id": id,
                    "team_id": team_id },
                url: '/team/getMembershipRequest',
                headers: headers
            }).then((res) => {
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

        function updateOrganization(organization){
            let deferred = $q.defer();

            $http({
                method: 'PUT',
                data: $.param(organization),
                url: '/organization/editOrganization',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                console.log(err);
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function deleteOrganization(orgId) {
            let deferred = $q.defer();

            $http({
                method: 'DELETE',
                data: $.param({orgId: orgId}),
                url: '/organization/deleteOrganization',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                console.log(err);
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function quitTeam(id,team_id) {
            let deferred = $q.defer();

            $http({
                method: 'DELETE',
                data: $.param({
                    id: id,
                    team_id: team_id}),
                url: '/team/deleteMembershipRequest',
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
    }
})();
