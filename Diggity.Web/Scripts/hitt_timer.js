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
            var myTimer = null;
            var timer = $(".timer");
            var readyTimer = $('.ready-timer');
            var minTensUl = timer.find('ul.minutes.tens');
            var minOnesUl = timer.find('ul.minutes.ones');
            var secTensUl = timer.find('ul.seconds.tens').first();
            var secOnesUl = timer.find('ul.seconds.ones').first();

            $scope.actionStatus = "";
            $scope.lessThanTen = false;
            $scope.restInterval = { Minutes: null, Seconds: null };
            $scope.workInterval = { Minutes: null, Seconds: null };
            $scope.prepareInterval = 10;
            $scope.intervalCount = null;
            $scope.currentInterval = 0;
            $scope.intervalStatusText = "";
            $scope.createInterval = false;
            $scope.isInterval = false;

            var currentTime = 0;
            var offSet = 0;
            var duration = null;

            reset();

            $scope.clearHittInterval = function() {
                resetInterval();
            }

            function resetInterval() {
                $scope.restInterval = { Minutes: null, Seconds: null };
                $scope.workInterval = { Minutes: null, Seconds: null };
                $scope.prepareInterval = null;
                $scope.intervalCount = null;
                $scope.currentInterval = 0;
            }

            function reset() {
                $scope.actionStatus = "";
                $scope.currentInterval = 0;
                currentTime = 0;
                if (myTimer) window.clearInterval(myTimer);
                myTimer = null;
                offSet = 0;
                duration = null;
                displayTime(0, 0);
                $scope.lessThanTen = false;
                $scope.intervalStatusText = "";
                $scope.isInterval = false;
            }

            function delta() {
                var now = Date.now();
                var d = now - offSet;

                offSet = now;
                return d;
            }

            function countDown(startTime, duration) {
                //get the number of seconds that have elapsed since countdown started
                var diff = duration - (((Date.now() - startTime) / 1000) | 0);
                var minutes = ((diff / 60) | 0);
                var seconds = ((diff % 60) | 0);
                
                displayTime(minutes, seconds);
            }

            function countUp() {
                currentTime += delta();
                var diff = currentTime / 1000;
                var minutes = ((diff / 60) | 0);
                var seconds = ((diff % 60) | 0);

                displayTime(minutes, seconds);
            }

            function displayTime(minutes, seconds) {
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                var secOnes = seconds % 10;
                var secTens = Math.floor(seconds / 10);
                var minOnes = minutes % 10;
                var minTens = Math.floor(minutes / 10);
                
                triggerAnimation(minTens, minOnes, secTens, secOnes);
                updateSelectedTime(secOnes, secTens, minOnes, minTens);

                //console.log("m: " + minutes + " s: " + seconds);
            }
           
            $scope.startTimer = function () {
                $scope.createInterval = false;
                $scope.isInterval = false;
                if ($scope.currentInterval === 0 && $scope.prepareInterval > 0) runReadyTimer();
                else runTimer();
            }

            function runReadyTimer() {
                $scope.intervalStatusText = "Ready";
                $scope.actionStatus = "timer-action-ready";
                timer.hide();
                readyTimer.show();

                var readyTens = readyTimer.find("ul.seconds.tens");
                var readyOnes = readyTimer.find("ul.seconds.ones");
                var scrollMargin = readyTens.find("li").first().height();
                var countDownInt = $scope.prepareInterval;
                var countDown = setInterval(function () { myCountDown(); }, 1000);

                function myCountDown() {
                    var secOnes = countDownInt % 10;
                    var secTens = Math.floor(countDownInt / 10);
                    countDownInt--;

                    readyTens.animate({ scrollTop: scrollMargin * (secTens) }, 200);
                    readyOnes.animate({ scrollTop: scrollMargin * (secOnes) }, 200);
                   
                    if (countDownInt < 0) {
                        $scope.actionStatus = "timer-action-work";
                        $scope.$apply();

                        //buzz.play();
                        window.clearInterval(countDown);
                        timer.show();
                        readyTimer.hide();
                        readyTens.animate({ scrollTop: scrollMargin * (0) }, 200);
                        readyOnes.animate({ scrollTop: scrollMargin * (0) }, 200);
                        runTimer();
                    }
                }
            }

            $scope.stopTimer = function () {
                $scope.actionStatus = "timer-action-pause";
                window.clearInterval(myTimer);
                myTimer = null;

                if (duration > 0) duration = (getMinutes() * 60) + getSeconds();
            }

            $scope.resetTimer = function () {
                reset();
            }

            function runRestTimer() {
                $scope.intervalStatusText = "Rest";
                var beep = document.getElementById("beep_sound");
                var buzz = document.getElementById("buzz_sound");

                if (myTimer) window.clearInterval(myTimer);
                $scope.actionStatus = "timer-action-rest";
                $scope.lessThanTen = false;

                duration = (($scope.restInterval.Minutes * 60) | 0) + ($scope.restInterval.Seconds | 0);
                currentTime = Date.now();
                offSet = Date.now();

                myRestFunc(); //don't wait for a second to start
                myTimer = setInterval(function() { myRestFunc(); }, 1000);

                function myRestFunc() {

                    countDown(currentTime, duration);

                    var timeLeft = duration - (((Date.now() - currentTime) / 1000) | 0);
                    if (timeLeft <= 3) {
                        //$scope.lessThanTen = true;
                        //$scope.$apply();
                        beep.play();
                    }
                    if (timeLeft <= 0) {
                        duration = null;
                        window.clearInterval(myTimer);
                        myTimer = null;
                        $scope.lessThanTen = false;
                        $scope.$apply();
                        //buzz.play();
                        runTimer();
                    }
                }
            }

            function runTimer() {
                $scope.intervalStatusText = "Work";
                var beep = document.getElementById("beep_sound");
                var buzz = document.getElementById("buzz_sound");

                $scope.currentInterval++;
                $scope.actionStatus = "timer-action-work";

                if (!duration) duration = (($scope.workInterval.Minutes * 60) | 0) + ($scope.workInterval.Seconds | 0);
                $scope.isInterval = duration > 0;
                $scope.$apply();

                if ($scope.isInterval) currentTime = Date.now();
                offSet = Date.now();

                myTimerFunc(); //don't wait for a second to start
                if (!myTimer) myTimer = setInterval(function () { myTimerFunc(); }, 1000);
                
                function myTimerFunc() {
                    if (duration > 0) {
                        countDown(currentTime, duration);

                        var timeLeft = duration - (((Date.now() - currentTime) / 1000) | 0);
                        if (timeLeft <= 3) {
                            //$scope.lessThanTen = true;
                            //$scope.$apply();
                            beep.play();
                        }
                        if (timeLeft <= 0) {
                           // buzz.play();
                            $scope.lessThanTen = false;
                            if ($scope.currentInterval === $scope.intervalCount) {
                                reset();
                                $scope.$apply();
                            }else if ($scope.intervalCount && $scope.intervalCount > 0 && $scope.currentInterval < $scope.intervalCount) {
                                runRestTimer();
                                $scope.$apply();
                            }
                        }
                    } else {
                        countUp();
                    }
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
                    ready.find('ul.seconds.tens').append(createLis(9));
                    ready.find('ul.seconds.ones').append(createLis(9));
                    ready.find('li').removeClass('selected');
                    ready.find('li:contains("0")').addClass("selected");
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

            element.bind("touchmove", function (e) {
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
            '<div class="ready-timer timer text-danger">' +
                '<ul class="seconds tens"></ul>' +
                '<ul class="seconds ones"></ul>' +
            '</div>' +
        '</div>'
      );
}]);
