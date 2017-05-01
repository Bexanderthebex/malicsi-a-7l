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
            getCompetitorTeamsPublic: getCompetitorTeamsPublic,
            getCompetitorOrganization: getCompetitorOrganization,
            getCoachedTeam: getCoachedTeam,
            getTeamMembers: getTeamMembers,
            createTeam: createTeam,
            deleteTeam: deleteTeam,
            getPendingRequests: getPendingRequests,
            getTeamRankings: getTeamRankings,
            listAllGames: listAllGames,
            viewAllSportsInGame: viewAllSportsInGame,
            viewAllOrganizationInGame: viewAllOrganizationInGame,
            acceptMembershipRequest: acceptMembershipRequest,
            deleteMembershipRequest: deleteMembershipRequest,
            listUpcomingOngoingGamesNotLimited: listUpcomingOngoingGamesNotLimited
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

        function getCompetitorTeamsPublic(competitor_id){
            let deferred = $q.defer();

            $http({
                method: 'GET',
                params: {id: competitor_id},
                url: '/competitor/getCompetitorTeamsPublic',
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

        function listUpcomingOngoingGamesNotLimited(){
            let deferred = $q.defer();

            $http({
                method: 'GET',
                url: '/game/viewUpcomingOngoingGamesNotLimited',
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


        function getTeamRankings(sport_id, id){
            let deferred = $q.defer();
            
            console.log(sport_id);
            $http({
                method: 'GET',
                url: '/sport/comranks/'+sport_id+'/'+id,
                headers: headers
            }).then((res) => {
                console.log(res.data);
                if (res.data[0] == undefined)
                    deferred.resolve([]);
                else
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

        function acceptMembershipRequest(team_id, id){
            let deferred = $q.defer();

            $http({
                method: 'POST',
                params: {"team_id": team_id, "id": id},
                url: '/team/acceptMembershipRequest',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function deleteMembershipRequest(team_id, id){
            let deferred = $q.defer();

            $http({
                method: 'DELETE',
                params: {"team_id": team_id, "id": id},
                url: '/team/deleteMembershipRequest',
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
