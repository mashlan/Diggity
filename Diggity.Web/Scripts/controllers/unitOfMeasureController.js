
/**********************************************************************
 * *************** Unit of Meassure View ******************************
 *********************************************************************/
myControllers.controller('UnitOfMeasureCtrl', ['$routeParams', '$scope', 'UnitOfMeasure',

    function ($routeParams, $scope, UnitOfMeasure) {
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
    }
]);


/**********************************************************************
 * ********** Unit of Meassure Edit and Create ************************
 *********************************************************************/
myControllers.controller('UnitOfMeasureEditCtrl', ['$routeParams', '$scope', 'UnitOfMeasure',

    function ($routeParams, $scope, UnitOfMeasure) {
        'use strict';

        $scope.loading = true;

        if ($routeParams.id !== "new") {
            UnitOfMeasure.get($routeParams.id)
                .then(function(resp) { $scope.unit = resp; }, queryError)
                .catch(queryError)
                .finally(queryFinally);
        } else {
            $scope.unit = {};
            $scope.loading = false;
        }

        

        $scope.saveUnit = function() {
            if ($scope.unit.Id > 0) {
                UnitOfMeasure.update($scope.unit)
                    .then(saveSuccess, queryError)
                    .catch(queryError)
                    .finally(queryFinally);
            } else {
                UnitOfMeasure.create($scope.unit)
                    .then(saveSuccess ,queryError)
                    .catch(queryError)
                    .finally(queryFinally);
            }
        }

        function saveSuccess() {
            window.alertShow("success", "Woo Hoo! Record saved success");
        }

        function queryFinally() {
            $scope.loading = false;
        }

        function queryError(error) {
            var msg = error.data.ExceptionMessage ? error.data.ExceptionMessage : error.data.Message;
            window.alertShow("error", msg);
        }
    }
]);