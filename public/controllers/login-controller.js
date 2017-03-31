'use strict';

(() => {
	angular.module('app')
		.controller('UserCtrl', UserCtrl) //name, then callback function
		
    UserCtrl.$inject = ['$scope', '$http', '$window'];

    function UserCtrl($scope, $http, $window) {
		$scope.uname = "hello";
		$scope.pword = "what";

		$scope.logAccount = function(uname, password){
			console.log($scope.uname);
			console.log($scope.pword);

			$http.post('/login', {
				username : $scope.uname,
				password : $scope.pword,
			}).then(function(result){
				console.log(result);
				if (result.data.message == 'Successfully logged in') {
					$window.location.href = '/';
				}else {
					$scope.uname = '';
					$scope.pword = '';
				}
			});
		}
		
		$scope.signUp = function(fname, lname, uname, pword, bday, emailAdd){
			$http.post('/account/add', {
				firstName: fname,
				lastName: lname,
				username: uname,
				password: pword,
				birthday: bday,
				emailAddress: emailAdd,
			}).then(function(result){
				$scope.fname = "";
				$scope.lname = "";
				$scope.uname = "";
				$scope.pword = "";
				$scope.bday = "";
				$scope.ead = "";
			})
		}
	}
})();


