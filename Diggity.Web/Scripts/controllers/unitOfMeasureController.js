
/**********************************************************************
 * *************** Unit of Meassure View ******************************
 *********************************************************************/
myControllers.controller('UnitOfMeasureCtrl', ['$routeParams', '$scope', 'UnitOfMeasure','$location',
    function ($routeParams, $scope, UnitOfMeasure, $location) {
        'use strict';

        $scope.loading = true;

        UnitOfMeasure.query()
            .then(function(resp) { $scope.unitOfMeasures = resp; }, queryError)
            .catch(queryError)
            .finally(queryFinally);
        
        function queryFinally() {
            $scope.loading = false;
        }

        function queryError(error) {
            window.alertShow("error", error.data.Message);
        }

        $scope.addNew = function() {
            $location.path("/unitOfMeasure/new");
        }
    }
]);
