

myControllers.controller("AccountCtrl", ["$routeParams", "$scope", "Exercise", "UnitOfMeasure", "ExerciseType", "PersonalRecords",
    function ($routeParams, $scope, Exercise, UnitOfMeasure, ExerciseType, PersonalRecords) {
        "use strict";
        
        $scope.estimatedWeight = 0;
        $scope.estimatedReps = 0;
        $scope.estimatedOneRepMax = 0;

        $scope.reset = function () {
            $scope.err = null;
            $scope.msg = null;
        };

        
        $scope.calculateOneRepMax = function () {
            var weight = parseFloat($scope.estimatedWeight);
            var reps = parseFloat($scope.estimatedReps);
            var estimatedLift = weight * (1 + (reps / 30));
            var roundedToFive = (Math.round(estimatedLift / 5) * 5);
            $scope.estimatedOneRepMax = roundedToFive;
        };

        
        $scope.showEstimationFormForm = function () {
            resetEditForms();
            $("#oneRepMaxEstimation_text").toggle();
            $("#oneRepMaxEstimation_form").toggle();
        };
        
        function resetEditForms() {
            $("#oneRepMaxEstimation_text").show();
            $("#oneRepMaxEstimation_form").hide();
        }

        $scope.hideAllForms = function () {
            resetEditForms();
        }
    }
]);
