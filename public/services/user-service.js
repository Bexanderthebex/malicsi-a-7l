'use strict';

(() => {
    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', '$q'];

    const headers = {
        'content-type': 'application/x-www-form-urlencoded'
    };

    function UserService($http, $q) {
        const service = {
            getUserInfo: getUserInfo,
            getUsersByType: getUsersByType,
            setIsActive: setIsActive,
            updateUser: updateUser,
            updateUserPassword: updateUserPassword,
            editPassword: editPassword
        }

        return service;

        function getUserInfo() {
            let deferred = $q.defer();

            $http({
                method: 'GET',
                url: '/user',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function getUsersByType(type) {
            let deferred = $q.defer();

            $http.post('/user/getUsersByType', {
              type : type
            }).then(function(res){
              deferred.resolve(res)
            }, function(err) {
              deferred.reject(err);
            });

            return deferred.promise;
        }

        function setIsActive(isActive, id) {
            let deferred = $q.defer();

            $http.put('/user/${id}/active', {
              is_active: isActive
            }).then(function(res){
              deferred.resolve(res)
            }, function(err) {
                      console.log(err);
              deferred.reject(err);
            });

            return deferred.promise;
        }

        function updateUser(user) {
            let deferred = $q.defer();

            $http.put('/user/update', 
                user
            ).then(function(res){
              deferred.resolve(res);
            }, function(err) {
              deferred.reject(err);
            });

            return deferred.promise;
        }
      
        // function updateUserPassword(user) {
        //     let deferred = $q.defer();

        //     $http.put('/user/updatePassword', 
        //         user
        //     ).then(function(res){
        //         deferred.resolve(res);
        //     }, function(err) {
        //         console.log(err);
        //         deferred.reject(err);
        //     });

        //     return deferred.promise;
        // }

        function updateUserPassword(user) {
            let deferred = $q.defer();

            $http({
                method: 'PUT',
                url: '/user/updatePassword',
                data: $.param(user),
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function updateUserPassword(user) {
            let deferred = $q.defer();

            $http({
                method: 'PUT',
                url: '/user/updatePassword',
                data: $.param(user),
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function editPassword(userID, newPassword) {
            let deferred = $q.defer();

            $http.put('/user/updatePassword', {
                id: userID,
                password: newPassword
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        // function addGame(game) {
        //     let deferred = $q.defer();

        //     $http({
        //         method: 'POST',
        //         data: $.param(game),
        //         url: '/game/createGame',
        //         headers: headers
        //     }).then((res) => {
        //         console.log(res);
        //         deferred.resolve(res);
        //     }, (err) => {
        //         deferred.reject(err);
        //     });

        //     return deferred.promise;
        // }

        // function updateGame(game) {
        //     let deferred = $q.defer();

        //     $http({
        //         method: 'PUT',
        //         params: game, // json
        //         url: '/game/updateGame',
        //         headers: headers
        //     }).then((res) => {
        //         console.log(res.data);
        //         deferred.resolve(res);
        //     }, (err) => {
        //         console.log(err);
        //         deferred.reject(err);
        //     });

        //     return deferred.promise;
        // }

        // function deleteGame(id) {
        //     let deferred = $q.defer();

        //     let game = {
        //         gameId: id
        //     }

        //     $http({
        //         method: 'DELETE',
        //         params: game,
        //         url: '/game/deleteGame',
        //         headers: headers
        //     }).then((res) => {
        //         console.log(res.data);
        //         deferred.resolve(res);
        //     }, (err) => {
        //         deferred.reject(err);
        //     });

        //     return deferred.promise;
        // }
    }
})();
