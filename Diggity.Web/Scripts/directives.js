'use strict';

/* Common Directives */
angular.module('myApp.directives', ['template/timer/timer.html'])
    .directive('appVersion', [
        'version', function(version) {
            return function(scope, elm, attrs) {
                elm.text(version);
            };
        }
    ])

    .directive('hittTimer', function($compile) {
            return {
                restrict: 'E',
                templateUrl: 'template/timer/timer.html',
                link: function(scope, element, attr) {
                    element.attr("timer-click", "");
                }
            }
        }
    )

    .directive('timerClick', function() {
            return function(scope, element, attr) {
                element.bind("click",
                    function(e) {
                        e.preventDefault();
                        var scrollOffset = element.height();
                        var moveUp = (e.originalEvent.wheelDelta >= 0);
                        var children = element.find('li');
                        var selected = element.find('.selected');
                        if (selected.length === 0) {
                            selected = children.first();
                        }
                        var top = parseInt(selected.text());

                        //exit if we are at the bottom of the list
                        if (top < children.length -1 && top >= 0) {
                            top = moveUp ? top - 1 : top + 1;

                            element.animate({
                                scrollTop: scrollOffset * top
                            }, 200);

                            //set next selected
                            element.find('li:contains(' + top + ')').addClass('selected');
                            selected.removeClass('selected');
                        }
                    }
                );
            }
        }
    )

    .directive('timerScroll', function() {
            return function(scope, element, attr) {
                element.bind("touchmove",
                    function(e) {
                        e.preventDefault();
                        var moveUp = (e.originalEvent.wheelDelta >= 0);
                        var children = element.find('li');
                        var selected = element.find('.selected');
                        if (selected.length === 0) {
                            selected = children.first();
                        }
                        var top = parseInt(selected.text());

                        //exit if we are at the bottom of the list
                        if (top < children.length -1 && top >= 0) {

                            top = moveUp ? top - 1 : top + 1;

                            element.animate({
                                scrollTop: 364 * top
                            }, 100);

                            //set next selected
                            element.find('li:contains(' + top + ')').addClass('selected');
                            selected.removeClass('selected');
                        }
                    }
                );
            }
        }
    )

    .directive('oneRepMaxForm', [
        function() {
            return {
                restrict: 'E',
                replace: false,
                templateUrl: "./partials/account/estimatedOneRepMax.html"
            };
        }
    ])
    .directive('boxInfoForm', [
        function() {
            return {
                restrict: 'E',
                replace: false,
                templateUrl: "./partials/account/boxInformation.html"
            };
        }
    ])
    .directive('userPreferencesForm', [
        function() {
            return {
                restrict: 'E',
                replace: false,
                templateUrl: "./partials/account/userPreferences.html"
            };
        }
    ])
    .directive('setPreferenceOption', [
        '$timeout', '$rootScope', function($timeout, $rootScope) {
            return {
                link: function($scope, element) {
                    //                $timeout(function(){
                    var preferences = $rootScope.ActiveUser.Preferences;
                    if (preferences) {
                        if ($scope.exType && $scope.exType._id) {
                            var pref = $.grep(preferences, function(e) { return e.ExerciseTypeId === $scope.exType._id; });
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
            };
        }
    ])
    .directive('changePasswordForm', [
        function() {
            return {
                restrict: 'E',
                replace: false,
                templateUrl: "./partials/account/changePassword.html"
            };
        }
    ])
    .directive('enterPrForm', [
        function() {
            return {
                restrict: 'E',
                replace: false,
                templateUrl: "./partials/account/enterPR.html"
            };
        }
    ])
    .directive('editPrRecords', [
        function() {
            return {
                restrict: 'E',
                replace: false,
                templateUrl: './partials/account/prHistoryEdit.html'
            };
        }
    ])
    .directive('editAccountInfo', [
        function() {
            return {
                restrict: 'E',
                replace: false,
                templateUrl: './partials/account/editAccountInfo.html'
            };
        }
    ])
    .directive('prHelp', [
        function() {
            return {
                restrict: 'E',
                replace: false,
                templateUrl: "./partials/help/prHelp.html"
            };
        }
    ])
    .directive('unitOfMeasureForm', [
        function() {
            return {
                restrict: 'E',
                replace: false,
                templateUrl: "./partials/admin/manageUnitOfMeasures.html"
            };
        }
    ])
    .directive('exerciseTypeForm', [
        function() {
            return {
                restrict: 'E',
                replace: false,
                templateUrl: "./partials/admin/manageExerciseTypes.html"
            };
        }
    ]);


angular.module("template/timer/timer.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/timer/timer.html",
      '<div class="timer"><ul><li class="selected">0</li><li>1</li><li>2</li></ul></div>');
}]);