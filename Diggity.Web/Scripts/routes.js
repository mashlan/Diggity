﻿
angular.module("myApp.routes", ["ngRoute"])

    // configure views; the authRequired parameter is used for specifying pages
    // which should only be available while logged in
    .config([
        "$routeProvider", "$locationProvider", function($routeProvider) {
            "use strict";

            $routeProvider.when("/", { templateUrl: "../Html/Home.html", controller: "HomeCtrl" });

            //User landing page
            $routeProvider.when("/user", { templateUrl: "../Html/Account/Index.html", controller: "AccountCtrl" });

            //Units of Measure
            $routeProvider.when("/unitOfMeasure", { templateUrl: "../Html/UnitOfMeasure/UnitOfMeasureView.html", controller: "UnitOfMeasureCtrl" });
            $routeProvider.when("/unitOfMeasure/:id", { templateUrl: "../Html/UnitOfMeasure/UnitOfMeasureEdit.html", controller: "UnitOfMeasureCtrl" });

            //Exercise Types
            $routeProvider.when("/exerciseType", { templateUrl: "../Html/ExerciseType/ExerciseTypeView.html", controller: "ExerciseTypeCtrl" });
            $routeProvider.when("/exerciseType/:id", { templateUrl: "../Html/ExerciseType/ExerciseTypeEdit.html", controller: "ExerciseTypeCtrl" });

            //Exercise
            $routeProvider.when("/exercise", { templateUrl: "../Html/Exercise/ExerciseView.html", controller: "ExerciseCtrl" });
            $routeProvider.when("/exercise/:id", { templateUrl: "../Html/Exercise/ExerciseEdit.html", controller: "ExerciseCtrl" });

            //Wendlers
            $routeProvider.when("/wendler", { templateUrl: "../Html/Wendler/Index.html", controller: "WendlerCtrl" });
            $routeProvider.when("/wendler/create", { templateUrl: "../Html/Wendler/Index.html", controller: "WendlerCtrl" });

            //HIT Timer
            $routeProvider.when("/timer", { templateUrl: "../Html/Timers/BasicTimer.html" });

            //settings
            $routeProvider.when("/settings", { templateUrl: "../Html/Settings/Index.html", controller: "SettingsCtrl" });

            //WODs
            $routeProvider.when("/wod", { templateUrl: "../Html/WOD/Index.html", controller: "WodCtrl" });

            //Weight Lifting Workouts
            $routeProvider.when("/liftingWorkouts", { templateUrl: "../Html/WeightLifting/Index.html", controller: "MyLiftsCtrl" });
            $routeProvider.when("/liftingWorkouts/create", { templateUrl: "../Html/WeightLifting/CreateLiftingProgram.html", controller: "MyLiftsCtrl" });


            //Personal Records
            $routeProvider.when("/pr", { templateUrl: "../Html/PersonalBest/Index.html", controller: "PersonalBestCtrl" });

            //All else
            $routeProvider.otherwise({ redirectTo: "/" });
        }
    ])
    .factory("authHttpResponseInterceptor", [
        "$q", "$location", function($q, $location) {
            return {
                response: function(response) {
                    if (response.status === 401) {  
                        console.log("Response 401");
                    }
                    return response || $q.when(response);
                },
                responseError: function(rejection) {
                    if (rejection.status === 401) {
                        console.log("Response Error 401", rejection);
                        $location.path("/").search("returnTo", $location.path());
                    }
                    return $q.reject(rejection);
                }
            }
        }
    ])
    .config([
        "$httpProvider", function($httpProvider) {
            //Http Interceptor to check auth failures for xhr requests
            $httpProvider.interceptors.push("authHttpResponseInterceptor");
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