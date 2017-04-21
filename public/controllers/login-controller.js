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
				Materialize.toast("Sucessfully logged in!", 2000);
				$window.location.href = '/';
			}, function(err) {
				Materialize.toast("Incorrect credentials", 2000);
				$('#loginError').text("Incorrect username or password");
				console.log(err);
			});
		}

		$scope.signUp = function(fname, lname, nname, uname, sex, pword, bday, email, contactNum){

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
				$window.location.href = '/';
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
				Materialize.toast("Successfully logged out", 5000);
				$window.location.href = '/';
			}, function(err) {
				console.log(err);
			});	
		}
	}
})();
