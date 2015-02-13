/**********************************************************************
 * ********************* Wendler Workouts *****************************
 *********************************************************************/
myControllers.controller('WendlerCtrl', ['$routeParams', '$scope', '$location', 'MaxLifts',
    function ($routeParams, $scope, $location, MaxLifts) {
        'use strict';

        MaxLifts.query()
            .then(function(resp) {
                console.log(resp);
            });

    }
]);