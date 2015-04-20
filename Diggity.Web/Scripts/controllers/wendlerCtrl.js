/**********************************************************************
 * ********************* Wendler Workouts *****************************
 *********************************************************************/
myControllers.controller("WendlerCtrl", ["$routeParams", "$scope", "$location", "WendlerExercise", "WendlerTemplate", "Exercise",
    function ($routeParams, $scope, $location, WendlerExercise, WendlerTemplate, Exercise) {
        "use strict";

        $scope.daysPerWeekOptions = WendlerTemplate.daysPerWeekOptions;
        $scope.traningPercentOptions = WendlerTemplate.trainingPercentOptions;
        $scope.assistanceOptions = WendlerTemplate.templateOptions;
        $scope.boringButBigOptions = WendlerTemplate.boringButBigOptions();
        $scope.columnSpacing = "col-lg-3";
      

        $scope.selectedExercise = {};
        $scope.selectedWorkoutExercise = {};
        $scope.wenderExercises = {};
        $scope.assistanceExercises = [];
        $scope.wendlerProgram = [];
        $scope.customAssistanceExercises = [];
        $scope.trainingPercent = $scope.traningPercentOptions[0];
        $scope.daysPerWeek = $scope.daysPerWeekOptions[0];
        $scope.exerciseList = [];

        //hide and show subforms
        $scope.showTrainingPercentOptions = false;
        $scope.showBoringButBigForm = false;
        $scope.showAssistanceExerciesForm = false;
        $scope.showDaysPerWeekForm = false;


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
        
        WendlerExercise.query().then(function (resp) {
            $scope.wenderExercises = resp;
            console.log(resp);

            $.each($scope.wenderExercises, function (i, v) {
                v.Value = v.PersonalRecords[0] != null ? v.PersonalRecords[0].Value : 0;
                v.RecordDate = v.PersonalRecords[0] != null ? v.PersonalRecords[0].RecordDate : "NA";
                var trainingPercent = .9 * parseInt(v.Value);
                var roundedTrainingPercent = WendlerTemplate.roundToNearestFive(trainingPercent);
                v.TrainingMax = roundedTrainingPercent;
            });
        });

        function hideSubForms() {
            $scope.showTrainingPercentOptions = false;
            $scope.showBoringButBigForm = false;
            $scope.showAssistanceExerciesForm = false;
            $scope.showDaysPerWeekForm = false;

            $.each($scope.wenderExercises, function(i, v) {
                v.showForm = false;
            });
        }

        $scope.hideShowTrainingPercentForm = function() {
            var show = !$scope.showTrainingPercentOptions;
            hideSubForms();
            $scope.showTrainingPercentOptions = show;

            if ($scope.showTrainingPercentOptions) {
                $("html, body").animate({ scrollTop: 653 -95 });
            }
        }

        $scope.hideShowBoringButBigForm = function() {
            var show = !$scope.showBoringButBigForm;
            hideSubForms();
            $scope.showBoringButBigForm = show;
            if ($scope.showBoringButBigForm) {
                $("html, body").animate({ scrollTop: 825 - 95 });
            }
        }

        $scope.hideShowAssistanceExerciesForm = function() {
            var show = !$scope.showAssistanceExerciesForm;
            hideSubForms();
            $scope.showAssistanceExerciesForm = show;
            if ($scope.showAssistanceExerciesForm) {
                $("html, body").animate({ scrollTop: 739- 95 });
            }
        }

        $scope.hideShowDaysPerWeekForm = function() {
            var show = !$scope.showDaysPerWeekForm;
            hideSubForms();
            $scope.showDaysPerWeekForm = show;
            if ($scope.showDaysPerWeekForm) {
                $("html, body").animate({ scrollTop: 567 - 95 });
            }
        }

        $scope.boringOptionSelected = function(opt) {
            $scope.boringOption = opt;
            $scope.showBoringButBigForm = false;
        }

        $scope.setAssistanceOption = function(opt) {
            $scope.assistanceOption = opt;
            $scope.customAssistanceExercises = [];
            $scope.showAssistanceExerciesForm = false;

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
            $scope.showTrainingPercentOptions = false;
        }

        $scope.daysPerWeekSelected = function(opt) {
            $scope.daysPerWeek = opt;
            $scope.showDaysPerWeekForm = false;
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

        $scope.printMonth = function() {
            var selector = ".workout-week";
            $(selector).addClass("print");
            window.print();

            $(selector).removeClass("print");
        }

        $scope.calculateOneRepMax = function(exercise) {
            var estimatedLift = (exercise.estimateWeight * exercise.estimateReps * .0333) + exercise.estimateWeight;
            var estimate = WendlerTemplate.roundToNearestFive(estimatedLift);
            exercise.Value = estimate;
            exercise.TrainingMax = WendlerTemplate.roundToNearestFive(estimate * .9);
        };

        $scope.updateTrainingMax = function(exercise) {
            exercise.TrainingMax = WendlerTemplate.roundToNearestFive(exercise.Value * .9);
        }

        $scope.hideShowLiftForm = function (exercise) {
            var show = !exercise.showForm;
            hideSubForms();
            exercise.showForm = show;
            var offset = $("#lifting_option_form_" + exercise.Id).offset().top;
            if (exercise.showForm) {
                $("html, body").animate({ scrollTop: offset - 100});
            }
        }

        $scope.createWendler = function () {
            $scope.columnSpacing = $scope.daysPerWeek.days === 4 ? "col-lg-3" : "col-lg-4";
            $scope.wendlerProgram = []; //clear workout
            var weekNumber = ($scope.daysPerWeek.days === 4) ? 5 : 7;
            var daysNumber = $scope.daysPerWeek.days === 4 ? 5 : 4;
            
            for (var week = 1; week < weekNumber; week++) {
                $scope.wendlerProgram.push({
                    week: week,
                    trainingDays: [],
                    isVisible: week === 1,
                    isLast: week === weekNumber - 1
                });

                for (var day = 1; day < daysNumber; day++) {
                    var exercise = getExercise(week, day);

                    if(week === 6 && day > 1) break;

                    var trainingDay = {
                        exercise: exercise.Name,
                        groupId: exercise.WendlerGroupId,
                        maxWeight: exercise.Value,
                        trainingWeight: exercise.TrainingMax,
                        warmUp: WendlerTemplate.createWarmUp(exercise.TrainingMax),
                        workout: daysNumber > 4
                            ? WendlerTemplate.createWorkout(week, exercise.TrainingMax, $scope.trainingPercent) :
                            WendlerTemplate.createThreeDayWorkout(week, day, exercise.TrainingMax, $scope.trainingPercent),
                        assistanceExercises: createAssistanceExercises(exercise.Id, exercise.TrainingMax),
                        isLast: day === daysNumber - 1
                    };

                    $scope.wendlerProgram[week - 1].trainingDays.push(trainingDay);
                }
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

        function getExercise(weekNumber, dayNumber) {
            if ($scope.daysPerWeek.days === 4) {
                return $scope.wenderExercises[dayNumber - 1];
            }

            switch (weekNumber) {
            case 1:
                if (dayNumber === 1) return getWendler(8); //military press
                if (dayNumber === 2) return getWendler(5); //deadlift
                return getWendler(1); //bench press
            case 2:
                if (dayNumber === 1) return getWendler(16); //squat
                if (dayNumber === 2) return getWendler(8); //military press
                return getWendler(5); //deadlift
            case 3:
                if (dayNumber === 1) return getWendler(1); //bench press
                if (dayNumber === 2) return getWendler(16); //squat
                return getWendler(8); //military press
            case 4:
                if (dayNumber === 1) return getWendler(5); //deadlift
                if (dayNumber === 2) return getWendler(1); //bench press
                return getWendler(16); //squat
            case 5:
                if (dayNumber === 1) return getWendler(8); //military press
                if (dayNumber === 2) return getWendler(5); //deadlift
                return getWendler(1); //bench press
            case 6:
                return getWendler(16); //squat
            default:
                return null;
            }

            function getWendler(id) {
               return $.grep($scope.wenderExercises, function(w) { return w.Id === id; })[0];
            }
        }

    }
]);