(() => {
    'use strict';

    angular
        .module('app')
        .controller('OrganizerController', OrganizerController);

    OrganizerController.$inject = ['$scope', 'OrganizerService'];

    function OrganizerController($scope, OrganizerService) {
        $scope.add_expense = add_expense;
        $scope.get_expense = get_expense;
        $scope.expenses = [];
        $scope.organizer = {};

        function add_expense(expense) {
            console.log(expense);

            OrganizerService
                .addExpense(expense);
            // $route.reload();
        }

        function get_expense() {
            OrganizerService
                .getExpense()
                .then(function(res) {
                    $scope.expenses = res;
                    console.log($scope.expenses);
                }, function(err) {
                    console.log(err);
                })
        }

    }
})();