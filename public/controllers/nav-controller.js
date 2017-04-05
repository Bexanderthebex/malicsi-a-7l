(() => {
    angular.module('app')
        .controller('LandingCtrl', LandingCtrl);

    LandingCtrl.$inject = ['$scope', '$http'];

    function LandingCtrl($scope, $http) {
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
