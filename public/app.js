'use strict';

(function(){
    angular
        .module('app', ['ngRoute','angular.filter'])
        .config(config)

    config.$inject = ['$routeProvider','$locationProvider'];

    function config($routeProvider, $locationProvider){
        // $locationProvider.html5Mode({
        //     enabled: true
        // });

        // $locationProvider.hashPrefix('');

        $routeProvider
            .when('/', {
                'templateUrl': 'views/home-page.html',
                'caseInsensitiveMatch': true,
                'controller': 'LandingCtrl'
                // 'access': { requiredAuthentication: false }
            })
            .when('/login', {
                'templateUrl': 'views/login.html',
                'caseInsensitiveMatch': true
                // 'access': { requiredAuthentication: true }
            })
            .when('/organizer/profile', {
                'templateUrl': 'views/organizer-profile-page.html',
                'caseInsensitiveMatch': true,
                'controller': 'OrganizerController'
                // 'access': { requiredAuthentication: true }
            })
            .when('/organizer/profile/:id', {
                'templateUrl': 'views/organizer-other-profile-page.html',
                'caseInsensitiveMatch': true,
                'controller': 'OrganizerController'
                // 'access': { requiredAuthentication: true }
            })
            .when('/competitor/profile', {
                'templateUrl': 'views/competitor-profile-page.html',
                'caseInsensitiveMatch': true,
                'controller': 'CompetitorController'
                // 'access': { requiredAuthentication: true }
            })
            .when('/competitor/profile/:id', {
                'templateUrl': 'views/competitor-visited-profile-page.html',
                'caseInsensitiveMatch': true,
                'controller': 'CompetitorController'
                // 'access': { requiredAuthentication: true }
            })
            .when('/help', {
                'templateUrl': 'views/help.html',
                'caseInsensitiveMatch': true
                // 'access': { requiredAuthentication: true }
            })
            .when('/aboutus', {
                'templateUrl': 'views/about-us-page.html',
                'caseInsensitiveMatch': true
                // 'access': { requiredAuthentication: true }
            })

            .when('/game/:gameId', {
                'templateUrl': 'views/game-page.html',
                'caseInsensitiveMatch': true,
                'controller': 'GameController'
                // 'access': { requiredAuthentication: true }
            })
            .when('/game', {
                'templateUrl': 'views/gamefeed.html',
                'caseInsensitiveMatch': true,
                'controller': 'GameFeedController'
                // 'access': { requiredAuthentication: true }
            })
            .when('/organizations', {
                'templateUrl': 'views/organizations.html',
                'caseInsensitiveMatch': true,
                'controller': 'OrganizationsController'
                // 'access': { requiredAuthentication: true }
            })
            .when('/organization/:id', {
                'templateUrl': 'views/organization-page.html',
                'caseInsensitiveMatch': true,
                'controller': 'OrganizationController'
                // 'access': { requiredAuthentication: true }
            })
            .when('/search/:sdata', {
                'templateUrl': 'views/search-page.html',
                'caseInsensitiveMatch': true,
                'controller': 'SearchController'
                // 'access': { requiredAuthentication: true }
            })
            .when('/sports/:id', {
                'templateUrl': 'views/sports-page.html',
                'caseInsensitiveMatch': true,
                'controller': 'SportController'
                // 'access': { requiredAuthentication: true }
            })
            .when('/adminpanel', {
                'templateUrl': 'views/admin-panel.html',
                'caseInsensitiveMatch': true
                // 'access': { requiredAuthentication: true }
            })
            .when('/error', {
                'templateUrl': 'views/error-404-page.html',
                'caseInsensitiveMatch': true
                // 'access': { requiredAuthentication: true }
            })
            .otherwise({'templateUrl': 'views/error-404-page.html'})

    }

})();
