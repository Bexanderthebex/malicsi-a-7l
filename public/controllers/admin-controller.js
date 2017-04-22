(() => {
    angular.module('app')
        .controller('AdminCtrl', AdminCtrl);

    AdminCtrl.$inject = ['$scope', '$http', 'UserService', 'AdminService', 'SearchService', 'OrganizerService', 'OrganizationService'];

    function AdminCtrl($scope, $http, UserService, AdminService, SearchService, OrganizerService, OrganizationService) {
        let adminCache = {};
        let userCache = {};
        let organizerCache = {};
        let organizationCache = {};
        let sponsorCache = {};

        $scope.admins = [];
        $scope.users = [];
        $scope.organizers = [];
        $scope.organizations = [];
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

        SearchService.retrieveOrganization('').then((res) => {
            $scope.organizations = res.data;
            console.log('organizations', $scope.organizations);
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
           if($scope.adminUsername === undefined || $scope.adminPassword == undefined || $scope.adminEmail === undefined || $scope.adminContact === undefined){
                Materialize.toast('Error. Missing text feild(s).', 2000);
            }else{
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
        }

        $scope.addOrganizer = () => {
            if($scope.organizerUsername === undefined || $scope.organizerPassword == undefined || $scope.organizerEmail === undefined || $scope.organizerContact === undefined || $scope.organizerName === undefined || $scope.organizerDescription === undefined){
                Materialize.toast('Error. Missing text feild(s).', 2000);
            }else{
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

                    Materialize.toast('Successfully created organizer.', 2000);
                }, (err) => {
                    console.log('Add organizer', err);
                });
            }
        }

        $scope.addOrganization = () => {
            if($scope.organizationName === undefined){
                Materialize.toast('Error. Missing text feild(s).', 2000);
            }else{
                AdminService.addOrganization({
                    name: $scope.organizationName,
                }).then((res) => {
                    $scope.organizationName = "";

                    console.log('add organization', res.data);

                    Materialize.toast('Successfully created organization..', 2000);
                }, (err) => {
                    console.log('Add organizer', err);
                });
            }
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

        $scope.searchLog = () => {
            if(($scope.username != undefined && $scope.startDate != undefined && $scope.endDate != undefined) || ($scope.username === undefined && $scope.startDate != undefined && $scope.endDate != undefined)){
                let month1 = ($scope.startDate.getMonth() + 1);
                let month2 = ($scope.endDate.getMonth() + 1);

                SearchService.retrieveLogByDateAndUsername($scope.username, $scope.startDate.getFullYear()+"-"+month1+"-"+$scope.startDate.getDate(), $scope.endDate.getFullYear()+"-"+month2+"-"+$scope.endDate.getDate())
                .then((res) => {
                    $scope.logs = res.data;
                    console.log('logs', $scope.logs);
                }, (err) => {
                    console.log(err);
                })
            }else if($scope.username != undefined && $scope.startDate === undefined && $scope.endDate === undefined){
                SearchService.retrieveLogByDateAndUsername($scope.username, $scope.startDate, $scope.endDate)
                .then((res) => {
                    $scope.logs = res.data;
                    console.log('logs', $scope.logs);
                }, (err) => {
                    console.log(err);
                })
            }else{
                if($scope.username === undefined && $scope.startDate === undefined && $scope.endDate === undefined) Materialize.toast('Error. No input.', 2000);
                    else Materialize.toast('Error. Missing start date or end date.', 2000);
            }
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

        $scope.searchOrganization = () => {
            SearchService.retrieveOrganization($scope.organizationSearch)
            .then((res) => {
                $scope.organizations =  res.data;
                console.log('organizations', $scope.organizations);
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

                UserService.updateUser(admin)
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
            if ($('#organizer-edit-' + organizer.id).data('isEditing')) {
                $('#organizer-edit-' + organizer.id).data('isEditing', false);
                $('#organizer-cancel-edit-' + organizer.id).hide();
                $('.organizer-form-edit-' + organizer.id).prop('disabled', true);

                 OrganizerService.updateOrganizer(organizer)
                .then((res) => {
                    Materialize.toast('Organizer info edited.', 2000);
                }, (err) => {
                    Materialize.toast('Something went wrong :\'(', 2000);
                    console.log(err);
                });
            } else {
                $('#organizer-edit-' + organizer.id).data('isEditing', true);
                $('#organizer-cancel-edit-' + organizer.id).show();
                $('.organizer-form-edit-' + organizer.id).prop('disabled', false);

                organizerCache[organizer.id] = {}
                organizerCache[organizer.id].name = organizer.name;
                organizerCache[organizer.id].description = organizer.description;
            }
        }

        $scope.cancelEditOrganizer = (organizer) => {
            $('#organizer-edit-' + organizer.id).data('isEditing', false);
            $('#organizer-cancel-edit-' + organizer.id).hide();
            $('.organizer-form-edit-' + organizer.id).prop('disabled', true);

            console.log(organizerCache)

            organizer.name = organizerCache[organizer.id].name;
            organizer.description = organizerCache[organizer.id].description;
        }

        $scope.editOrganization = (organization) => {
            console.log('pasok sa editOrganization');
            console.log('id', organization.organization_id);
            if ($('#organization-edit-' + organization.organization_id).data('isEditing')) {
                $('#organization-edit-' + organization.organization_id).data('isEditing', false);
                $('#organization-cancel-edit-' + organization.organization_id).hide();
                $('.organization-form-edit-' + organization.organization_id).prop('disabled', true);

                 OrganizationService.updateOrganization(organization)
                .then((res) => {
                    Materialize.toast('Organization info edited.', 2000);
                }, (err) => {
                    Materialize.toast('Something went wrong :\'(', 2000);
                    console.log(err);
                });
            } else {
                $('#organization-edit-' + organization.organization_id).data('isEditing', true);
                $('#organization-cancel-edit-' + organization.organization_id).show();
                $('.organization-form-edit-' + organization.organization_id).prop('disabled', false);

                organizationCache[organization.organization_id] = {}
                organizationCache[organization.organization_id].name = organization.name;
            }
        }

        $scope.cancelEditOrganization = (organization) => {
            $('#organization-edit-' + organization.organization_id).data('isEditing', false);
            $('#organization-cancel-edit-' + organization.organization_id).hide();
            $('.organization-form-edit-' + organization.organization_id).prop('disabled', true);

            console.log(organizationCache)

            organization.name = organizationCache[organization.organization_id].name;
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
            if($scope.sponsorName === undefined || $scope.sponsorDescription === undefined){
                Materialize.toast("Missing text field(s).", 2000);
            }else{
                let sponsor = {
                    name: $scope.sponsorName,
                    description: $scope.sponsorDescription
                };
                AdminService.addSponsor(sponsor).then((res) => {
                    Materialize.toast("Sponsor added", 2000);
                }, (err) => {
                    console.log(err);
                    Materialize.toast("An error occured.", 2000);
                });
            }
        }

        $scope.deleteSponsor = (id) => {
            AdminService.deleteSponsor(id).then((res) => {
                Materialize.toast("Sponsor deleted", 2000);
                for (let i = 0; i < $scope.sponsors.length; ++i) {
                    if ($scope.sponsors[i].sponsor_id === id) {
                        $scope.sponsors.splice(i, 1);
                        break;
                    }
                }
            }, (err) => {
                console.log(err);
                Materialize.toast("An error occured.", 2000);
            });
        }

        $scope.editSponsor = (sponsor) => {
            if ($('#sponsor-edit-' + sponsor.sponsor_id).data('isEditing')) {
                $('#sponsor-edit-' + sponsor.sponsor_id).data('isEditing', false);
				$('#sponsor-cancel-edit-' + sponsor.sponsor_id).hide();
                $('.sponsor-form-edit-' + sponsor.sponsor_id).prop('disabled', true);

                AdminService.editSponsor(sponsor)
                .then((res) => {
                    Materialize.toast('Sponsor info edited.', 2000);
                }, (err) => {
                    Materialize.toast('Something went wrong :\'(', 2000);
                    console.log(err);
                });
            } else {
                $('#sponsor-edit-' + sponsor.sponsor_id).data('isEditing', true);
                $('#sponsor-cancel-edit-' + sponsor.sponsor_id).show();
                $('.sponsor-form-edit-' + sponsor.sponsor_id).prop('disabled', false);

                sponsorCache[sponsor.sponsor_id] = {}
                sponsorCache[sponsor.sponsor_id].name = sponsor.name;
                sponsorCache[sponsor.sponsor_id].description = sponsor.description;
            }
        }

        $scope.cancelEditSponsor = (sponsor) => {
            $('#sponsor-edit-' + sponsor.sponsor_id).data('isEditing', false);
            $('#sponsor-cancel-edit-' + sponsor.sponsor_id).hide();
            $('.sponsor-form-edit-' + sponsor.sponsor_id).prop('disabled', true);

            sponsor.name = sponsorCache[sponsor.sponsor_id].name;
            sponsor.description = sponsorCache[sponsor.sponsor_id].description;
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
