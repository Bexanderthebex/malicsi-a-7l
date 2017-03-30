var app = angular.module('projectApp', []); 

app.controller('logIn', ['$scope', '$http', '$window', function($scope, $http, $window){
	$scope.logAccount = function(uname, password){
		var uname = $scope.username;
		var pword = $scope.password;

		console.log("hello");

		$http.post('/login', {
			username : uname,
			password : pword,
		}).then(function(result){

			if (result.data.message == 'Successfully logged in') {
				$window.location.href = '/home-page.html';
			}else{
				$scope.username = '';
				$scope.password = '';
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

}]);
