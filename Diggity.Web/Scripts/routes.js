
angular.module('myApp.routes', ['ngRoute'])

    // configure views; the authRequired parameter is used for specifying pages
    // which should only be available while logged in
    .config([
        '$routeProvider', '$locationProvider', function($routeProvider) {
            "use strict";

            $routeProvider.when('/', { templateUrl: '../Html/Home.html', controller: 'HomeCtrl' });

            $routeProvider.when('/unitOfMeasure', { templateUrl: '../Html/UnitOfMeasure/UnitOfMeasureView.html', controller: 'UnitOfMeasureCtrl' });
            $routeProvider.when('/unitOfMeasure/:id', { templateUrl: '../Html/UnitOfMeasure/UnitOfMeasureEdit.html', controller: 'UnitOfMeasureEditCtrl' });
            $routeProvider.when('/unitOfMeasure/new', { templateUrl: '../Html/UnitOfMeasure/UnitOfMeasureEdit.html', controller: 'UnitOfMeasureEditCtrl' });

            $routeProvider.when('/exerciseType', { templateUrl: '../Html/ExerciseType/ExerciseTypeView.html', controller: 'ExerciseTypeCtrl' });
            $routeProvider.when('/exerciseType/:id', { templateUrl: '../Html/ExerciseType/ExerciseTypeEdit.html', controller: 'ExerciseTypeEditCtrl' });
            $routeProvider.when('/exerciseType/new', { templateUrl: '../Html/UnitOfMeasure/ExerciseTypeEdit.html', controller: 'ExerciseTypeEditCtrl' });

            $routeProvider.when('/exercise', { templateUrl: '../Html/Exercise/ExerciseView.html', controller: 'ExerciseCtrl' });
            $routeProvider.otherwise({ redirectTo: '/' });
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