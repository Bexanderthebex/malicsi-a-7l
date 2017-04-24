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
            editCompetitorBio: editCompetitorBio,
            getCompetitor: getCompetitor,
            getCompetitorTeams: getCompetitorTeams,
            getCompetitorOrganization: getCompetitorOrganization,
            getCoachedTeam: getCoachedTeam,
            getTeamMembers: getTeamMembers,
            createTeam: createTeam,
            deleteTeam: deleteTeam,
            getPendingRequests: getPendingRequests,
            getTeamRankings: getTeamRankings,
            listAllGames: listAllGames,
            viewAllSportsInGame: viewAllSportsInGame,
            viewAllOrganizationInGame: viewAllOrganizationInGame
        }

        return service;

        function searchCompetitor(id) {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                params: { "search": id },
                url: '/competitor/getCompetitor',
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

        function editCompetitorBio(competitor){
            let deferred = $q.defer();

            $http({
                method: 'PUT',
                data: $.param(competitor),
                url: '/competitor/editCompetitorBio',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function getCompetitor(){
            let deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/competitor/getCompetitor',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function getCompetitorTeams(){
            let deferred = $q.defer();

            $http({
                method: 'GET',
                url: '/competitor/getCompetitorTeams',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function getCompetitorOrganization(){
            let deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/competitor/getCompetitorOrganization',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function getCoachedTeam(){
            let deferred = $q.defer();

            $http({
                method: 'GET',
                url: '/team/getCoachedTeams',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function getTeamMembers(id){
            let deferred = $q.defer();

            $http({
                method: 'GET',
                params: {'team_id': id},
                url: '/team/getTeamMembers',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function deleteTeam(id){
            let deferred = $q.defer();

            console.log('teamid service: ' + id);
            $http({
                method: 'DELETE',
                params: {'team_id': id},
                url: '/team/deleteTeam',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function createTeam(team){
            let deferred = $q.defer();

            console.log(team);
            $http({
                method: 'POST',
                data: $.param(team),
                url: '/team/createTeam',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function getPendingRequests(){
            let deferred = $q.defer();

            $http({
                method: 'GET',
                url: '/team/displayPendingMembershipRequest',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function listAllGames(){
            let deferred = $q.defer();

            $http({
                method: 'GET',
                url: '/game/viewAllGames',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        // function listAllSports(){
        //     let deferred = $q.defer();

        //     $http({
        //         method: 'GET',
        //         url: '/sport/viewAllSports',
        //         headers: headers
        //     }).then((res) => {
        //         deferred.resolve(res);
        //     }, (err) => {
        //         deferred.reject(err);
        //     });

        //     return deferred.promise;
        // }


        function getTeamRankings(sport_id){
            let deferred = $q.defer();
            
            $http({
                method: 'GET',
                url: '/sport/ranks/'+sport_id,
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function viewAllSportsInGame(game_id){
            let deferred = $q.defer();
            
            $http({
                method: 'GET',
                url: '/game/viewAllSportsInGame/' + game_id,
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function viewAllOrganizationInGame(game_id){
            console.log(game_id);
            let deferred = $q.defer();
            
            $http({
                method: 'GET',
                params: { 'gameId': game_id },
                url: '/game/viewAllOrganizationInGame/',               
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
