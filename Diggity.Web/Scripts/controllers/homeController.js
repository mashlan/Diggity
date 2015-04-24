/**********************************************************************
 * ********************* Home *****************************************
 *********************************************************************/
myControllers.controller('HomeCtrl', ['$routeParams', '$scope', "$rootScope", '$location',
    function ($routeParams, $scope, $rootScope, $location) {
        'use strict';

        $scope.redirectToUserPage = function (user) {
            $location.path("/user");
            $rootScope.user = user;
        }
    }
]);
