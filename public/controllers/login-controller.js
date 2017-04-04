'use strict';

(() => {
	angular.module('app')
		.controller('loginCtrl', loginCtrl) //name, then callback function
		
    loginCtrl.$inject = ['$scope', '$http', '$window'];

    function loginCtrl($scope, $http, $window) {
		$scope.uname = undefined;
		$scope.pword = undefined;

		$scope.logAccount = function(){
			console.log($scope.uname);
			console.log($scope.pword);

			$http.post('/login', {
				username : $scope.uname,
				password : $scope.pword,
			}).then(function(result){
				//if (result.message == 'Successfully logged in') {
				console.log(result.data);
				$window.location.href = '/';
				//}else {
				//	$scope.uname = '';
				//	$scope.pword = '';
				//}
			}, function(err) {
				console.log(err);
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


