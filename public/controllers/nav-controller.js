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
                $scope.iconUrl = '#/login';
            } else {
                $scope.user = result.data;
                $scope.hide = true;
                if (result.data.type === "C") {
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
