
/**********************************************************************
 * *************** Unit of Measure View ******************************
 *********************************************************************/
myControllers.controller('UnitOfMeasureCtrl', ['$routeParams', '$scope', 'UnitOfMeasure',
    function ($routeParams, $scope, UnitOfMeasure) {
        'use strict';

        UnitOfMeasure.query()
            .then(function(resp) { $scope.unitOfMeasures = resp; }, queryError)
            .catch(queryError)
            .finally(queryFinally);
        
        function queryFinally() {
            console.log("finished loading record(s) from database");
        }

        function queryError(error) {
            window.alertShow("error", error.data.Message);
        }
    }
]);
