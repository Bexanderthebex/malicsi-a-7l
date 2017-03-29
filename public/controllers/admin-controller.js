(() => {
    angular.module('app')
        .controller('AdminCtrl', AdminCtrl);

    AdminCtrl.$inject = ['$scope', '$http', 'UserService'];

    function AdminCtrl($scope, $http, UserService) {
        $scope.admins = [];

        UserService.getUsersByType('A').then((res) => {
            $scope.admins = res.data;
            console.log('admin', $scope.admins);
        }, (err) => {
            console.log(err);
        })
    }
})();
