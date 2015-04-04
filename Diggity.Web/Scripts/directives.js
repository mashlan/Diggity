'use strict';

/* Common Directives */
angular.module("myApp.directives", [])
    .directive("appVersion", [
        "version", function(version) {
            return function(scope, elm) {
                elm.text(version);
            };
        }
    ])
    .directive("repeatDone", function() {
        return function(scope) {
            if (scope.$last) {
                scope.$parent.showLoading = false;
            }
        }
    })
    .directive("prEntry", function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: "../Html/PersonalBest/EnterPR.html"
        }
    })
    .directive("prHistory", function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: "../Html/PersonalBest/PRHistory.html"
        }
    })
    .directive("heroHistory", function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: "../Html/PersonalBest/HeroHistory.html"
        }
    })
    .directive("girlsHistory", function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: "../Html/PersonalBest/GirlsHistory.html"
        }
    })
    .directive("editHistoryRecord", function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: "../Html/PersonalBest/EditPR.html",
            scope: {
                recordInfo: "=record",
                openDatepicker: "&"
            }
        }
    })
    .directive("boringRadioGroup", function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: "../Html/Wendler/BoringOptions.html",
            scope: false
        }
    })
    .directive("trainingPercentRadioGroup", function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: "../Html/Wendler/ProgramPercentsOptions.html",
            scope: false
        }
    })
    .directive("liftingOptionModal", function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: "../Html/Wendler/LiftingOptions.html",
            scope: false
        }
    })
    .directive("daysPerWeekOptionModal", function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: "../Html/Wendler/DaysPerWeekOptions.html",
            scope: false
        }
    })
    .directive("wendlerWorkoutMonth", function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: "../Html/Wendler/WendlerWorkoutMonth.html",
            scope: false
        }
    })
    .directive("assistanceExerciseModal", function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: "../Html/Wendler/AssistanceExerciseModal.html",
            scope: false
        }
    })
    .directive("editAssistanceExerciseModal", function() {
        return {
            restrict: "E",
            replace: true,
            templateUrl: "../Html/Wendler/EditAssistanceExercise.html",
            scope: false
        }
    })
    .directive("diggityGrid", function() {
        return {
            restrict: "E",
            replace: true,
            scope: {
                headerTitle: "@",
                hoverText: "@",
                navUrl: "@",
                recordInfo: "=records",
                showLoading: "@",
                initFunction: "&"
            },
            templateUrl: "../Html/Shared/DiggityGrid.html"
        }
    })
    .directive("oneRepMaxForm", [
        function() {
            return {
                restrict: "E",
                replace: false,
                templateUrl: "../Html/Shared/estimateOneRepMax.html"
            };
        }
    ])
    .directive("boxInfoForm", [
        function() {
            return {
                restrict: "E",
                replace: false,
                templateUrl: "../Html/Settings/boxInformation.html"
            };
        }
    ])
    .directive("userPreferencesForm", [
        function() {
            return {
                restrict: "E",
                replace: false,
                templateUrl: "../Html/Settings/userPreferences.html"
            };
        }
    ])
    .directive("setPreferenceOption", [
        "$timeout", "$rootScope", function($timeout, $rootScope) {
            return {
                link: function($scope, element) {
                    //                $timeout(function(){
                    var preferences = $rootScope.ActiveUser.Preferences;
                    if (preferences) {
                        if ($scope.exType && $scope.exType._id) {
                            var pref = $.grep(preferences, function(e) { return e.ExerciseTypeId === $scope.exType._id });
                            if (pref.length > 0) {
                                $scope.exType.unitPreference = pref[0];
                                //                                var index = getUnitIndex($scope, pref[0].UnitOfMeasureId);
                                //                                var elementId = element.attr("id");
                                //                                document.getElementById(elementId).selectedIndex = index;
                                //                                $("#" + elementId + " option[value='" + index + "']").attr("selected", "selected");
                                //                                element.val(index);
                            }
                        }
                    }

//                }, 0, false);

                    function getUnitIndex(scope, id) {
                        var index = null;
                        $.each(scope.exType.UnitOfMeasures, function(i, v) {
                            if (v._id === id) {
                                index = i;
                                return false;
                            } else {
                                return true;
                            }
                        });

                        return index;
                    }
                }
            }
        }
    ])
    .directive("changePasswordForm", [
        function() {
            return {
                restrict: "E",
                replace: false,
                templateUrl: "../Html/Settings/changePassword.html"
            };
        }
    ]);

