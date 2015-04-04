/**********************************************************************
 * ********************* Home *****************************************
 *********************************************************************/
myControllers.controller('HomeCtrl', ['$routeParams', '$scope', '$location',
    function ($routeParams, $scope, $location) {
        'use strict';

        $scope.redirectToUserPage = function() {
            $location.path("/user");
        }
    }
]);
