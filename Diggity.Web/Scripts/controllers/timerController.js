/**********************************************************************
 * ********************* Timer ****************************************
 *********************************************************************/
myControllers.controller('TimerCtrl', ['$routeParams', '$scope', '$location',
    function ($routeParams, $scope, $location) {
        'use strict';
        $scope.timer = {
            hour: '00',
            minute: '00',
            second: '00'
        };
        var myTimer;

        $scope.stopTimer = function() {
            window.clearInterval(myTimer);
        }

        $scope.startTimer = function() {
            myTimer = setInterval(function () { myTimerFunc(); }, 1000);
            var second = 0;
            var minute = 0;
            var hour = 0;
            function myTimerFunc() {
                if (second == 59) {
                    if (minute == 59) {
                        hour++;
                        minute = 0;
                    } else {
                        minute++;
                        second = 0;
                    }
                } else {
                    second++;
                }
                $scope.timer.second = second < 10 ? "0" + second : second.toString();
                $scope.timer.minute = minute < 10 ? "0" + minute : minute.toString();
                $scope.timer.hour = hour < 10 ? "0" + hour : hour.toString();
                $scope.$apply();
            }
        }
    }
]);
