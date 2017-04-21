(() => {
    angular.module('app')
        .controller('LandingCtrl', LandingCtrl);

    LandingCtrl.$inject = ['$scope', '$http', 'GameService'];

    function LandingCtrl($scope, $http, GameService) {
        $scope.games = [];
        $scope.getGames = getGames;
        $(document).ready(function () {
            $('body').css('overflow', 'auto');
        });

        function getGames(argument) {
            GameService.viewUpcomingOngoingGames()
            .then((res) => {
                $scope.games = res;

                // Cheap fix. Seems you have to initialize after retrieving data.
                $(document).ready(function () {
                	$('body').css('overflow', 'auto');

                	$('.slider').slider({
                        height: 490,                // adjust height
                        full_width: false,
                        interval: 7000,
                        indicators: true            // set to false to disable circle pagers
                    });
                });
            }, (err) => {
                console.log(err);
            })
        }

    }
})();
