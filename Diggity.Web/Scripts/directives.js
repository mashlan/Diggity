'use strict';

/* Common Directives */
angular.module('myApp.directives', [])
    .directive('appVersion', [
        'version', function(version) {
            return function(scope, elm) {
                elm.text(version);
            };
        }
    ])
    .directive('repeatDone', function () {
        return function (scope) {
            if (scope.$last) {
                scope.$parent.showLoading = false;
            }
        }
    })
    .directive('prEntry', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '../Html/Account/EnterPR.html'
        }
    })
    .directive('diggityGrid', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                headerTitle: '@',
                hoverText: '@',
                navUrl: '@',
                recordInfo: '=records',
                showLoading: '@',
                initFunction: '&'
            },
            templateUrl: '../Html/Shared/DiggityGrid.html'
        }
    });

