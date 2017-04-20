(() => {
    angular.module('app')
        .controller('NavCtrl', NavCtrl);

    NavCtrl.$inject = ['$scope', '$http'];

    function NavCtrl($scope, $http) {
        $scope.iconUrl = "";
        $scope.user = {};
        $scope.hide = false;

        $http.get('/user')
        .then(function(result){
            if (result.data === "") {
                console.log("kek", result);
                $scope.iconUrl = '#/login';
                $scope.user = {};
            } else {
                $scope.user = result.data;
                $scope.hide = true;
                console.log($scope.user);
                console.log($scope.hide);
                if (result.data.type === "C") {
                    console.log("pasok sa competitor profile")
                    $scope.iconUrl = '#/competitor/profile';
                } else if(result.data.type ==="O") {
                    $scope.iconUrl = '#/organizer/profile';
                } else if(result.data.type === "A") {
                    $scope.iconUrl = '#/adminpanel'
                }
            }
        }, function(err) {
            console.log(err);
        });
    }
})();
