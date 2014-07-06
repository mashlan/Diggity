
angular.module('myApp.routes', ['ngRoute'])

    // configure views; the authRequired parameter is used for specifying pages
    // which should only be available while logged in
    .config([
        '$routeProvider', '$locationProvider', function($routeProvider) {
            "use strict";

            $routeProvider.when('/home', { templateUrl: '../Html/Exercise/ExerciseTypeView.html', controller: 'ExerciseTypeCtrl' });

            $routeProvider.otherwise({ redirectTo: '/home' });
        }
    ]);