'use strict';

/* Common Directives */
angular.module('myApp.directives', ['template/diggity/grid.html'])
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
            templateUrl: 'template/diggity/grid.html'
        }
    });

angular.module('template/diggity/grid.html', []).run(['$templateCache',
    function ($templateCache) {
        $templateCache.put("template/diggity/grid.html",
        '<div ng-init="initFunction()">' +
           '<div ng-show="showLoading">' +
                '<h2><i class="fa fa-2x fa-spin fa-spinner"></i> Loading {{headerTitle}} . . .</h2>' +
            '</div>' +
                '<div ng-hide="showLoading">' +
                '<div class="panel panel-primary">' +
                    '<div class="panel-heading">' +
                        '<div class="col-lg-9 panel-title">{{headerTitle}}</div>' +
                        '<div class="col-lg-3">' +
                            '<div class="input-group">' +
                                '<div class="input-group-btn">' +
                                    '<input type="text" class="form-control input-sm" placeholder="Search" ng-model="searchText.Name">' +
                                    '<a href="#/{{navUrl}}/new" class="btn btn-link btn-sm btn-navigation" tooltip="{{hoverText}}"><i class="fa fa-plus"></i></button>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="clearfix"></div>' +
                    '</div>' +
                    '<div class="clearfix"></div>' +
                    '<div class="list-group">' +
                        '<a href="#/{{navUrl}}/{{record.Id}}" class="list-group-item" ng-repeat="record in recordInfo |filter:searchText" repeat-done>' +
                            '<i class="fa fa-caret-right"></i>' +
                            '<strong> {{record.Name}}</strong>' +
                        '</a>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>'
      );
    }
]);

