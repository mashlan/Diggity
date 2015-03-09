/**********************************************************************
 * ********************* Wendler Workouts *****************************
 *********************************************************************/
myControllers.controller("WendlerCtrl", ["$routeParams", "$scope", "$location", "MaxLifts",
    function ($routeParams, $scope, $location, MaxLifts) {
        "use strict";

        

        $scope.wenderExercises = {};
        $scope.wendlerProgram = [];
        $scope.boringButBigOptions = [];

        function getBoringButBigOtions() {
            for (var i = 0; i < 10; i++) {
                var percent = 30 + (i * 5);
                $scope.boringButBigOptions.push({ option: i, sets: 5, reps: 10, percent: percent });
            }
        }

        getBoringButBigOtions();

        $scope.createWendler = function () {
            for (var week = 1; week < 5; week++) {
                $scope.wendlerProgram.push({
                    week: week,
                    exercise: $scope.wenderExercises[week -1].ExerciseName,
                    trainingDays: []
                });

                $.each($scope.wenderExercises, function (i, v) {
                    var trainingDay = {
                        warmUp: createWarmUp(v.TrainingMax),
                        workout: createWorkout(week, v.TrainingMax)
                    };

                    $scope.wendlerProgram[week -1].trainingDays.push(trainingDay);
                });
            }
        }

        MaxLifts.query().then(function(resp) {
            $scope.wenderExercises = resp;
            console.log(resp);

            $.each($scope.wenderExercises, function(i, v) {
                var trainingPercent = .9 * parseInt(v.Value);
                var roundedTrainingPercent = 5 * (Math.round(trainingPercent / 5)); //round up to nearest 5 lbs
                v.TrainingMax =  roundedTrainingPercent;
            });
        });

        function getTrainingWeight(weight, percent) {
            var trainingPercent = percent * parseInt(weight);
            return  5 * (Math.round(trainingPercent / 5)); //round up to nearest 5 lbs
        }


        function createWorkout(weekNumber, trainingWeight) {
            var workout = [];
            switch (weekNumber) {
            case 1:
                workout.push({ set: 1, reps: 5, weight: getTrainingWeight(trainingWeight, .65), maxEffort: false, weekNumber: weekNumber });
                workout.push({ set: 2, reps: 5, weight: getTrainingWeight(trainingWeight, .75), maxEffort: false, weekNumber: weekNumber });
                workout.push({ set: 3, reps: 5, weight: getTrainingWeight(trainingWeight, .85), maxEffort: true, weekNumber: weekNumber });
                break;
            case 2:
                workout.push({ set: 1, reps: 3, weight: getTrainingWeight(trainingWeight, .70), maxEffort: false, weekNumber: weekNumber });
                workout.push({ set: 2, reps: 3, weight: getTrainingWeight(trainingWeight, .80), maxEffort: false, weekNumber: weekNumber });
                workout.push({ set: 3, reps: 3, weight: getTrainingWeight(trainingWeight, .90), maxEffort: true, weekNumber: weekNumber });
                break;
            case 3:
                workout.push({ set: 1, reps: 5, weight: getTrainingWeight(trainingWeight, .75), maxEffort: false, weekNumber: weekNumber });
                workout.push({ set: 2, reps: 3, weight: getTrainingWeight(trainingWeight, .85), maxEffort: false, weekNumber: weekNumber });
                workout.push({ set: 3, reps: 1, weight: getTrainingWeight(trainingWeight, .95), maxEffort: true, weekNumber: weekNumber });
                break;
            case 4:
                workout.push({ set: 1, reps: 5, weight: getTrainingWeight(trainingWeight, .4), maxEffort: false, weekNumber: weekNumber });
                workout.push({ set: 2, reps: 5, weight: getTrainingWeight(trainingWeight, .5), maxEffort: false, weekNumber: weekNumber });
                workout.push({ set: 3, reps: 5, weight: getTrainingWeight(trainingWeight, .6), maxEffort: false, weekNumber: weekNumber });
                break;
            }
            return workout;
        }

        function createWarmUp(trainingWeight) {
            var warmUp = [];
            warmUp.push({ set: 1, reps: 5, weight: getTrainingWeight(trainingWeight, .4) });
            warmUp.push({ set: 2, reps: 5, weight: getTrainingWeight(trainingWeight, .5) });
            warmUp.push({ set: 3, reps: 5, weight: getTrainingWeight(trainingWeight, .6) });
            return warmUp;
        }

    }
]);