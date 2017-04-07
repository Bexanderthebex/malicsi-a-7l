'use strict';

(() => {
    angular.module('app')
           .factory('AdminService', AdminService);

    AdminService.$inject = ['$http', '$q'];

    const headers = {
        'content-type': 'application/x-www-form-urlencoded'
    };

    function AdminService($http, $q) {
        const service = {
            retrieveAdmin: retrieveAdmin, // Admin
            addAdmin: addAdmin,
            updateAdmin: updateAdmin,
            deleteAdmin: deleteAdmin,
            retrieveOrganizer: retrieveOrganizer, // Organizer
            addOrganizer: addOrganizer,
            updateOrganizer: updateOrganizer,
            deleteOrganizer: deleteOrganizer,
            retrieveUser: retrieveUser, // User
            addUser: addUser,
            updateUser: updateUser,
            deleteUser: deleteUser,
            retrieveLog: retrieveLog // Log
        }

        return service;

        function addGame(game) {
            let deferred = $q.defer();
            console.log(game);
            $http({
                method: 'POST',
                data: $.param(game),
                url: '/game/createGame',
                headers: headers
            }).then((res) => {
                console.log(res);
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function updateAdmin(admin) {
            let deferred = $q.defer();
            console.log(admin);
            $http({
                method: 'POST',
                data: $.param(admin),
                url: '/admin/createGame',
                headers: headers
            }).then((res) => {
                console.log(res);
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        function retrieveAdmin(type) {
            let deferred = $q.defer();
            console.log(type);
            $http({
                method: 'POST',
                params: { 'type': type },
                url: '/user/getUsersByType',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });
            
            return deferred.promise;
        }

        function retrieveOrganizer(type) {
            let deferred = $q.defer();
            console.log(type);
            $http({
                method: 'POST',
                params: { 'type': type },
                url: '/user/getUsersByType',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });
            
            return deferred.promise;
        }

        function retrieveUser() {
            let deferred = $q.defer();
            console.log("Retrieve User");
            $http({
                method: 'POST',
                url: '/user/getAllUsers',
                headers: headers
            }).then((res) => {
                deferred.resolve(res);
            }, (err) => {
                deferred.reject(err);
            });
            
            return deferred.promise;
        }

        function retrieveLog() {
            let deferred = $q.defer();
            console.log("Retrieve Log");
            $http({
                method: 'GET',
                url: '/log/viewAllLogs',
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
