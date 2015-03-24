
services.factory("WendlerTemplate", ['$resource',
    function($resource) {

        /*var resource = $resource('api/Wendler', {}, {
            query: { method: 'GET', isArray: true },
            get: { method: 'GET', params: { id: '@id' } },
            create: { method: 'POST' },
            update: { method: 'PUT' },
            remove: { method: 'DELETE' }
        });*/


        var factory = {
            templateOptions: [
                { option: 1, text: "None" },
                { option: 2, text: "Boring But Big" },
                { option: 3, text: "The Triumvirate" },
                { option: 4, text: "Periodization Bible" },
                { option: 5, text: "Bodyweight" },
                { option: 6, text: "Roll your own" }
            ],
            daysPerWeekOptions: [
                { option: 1, text: "4 days per week", days: 4 },
                { option: 2, text: "3 days per week", days: 3 }
            ],
            trainingPercentOptions: [
                { option: 1, text: "Standard", description: "Recomended. Be fresher for the last big set." },
                { option: 2, text: "Heavier", description: "Training percentages are higher in week 1 and 2" }
            ],
            boringButBigOptions: function() {
                var options = [];
                for (var i = 0; i < 10; i++) {
                    var percent = 30 + (i * 5);
                    var text = 5 + " X " + 10 + " @ " + percent + "%";
                    options.push({ option: i, sets: 5, reps: 10, percent: percent, text: text });
                }
                return options;
            },
            createWarmUp: function(trainingWeight) {
                var warmUp = [];
                warmUp.push({ set: 1, reps: 5, percent: 40, weight: getTrainingWeight(trainingWeight, .4) });
                warmUp.push({ set: 2, reps: 5, percent: 50, weight: getTrainingWeight(trainingWeight, .5) });
                warmUp.push({ set: 3, reps: 3, percent: 60, weight: getTrainingWeight(trainingWeight, .6) });
                return warmUp;
            },
            roundToNearestFive: function(weight) {
                return 5 * Math.round(weight / 5);
            },
            createWorkout: function(weekNumber, trainingWeight) {
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
            },
            createBoringButBig: function(trainingWeight, percent) {
                var boring = [];
                for (var i = 1; i < 6; i++) {
                    boring.push({
                        set: i,
                        reps: 10,
                        weight: getTrainingWeight(trainingWeight, percent / 100),
                        percent: percent
                    });
                }

                return boring;
            },
            createBoringAssistanceExercise: function (exerciseId, trainingWeight, percent) {
                var assistanceEx = [];

                switch (exerciseId) {
                    case 2: //Bench Press
                        assistanceEx.push({
                            exerciseId: exerciseId,
                            exerciseName: "Bench Press",
                            groupedSets: [{ sets: 5, reps: 10, weight: getTrainingWeight(trainingWeight, percent / 100) }],
                            sets: factory.createBoringButBig(trainingWeight, percent)
                        });
                        assistanceEx.push({
                            exerciseId: 5,
                            exerciseName: "Dumbell Row",
                            groupedSets: [{ sets: 5, reps: 10, weight: null }],
                            sets: createRepeatedSets(5, 10, null)
                        });
                        break;
                    case 3: //Back Squat
                        assistanceEx.push({
                            exerciseId: exerciseId,
                            exerciseName: "Back Squat",
                            groupedSets: [{ sets: 5, reps: 10, weight: getTrainingWeight(trainingWeight, percent / 100) }],
                            sets: factory.createBoringButBig(trainingWeight, percent)
                        });
                        assistanceEx.push({
                            exerciseId: 5,
                            exerciseName: "Leg Curls",
                            groupedSets: [{ sets: 5, reps: 10, weight: null }],
                            sets: createRepeatedSets(5, 10, null)
                        });
                        break;
                    case 6: //Deadlift
                        assistanceEx.push({
                            exerciseId: exerciseId,
                            exerciseName: "Deadlift",
                            groupedSets: [{ sets: 5, reps: 10, weight: getTrainingWeight(trainingWeight, percent / 100) }],
                            sets: factory.createBoringButBig(trainingWeight, percent)
                        });
                        assistanceEx.push({
                            exerciseId: 5,
                            exerciseName: "Hanging Leg Raises",
                            groupedSets: [{ sets: 5, reps: 15, weight: null }],
                            sets: createRepeatedSets(5, 15, null)
                        });
                        break;
                    case 12: //Military Press
                        assistanceEx.push({
                            exerciseId: exerciseId,
                            exerciseName: "Military Press",
                            groupedSets: [{ sets: 5, reps: 10, weight: getTrainingWeight(trainingWeight, percent / 100) }],
                            sets: factory.createBoringButBig(trainingWeight, percent)
                        });
                        assistanceEx.push({
                            exerciseId: 5,
                            exerciseName: "Chin ups",
                            groupedSets: [{ sets: 5, reps: 10, weight: null }],
                            sets: createRepeatedSets(5, 10, null)
                        });
                        break;
                    default:
                        return null;
                }

                return assistanceEx;
            },
            createTriumvirateAssistanceExercise: function(exerciseId) {
                var assistanceEx = [];

                switch (exerciseId) {
                    case 2: //Bench Bress
                        assistanceEx.push({
                            exerciseId: 5,
                            exerciseName: "Dumbell Bench Press",
                            sets: createRepeatedSets(5, 15, null)
                        });
                        assistanceEx.push({
                            exerciseId: 5,
                            exerciseName: "Dumbell Row",
                            sets: createRepeatedSets(5, 10, null)
                        });
                        break;
                    case 3: //Back Squat
                        assistanceEx.push({
                            exerciseId: 5,
                            exerciseName: "Leg Press",
                            sets: createRepeatedSets(5, 15, null)
                        });
                        assistanceEx.push({
                            exerciseId: 5,
                            exerciseName: "Leg Curls",
                            sets: createRepeatedSets(5, 10, null)
                        });
                        break;
                    case 6: //Deadlift
                        assistanceEx.push({
                            exerciseId: 5,
                            exerciseName: "Good Morning",
                            sets: createRepeatedSets(5, 12, null)
                        });
                        assistanceEx.push({
                            exerciseId: 5,
                            exerciseName: "Hanging Leg Raises",
                            sets: createRepeatedSets(5, 15, null)
                        });
                        break;
                    case 12: //Military Press
                        assistanceEx.push({
                            exerciseId: 5,
                            exerciseName: "Dips",
                            sets: createRepeatedSets(5, 15, null)
                        });
                        assistanceEx.push({
                            exerciseId: 5,
                            exerciseName: "Chin ups",
                            sets: createRepeatedSets(5, 10, null)
                        });
                        break;
                    default:
                        return null;
                }
                return assistanceEx;
            },
            createPeriodizationBible: function (exerciseId) { return null; },
            createBodyweight: function (exerciseId) {
                var assistanceEx = [];

                switch (exerciseId) {
                    case 2: //Bench Bress
                        assistanceEx.push({
                            exerciseId: 5,
                            exerciseName: "Chin ups",
                            sets: createRepeatedSets(5, 15, null)
                        });
                        assistanceEx.push({
                            exerciseId: 5,
                            exerciseName: "Push ups",
                            sets: createRepeatedSets(5, 20, null)
                        });
                        break;
                    case 3: //Back Squat
                        assistanceEx.push({
                            exerciseId: 5,
                            exerciseName: "One Leg Squat",
                            sets: createRepeatedSets(5, 15, null)
                        });
                        assistanceEx.push({
                            exerciseId: 5,
                            exerciseName: "Sit Ups",
                            sets: createRepeatedSets(5, 20, null)
                        });
                        break;
                    case 6: //Deadlift
                        assistanceEx.push({
                            exerciseId: 5,
                            exerciseName: "GHR",
                            sets: createRepeatedSets(5, 15, null)
                        });
                        assistanceEx.push({
                            exerciseId: 5,
                            exerciseName: "Leg Raises",
                            sets: createRepeatedSets(5, 15, null)
                        });
                        break;
                    case 12: //Military Press
                        assistanceEx.push({
                            exerciseId: 5,
                            exerciseName: "Dips",
                            sets: createRepeatedSets(5, 15, null)
                        });
                        assistanceEx.push({
                            exerciseId: 5,
                            exerciseName: "Chin ups",
                            sets: createRepeatedSets(5, 15, null)
                        });
                        break;
                    default:
                        return null;
                }
                return assistanceEx;
            },
            createRollYourOwn: function (exerciseId) { return null; }
        };

        function createRepeatedSets(numberOfSets, reps, weight) {
            var sets = [];
            for (var i = 0; i < numberOfSets; i++) {
                sets.push({ set: i + 1, reps: reps, weight: weight });
            }

            return sets;
        }

        function getTrainingWeight(weight, percent) {
            var trainingPercent = percent * parseInt(weight);
            return factory.roundToNearestFive(trainingPercent);
        }

        return factory;
    }
]);