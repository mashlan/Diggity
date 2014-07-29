/**********************************************************************
 * ********************* Exercise View ********************************
 *********************************************************************/
myControllers.controller('ExerciseCtrl', ['$routeParams', '$scope', '$location', 'Exercise',
    function ($routeParams, $scope, $location, Exercise) {
        'use strict';
        $scope.loading = true;
        $scope.exercises = [];

        Exercise.query()
            .then(getAll, queryError)
            .catch(queryError)
            .finally(queryFinally);

        $scope.addNew = function() {
            $location.path("exercise/new");
        }

        function getAll(resp) {
            $scope.exercises = resp;
        }

        function queryFinally() {
            $scope.loading = false;
        }

        function queryError(error) {
            window.alertShow("error", error.data.Message);
        }
    }
]);