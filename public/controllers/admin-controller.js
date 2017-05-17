(() => {
    angular.module('app')
        .controller('AdminCtrl', AdminCtrl);

    AdminCtrl.$inject = ['$scope', '$http', 'UserService', 'AdminService', 'SearchService', 'OrganizerService', 'OrganizationService', '$location'];

    function AdminCtrl($scope, $http, UserService, AdminService, SearchService, OrganizerService, OrganizationService, $location) {
        let adminCache = {};
        let userCache = {};
        let organizerCache = {};
        let organizationCache = {};
        let sponsorCache = {};
        $scope.user = null;
        let pending = null;

        $scope.uploadOrganizationID;
        $scope.admins = [];
        $scope.users = [];
        $scope.organizers = [];
        $scope.organizations = [];
        $scope.logs = [];
        $scope.sponsors = [];
        $scope.fileItem = {};
        $scope.setOrgModal = setOrgModal;
        $scope.uploadOrgImg = upload;

        UserService.getUsersByType('A').then((res) => {
            $scope.admins = res.data;
        }, (err) => {
            console.log(err);
        });

        UserService.getUserInfo().then((res) => {
            $scope.user = res.data;
            if (res.data == '' || $scope.user.type != 'A') {
                Materialize.toast('You need to be logged in as an administrator to access the admin panel.', 2000);
                $location.url('/');
            }
        }, (err) => {
            Materialize.toast('An error occured.', 2000);
            console.log(err);
        })

        $scope.getAdmins = () => {
            UserService.getUsersByType('A').then((res) => {
                $scope.admins = res.data;
            }, (err) => {
                console.log(err);
            });
        }

        $scope.getOrganizers = () => {
            SearchService.retrieveOrganizer('').then((res) => {
                $scope.organizers = res.data;
            }, (err) => {
                console.log(err);
            });
        }

        $scope.getSponsors = () => {
            SearchService.retrieveSponsor('').then((res) => {
                $scope.sponsors = res.data;
            }, (err) => {
                console.log(err);
            });
        }

        $scope.getOrganizations = () => {
            SearchService.retrieveOrganization('').then((res) => {
                $scope.organizations = res.data;
            }, (err) => {
                console.log(err);
            });
        }

        $scope.getLogs = () => {
            AdminService.retrieveLog().then((res) => {
                $scope.logs = res.data;
            }, (err) => {
                console.log(err);
            });
        }

        $scope.getUsers = () => {
            AdminService.retrieveUser().then((res) => {
                $scope.users = res.data;
            }, (err) => {
                console.log(err);
            });
        }

        $scope.addAdmin = () => {
           if($scope.adminUsername === undefined || $scope.adminPassword == undefined || $scope.adminEmail === undefined || $scope.adminContact === undefined){
                Materialize.toast('Error. Missing text field(s).', 2000);
            }else{
                const admin = {
                    username: $scope.adminUsername,
                    password: $scope.adminPassword,
                    email: $scope.adminEmail,
                    contact: $scope.adminContact
                }
                AdminService.addAdmin(admin)
                .then((res) => {
                    $scope.adminUsername = "";
                    $scope.adminPassword = "";
                    $scope.adminEmail = "";
                    $scope.adminContact = "";

                    UserService.getUsersByType('A').then((res) => {
                        $scope.admins = res.data;
                    }, (err) => {
                        console.log(err);
                    });

                    AdminService.retrieveLog().then((res) => {
                        $scope.logs = res.data;
                    }, (err) => {
                        console.log(err);
                    });

                    Materialize.toast('Successfully created admin.', 2000);
                }, (err) => {
                    Materialize.toast(err.data.message, 2000);
                });
            }
        }

        $scope.addOrganizer = () => {
            if($scope.organizerUsername === undefined || $scope.organizerPassword == undefined || $scope.organizerEmail === undefined || $scope.organizerContact === undefined || $scope.organizerName === undefined || $scope.organizerDescription === undefined){
                Materialize.toast('Error. Missing text field(s).', 2000);
            }else{
                const organizer = {
                    username: $scope.organizerUsername,
                    password: $scope.organizerPassword,
                    email: $scope.organizerEmail,
                    contact: $scope.organizerContact,
                    name: $scope.organizerName,
                    description: $scope.organizerDescription
                };

                AdminService.addOrganizer(organizer)
                .then((res) => {
                    $scope.organizerUsername = "";
                    $scope.organizerPassword = "";
                    $scope.organizerEmail = "";
                    $scope.organizerContact = "";
                    $scope.organizerName = "";
                    $scope.organizerDescription = "";

                    SearchService.retrieveOrganizer('').then((res) => {
                        $scope.organizers = res.data;
                    }, (err) => {
                        console.log(err);
                    });

                    AdminService.retrieveLog().then((res) => {
                        $scope.logs = res.data;
                    }, (err) => {
                        console.log(err);
                    });

                    Materialize.toast('Successfully created organizer.', 2000);
                }, (err) => {
                    Materialize.toast(err.data.message, 2000)
                });
            }
        }

        $scope.addOrganization = () => {
            if($scope.organizationName === undefined){
                Materialize.toast('Error. Missing text field(s).', 2000);
            }else{
                AdminService.addOrganization({
                    name: $scope.organizationName,
                }).then((res) => {
                    $scope.organizationName = "";

                    SearchService.retrieveOrganization('').then((res) => {
                        $scope.organizations = res.data;
                    }, (err) => {
                        console.log(err);
                    });

                    AdminService.retrieveLog().then((res) => {
                        $scope.logs = res.data;
                    }, (err) => {
                        console.log(err);
                    });

                    Materialize.toast('Successfully created organization.', 2000);
                }, (err) => {
                    Materialize.toast(err.data.message, 2000);
                    console.log('Add organization', err);
                });
            }
        }

        $scope.searchAdmin = () => {
            SearchService.retrieveAdmin($scope.adminSearch)
            .then((res) => {
                $scope.admins = res.data;
            }, (err) => {
                console.log(err);
            })
        }

        $scope.searchLog = () => {
            SearchService.retrieveLogByDateAndUsername($scope.username, $scope.startDate, $scope.endDate)
            .then((res) => {
                $scope.logs = res.data;
            }, (err) => {
                console.log(err);
            })
        }

        $scope.searchOrganizer = () => {
            SearchService.retrieveOrganizer($scope.organizerSearch)
            .then((res) => {
                $scope.organizers =  res.data;
            }, (err) => {
                console.log(err);
            })
        }

        $scope.searchOrganization = () => {
            SearchService.retrieveOrganization($scope.organizationSearch)
            .then((res) => {
                $scope.organizations =  res.data;
            }, (err) => {
                console.log(err);
            })
        }

        $scope.searchUser = () => {
            SearchService.retrieveUser($scope.userSearch)
            .then((res) => {
                $scope.users = res.data;
            }, (err) => {
                console.log(err);
            })
        }

        $scope.searchSponsor = () => {
            SearchService.retrieveSponsor($scope.sponsorSearch)
            .then((res) => {
                $scope.sponsors = res.data;
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

                AdminService.retrieveLog().then((res) => {
                    $scope.logs = res.data;
                }, (err) => {
                    console.log(err);
                });
            }, (err) => {
                Materialize.toast('Something went wrong :\'(', 2000);
                console.log(err);
            });
        }

        $scope.editAdmin = (admin) => {
            if ($('#admin-edit-' + admin.id).data('isEditing')) {
                $('#admin-edit-' + admin.id).data('isEditing', false);
				$('#admin-cancel-edit-' + admin.id).hide();
                $('.admin-form-edit-' + admin.id).prop('disabled', true);

                UserService.updateUser(admin)
                .then((res) => {
                    AdminService.retrieveLog().then((res) => {
                        $scope.logs = res.data;
                    }, (err) => {
                        console.log(err);
                    });

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
                    AdminService.retrieveLog().then((res) => {
                        $scope.logs = res.data;
                    }, (err) => {
                        console.log(err);
                    });

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

            organizer.name = organizerCache[organizer.id].name;
            organizer.description = organizerCache[organizer.id].description;
        }

        $scope.editOrganization = (organization) => {
            if ($('#organization-edit-' + organization.organization_id).data('isEditing')) {
                $('#organization-edit-' + organization.organization_id).data('isEditing', false);
                $('#organization-cancel-edit-' + organization.organization_id).hide();
                $('#organization-upload-profile-picture-' + organization.organization_id).hide();
                $('.organization-form-edit-' + organization.organization_id).prop('disabled', true);

                 OrganizationService.updateOrganization(organization)
                .then((res) => {
                    AdminService.retrieveLog().then((res) => {
                        $scope.logs = res.data;
                    }, (err) => {
                        console.log(err);
                    });

                    Materialize.toast('Organization info edited.', 2000);
                }, (err) => {
                    Materialize.toast('Something went wrong :\'(', 2000);
                    console.log(err);
                });
            } else {

                $('#organization-edit-' + organization.organization_id).data('isEditing', true);
                $('#organization-cancel-edit-' + organization.organization_id).show();
                $('#organization-upload-profile-picture-' + organization.organization_id).show();
                $('.organization-form-edit-' + organization.organization_id).prop('disabled', false);

                organizationCache[organization.organization_id] = {}
                organizationCache[organization.organization_id].name = organization.name;
            }
        }

        $scope.cancelEditOrganization = (organization) => {
            $('#organization-edit-' + organization.organization_id).data('isEditing', false);
            $('#organization-cancel-edit-' + organization.organization_id).hide();
            $('.organization-form-edit-' + organization.organization_id).prop('disabled', true);

            organization.name = organizationCache[organization.organization_id].name;
        }

        $scope.deleteOrganization = (orgId) => {
            OrganizationService.deleteOrganization(orgId)
            .then((res) => {
                Materialize.toast('Organization deleted', 2000);
                AdminService.retrieveLog().then((res) => {
                    $scope.logs = res.data;
                }, (err) => {
                    console.log(err);
                });

                for (let i = 0; i < $scope.organizations.length; ++i) {
                    if ($scope.organizations[i].organization_id === orgId) {
                        $scope.organizations.splice(i, 1);
                    }
                }
            }, (err) => {
                Materialize.toast('An error occured.', 2000);
            });
        }

        $scope.editUser = (user) => {
            if ($('#user-edit-' + user.id).data('isEditing')) {
                $('#user-edit-' + user.id).data('isEditing', false);
				$('#user-cancel-edit-' + user.id).hide();
                $('.user-form-edit-' + user.id).prop('disabled', true);

                UserService.updateUser(user)
                .then((res) => {
                    AdminService.retrieveLog().then((res) => {
                        $scope.logs = res.data;
                    }, (err) => {
                        console.log(err);
                    });

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
                    SearchService.retrieveSponsor('').then((res) => {
                        $scope.sponsors = res.data;
                    }, (err) => {
                        console.log(err);
                    });

                    AdminService.retrieveLog().then((res) => {
                        $scope.logs = res.data;
                    }, (err) => {
                        console.log(err);
                    });

                    Materialize.toast("Successfully created sponsor.", 2000);
                }, (err) => {
                    console.log(err);
                    Materialize.toast(err.data, 2000);
                });
            }
        }

        $scope.deleteSponsor = (id) => {
            AdminService.deleteSponsor(id).then((res) => {
                AdminService.retrieveLog().then((res) => {
                    $scope.logs = res.data;
                }, (err) => {
                    console.log(err);
                });

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
                    AdminService.retrieveLog().then((res) => {
                        $scope.logs = res.data;
                    }, (err) => {
                        console.log(err);
                    });

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

        $scope.editPassword = (userID, newPassword) => {
            UserService.editPassword(userID, newPassword)
            .then((res) => {
                AdminService.retrieveLog().then((res) => {
                    $scope.logs = res.data;
                }, (err) => {
                    console.log(err);
                });
            }, (err) => {
                console.log(err);
            })
        }

        $scope.setPending = (id) => {
            pending = id;
        }

        $scope.authenticate = () => {
            $http.post('/login', {
				username : user.username,
				password : $scope.passwordVerify,
			}).then(function(result){
                $('#admin-change-password').modal('close');
                $('#admin-change-password2').modal('open');
                $scope.passwordVerify = '';
			}, function(err) {
                $scope.passwordVerify = '';
				Materialize.toast("Incorrect credentials", 2000);
				console.log(err);
			});
        }

        $scope.changePassword = () => {
            UserService.editPassword(pending, $scope.newPassword)
            .then((res) => {
                $scope.newPassword = '';

                AdminService.retrieveLog().then((res) => {
                    $scope.logs = res.data;
                }, (err) => {
                    console.log(err);
                });

                Materialize.toast('Password successfully edited', 2000);
            }, (err) => {
                $scope.newPassword = '';
                Materialize.toast('An error occured', 2000);
                console.log(err);
            })
        }

        function setOrgModal(organization_id){
            $scope.uploadOrganizationID = organization_id;
            //alert( $scope.uploadOrganizationID);
        }

        function upload(organization_id){
            Materialize.toast("Uploading New Profile Picture",3000);
            console.log(document.getElementById("organization-upload-profile-picture"));
            $scope.fileItem.file = document.getElementById("organization-upload-profile-picture").files[0];
            $scope.fileItem.file.newname = "org-"+organization_id;
            //$scope.fileItem.file.name = { "value":$scope.competitor.id,"writable":true};
            $scope.fileItem.name="org-"+organization_id;
            console.log($scope.fileItem);
            console.log($scope.fileItem.file);
            //var uploadUrl = '/upload';
            UserService
                .uploader($scope.fileItem)
                .then(function(res){
                    Materialize.toast("Uploaded New Profile Picture",3000);
                    //$window.location.reload();//$("#visited-competitor-profile-img").attr('src', '/assets/avatars/'+$scope.competitor.sex+'.png');
                },function(err){
                    console.log(err);
                })
        }
    }
})();
