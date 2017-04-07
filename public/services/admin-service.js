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
			addGame: addGame,
			updateAdmin: updateAdmin,
			retrieveAdmin: retrieveAdmin, // Admin
			retrieveOrganizer: retrieveOrganizer, // Organizer
			retrieveUser: retrieveUser, // User
			retrieveLog: retrieveLog, // Log
			addAdmin: addAdmin

			//deleteAdmin: deleteAdmin,
			//addOrganizer: addOrganizer,
			//updateOrganizer: updateOrganizer,
			//deleteOrganizer: deleteOrganizer,
			//addUser: addUser,
			//updateUser: updateUser,
			//deleteUser: deleteUser,
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

		function addAdmin(admin) {
			let deferred = $q.defer();

			$http({
				method: 'POST',
				url: '/register/createAdmin',
				data: $.param(admin),
				headers: headers
			}).then((res) => {
				console.log(res);
				deferred.resolve(res);
			}, (err) => {
				deferred.reject(err);
			});

			return deferred.promise;
		}
	}
})();
