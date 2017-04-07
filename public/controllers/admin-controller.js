(() => {
    angular.module('app')
        .controller('AdminCtrl', AdminCtrl);

    AdminCtrl.$inject = ['$scope', '$http', 'UserService', 'AdminService'];

    function AdminCtrl($scope, $http, UserService, AdminService) {
        $scope.admins = [];

        UserService.getUsersByType('A').then((res) => {
            $scope.admins = res.data;
        }, (err) => {
            console.log(err);
        });

        $scope.addAdmin = () => {
            AdminService.addAdmin({
                username: $scope.adminUsername,
                password: $scope.adminPassword,
                email: $scope.adminEmail,
                contact: $scope.adminContact
            }).then((res) => {
                console.log('add admin', res.data);
            }, (err) => {
                console.log(err);
            });
        }
    }
})();

/*
'use strict';

(() => {

    angular
        .module('app')
        .controller('AdminController', AdminController)

    AdminController.$inject = ['$scope', 'AdminService'];

    function AdminController($scope, AdminService) {
        //"declare" functions para magamit sa view
        $scope.retrieveAdmin = retrieveAdmin;   // Admin
        $scope.addAdmin = addAdmin;
        $scope.updateAdmin = updateAdmin;
        $scope.deleteAdmin = deleteAdmin;
        $scope.retrieveOrganizer = retrieveOrganizer;   // Organizer
        $scope.addOrganizer = addOrganizer;
        $scope.updateOrganizer = updateOrganizer;
        $scope.deleteOrganizer = deleteOrganizer;
        $scope.retrieveUser = retrieveUser; // User
        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;
        $scope.retrieveLog = retrieveLog;   // Log

        //kumabaga "declare" or "initialize" "variables" para mag-access sa front-end yung mga data
        $scope.admins = [];
        $scope.organizers = [];
        $scope.users = [];
        $scope.logs = [];
        $scope.admin = {
            id: undefined,
            username: undefined,
            password: undefined,
            email: undefined,
            contact: undefined
        };
        $scope.organizer = {
            id: undefined,
            name: undefined,
            description: undefined
        };
        $scope.user = {
            id: undefined,
            username: undefined,
            password: undefined,
            email: undefined,
            contact: undefined
        };

        function copyAdmin(admin) {
            $scope.adminCopy = {
                id: admin.id,
                username: admin.username,
                password: admin.password,
                email: admin.email,
                contact: admin.contact
            }
        }

        function copyOrganizer(organizer) {
            $scope.organizerCopy = {
                id: organizer.id,
                name: organizer.name,
                description: organizer.description
            }
        }

        function copyUser(user) {
            $scope.userCopy = {
                id: user.id,
                username: user.username,
                password: user.password,
                email: user.email,
                contact: user.contact
            }
        }

        function retrieveAdmin() {
            AdminService
                .retrieveAdmin('A')
                .then(function(res) {
                    $scope.admins = res.data.data;
                    console.log($scope.admins);
                    console.log(res.data.data);
                }, function(err) {
                    console.log(err);
                    Materialize.toast('Admins not retrieved.', 3000);
                })
        }

        function updateAdmin() {
            AdminService
                .updateAdmin($scope.adminCopy)
                .then(function(res) {
                    Materialize.toast('Successfully updated admin!', 3000);
                    $scope.retrieveAdmin();
                }, function(err) {
                    console.log(err.data);
                })
        }

        function deleteAdmin() {
            AdminService
                .deleteAdmin(id)
                .then(function(res) {
                    Materialize.toast('Successfully deleted admin!', 3000);
                }, function(err) {
                    Materialize.toast('Error deleting admin!', 3000);
                })
        }

        function retrieveOrganizer() {
            AdminService
                .retrieveOrganizer('O')
                .then(function(res) {
                    $scope.organizers = res.data.data;
                    console.log($scope.organizers);
                    console.log(res.data.data);
                }, function(err) {
                    console.log(err);
                    Materialize.toast('Organizers not retrieved.', 3000);
                })
        }

        function updateOrganizer() {
            AdminService
                .updateOrganizer($scope.organizerCopy)
                .then(function(res) {
                    Materialize.toast('Successfully updated organizer!', 3000);
                    $scope.retrieveOrganizer();
                }, function(err) {
                    console.log(err.data);
                })
        }

        function deleteOrganizer() {
            AdminService
                .deleteOrganizer(id)
                .then(function(res) {
                    Materialize.toast('Successfully deleted organizer!', 3000);
                }, function(err) {
                    Materialize.toast('Error deleting organizer!', 3000);
                })
        }

        function retrieveUser() {
            AdminService
                .retrieveUser()
                .then(function(res) {
                    $scope.users = res.data.data;
                    console.log($scope.users);
                    console.log(res.data.data);
                }, function(err) {
                    console.log(err);
                    Materialize.toast('Users not retrieved.', 3000);
                })
        }

        function updateUser() {
            AdminService
                .updateUser($scope.adminCopy)
                .then(function(res) {
                    Materialize.toast('Successfully updated user!', 3000);
                    $scope.retrieveUser();
                }, function(err) {
                    console.log(err.data);
                })
        }

        function deleteUser() {
            AdminService
                .deleteUser(id)
                .then(function(res) {
                    Materialize.toast('Successfully deleted user!', 3000);
                }, function(err) {
                    Materialize.toast('Error deleting user!', 3000);
                })
        }

        function retrieveLog() {
            AdminService
                .retrieveUser()
                .then(function(res) {
                    $scope.logs = res.data.data;
                    console.log($scope.logs);
                    console.log(res.data.data);
                }, function(err) {
                    console.log(err);
                    Materialize.toast('Logs not retrieved.', 3000);
                })
        }
    }
})();

*/
