/**********************************************************************
 * ********************* Exercise Controller **************************
 *********************************************************************/
myControllers.controller('ExerciseCtrl', ['$routeParams', '$scope', '$location', 'Exercise', 'ExerciseType',
    function ($routeParams, $scope, $location, Exercise, ExerciseType) {
        'use strict';

        $scope.loading = true;
        $scope.exercise = {};
        $scope.isEditing = false;
        $scope.ExerciseTypes = [];

        if ($routeParams.id) {
            getExercise();
        }

        $scope.getAllExercises = function () {
            Exercise.query()
                .then(function (resp) { $scope.exercises = resp; }, queryError)
                .catch(queryError)
                .finally(queryFinally);
        }

        function getExercise() {
            ExerciseType.query()
                .then(function (resp) { $scope.availableExerciseTypes = resp; }, queryError)
                .catch(queryError);

            if ($routeParams.id != 'new') {
                Exercise.get($routeParams.id)
                    .then(getOne, queryError)
                    .catch(queryError)
                    .finally(queryFinally);
            } else {
                $scope.exercise = {
                    Id: 0
                };
                $scope.loading = false;
                $scope.isEditing = true;
            }
        }

        $scope.saveExercise = function () {
            if ($scope.exercise.Id > 0) {
                Exercise.update($scope.exercise)
                    .then(saveSuccess, queryError)
                    .catch(queryError)
                    .finally(queryFinally);
            } else {
                Exercise.create($scope.exercise)
                    .then(saveSuccess, queryError)
                    .catch(queryError)
                    .finally(queryFinally);
            }
        }

        $scope.editRecord = function () {
            $scope.isEditing = true;
            $scope.currentRecord = angular.copy($scope.exerciseType);
        }

        $scope.cancelEdit = function () {
            $scope.isEditing = false;
            $scope.exerciseType = angular.copy($scope.currentRecord);
        }

        $scope.deleteRecord = function () {
            Exercise.remove($scope.exercise.Id)
                .then(deleteSuccess, queryError)
                .catch(queryError)
                .finally(queryFinally);
        }

        $scope.setSelectedExerciseType = function (type) {
            $scope.ExerciseTypeId = type.Id;
        }

        function saveSuccess() {
            $scope.isEditing = false;
            window.alertShow("success", "Woo Hoo! Record saved success");
        }

        function getOne(resp) {
            $scope.exercise = resp;
        }

        function queryFinally() {
            $scope.loading = false;
        }

        function queryError(error) {
            window.alertShow("error", error.data.Message);
        }

        function deleteSuccess() {
            window.alertShow("success", "Woo Hoo! Record deleted successfully");
            $location.path('/exerciseType');
        }

    }
]);