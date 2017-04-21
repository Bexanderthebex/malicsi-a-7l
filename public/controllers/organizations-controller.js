'use strict';

(() => {

    angular
        .module('app')
        .controller('OrganizationsController', OrganizationsController);

    OrganizationsController.$inject = ['$scope', 'SearchService'];

    function OrganizationsController($scope, SearchService) {
        $scope.organizations = [];
        $scope.orgsV = [];
        $scope.orgsQ = [];
        $scope.orgsW = [];
        $scope.orgsT = [];
        $scope.orgsA = [];
        $scope.orgsB = [];
        $scope.orgsInit = orgsInit;

        console.log("aaaaaaa");

        function orgsInit(){
            console.log("meika");
            searchOrganization("");
        }

        function searchOrganization(search){
            SearchService
                .retrieveOrganization(search)
                .then(function(res){
                    $scope.organizations = res.data;
                    for(var i=0; i<$scope.organizations.length; i++){
                        console.log("divvvd");
                        var name = $scope.organizations[i].name.charAt(0);
                        console.log("hel");
                        console.log(name);
                        if(name == 'A'){
                            $scope.orgsA.push($scope.organizations[i]);
                        }else if (name == 'T'){
                            $scope.orgsT.push($scope.organizations[i]);
                        }else if (name == 'W'){
                            $scope.orgsW.push($scope.organizations[i]);
                        }else if (name == 'Q'){
                            $scope.orgsQ.push($scope.organizations[i]);

                        }else if (name == 'V'){
                            $scope.orgsV.push($scope.organizations[i]);
                        }

                    }
                    console.log("HELLOOOOO");
                    console.log(res.data);
                }, function(err){                    
                })
        }

    }
})();