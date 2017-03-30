var app = angular.module('projectApp', []); 

app.controller('logIn', ['$scope', '$http', '$window', function($scope, $http, $window){
	$scope.logAccount = function(uname, password){
		var uname = $scope.uname;
		var pword = $scope.pword;

		console.log(uname);
		console.log(pword);

		$http.post('/login', {
			username : uname,
			password : pword,
		}).then(function(result){
			console.log(result);
			if (result.data.message == 'Successfully logged in') {
				$window.location.href = '/home-page.html';
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

}]);
