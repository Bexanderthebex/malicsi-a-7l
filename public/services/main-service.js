'use strict';

(() => {
	angular.module('app')
		   .factory('MainService', MainService);

	MainService.$inject = ['$http', '$q'];

	const headers = {
		'content-type': 'application/x-www-form-urlencoded'
	};

	function MainService($http, $q) {
		console.log("im main service");
		
	}
})();
