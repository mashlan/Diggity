

myControllers.controller("AccountCtrl", ["$routeParams", "$scope", "Exercise", "UnitOfMeasure", "ExerciseType", "PersonalRecords",
    function ($routeParams, $scope, Exercise, UnitOfMeasure, ExerciseType, PersonalRecords) {
        "use strict";
        
        $scope.estimatedWeight = null;
        $scope.estimatedReps = null;
        $scope.estimatedOneRepMax = null;
        $scope.estimatedTrainingMax = null;

        $scope.reset = function () {
            $scope.err = null;
            $scope.msg = null;
        };

        
        $scope.calculateOneRepMax = function () {
            var weight = parseFloat($scope.estimatedWeight);
            var reps = parseFloat($scope.estimatedReps);
            var estimatedLift = weight * (1 + (reps / 30));
            var roundedToFive = (Math.round(estimatedLift));
            var trainingMax = (Math.round(estimatedLift * .9));
            $scope.estimatedTrainingMax = trainingMax;
            $scope.estimatedOneRepMax = roundedToFive;
        };

        
        $scope.showEstimationForm = function () {
            $("#oneRepMaxEstimation_form").slideToggle("slow");

            if ($("#oneRepMaxEstimation_form").is(":visible")) {
                $("html, body").animate({ scrollTop: $("#oneRepMaxEstimation_form").offset().top });
            }
        };
    }
]);
