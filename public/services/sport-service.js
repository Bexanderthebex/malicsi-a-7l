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
            editTeamRanking: editTeamRanking,
            deleteMatch: deleteMatch,
            retrieveMatches: retrieveMatches,
            retrieveSport: retrieveSport,
            retrieveGame: retrieveGame,
            retrieveSportRankings: retrieveSportRankings,
            retrieveSponsors: retrieveSponsors,
            viewCurrentMatch: viewCurrentMatch,
            viewPastMatch: viewPastMatch,
            viewFutureMatch: viewFutureMatch,
            retrieveTeamsInMatch:retrieveTeamsInMatch,
            addTeamInMatch:addTeamInMatch,
            deleteTeamInMatch:deleteTeamInMatch,
            retrieveTeamsInSport:retrieveTeamsInSport
        }

        return service;

        function addMatch(newMatch) {
            let deferred = $q.defer();
            
            let ddata = {
                timeStart: newMatch.timeStart,
                timeEnd: newMatch.timeEnd,
                date: newMatch.date,
                sportID: newMatch.sportID
            }

            $http({
                method: 'POST',
                data: $.param(ddata),
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
            let ddata = {
                timeStart: match.timeStart,
                timeEnd: match.timeEnd,
                date: match.date,
                matchID: match.matchID,
                remarks: match.remarks
            }

            $http({
                method: 'PUT',
                data: $.param(ddata),
                url: '/sport/match/editMatch',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });
            
            return deferred.promise;
        }



        function editTeamRanking(matchId,teamId,ranking) {
            let deferred = $q.defer();
            
            let ddata = {
                ranking: ranking,
                matchID: matchId,
                teamID: teamId
            }

            $http({
                method: 'PUT',
                data: $.param(ddata),
                url: '/sport/match/editTeamRankingInMatch',
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
            let ddata = {
                matchId: match
            }

            $http({
                method: 'DELETE',
                data: $.param(ddata),
                url: '/sport/match/deleteMatch',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });
            
            return deferred.promise;
        }

         function addTeamInMatch(match_id, team_id) {
            let deferred = $q.defer();
            
            let ddata = {
                matchId : match_id,
                teamId : team_id
            }

            $http({
                method: 'POST',
                data: $.param(ddata),
                url: '/sport/match/addTeamInMatch',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });
            
            return deferred.promise;
        }

        function deleteTeamInMatch(match_id, team_id) {
            let deferred = $q.defer();
            let ddata = {
                matchId: match_id,
                teamId: team_id
            }

            $http({
                method: 'DELETE',
                data: $.param(ddata),
                url: '/sport/match/deleteTeamInMatch',
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
        //start of added part -melbex
        function viewCurrentMatch(sport_id){
            let deferred = $q.defer();
            console.log(sport_id);
            $http({
                method: 'GET',
                url: '/sport/match/viewCurrentMatch/' + sport_id,
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function viewPastMatch(sport_id){
            let deferred = $q.defer();
            console.log(sport_id);
            $http({
                method: 'GET',
                url: '/sport/match/viewPastMatch/' + sport_id,
                headers: headers
            }).then((res) =>{
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function viewFutureMatch(sport_id){
            let deferred = $q.defer();
            console.log(sport_id);
            $http({
                method: 'GET',
                url: '/sport/match/viewUpcomingMatch/' + sport_id,
                headers: headers
            }).then((res) =>{
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function retrieveTeamsInMatch(match_id) {
            let deferred = $q.defer();
            console.log(match_id);
            $http({
                method: 'GET',
                url: '/sport/match/retrieveTeamsInMatch/'+ match_id,
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });
            
            return deferred.promise;
        }

        function retrieveTeamsInSport(sport_id) {
            let deferred = $q.defer();
            console.log(sport_id);
            $http({
                method: 'GET',
                url: '/sport/retrieveTeamsInSport/'+ sport_id,
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

        function retrieveGame(game_id) {
            let deferred = $q.defer();
            console.log(game_id);
            $http({
                method: 'GET',
                params: { 'gameId':game_id },
                url: '/game/viewGame',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });
            
            return deferred.promise;
        }


        function retrieveSportRankings(sport_id) {
            let deferred = $q.defer();
            console.log(sport_id);
            $http({
                method: 'GET',
                url: '/sport/rankings/' + sport_id,
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });
            
            return deferred.promise;
        }

        function retrieveSponsors(sport_id) {
            let deferred = $q.defer();
            console.log(sport_id);
            $http({
                method: 'GET',
                url: '/sport/viewSponsorInSport/' + sport_id,
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });
            
            return deferred.promise;
        }

        function retrieveMatchWinner(sport_id) {
            let deferred = $q.defer();
            console.log(sport_id);
            $http({
                method: 'GET',
                //params: { 'sportId':sport_id },
                url: '/game/retrieveMatchWinner/' + sport_id,
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
