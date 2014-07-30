
/**********************************************************************
 * *************** Exercise Type View  ********************************
 *********************************************************************/
myControllers.controller('ExerciseTypeCtrl', ['$scope', 'ExerciseType',
    function($scope, ExerciseType) {
        'use strict';

        ExerciseType.query()
            .then(function(resp) { $scope.exerciseTypes = resp; }, queryError)
            .catch(queryError)
            .finally(queryFinally);

        function queryFinally() {
            console.log('finished loading records from database');
        }

        function queryError(error) {
            window.alertShow("error", error.data.Message);
        }
    }
]);