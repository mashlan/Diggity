

myControllers.controller('UnitOfMeasureCtrl', ['$routeParams', '$scope', 'UnitOfMeasure',

    function ($routeParams, $scope, UnitOfMeasure) {
        'use strict';

        $scope.loading = true;

        UnitOfMeasure.query().then(function(resp) {
                $scope.unitOfMeasures = resp;
                $scope.loading = false;
            },
            function(error) {
                $scope.loading = false;
                alert(error.data);
            });

    }
]);

myControllers.controller('UnitOfMeasureEditCtrl', ['$routeParams', '$scope', 'UnitOfMeasure',

    function ($routeParams, $scope, UnitOfMeasure) {
        'use strict';

        $scope.loading = true;

        if ($routeParams.id !== "new") {
            UnitOfMeasure.get($routeParams.id).then(
                function(resp) {
                    $scope.unit = resp;
                    $scope.loading = false;
                },
                function(error) {
                    $scope.loading = false;
                    alert(error.data);
                });
        } else {
            $scope.unit = {};
            $scope.loading = false;
        }
    }
]);


myControllers.controller('ExerciseTypeCtrl', ['$scope', 'ExerciseType',
    function ($scope, ExerciseType) {
        'use strict';

        $scope.hasFormError = false;
        $scope.exerciseTypeList = [];
        $scope.exerciseType = {};

        ExerciseType.query().then(function(resp) {
                $scope.exerciseTypeList = resp;
            },
            function(error) {
                alert(error.data);
            });

        $scope.toggleUnit = function (scope) {
            var index = $scope.exerciseType.UnitOfMeasures.indexOf(scope.unit._id);
            if (index > -1) {
                $scope.exerciseType.UnitOfMeasures.splice(index, 1);
                scope.unit.selected = false;
            } else {
                $scope.exerciseType.UnitOfMeasures.push(scope.unit);
                scope.unit.selected = true;
            }
        };

        $scope.setUnitOfMeasureString = function (scope) {
            scope.exerciseType.UnitOfMeasuresString = "";
            $.each(scope.exerciseType.UnitOfMeasures, function (i, v) {
                var comma = scope.exerciseType.UnitOfMeasuresString.length > 0 ? ", " : "";
                scope.exerciseType.UnitOfMeasuresString += comma + v.Name;
            });
        };

        $scope.setActiveRow = function (scope) {
            $("#exerciseTypeTable").find("tr").removeClass("info");
            $("#exerciseType_" + scope.exerciseType._id).addClass("info");
        };

        $scope.getExerciseType = function (id) {
            ExerciseType.get(id).then(function (data) {
                $scope.exerciseType = data;
                setUnitOfMeasureButtons();
            });
        };

        $scope.editRecord = function (scope) {
            $scope.setActiveRow(scope);
            $scope.editExerciseType();
        };

        function setUnitOfMeasureButtons() {
            $.each($scope.unitsList, function (i, v) {
                var unit = $.grep($scope.exerciseType.UnitOfMeasures, function (e) { return e._id === v._id; });
                if (unit.length > 0) {
                    v.selected = true;
                }
                else {
                    v.selected = false;
                }
            });
        }
    }
]);