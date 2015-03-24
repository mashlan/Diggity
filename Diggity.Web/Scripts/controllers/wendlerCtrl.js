/**********************************************************************
 * ********************* Wendler Workouts *****************************
 *********************************************************************/
myControllers.controller("WendlerCtrl", ["$routeParams", "$scope", "$location", "MaxLifts", "WendlerTemplate","Exercise",
    function ($routeParams, $scope, $location, MaxLifts, WendlerTemplate, Exercise) {
        "use strict";

        $scope.daysPerWeekOptions = WendlerTemplate.daysPerWeekOptions;
        $scope.traningPercentOptions = WendlerTemplate.trainingPercentOptions;
        $scope.assistanceOptions = WendlerTemplate.templateOptions;
        $scope.boringButBigOptions = WendlerTemplate.boringButBigOptions();

        $scope.selectedExercise = {};
        $scope.selectedWorkoutExercise = {};
        $scope.wenderExercises = {};
        $scope.assistanceExercises = [];
        $scope.wendlerProgram = [];
        $scope.customAssistanceExercises = [];
        $scope.trainingPercent = $scope.traningPercentOptions[0];
        $scope.daysPerWeek = $scope.daysPerWeekOptions[0];
        $scope.exerciseList = [];

        //set default
        $scope.boringOption = $scope.boringButBigOptions[8];
        $scope.assistanceOption = $scope.assistanceOptions[0];

        function queryFinally() {
            $scope.loading = false;
        }

        function queryError(error) {
            window.alertShow("error", error.data.Message);
        }

        Exercise.query()
                .then(function (resp) { $scope.exerciseList = resp; }, queryError)
                .catch(queryError)
                .finally(queryFinally);


        $scope.onExerciseChange = function() {
            var ex = $scope.selectedWorkoutExercise.Exercise;
            $scope.selectedWorkoutExercise.exerciseName = ex.Name;
            $scope.selectedWorkoutExercise.exerciseId = ex.Id;

            //check for a pr
            //if no pr, remove percent and weight

            //else update weight based on percent.
        }
        
        MaxLifts.query().then(function (resp) {
            $scope.wenderExercises = resp;
            console.log(resp);

            $.each($scope.wenderExercises, function (i, v) {
                var trainingPercent = .9 * parseInt(v.Value);
                var roundedTrainingPercent = WendlerTemplate.roundToNearestFive(trainingPercent);
                v.TrainingMax = roundedTrainingPercent;
            });
        });

        $scope.boringOptionSelected = function(opt) {
            $scope.boringOption = opt;
            $("#boringOptionsModal").modal("hide");
        }

        $scope.setAssistanceOption = function(opt) {
            $scope.assistanceOption = opt;
            $scope.customAssistanceExercises = [];
            $("#assistanceExericiseModal").modal("hide");

            $.each($scope.wenderExercises, function (i, v) {
                v.customAssistanceExercises = [];
                v.customAssistanceExercises.push({
                    mainExerciseName: v.ExerciseName,
                    exercises: createAssistanceExercises(v.ExerciseId, v.TrainingMax)
                });
            });
        }

        $scope.updateTrainingMax = function() {
            $scope.selectedExercise.TrainingMax = WendlerTemplate.roundToNearestFive($scope.selectedExercise.Value * .9);
        }

        $scope.trainingPercentOptionSelected = function(opt) {
            $scope.trainingPercent = opt;
            $("#trainingPercentOptionsModal").modal("hide");
        }

        $scope.daysPerWeekSelected = function(opt) {
            $scope.daysPerWeek = opt;
            $("#daysPerWeekOptionsModal").modal("hide");
        }

        $scope.setSelectedExercise = function(exercise) {
            $scope.selectedExercise = exercise;
            $scope.estimateWeight = null;
            $scope.estimateReps = null;
        }

        $scope.hideShowContent = function(selector) {
            var elem = $("#" + selector);

            //get parent panel
            var panel = elem.closest(".panel");
            var listGroup = panel.find(".list-group");
            
            if (elem.hasClass("fa-rotate-180")) {
                elem.removeClass("fa-rotate-180");
                listGroup.show("slow");
            } else {
                elem.addClass("fa-rotate-180");
                listGroup.hide("slow");
            }
        }

        $scope.printWeek = function(weekNumber) {
            var selector = "#workout_week_" + weekNumber;
            $(selector).addClass("print");
            window.print();
            $(selector).removeClass("print");
        }

        $scope.printMonth = function(weekNumber) {
            var selector = ".workout-week";
            $(selector).addClass("print");
            $(selector).parent().addClass("active");
            window.print();

            $(selector).removeClass("print");
            $(selector).parent().removeClass("active");
            $("#workout_week_" + weekNumber).parent().addClass("active");
        }

        $scope.calculateOneRepMax = function() {
            var estimatedLift = ($scope.estimateWeight * $scope.estimateReps * .0333) + $scope.estimateWeight;
            var estimate = WendlerTemplate.roundToNearestFive(estimatedLift);
            $scope.selectedExercise.Value = estimate;
            $scope.selectedExercise.TrainingMax = WendlerTemplate.roundToNearestFive(estimate * .9);
        };

        $scope.createWendler = function () {
            $scope.wendlerProgram = []; //clear workout

            for (var week = 1; week < 5; week++) {
                $scope.wendlerProgram.push({
                    week: week,
                    trainingDays: []
                });

                $.each($scope.wenderExercises, function(i, v) {
                    var trainingDay = {
                        exercise: v.ExerciseName,
                        groupId: v.WendlerGroupId,
                        maxWeight: v.Value,
                        trainingWeight: v.TrainingMax,
                        warmUp: WendlerTemplate.createWarmUp(v.TrainingMax),
                        workout: WendlerTemplate.createWorkout(week, v.TrainingMax),
                        assistanceExercises: createAssistanceExercises(v.ExerciseId, v.TrainingMax)
                    };

                    $scope.wendlerProgram[week - 1].trainingDays.push(trainingDay);
                });
            }
        }

        $scope.editAssistanceExercise = function(asst) {
            $scope.selectedWorkoutExercise = asst;
            var selected = $.grep($scope.exerciseList, function (x) { return x.Id === asst.exerciseId });
            if (selected.length > 0) $scope.selectedWorkoutExercise.Exercise = selected[0];
        }

        function createAssistanceExercises(exerciseId, trainingWeight) {
            var asst = [];
            switch ($scope.assistanceOption.option) {
                case 2:
                    asst = WendlerTemplate.createBoringAssistanceExercise(exerciseId, trainingWeight, $scope.boringOption.percent);
                    break;
                case 3:
                    asst = WendlerTemplate.createTriumvirateAssistanceExercise(exerciseId);
                    break;
                case 4:
                    asst = WendlerTemplate.createPeriodizationBible(exerciseId);
                    break;
                case 5:
                    asst = WendlerTemplate.createBodyweight(exerciseId);
                    break;
                case 6:
                    asst = WendlerTemplate.createRollYourOwn(exerciseId);
                    break;
                default:
                    return null;
            }
            return asst;
        }
        
    }
]);