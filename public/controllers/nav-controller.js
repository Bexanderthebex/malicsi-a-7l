(() => {
    angular.module('app')
        .controller('LandingCtrl', LandingCtrl);

    LandingCtrl.$inject = ['$scope', '$http'];

    function LandingCtrl($scope, $http) {
        $scope.iconUrl = "";

        $http.get('/user')
        .then(function(result){
            //if (result.message == 'Successfully logged in') {
            console.log("kek", result);
            if (result.data === "") {
                $scope.iconUrl = '/login';
            } else {
                $scope.iconUrl = '/competitor/profile'
            }
        }, function(err) {
            console.log(err);
        });
    }
})();
