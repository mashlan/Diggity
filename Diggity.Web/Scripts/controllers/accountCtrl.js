

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
            var roundedToFive = (Math.round(estimatedLift / 5) * 5);
            var trainingMax = (Math.round(estimatedLift * .9 / 5) * 5);
            $scope.estimatedTrainingMax = trainingMax;
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
