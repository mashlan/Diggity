'use strict';

angular.module('hitt.timer', ['template/timer/timer.html'])
    .directive('appVersion', [
        'version', function (version) {
            return function (scope, elm, attrs) {
                elm.text(version);
            };
        }
    ])
    .controller("hittTimerController", ['$scope',
        function ($scope) {
            var myTimer;
            var timer = $(".timer");
            var countdownTimer = $('.ready-timer');
            var minTensUl = timer.find('ul.minutes.tens');
            var minOnesUl = timer.find('ul.minutes.ones');
            var secTensUl = timer.find('ul.seconds.tens');
            var secOnesUl = timer.find('ul.seconds.ones');

            $scope.Timer = {
                Minutes: 0,
                Seconds: 0,
                ElapsedTime: ""
            }

            $scope.isCountDown = false;
            $scope.lessThanTen = false;

            $scope.startTimer = function () {
                console.log("timer started");
                timer.hide();
                countdownTimer.show();
                var beep = document.getElementById("beep_sound");
                var buzz = document.getElementById("buzz_sound");

                var coundownUl = countdownTimer.find('ul');
                var scrollMargin = coundownUl.find('li').first().height();
                var countDownInt = 9;
                var countDown = setInterval(function () { myCountDown(); }, 1000);

                function myCountDown() {
                    coundownUl.animate({ scrollTop: scrollMargin * (countDownInt) }, 200);
                    countDownInt--;
                    beep.play();
                    if (countDownInt < 0) {
                        buzz.play();
                        window.clearInterval(countDown);
                        timer.show();
                        countdownTimer.hide();
                        runTimer();
                    }
                }
            }

            $scope.stopTimer = function () {
                console.log("timer stopped");
                window.clearInterval(myTimer);

                $scope.Timer.Minutes = getMinutes();
                $scope.Timer.Seconds = getSeconds();
                $scope.Timer.ElapsedTime = "Minutes: " + $scope.Timer.Minutes + " Seconds: " + $scope.Timer.Seconds;

                console.log("time = " + $scope.Timer.ElapsedTime);
            }

            $scope.resetTimer = function () {
                console.log("timer reset");
                timer.find('li').removeClass('selected');
                timer.find('li:contains("0")').addClass('selected');
                triggerAnimation(0, 0, 0, 0);
                $scope.isCountDown = false;
                $scope.lessThanTen = false;
            }

            function runTimer() {
                var beep = document.getElementById("beep_sound");
                var seconds = getSeconds();
                var minutes = getMinutes();

                var startingSeconds = seconds;
                var startingMinutes = minutes;

                var d0 = (new Date());
                d0 = (new Date(d0.getTime() + (minutes * 60000) + (seconds * 1000))).valueOf();
                myTimer = setInterval(function () { myTimerFunc(d0); }, 1000);

                function myTimerFunc(initialTime) {
                    var now = new Date();
                    if ($scope.isCountDown) {
                        now = now.valueOf();
                    } else {
                        now = (new Date(now.getTime() + (startingMinutes * 60000) + (startingSeconds * 1000))).valueOf();
                    }

                    // calculate time difference between now and initial time
                    var diff = Math.abs(now - initialTime);

                    //if we are not counting down, add the set starting time
                    if (!$scope.isCountDown) {
                        diff = diff + (startingMinutes * 60000) + (startingSeconds * 1000);
                    }

                    minutes = Math.floor(diff / 1000 / 60);
                    seconds = Math.floor(diff / 1000) - minutes * 60;

                    var secOnes = seconds % 10;
                    var secTens = Math.floor(seconds / 10);
                    var minOnes = minutes % 10;
                    var minTens = Math.floor(minutes / 10);

                    triggerAnimation(minTens, minOnes, secTens, secOnes);

                    if ($scope.isCountDown) {
                        $scope.lessThanTen = (minutes < 1 && seconds < 10);
                        $scope.$apply();
                        if ($scope.lessThanTen && $scope.isCountDown) beep.play();
                    }

                    if (seconds === 0 && minutes === 0) {
                        window.clearInterval(myTimer);
                    }

                    updateSelectedTime(secOnes, secTens, minOnes, minTens);
                }
            }

            function getSeconds() {
                var tensValue = parseInt(secTensUl.find('.selected').text());
                var onesValue = parseInt(secOnesUl.find('.selected').text());
                return (tensValue * 10) + onesValue;
            }

            function getMinutes() {
                var tensValue = parseInt(minTensUl.find('.selected').text());
                var onesValue = parseInt(minOnesUl.find('.selected').text());
                return (tensValue * 10) + onesValue;
            }

            function triggerAnimation(minTens, minOnes, secTens, secOnes) {
                var scrollMargin = minOnesUl.find('li').first().height();
                minTensUl.animate({ scrollTop: scrollMargin * (minTens) }, 200);
                minOnesUl.animate({ scrollTop: scrollMargin * (minOnes) }, 200);
                secTensUl.animate({ scrollTop: scrollMargin * (secTens) }, 200);
                secOnesUl.animate({ scrollTop: scrollMargin * (secOnes) }, 200);
            }

            function updateSelectedTime(secOnes, secTens, minOnes, minTens) {
                timer.find('li').removeClass('selected');
                minTensUl.find('li:contains(' + minTens + ')').addClass('selected');
                minOnesUl.find('li:contains(' + minOnes + ')').addClass('selected');
                secTensUl.find('li:contains(' + secTens + ')').addClass('selected');
                secOnesUl.find('li:contains(' + secOnes + ')').addClass('selected');
            }
        }
    ])
    .directive('hittTimer', function ($compile) {
        return {
            restrict: 'E',
            templateUrl: 'template/timer/timer.html',
            replace: true,
            transclude: true,
            controller: 'hittTimerController',
            link: function (scope, element, attr) {
                var timerUl = element.find('ul');

                if (attr.hasOwnProperty("enableClick") && attr.enableClick === "true") {
                    timerUl.attr("timer-click", "");
                }

                if (attr.hasOwnProperty("enableMousewheel") && attr.enableMousewheel === "true") {
                    timerUl.attr("timer-scroll", "");
                } else {
                    timerUl.attr("disable-scroll", "");
                }

                var minTensUl = element.find('ul.minutes.tens');
                var minOnesUl = element.find('ul.minutes.ones');
                var secTensUl = element.find('ul.seconds.tens');
                var secOnesUl = element.find('ul.seconds.ones');

                minTensUl.append(createLis(9));
                minOnesUl.append(createLis(9));
                secTensUl.append(createLis(5));
                secOnesUl.append(createLis(9));

                function createLis(number) {
                    var lis = "";
                    for (var i = 0; i <= number; i++) {
                        lis += (i === 0) ? "<li class='selected'>" + i + "</li>" : "<li>" + i + "</li>";
                    }

                    return lis;
                }

                if (attr.hasOwnProperty("beepFileSource")) {
                    var audio = angular.element('<audio id="beep_sound"><source src="' + attr.beepFileSource + '" type="audio/wav" /></audio>');
                    element.append(audio);
                }

                if (attr.hasOwnProperty("buzzardFileSource")) {
                    var buzzard = angular.element('<audio id="buzz_sound"><source src="' + attr.buzzardFileSource + '" type="audio/mpeg" /></audio>');
                    element.append(buzzard);
                }

                if (attr.hasOwnProperty('showReadyTimer') && attr.showReadyTimer === "true") {
                    var ready = element.find('.ready-timer');
                    ready.find('ul').append(createLis(9));
                    ready.find('li').removeClass('selected');
                    ready.find('li:contains("9")').addClass("selected");
                }

                $compile(timerUl)(scope);
            }
        }
    })
    .directive('timerClick', function () {
        return function (scope, element) {
            element.bind("click",
                function (e) {
                    e.preventDefault();
                    var scrollOffset = element.height();
                    var moveUp = (e.originalEvent.wheelDelta >= 0);
                    var children = element.find('li');
                    var selected = element.find('.selected');
                    if (selected.length === 0) {
                        selected = children.first();
                    }
                    var top = parseInt(selected.text());
                    top = moveUp ? top - 1 : top + 1;

                    //exit if we are at the bottom of the list
                    if (top < children.length && top >= 0) {
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
    })
    .directive("disableScroll", function () {
        return function (scope, element) {
            element.bind("mousewheel", function (e) {
                e.preventDefault();
            });
        }
    })
    .directive('timerScroll', function () {
        return function (scope, element) {
            element.bind("mousewheel",
                function (e) {
                    e.preventDefault();
                    var scrollOffset = element.height();
                    var moveUp = (e.originalEvent.wheelDelta >= 0);
                    var children = element.find('li');
                    var selected = element.find('.selected');
                    if (selected.length === 0) {
                        selected = children.first();
                    }
                    var top = parseInt(selected.text());
                    top = moveUp ? top - 1 : top + 1;

                    //exit if we are at the bottom of the list
                    if (top < children.length && top >= 0) {
                        element.animate({
                            scrollTop: scrollOffset * top
                        }, 100);

                        //set next selected
                        element.find('li:contains(' + top + ')').addClass('selected');
                        selected.removeClass('selected');
                    }
                }
            );
        }
    });

//html templates
angular.module("template/timer/timer.html", []).run(["$templateCache", function ($templateCache) {
    $templateCache.put("template/timer/timer.html",
        '<div>' +
            '<div class="timer">' +
                '<ul class="minutes tens" ng-class="{\'text-danger\': lessThanTen}"></ul>' +
                '<ul class="minutes ones" ng-class="{\'text-danger\': lessThanTen}"></ul>' +
                '<ul class="spacer" ng-class="{\'text-danger\': lessThanTen}"><li>:</li></ul>' +
                '<ul class="seconds tens" ng-class="{\'text-danger\': lessThanTen}"></ul>' +
                '<ul class="seconds ones" ng-class="{\'text-danger\': lessThanTen}"></ul>' +
            '</div>' +
            '<div class="ready-timer timer text-danger"><ul></ul></div>' +
            '<div class="checkbox">' +
                '<label><input type="checkbox" ng-model="isCountDown"><span class="square"></span><span class="check"></span> Count Down' +
                '</label>' +
            '</div>' +
            '<div class="form-group timer-btns">' +
                '<button class="btn-lg btn btn-success" type="button" ng-click="startTimer()" >Start</button>' +
                '<button class="btn btn-lg btn-danger" type="button" ng-click="stopTimer()" >Stop</button>' +
                '<button class="btn btn-lg btn-warning" type="button" ng-click="resetTimer()" >Reset</button>' +
            '</div>' +
        '</div>'
      );
}]);
