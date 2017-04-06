'use strict';

(() => {
	angular.module('app')
		.controller('UserCtrl', UserCtrl) //name, then callback function

    UserCtrl.$inject = ['$scope', '$http', '$window'];

    function UserCtrl($scope, $http, $window) {
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

		$scope.signUp = function(fname, lname, nname, uname, sex, pword, bday, email, contactNum){
			console.log(bday);

			$http.post('/register', {
				username: uname,
				password: pword,
				email: email,
				contact: contactNum,
				type: 'C',
				birthday: bday.getFullYear()+"-"+bday.getMonth()+"-"+bday.getDate(),
				first_name: fname,
				last_name: lname,
				nickname: nname,
				sex: sex
			}).then(function(result){
				$scope.fname = "";
				$scope.lname = "";
				$scope.uname = "";
				$scope.pword = "";
				$scope.bday = "";
				$scope.ead = "";
			})
		}

		$scope.logOut = function(){
			$http.get('/logout')
			.then(function(result){
				//if (result.message == 'Successfully logged in') {
				//console.log(result.data);
				$window.location.href = '/';
				//Materialize.toast(result);
				console.log(result);
				//}else {
				//	$scope.uname = '';
				//	$scope.pword = '';
				//}
			}, function(err) {
				console.log(err);
			});	
		}
	}
})();
