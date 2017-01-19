var app = angular.module("enchetanque", ["ngRoute","ngSanitize","ngStorage","ngLoadingSpinner","ezfb"]);

app.directive('scrollToTopBeforeAnimation', ['$animate', function ($animate) {
    return {
        restrict: 'A',
        link: function ($scope, element) {
            $animate.on('enter', element, function (element, phase) {

                if (phase === 'start') {

                    window.scrollTo(0, 0);
                }

            })
        }
    };
}]);