
/**********************************************************************
 * ********** Unit of Meassure Edit and Create ************************
 *********************************************************************/
myControllers.controller('UnitOfMeasureEditCtrl', ['$routeParams', '$scope', 'UnitOfMeasure', '$location',
    function ($routeParams, $scope, UnitOfMeasure, $location) {
        'use strict';

        $scope.loading = true;

        if ($routeParams.id !== "new") {
            UnitOfMeasure.get($routeParams.id)
                .then(function (resp) { $scope.unit = resp; }, queryError)
                .catch(queryError)
                .finally(queryFinally);
        } else {
            $scope.unit = {};
            $scope.loading = false;
            $scope.isEditing = true;
        }


        $scope.saveUnit = function () {
            if ($scope.unit.Id > 0) {
                UnitOfMeasure.update($scope.unit)
                    .then(saveSuccess, queryError)
                    .catch(queryError)
                    .finally(queryFinally);
            } else {
                UnitOfMeasure.create($scope.unit)
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
            $location.path('/unitOfMeasure');
        }

        function queryFinally() {
            $scope.loading = false;
        }

        function queryError(error) {
            var msg = error.data.ExceptionMessage ? error.data.ExceptionMessage : error.data.Message;
            window.alertShow("error", msg);
        }

        $scope.editRecord = function () {
            $scope.isEditing = true;
            $scope.currentRecord = angular.copy($scope.unit);
        }

        $scope.cancelEdit = function () {
            $scope.isEditing = false;
            $scope.unit = angular.copy($scope.currentRecord);
        }

        $scope.deleteRecord = function () {
            UnitOfMeasure.remove($scope.unit.Id)
                    .then(deleteSuccess, queryError)
                    .catch(queryError)
                    .finally(queryFinally);
        }
        
    }
]);