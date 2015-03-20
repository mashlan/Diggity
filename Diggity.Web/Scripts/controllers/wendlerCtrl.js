/**********************************************************************
 * ********************* Wendler Workouts *****************************
 *********************************************************************/
myControllers.controller("WendlerCtrl", [
    "$routeParams", "$scope", "$location", "MaxLifts",
    function($routeParams, $scope, $location, MaxLifts) {
        "use strict";

        $scope.daysPerWeekOptions = [
            { option: 1, text: "4 days per week", days: 4 },
            { option: 2, text: "3 days per week", days: 3 }
        ];

        $scope.traningPercentOptions = [
            { option: 1, text: "Standard", description: "Recomended. Be fresher for the last big set." },
            { option: 2, text: "Heavier", description: "Training percentages are higher in week 1 and 2" }
        ];

        $scope.assistanceOptions = [
            { option: 1, text: "None" },
            { option: 2, text: "Boring But Big" },
            { option: 3, text: "The Triumvirate" },
            { option: 4, text: "Periodization Bible" },
            { option: 5, text: "Bodyweight"},
            { option: 6, text: "Roll your own" }
        ];

        $scope.selectedExercise = {};
        $scope.wenderExercises = {};
        $scope.wendlerProgram = [];
        $scope.boringButBigOptions = [];
        $scope.boringOption = {};
        $scope.trainingPercent = $scope.traningPercentOptions[0];
        $scope.daysPerWeek = $scope.daysPerWeekOptions[0];

        function getBoringButBigOtions() {
            for (var i = 0; i < 10; i++) {
                var percent = 30 + (i * 5);
                var text = 5 + " X " + 10 + " @ " + percent + "%";
                $scope.boringButBigOptions.push({ option: i, sets: 5, reps: 10, percent: percent, text: text });
            }

            //set default
            $scope.boringOption = $scope.boringButBigOptions[8];
        }

        getBoringButBigOtions();
        
        $scope.boringOptionSelected = function(opt) {
            $scope.boringOption = opt;
        }

        $scope.updateTrainingMax = function() {
            $scope.selectedExercise.TrainingMax = roundToNearestFive($scope.selectedExercise.Value * .9);
        }

        $scope.trainingPercentOptionSelected = function(opt) {
            $scope.trainingPercent = opt;
        }

        $scope.daysPerWeekSelected = function(opt) {
            $scope.daysPerWeek = opt;
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

        $scope.printMonth = function() {
            var selector = ".workout-week";
            $(selector).addClass("print");
            window.print();

            $(selector).removeClass("print");
        }

        $scope.calculateOneRepMax = function() {
            var estimatedLift = ($scope.estimateWeight * $scope.estimateReps * .0333) + $scope.estimateWeight;
            var estimate = roundToNearestFive(estimatedLift);
            $scope.selectedExercise.Value = estimate;
            $scope.selectedExercise.TrainingMax = roundToNearestFive(estimate * .9);
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
                        warmUp: createWarmUp(v.TrainingMax),
                        workout: createWorkout(week, v.TrainingMax),
                        boringButBig: createBoringButBig(v.TrainingMax)
                    };

                    $scope.wendlerProgram[week - 1].trainingDays.push(trainingDay);
                });
            }
        }

        function roundToNearestFive(weight) {
            return 5 * Math.round(weight / 5);
        }

        MaxLifts.query().then(function(resp) {
            $scope.wenderExercises = resp;
            console.log(resp);

            $.each($scope.wenderExercises, function(i, v) {
                var trainingPercent = .9 * parseInt(v.Value);
                var roundedTrainingPercent = roundToNearestFive(trainingPercent);
                v.TrainingMax = roundedTrainingPercent;
            });
        });

        function getTrainingWeight(weight, percent) {
            var trainingPercent = percent * parseInt(weight);
            return roundToNearestFive(trainingPercent);
        }


        function createWorkout(weekNumber, trainingWeight) {
            var workout = [];
            switch (weekNumber) {
            case 1:
                workout.push({ set: 1, reps: 5, percent: 65, weight: getTrainingWeight(trainingWeight, .65), maxEffort: false, weekNumber: weekNumber });
                workout.push({ set: 2, reps: 5, percent: 75, weight: getTrainingWeight(trainingWeight, .75), maxEffort: false, weekNumber: weekNumber });
                workout.push({ set: 3, reps: 5, percent: 85, weight: getTrainingWeight(trainingWeight, .85), maxEffort: true, weekNumber: weekNumber });
                break;
            case 2:
                workout.push({ set: 1, reps: 3, percent: 70, weight: getTrainingWeight(trainingWeight, .70), maxEffort: false, weekNumber: weekNumber });
                workout.push({ set: 2, reps: 3, percent: 80, weight: getTrainingWeight(trainingWeight, .80), maxEffort: false, weekNumber: weekNumber });
                workout.push({ set: 3, reps: 3, percent: 90, weight: getTrainingWeight(trainingWeight, .90), maxEffort: true, weekNumber: weekNumber });
                break;
            case 3:
                workout.push({ set: 1, reps: 5, percent: 75, weight: getTrainingWeight(trainingWeight, .75), maxEffort: false, weekNumber: weekNumber });
                workout.push({ set: 2, reps: 3, percent: 85, weight: getTrainingWeight(trainingWeight, .85), maxEffort: false, weekNumber: weekNumber });
                workout.push({ set: 3, reps: 1, percent: 95, weight: getTrainingWeight(trainingWeight, .95), maxEffort: true, weekNumber: weekNumber });
                break;
            case 4:
                workout.push({ set: 1, reps: 5, percent: 40, weight: getTrainingWeight(trainingWeight, .4), maxEffort: false, weekNumber: weekNumber });
                workout.push({ set: 2, reps: 5, percent: 50, weight: getTrainingWeight(trainingWeight, .5), maxEffort: false, weekNumber: weekNumber });
                workout.push({ set: 3, reps: 5, percent: 60, weight: getTrainingWeight(trainingWeight, .6), maxEffort: false, weekNumber: weekNumber });
                break;
            }
            return workout;
        }

        function createWarmUp(trainingWeight) {
            var warmUp = [];
            warmUp.push({ set: 1, reps: 5, percent: 40, weight: getTrainingWeight(trainingWeight, .4) });
            warmUp.push({ set: 2, reps: 5, percent: 50, weight: getTrainingWeight(trainingWeight, .5) });
            warmUp.push({ set: 3, reps: 5, percent: 60, weight: getTrainingWeight(trainingWeight, .6) });
            return warmUp;
        }

        function createBoringButBig(trainingWeight) {
            if ($scope.boringOption.option === -1) return null;
            var boring = [];
            var percent = $scope.boringOption.percent / 100;
            for (var i = 1; i < 6; i++) {
                boring.push({
                    set: i,
                    reps: 10,
                    weight: getTrainingWeight(trainingWeight, percent),
                    percent: percent * 100
                });
            }

            return boring;
        }
    }
]);