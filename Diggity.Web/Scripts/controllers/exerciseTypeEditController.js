
/**********************************************************************
 * *************** Exercise Type Edit  ********************************
 *********************************************************************/
myControllers.controller('ExerciseTypeEditCtrl', ['$scope', 'ExerciseType', '$location', '$routeParams', 'UnitOfMeasure',
    function ($scope, ExerciseType, $location, $routeParams, UnitOfMeasure) {
        'use strict';

        $scope.loading = true;
        $scope.availableUnitsOfMeasure = [];


        function getAvailableUnitsOfMeasure() {
            $scope.loading = true;
            UnitOfMeasure.query()
                .then(setUpUnitsOfMeasure, queryError)
                .catch(queryError)
                .finally(queryFinally);
        }

        if ($routeParams.id != 'new') {
            ExerciseType.get($routeParams.id)
                .then(function(resp) {
                    $scope.exerciseType = resp;
                    getAvailableUnitsOfMeasure();
                }, queryError)
                .catch(queryError)
                .finally(queryFinally);
        } else {
            $scope.exerciseType = {};
            $scope.exerciseType.UnitOfMeasures = [];
            $scope.isEditing = true;
            getAvailableUnitsOfMeasure();
        }

        function setUpUnitsOfMeasure(resp) {
            $scope.availableUnitsOfMeasure = resp;
            $.each($scope.availableUnitsOfMeasure, function(i, v) {
                v.selected = $.grep($scope.exerciseType.UnitOfMeasures, function(u) { return u.Id == v.Id; }).length > 0;
            });
        }

        function queryFinally() {
            $scope.loading = false;
        }

        function queryError(error) {
            var msg = error.data.ExceptionMessage ? error.data.ExceptionMessage : error.data.Message;
            window.alertShow("error", msg);
        }

        $scope.saveUnit = function () {
            if ($scope.exerciseType.Id > 0) {
                ExerciseType.update($scope.exerciseType)
                    .then(saveSuccess, queryError)
                    .catch(queryError)
                    .finally(queryFinally);
            } else {
                ExerciseType.create($scope.exerciseType)
                    .then(saveSuccess, queryError)
                    .catch(queryError)
                    .finally(queryFinally);
            }
        };

        function saveSuccess() {
            $scope.isEditing = false;
            window.alertShow("success", "Woo Hoo! Record saved success");
        }

        function deleteSuccess() {
            window.alertShow("success", "Woo Hoo! Record deleted successfully");
            $location.path('/exerciseType');
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
            ExerciseType.remove($scope.exerciseType.Id)
                    .then(deleteSuccess, queryError)
                    .catch(queryError)
                    .finally(queryFinally);
        }

        $scope.toggleSelection = function (unit) {
            unit.selected = !unit.selected;
            if (unit.selected) {
                $scope.exerciseType.UnitOfMeasures.push(unit);
            } else {
                var index = $scope.exerciseType.UnitOfMeasures.indexOf(unit);
                $scope.exerciseType.UnitOfMeasures.splice(index, 1);
            }
        }

    }
]);