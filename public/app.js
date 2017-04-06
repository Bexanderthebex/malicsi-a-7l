'use strict';

(function(){
    angular
        .module('app', ['ngRoute'])
        .config(config)

    config.$inject = ['$routeProvider','$locationProvider'];

    function config($routeProvider, $locationProvider){
        $locationProvider.html5Mode({
            enabled: true
        });

        $locationProvider.hashPrefix('');

        $routeProvider
            .when('/', {
                'templateUrl': 'views/home-page.html',
                'caseInsensitiveMatch': true
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
            .when('/competitor/profile', {
                'templateUrl': 'views/competitor-profile-page.html',
                'caseInsensitiveMatch': true
                // 'access': { requiredAuthentication: true }
            })
            .when('/competitor/profile/other', {
                'templateUrl': 'views/competitor-visited-profile-page.html',
                'caseInsensitiveMatch': true
                // 'access': { requiredAuthentication: true }
            })
            .when('/help', {
                'templateUrl': 'views/help.html',
                'caseInsensitiveMatch': true
                // 'access': { requiredAuthentication: true }
            })
            .when('/error', {
                'templateUrl': 'views/error-404-page.html',
                'caseInsensitiveMatch': true
                // 'access': { requiredAuthentication: true }
            })
            .when('/game/:gameId', {
                'templateUrl': 'views/game-page.html',
                'caseInsensitiveMatch': true
                // 'access': { requiredAuthentication: true }
            })
            .when('/game/feed', {
                'templateUrl': 'views/gamefeed.html',
                'caseInsensitiveMatch': true
                // 'access': { requiredAuthentication: true }
            })
            .when('/organization', {
                'templateUrl': 'views/organization-page.html',
                'caseInsensitiveMatch': true
                // 'access': { requiredAuthentication: true }
            })
            .when('/search', {
                'templateUrl': 'views/search-page.html',
                'caseInsensitiveMatch': true
                // 'access': { requiredAuthentication: true }
            })
            .when('/sports', {
                'templateUrl': 'views/sports-page.html',
                'caseInsensitiveMatch': true
                // 'access': { requiredAuthentication: true }
            })
            .when('/adminpanel', {
                'templateUrl': 'views/admin-panel.html',
                'caseInsensitiveMatch': true
                // 'access': { requiredAuthentication: true }
            })
    }

})();
