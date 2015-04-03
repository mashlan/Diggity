
myControllers.controller('SettingsCtrl', ['$routeParams', '$scope', 'Exercise', 'UnitOfMeasure', 'ExerciseType', 'PersonalRecords',
    function($routeParams, $scope, Exercise, UnitOfMeasure, ExerciseType, PersonalRecords) {
        'use strict';

        $scope.oldpass = null;
        $scope.newpass = null;
        $scope.confirm = null;

        $scope.estimatedWeight = 0;
        $scope.estimatedReps = 0;
        $scope.estimatedOneRepMax = 0;
        
        $scope.reset = function () {
            $scope.err = null;
            $scope.msg = null;
        };

        $scope.cancelChangePassword = function () {
            $("#change_password_text").show();
            $("#change_password").hide();
        };

        $scope.updatePassword = function () {
            $scope.reset();
           // Authentication.changePassword(buildPwdParms());
        };

        function buildPwdParms() {
            return {
                email: $rootScope.ActiveUser.Email,
                oldpass: $scope.oldpass,
                newpass: $scope.newpass,
                confirm: $scope.confirm,
                callback: function (err) {
                    if (err) {
                        $scope.err = err;
                    }
                    else {
                        $scope.oldpass = null;
                        $scope.newpass = null;
                        $scope.confirm = null;
                        $scope.msg = "Password updated!";
                    }
                }
            };
        }

        $scope.calculateOneRepMax = function () {
            var weight = parseFloat($scope.estimatedWeight);
            var reps = parseFloat($scope.estimatedReps);
            var estimatedLift = weight * (1 + (reps / 30));
            var roundedToFive = (Math.round(estimatedLift / 5) * 5);
            $scope.estimatedOneRepMax = roundedToFive;
        };

        $scope.showChangePassword = function () {
            resetEditForms();
            window.location = "/Account/Manage";
        };

        $scope.showEstimationFormForm = function () {
            resetEditForms();
            $("#oneRepMaxEstimation_text").toggle();
            $("#oneRepMaxEstimation_form").toggle();
        };

        $scope.showPreferencesForm = function () {
            resetEditForms();
            $("#preferences_form_text").toggle();
            $("#preferences_form").toggle();
        };

        $scope.setPreference = function (scope) {
            var user = $rootScope.ActiveUser;
            var prefer = $.grep(user.Preferences, function (e) { return e.ExerciseTypeId === scope.exType._id; });
            if (prefer.length > 0) {
                prefer[0].UnitOfMeasureId = scope.exType.unitPreference._id;
            } else {
                user.Preferences.push({
                    UnitOfMeasureId: scope.exType.unitPreference._id,
                    ExerciseTypeId: scope.exType._id
                });
            }
        };

        $scope.getSelectedPreference = function (index) {
            var preferences = $rootScope.ActiveUser.Preferences;
            var scope = $scope.exerciseTypeList[index];
            if (preferences) {
                if (scope && scope._id) {
                    var pref = $.grep(preferences, function (e) { return e.ExerciseTypeId === scope._id });
                    if (pref.length > 0) {
                        var selectedPref = getUnitOfMeasure(scope, pref[0].UnitOfMeasureId);
                        scope.unitPreference = selectedPref;
                    }
                }
            }
        };

        function getUnitOfMeasure(scope, id) {
            var unit = null;
            $.each(scope.UnitOfMeasures, function (i, v) {
                if (v._id === id) {
                    unit = v;
                    return false;
                } else {
                    return true;
                }
            });

            return unit;
        }

        $scope.savePreferences = function () {
            var pref = {
                _id: $rootScope.ActiveUser._id,
                preferences: $scope.ActiveUser.Preferences
            };
            //User.updatePreferences(pref);
        };

        $scope.cancelPreferences = function () {
            $("#preferences_form").hide();
            $("#preferences_form_text").show();
        };

        $scope.showBoxInfo = function () {
            resetEditForms();
            $("#box_info_text").toggle();
            $("#box_info").toggle();
        };

        function resetEditForms() {
            $("#account_info_text").show();
            $("#account_info").hide();
            $("#change_password_text").show();
            $("#change_password").hide();
            $("#preferences_form_text").show();
            $("#preferences_form").hide();
            $("#box_info_text").show();
            $("#box_info").hide();
            $("#oneRepMaxEstimation_text").show();
            $("#oneRepMaxEstimation_form").hide();
        }

        $scope.hideAllForms = function() {
            resetEditForms();
        }
    }
]);