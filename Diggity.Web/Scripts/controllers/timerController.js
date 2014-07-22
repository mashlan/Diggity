/**********************************************************************
 * ********************* Timer ****************************************
 *********************************************************************/
myControllers.controller('TimerCtrl', ['$routeParams', '$scope', '$location',
    function ($routeParams, $scope, $location) {
        'use strict';
        $scope.timer = {
            minute: '00',
            second: '00',
            isCountDown: false
        };

        $scope.lessThanTen = false;

        var myTimer;

        $scope.stopTimer = function() {
            window.clearInterval(myTimer);
        }

        $scope.startTimer = function() {
            myTimer = setInterval(function () { myTimerFunc(); }, 1000);
            var second = parseInt($scope.timer.second);
            var minute = parseInt($scope.timer.minute);
            $scope.lessThanTen = false;
            var beep = document.getElementById("beep_sound");

            function myTimerFunc() {
                if ($scope.timer.isCountDown) {
                    second--;
                    if (second < 0) {
                        if (minute > 0) {
                            minute--;
                            if (minute >= 0) {
                                second = 59;
                            }
                        }
                    }
                    $scope.lessThanTen = (minute < 1 && second < 11);
                    if ($scope.lessThanTen) beep.play();

                } else {
                    if (second == 59) {
                        minute++;
                        second = 0;
                    } else {
                        second++;
                    }
                }
                setSecond(second);
                setMinute(minute);
                $scope.$apply();

                if (second + minute === 0) window.clearInterval(myTimer);

            }
        }

        $scope.resetTimer = function() {
            $scope.timer.minute = "00";
            $scope.timer.second = "00";
            $scope.lessThanTen = false;
        }

        $scope.increaseMinute = function() {
            var min = parseInt($scope.timer.minute);
            min++;
            setMinute(min);
        }

        $scope.decreaseMinute = function () {
            var min = parseInt($scope.timer.minute);
            min = min === 0 ? 0 : min - 1;
            setMinute(min);
        }

        $scope.increaseSecond = function() {
            var sec = parseInt($scope.timer.second);
            sec++;
            setSecond(sec);
        }

        $scope.decreaseSecond = function() {
            var sec = parseInt($scope.timer.second);
            sec = sec === 0 ? 0 : sec - 1;
            setSecond(sec);
        }

        function setSecond(second) {
            $scope.timer.second = second < 10 ? "0" + second : second.toString();
        }

        function setMinute(minute) {
            $scope.timer.minute = minute < 10 ? "0" + minute : minute.toString();
        }
    }
]);
