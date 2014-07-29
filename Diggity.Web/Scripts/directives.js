'use strict';

/* Common Directives */
angular.module('myApp.directives', ['template/diggity/grid.html'])
    .directive('appVersion', [
        'version', function(version) {
            return function(scope, elm, attrs) {
                elm.text(version);
            };
        }
    ])
    .directive('diggityGrid', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                title: '@',
                hoverText: '@',
                navUrl: '@',
                recordInfo: '=records'
            },
            templateUrl: 'template/diggity/grid.html'
        }
    });


angular.module('template/diggity/grid.html', []).run(['$templateCache',
    function ($templateCache) {
        $templateCache.put("template/diggity/grid.html",
        '<div class="panel panel-primary">' +
            '<div class="panel-heading">' +
                '<div class="col-lg-9 panel-title">{{title}}</div>' +
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
                '<a href="#/{{navUrl}}/{{record.Id}}" class="list-group-item" ng-repeat="record in recordInfo |filter:searchText">' +
                    '<i class="fa fa-caret-right"></i>' +
                    '<strong> {{record.Name}}</strong>' +
                '</a>' +
            '</div>' +
        '</div>' 
      );
    }
]);

