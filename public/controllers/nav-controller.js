(() => {
    angular.module('app')
        .controller('NavCtrl', NavCtrl);

    NavCtrl.$inject = ['$scope', '$http'];

    function NavCtrl($scope, $http) {
        $scope.iconUrl = "";

        $http.get('/user')
        .then(function(result){
            if (result.data === "") {
                $scope.iconUrl = '/login';
            } else {
                $scope.iconUrl = '/competitor/profile';
            }
        }, function(err) {
            console.log(err);
        });
    }
})();
