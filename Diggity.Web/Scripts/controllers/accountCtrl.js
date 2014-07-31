
/**********************************************************************
 * ********************* Home *****************************************
 *********************************************************************/
myControllers.controller('AccountCtrl', ['$routeParams', '$scope', 'Exercise', 'UnitOfMeasure', 'ExerciseType', 'PersonalRecords',
    function ($routeParams, $scope, Exercise, UnitOfMeasure, ExerciseType, PersonalRecords) {
        'use strict';

        $scope.valuePlaceholder = "Amount";
        $scope.loadingExercises = true;
        $scope.newPR = {};

        //get all exercises
        Exercise.query()
            .then(function (resp) {
                $scope.exerciseList = resp;
                console.log(resp);
            }, queryError)
            .catch(queryError)
            .finally(function () { $scope.loadingExercises = false; });

        //get alll exercise types
        ExerciseType.query()
            .then(function (resp) {
                $scope.exerciseTypes = resp;
                console.log(resp);
            },queryError)
            .catch(queryError)
            .finally(queryFinally);

        function queryFinally() {
            
        }

        function queryError(error) {
            window.alertShow("error", error.data.Message);
        }

        function savePRSuccess() {
            window.alertShow("success", "Personal Record Saved!");
        }

        $scope.onExerciseSelect = function () {
            var exercise = $scope.newPR.Exercise;
            var exerciseType = $.grep($scope.exerciseTypes, function (v) { return v.Id === exercise.ExerciseTypeId; })[0];
            $scope.valuePlaceholder = exerciseType.Name;
            $scope.unitsList = exerciseType.UnitOfMeasures;
        }

        $scope.openDatePicker = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.savePR = function () {
            $scope.prInvalid = $scope.newPrForm.$invalid;

            if ($scope.newPrForm.$valid) {
                var pr = {
                    ExerciseId: $scope.newPR.Exercise.Id,
                    UnitOfMeasureId: $scope.newPR.Unit.Id,
                    Value: $scope.newPR.Value,
                    RecordDate: $scope.newPR.RecordDate
                };

                PersonalRecords.create(pr)
                    .then(savePRSuccess, queryError)
                    .catch(queryError)
                    .finally(queryFinally);
            }
        }

    }
]);
