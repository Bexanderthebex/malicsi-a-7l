(() => {
    angular.module('app')
        .controller('NavCtrl', NavCtrl);

    NavCtrl.$inject = ['$scope', '$http'];

    function NavCtrl($scope, $http) {
        $scope.iconUrl = "";

        $http.get('/user')
        .then(function(result){
            if (result.data === "") {
                console.log("kek", result);
                $scope.iconUrl = '#/login';
            } else {
                console.log(result.data);
                if (result.data[0].type === "C") {
                    $scope.iconUrl = '#/competitor/profile';
                } else if(result.data[0].type == "O") {
                    $scope.iconUrl = '#/organizer/profile';
                } else if(result.data[0].type == "A") {
                    $scope.iconUrl = '#/adminpanel'
                }
            }
        }, function(err) {
            console.log(err);
        });
    }
})();
