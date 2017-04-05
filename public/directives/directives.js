(function(){ 
    'use strict';
    
    angular
        .module('app')
        .directive('showAllOngoing', showAllOngoing)
        .directive('showAllIncoming', showAllIncoming)
        .directive('showAllPast', showAllPast)
        .directive('acceptTeam', acceptTeam)
        .directive('declineTeam', declineTeam)
        .directive('tooltipDirective', tooltipDirective)
        .directive('dropdownDirective', dropdownDirective)
        .directive('pressEnter', pressEnter)

        function showAllOngoing() {
            var directive = {
                link: link,
                restrict: 'EA'
            };
            return directive;
            
            function link(scope, element, attrs) {
                $(element).on('click', function() {
                    $('#organizer-ongoing-modal').openModal();
                });
            }

        }

        function showAllIncoming() {
            var directive = {
                link: link,
                restrict: 'EA'
            };
            return directive;
            
            function link(scope, element, attrs) {
                $(element).on('click', function() {
                    $('#organizer-incoming-modal').openModal();
                });
            }

        }

        function showAllPast() {
            var directive = {
                link: link,
                restrict: 'EA'
            };
            return directive;
            
            function link(scope, element, attrs) {
                $(element).on('click', function() {
                    $('#organizer-past-modal').openModal();
                });
            }

        }

        function acceptTeam() {
            var directive = {
                link: link,
                restrict: 'EA'
            };
            return directive;
            
            function link(scope, element, attrs) {
                $(element).on('click', function() {
                    $('#organizer-profile-accept-modal').openModal();
                });
            }

        }

        function declineTeam() {
            var directive = {
                link: link,
                restrict: 'EA'
            };
            return directive;
            
            function link(scope, element, attrs) {
                $(element).on('click', function() {
                    $('#organizer-profile-decline-modal').openModal();
                });
            }

        }

        function tooltipDirective() {
            var directive = {
                link: link,
                restrict: 'EA'
            };
            return directive;
            
            function link(scope, element, attrs) {
                $(element).tooltip();
            }

        }

        function dropdownDirective() {
            var directive = {
                link: link,
                restrict: 'EA'
            };
            return directive;
            
            function link(scope, element, attrs) {
                $(element).dropdown();
            }

        }
        
        function pressEnter() {
            var directive = {
                link: link,
                restrict: 'EA'
            };
            return directive;
            
            function link(scope, element, attrs) {
                element.bind("keypress", function(event) {
                    var keyCode = event.which || event.keyCode;

                    if (keyCode == attrs.code) {
                        scope.$apply(function() {
                            scope.$eval(attrs.pressEnter, {$event: event});
                        });
                    }
                })
            }
            
        }
})();
