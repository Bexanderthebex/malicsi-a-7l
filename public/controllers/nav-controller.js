(() => {
    angular.module('app')
        .controller('NavCtrl', NavCtrl);

    LandingCtrl.$inject = ['$scope', '$http'];

    function NavCtrl($scope, $http) {
        $scope.iconUrl = "";

        $http.get('/user')
        .then(function(result){
            if (result.data === "") {
                console.log("kek", result);
                $scope.iconUrl = '/login';
            } else {
                console.log("kek", result);
                $scope.iconUrl = '/competitor/profile';
            }
        }, function(err) {
            console.log(err);
        });
    }
})();
