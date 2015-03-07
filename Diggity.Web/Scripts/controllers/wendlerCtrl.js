/**********************************************************************
 * ********************* Wendler Workouts *****************************
 *********************************************************************/
myControllers.controller('WendlerCtrl', ['$routeParams', '$scope', '$location', 'MaxLifts',
    function ($routeParams, $scope, $location, MaxLifts) {
        'use strict';

        $scope.wenderExercises = {};

        MaxLifts.query().then(function(resp) {
            $scope.wenderExercises = resp;
            console.log(resp);
        });

    }
]);