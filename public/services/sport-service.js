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
            retrieveMatches: retrieveMatches,
            retrieveSport: retrieveSport,
            retrieveGame: retrieveGame,
            retrieveSportRankings: retrieveSportRankings,
            retrieveSponsors: retrieveSponsors,
            viewCurrentMatch: viewCurrentMatch,
            viewPastMatch: viewPastMatch,
            viewFutureMatch: viewFutureMatch,
            retrieveTeamsInMatch:retrieveTeamsInMatch
        }

        return service;

        function addMatch(newMatch) {
            let deferred = $q.defer();
            console.log(newMatch);
            $http({
                method: 'POST',
                data: $.param(newMatch),
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
                url: '/sport/match/viewFutureMatch/'+sport_id,
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
