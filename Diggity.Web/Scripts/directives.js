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
    .directive('repeatDone', function() {
        return function(scope) {
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
    .directive('prHistory', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '../Html/Account/PRHistory.html'
        }
    })
    .directive('heroHistory', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '../Html/Account/HeroHistory.html'
        }
    })
    .directive('girlsHistory', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '../Html/Account/GirlsHistory.html'
        }
    })
    .directive('editHistoryRecord', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '../Html/Account/EditPR.html',
            scope: {
                recordInfo: '=record',
                openDatepicker: '&'
            }
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

