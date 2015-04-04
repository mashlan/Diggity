
myControllers.controller("PersonalBestCtrl", ["$routeParams", "$scope", "Exercise", "UnitOfMeasure", "ExerciseType", "PersonalRecords",
    function ($routeParams, $scope, Exercise, UnitOfMeasure, ExerciseType, PersonalRecords) {
        "use strict";

        $scope.valuePlaceholder = "Amount";
        $scope.loadingExercises = true;
        $scope.loadingHistory = true;
        $scope.newPR = {};
        $scope.historySortOptions = [
            { id: 0, value: "Most Recent" },
            { id: 1, value: "Max Effort" },
            { id: 2, value: "Sort Alphabetically" }
        ];

        $scope.sortOption = 0;

        //get all exercises
        Exercise.query()
            .then(function (resp) {
                $scope.exerciseList = resp;
                console.log(resp);
            }, queryError)
            .catch(queryError)
            .finally(function () { $scope.loadingExercises = false; });

        //get all exercise types
        ExerciseType.query()
            .then(function (resp) {
                $scope.exerciseTypes = resp;
                console.log(resp);
            }, queryError)
            .catch(queryError)
            .finally(queryFinally);

        function queryFinally() {

        }

        function queryError(error) {
            window.alertShow("error", error.data.Message);
        }

        function savePRSuccess(resp) {
            window.alertShow("success", "Personal Record Saved!");
            $scope.getHistory();
            $scope.hideEnterPrForm();
        }

        function prHistoryQueryComplete(resp) {
            $scope.History = resp;
            $scope.sortHistoy(0);
            $scope.loadingHistory = false;
        }

        $scope.selectRow = function (scope) {
            var histories = scope.$parent.exerciseHistory;
            $.each(histories, function (i, v) { v.selected = false; });
            scope.history.selected = true;
        }

        function sortByHistoryRecordDate(asc, historyArray) {
            if (asc) {
                historyArray.sort(function (a, b) {
                    return new Date(b.RecordDate) < new Date(a.RecordDate);
                });
            } else {
                historyArray.sort(function (a, b) {
                    return new Date(a.RecordDate) < new Date(b.RecordDate);
                });
            }
        }

        $scope.showGraph = function (scope) {
            var exerciseId = scope.history.ExerciseId;
            $scope.editHistoryRecords = $.grep($scope.History, function (v) { return v.ExerciseId == exerciseId; })[0].History;

            var graph = $("#container_" + scope.$index);
            var width = $(".panel").first().width();

            var getExerciseDates = function (history) {
                var data = [];
                sortByHistoryRecordDate(true, history);
                $.each(history, function (i, v) {
                    var date = new Date(v.RecordDate);
                    data.push((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
                });
                return data;
            };

            var getExerciseData = function (history) {
                var data = [];
                sortByHistoryRecordDate(true, history);
                $.each(history, function (i, v) {
                    data.push(parseFloat(v.Value));
                });
                return data;
            };

            graph.highcharts({
                chart: {
                    width: width - 40
                },
                title: {
                    text: ""
                },
                xAxis: {
                    categories: getExerciseDates($scope.editHistoryRecords)
                },
                yAxis: {
                    title: "",
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: "#808080"
                    }]
                },
                series: [
                    {
                        name: scope.history.ExerciseName,
                        data: getExerciseData($scope.editHistoryRecords)
                    }
                ],
                legend: {
                    enabled: false
                },
                credits: {
                    enabled: false
                }
            });

            //set the array back to original sort
            sortByHistoryRecordDate(false, $scope.editHistoryRecords);
            scope.history.showGraph = true;
        }

        $scope.editHistory = function (scope) {
            var histories = scope.$parent.exerciseHistory;
            $.each(histories, function (i, v) { v.showEditHistory = false; });
            var exerciseId = scope.history.ExerciseId;
            $scope.editHistoryRecords = $.grep($scope.History, function (v) { return v.ExerciseId == exerciseId; })[0].History;
            var units = getUnitsOfMeasure(exerciseId);
            $.each($scope.editHistoryRecords, function (i, v) {
                v.units = units;
                v.selectedUnit = $.grep(units, function (x) { return x.Id === v.UnitOfMeasureId })[0];
            });
            scope.history.showEditHistory = true;
        }

        $scope.sortHistoy = function (sortId) {
            $scope.exerciseHistory = [];
            $.each($scope.History, function (i, v) {
                //default to record with most current date
                var mostRecent = {};
                $.each(v.History, function (index, value) {
                    if (sortId === 0) {
                        if (mostRecent.RecordDate === undefined) {
                            mostRecent = value;
                        }
                        var recentDate = new Date(mostRecent.RecordDate);
                        var nextDate = new Date(value.RecordDate);
                        if (recentDate < nextDate) {
                            mostRecent = value;
                        }
                    } else {
                        if (mostRecent.Value === undefined) {
                            mostRecent = value;
                        }
                        if (parseFloat(mostRecent.Value) < parseFloat(value.Value)) {
                            mostRecent = value;
                        }
                    }
                });
                $scope.exerciseHistory.push(mostRecent);
            });
        }

        $scope.getHistory = function () {
            PersonalRecords.query()
                .then(prHistoryQueryComplete, queryError)
                .catch(queryError)
                .finally(queryFinally);
        }

        $scope.onExerciseSelect = function () {
            var exercise = $scope.newPR.Exercise;
            var exerciseType = $.grep($scope.exerciseTypes, function (v) { return v.Id === exercise.ExerciseTypeId; })[0];
            $scope.valuePlaceholder = exerciseType.Name;
            $scope.unitsList = exerciseType.UnitOfMeasures;
        }

        function getUnitsOfMeasure(exerciseId) {
            var exercise = $.grep($scope.exerciseList, function (v) { return v.Id == exerciseId; })[0];
            var exerciseType = $.grep($scope.exerciseTypes, function (v) { return v.Id === exercise.ExerciseTypeId; })[0];
            return exerciseType.UnitOfMeasures;
        }

        $scope.openDatePicker = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.savePR = function () {
            $scope.prInvalid = $scope.newPrForm.$invalid;

            if ($scope.newPrForm.$valid) {
                var pr = {
                    ExerciseId: $scope.newPR.Exercise.Id,
                    UnitOfMeasureId: $scope.newPR.Unit.Id,
                    Value: $scope.newPR.Value,
                    RecordDate: $scope.newPR.RecordDate
                };

                PersonalRecords.create(pr)
                    .then(savePRSuccess, queryError)
                    .catch(queryError)
                    .finally(queryFinally);
            }
        }

        $scope.hideEnterPrForm = function (show) {
            var prForm = $('.pr-entry');
            if (show) {
                prForm.slideDown();
            } else {
                prForm.slideUp();
            }
        }
    }
]);
