(() => {
    angular.module('app')
        .controller('AdminCtrl', AdminCtrl);

    AdminCtrl.$inject = ['$scope', '$http', 'UserService', 'AdminService', 'SearchService', 'OrganizerService'];

    function AdminCtrl($scope, $http, UserService, AdminService, SearchService, OrganizerService) {
        let adminCache = {};
        let userCache = {};

        $scope.admins = [];
        $scope.users = [];
        $scope.organizers = [];
        $scope.logs = [];
        $scope.sponsors = [];

        UserService.getUsersByType('A').then((res) => {
            $scope.admins = res.data;
        }, (err) => {
            console.log(err);
        });

        SearchService.retrieveOrganizer('').then((res) => {
            $scope.organizers = res.data;
        }, (err) => {
            console.log(err);
        });

        SearchService.retrieveSponsor().then((res) => {
            $scope.sponsors = res.data;
            console.log("sponsors", $scope.sponsors);
        }, (err) => {
            console.log(err);
        });        

        AdminService.retrieveLog().then((res) => {
            $scope.logs = res.data;
            console.log('logs', $scope.logs);
        }, (err) => {
            console.log(err);
        });

        AdminService.retrieveUser().then((res) => {
            $scope.users = res.data;
            console.log('users', $scope.users);
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
                $scope.adminUsername = "";
                $scope.adminPassword = "";
                $scope.adminEmail = "";
                $scope.adminContact = "";
            }, (err) => {
                console.log(err);
            });
        }

        $scope.addOrganizer = () => {
            AdminService.addOrganizer({
                username: $scope.organizerUsername,
                password: $scope.organizerPassword,
                email: $scope.organizerEmail,
                contact: $scope.organizerContact,
                name: $scope.organizerName,
                description: $scope.organizerDescription
            }).then((res) => {
                $scope.organizerUsername = "";
                $scope.organizerPassword = "";
                $scope.organizerEmail = "";
                $scope.organizerContact = "";
                $scope.organizerName = "";
                $scope.organizerDescription = "";

                console.log('add organizer', res.data);
            }, (err) => {

            });
        }

        $scope.searchAdmin = () => {
            SearchService.retrieveAdmin($scope.adminSearch)
            .then((res) => {
                $scope.admins = res.data;
                console.log('admins', $scope.admins)
            }, (err) => {
                console.log(err);
            })
        }

        $scope.searchOrganizer = () => {
            SearchService.retrieveOrganizer($scope.organizerSearch)
            .then((res) => {
                $scope.organizers =  res.data;
                console.log('organizers', $scope.organizers);
            }, (err) => {
                console.log(err);
            })
        }

        $scope.searchUser = () => {
            SearchService.retrieveUser($scope.userSearch)
            .then((res) => {
                $scope.users = res.data;
                console.log('users', $scope.users);
            }, (err) => {
                console.log(err);
            })
        }

        $scope.setIsActive = (isActive, id, list) => {
            UserService.setIsActive(isActive, id)
            .then((res) => {
                Materialize.toast('User status changed', 2000);
                for (let a of list) {
                    if (a.id == id) {
                        a.is_active = isActive;
                        break;
                    }
                }
            }, (err) => {
                Materialize.toast('Something went wrong :\'(', 2000);
                console.log(err);
            });
        }

       /* $scope.setIsActive = (isActive, id, list) => {
            UserService.setIsActive(isActive, id)
            .then((res) => {
                Materialize.toast('User status changed', 2000);
                for (let a of list) {
                    if (a.id == id) {
                        a.is_active = isActive;
                        break;
                    }
                }
            }, (err) => {
                Materialize.toast('Something went wrong :\'(', 2000);
                console.log(err);
            });
        }*/


        $scope.editAdmin = (admin) => {
            if ($('#admin-edit-' + admin.id).data('isEditing')) {
                $('#admin-edit-' + admin.id).data('isEditing', false);
				$('#admin-cancel-edit-' + admin.id).hide();
                $('.admin-form-edit-' + admin.id).prop('disabled', true);

                UserService.updateUser(admin.username, admin.email, admin.contact, admin.id)
                .then((res) => {
                    Materialize.toast('Admin info edited.', 2000);
                }, (err) => {
                    Materialize.toast('Something went wrong :\'(', 2000);
                    console.log(err);
                });
            } else {
                $('#admin-edit-' + admin.id).data('isEditing', true);
                $('#admin-cancel-edit-' + admin.id).show();
                $('.admin-form-edit-' + admin.id).prop('disabled', false);

                adminCache[admin.id] = {}
                adminCache[admin.id].username = admin.username;
                adminCache[admin.id].email = admin.email;
                adminCache[admin.id].contact = admin.contact;
            }
        }

        $scope.cancelEditAdmin = (admin) => {
            $('#admin-edit-' + admin.id).data('isEditing', false);
            $('#admin-cancel-edit-' + admin.id).hide();
            $('.admin-form-edit-' + admin.id).prop('disabled', true);

            console.log(adminCache)

            admin.username = adminCache[admin.id].username;
            admin.email = adminCache[admin.id].email;
            admin.contact = adminCache[admin.id].contact;
        }

        $scope.editOrganizer = (organizer) => {
            if($('#organizer-edit-' +organizer.id).data('isEditing')) {
               $('#organizer-edit-' +organizer.id).data('isEditing', false);

                let name = organizer.newName === undefined
                    || organizer.newName.trim() === ""
                    ? organizer.name : organizer.newName;

                let description = organizer.newDesc === undefined
                    || organizer.newDesc.trim() === ""
                    ? organizer.description : organizer.newDesc;

                organizer.name = name;
                organizer.description = description;

                OrganizerService.updateOrganizer(organizer)
                .then((res) =>{
                    Materialize.toast('Organizer info updated.', 2000);
                }, (err) =>{
                    Materialize.toast('Something went wrong :\'(', 2000);
                    console.log(err);
                });
            } else {
                $('#organizer-edit-' +organizer.id).data('isEditing', true);
            }
        }

        $scope.editUser = (user) => {
            if ($('#user-edit-' + user.id).data('isEditing')) {
                $('#user-edit-' + user.id).data('isEditing', false);
				$('#user-cancel-edit-' + user.id).hide();
                $('.user-form-edit-' + user.id).prop('disabled', true);

                UserService.updateUser(user.username, user.email, user.contact, user.id)
                .then((res) => {
                    Materialize.toast('User info edited.', 2000);
                }, (err) => {
                    Materialize.toast('Something went wrong :\'(', 2000);
                    console.log(err);
                });
            } else {
                $('#user-edit-' + user.id).data('isEditing', true);
                $('#user-cancel-edit-' + user.id).show();
                $('.user-form-edit-' + user.id).prop('disabled', false);

                userCache[user.id] = {}
                userCache[user.id].username = user.username;
                userCache[user.id].email = user.email;
                userCache[user.id].contact = user.contact;
            }
        }

        $scope.cancelEditUser = (user) => {
            $('#user-edit-' + user.id).data('isEditing', false);
            $('#user-cancel-edit-' + user.id).hide();
            $('.user-form-edit-' + user.id).prop('disabled', true);

            user.username = userCache[user.id].username;
            user.email = userCache[user.id].email;
            user.contact = userCache[user.id].contact;
        }

        $scope.addSponsor = () => {
            let sponsor = {
                name: $scope.sponsorName,
                description: $scope.sponsorDescription
            };
            AdminService.addSponsor(sponsor).then((res) => {
                Materialize.toast("Sponsor added");
            }, (err) => {
                console.log(err);
                Materialize.toast("An error occured.");
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
