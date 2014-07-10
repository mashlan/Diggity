
/**********************************************************************
 * *************** Exercise Type View  ********************************
 *********************************************************************/
myControllers.controller('ExerciseTypeCtrl', ['$scope', 'ExerciseType', '$location',
    function($scope, ExerciseType, $location) {
        'use strict';

        $scope.exerciseTypes = [];
        $scope.isLoading = true;

        ExerciseType.query()
            .then(function(resp) { $scope.exerciseTypes = resp; }, queryError)
            .catch(queryError)
            .finally(queryFinally);

        function queryFinally() {
            $scope.loading = false;
        }

        function queryError(error) {
            window.alertShow("error", error.data.Message);
        }

        $scope.addNew = function () {
            $location.path("/exerciseType/new");
        }

        $scope.search = function () {
            $scope.showSearch = !$scope.showSearch;
        }
    }
]);