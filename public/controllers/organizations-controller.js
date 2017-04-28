'use strict';

(() => {

    angular
        .module('app')
        .controller('OrganizationsController', OrganizationsController);

    OrganizationsController.$inject = ['$scope', 'SearchService', 'OrganizationService'];

    function OrganizationsController($scope, SearchService, OrganizationService) {
        $scope.organizations = [];
        $scope.searchOrganization = searchOrganization;
        $scope.teamsPerOrg = [];
        $scope.orgfeedData = [];
        $scope.orgfeedInit = orgfeedInit;
        $scope.sortBy = sortBy;
        $scope.filter = filter;
        $scope.atoz = 'atoz';

        function filter(org, team){
            org = (org == undefined || org == null) ? '' : org;
            team = (team == undefined || team == null) ? '' : team;

            console.log("filter");
            console.log(org);
            console.log(team);

            SearchService.retrieveOrganization(org)
            .then((res) => {
                let organizations = res.data;
                console.log('filter orgs', organizations);
                if (team != '' || team != null || team != undefined) {
                    SearchService.retrieveTeam(team)
                    .then((res) => {
                        let teams = res.data;
                        let result = [];
                        for (org of organizations) {
                            for (team of teams) {
                                if (team.team_organization == org.organization_id) {
                                    result.push(org);
                                    break;
                                }
                            }
                        }
                        $scope.organizations = [];
                        $scope.organizations = result;
                        retrieveTeams();
                    })
                } else {
                    $scope.organizations = [];
                    $scope.organizations = organizations;
                    retrieveTeams();
                }
            }, (err) => {})
            /*
            if(org !== ""){
                SearchService
                    .retrieveOrganization(org)
                    .then(function(res){
                        $scope.organizations = [];
                        $scope.organizations = res.data;
                        console.log($scope.orgs);
                        retrieveTeams();


                    }, function(err){                    
                    })

            }else if(team !== ""){
                SearchService
                    .retrieveTeam(team)
                    .then(function(res){
                        $scope.teams = [];
                        $scope.teams = res.data;
                        console.log($scope.teams);

                        for(var i=0; i<$scope.teams.length; i++){
                            console.log("maru");
                            // find organization
                            for(var j=0; j<$scope.orgs; j++){
                                if($scope.orgs[j].organization_id == $scope.teams[i].team_organization){
                                    var team = [];
                                    team.push($scope.teams[i]);
                                    $scope.orgfeedData = [];
                                    var data = {
                                        org: $scope.orgs[j].name,
                                        id: $scope.orgs[j].organization_id,
                                        teams: team,
                                        teamCount: 1
                                    }
                                    $scope.orgfeedData.push(data);
                                }
                            }
                        }
                    }, function(err){                    
                    })
            }else{
                orgfeedInit();
            }*/

            
        }

        function sortBy(){
            if($scope.atoz === 'atoz'){
                sortAtoZ();   
            }else{
                sortZtoA();
            }
        }

        function sortAtoZ(){
            $scope.orgfeedData.sort(function(a, b){
                if(a.org < b.org) return -1;
                if(a.org > b.org) return 1;
                return 0;
            });
        }

        function sortZtoA(){
            $scope.orgfeedData.sort(function(a, b){
                if(a.org > b.org) return -1;
                if(a.org < b.org) return 1;
                return 0;
            });
        }

        function searchOrganization(search){
            SearchService
                .retrieveOrganization(search)
                .then(function(res){
                    $scope.organizations = [];
                    $scope.organizations = res.data;
                    console.log($scope.organizations);
                    retrieveTeams();
                }, function(err){                    
                })
        }

        function orgfeedInit(){
            SearchService
                .retrieveOrganization("")
                .then(function(res){
                    $scope.organizations = [];
                    $scope.organizations = res.data;
                    console.log($scope.organizations);
                    retrieveTeams();
                }, function(err){                    
                })
        }

        function retrieveTeams(){
            var index = 0;
            $scope.orgfeedData = [];
            for(var i=0; i<$scope.organizations.length; i++){
                console.log($scope.organizations[i].name);
                OrganizationService
                    .retrieveTeams($scope.organizations[i].organization_id)
                    .then(function(res){
                        if($.isArray(res.data)){
                            var fetchedTeams = res.data;
                        }else{
                            var fetchedTeams = [];
                            fetchedTeams.push(res.data);
                        }
                        console.log(fetchedTeams);
                        var name = $scope.organizations[index].name;
                        console.log(name);
                        var data = {
                            org: name,
                            id: $scope.organizations[index].organization_id,
                            teams: fetchedTeams,
                            teamCount: fetchedTeams.length
                        }
                        $scope.orgfeedData.push(data);
                        index++;

                        sortAtoZ();
                    }, function(err){

                    });
            }
        }

    }
})();