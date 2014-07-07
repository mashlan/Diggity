
angular.module('myApp.routes', ['ngRoute'])

    // configure views; the authRequired parameter is used for specifying pages
    // which should only be available while logged in
    .config([
        '$routeProvider', '$locationProvider', function($routeProvider) {
            "use strict";

            $routeProvider.when('/home', { templateUrl: '../Html/UnitOfMeasure/UnitOfMeasureView.html', controller: 'UnitOfMeasureCtrl' });
            $routeProvider.when('/unitOfMeasure/:id', { templateUrl: '../Html/UnitOfMeasure/UnitOfMeasureEdit.html', controller: 'UnitOfMeasureEditCtrl' });
            $routeProvider.when('/unitOfMeasure/new', { templateUrl: '../Html/UnitOfMeasure/UnitOfMeasureEdit.html', controller: 'UnitOfMeasureEditCtrl' });
            $routeProvider.otherwise({ redirectTo: '/home' });
        }
    ]);
    //.run(function($rootScope) {
    //    $rootScope.$on('$routeChangeStart', function() {
    //        //show loading gif
    //        $('#myWaitDiv').show();
    //    });

    //    $rootScope.$on('$routeChangeSuccess', function() {
    //        //hide loading gif
    //        $('#myWaitDiv').hide();
    //    });

    //    $rootScope.$on('$routeChangeError', function() {
    //        //hide loading gif
    //        $('#myWaitDiv').hide();
    //    });
    //});
