/**********************************************************************
 * ********************* Timer ****************************************
 *********************************************************************/
myControllers.controller('TimerCtrl', ['$routeParams', '$scope', '$location',
    function ($routeParams, $scope, $location) {
        'use strict';

        $scope.isCountDown = false;
        $scope.lessThanTen = false;
        $scope.Minutes = {
            TenSpot: createNumberArray(9, "min_tens"),
            OneSpot: createNumberArray(9, "min_ones")
        };
        $scope.Seconds = {
            TenSpot: createNumberArray(5, "sec_tens"),
            OneSpot: createNumberArray(9, "sec_ones")
        }

        var myTimer;
        var scrollMargin = 364;
        var minTenUl = $("#minutes_tens");
        var minOneUl = $("#minutes_ones");
        var secTenUl = $("#seconds_tens");
        var secOneUl = $("#seconds_ones");

        $(minTenUl).bind("mousewheel", function (e) {
            wheel(minTenUl, $scope.Minutes.TenSpot, e);
        });

        $(minOneUl).bind("mousewheel", function (e) {
            wheel(minOneUl, $scope.Minutes.OneSpot, e);
        });

        $(secTenUl).bind("mousewheel", function (e) {
            wheel(secTenUl, $scope.Seconds.TenSpot, e);
        });

        $(secOneUl).bind("mousewheel", function (e) {
            wheel(secOneUl, $scope.Seconds.OneSpot, e);
        });

        function wheel(element, array, event) {
            var moveUp = (event.originalEvent.wheelDelta >= 0);
            event.preventDefault();

            $.each(array, function (i, v) {
                if (v.isSelected) {
                    v.isSelected = false;
                    var index = moveUp ? i - 1 : i + 1;

                    if (index < 0) index = 0;
                    if (index >= array.length) index = array.length - 1;

                    array[index].isSelected = true;
                    element.animate({
                        scrollTop: scrollMargin * index
                    }, 100);
                    return false;
                }
            });
        }


        $scope.stopTimer = function() {
            window.clearInterval(myTimer);
        }

        $scope.startTimer = function() {
            var seconds = getSeconds();
            var minutes = getMinutes();
            var beep = document.getElementById("beep_sound");

            var startingSeconds = seconds;
            var startingMinutes = minutes;

            var d0 = (new Date());
            d0 = (new Date(d0.getTime() + (minutes * 60000) + (seconds * 1000))).valueOf();
            myTimer = setInterval(function() { myTimerFunc(d0); }, 1000);

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
                seconds = Math.floor(diff / 1000) - minutes*60;
                
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

        $scope.resetTimer = function () {
            $scope.lessThanTen = false;
            window.clearInterval(myTimer);
            updateSelectedTime(0, 0, 0, 0);
            triggerAnimation(0, 0, 0, 0);
        }

        function triggerAnimation(minTens, minOnes, secTens, secOnes) {
            minTenUl.animate({
                scrollTop: scrollMargin * (minTens)
            }, 200);

            minOneUl.animate({
                scrollTop: scrollMargin * (minOnes)
            }, 200);

            secTenUl.animate({
                scrollTop: scrollMargin * (secTens)
            }, 200);

            secOneUl.animate({
                scrollTop: scrollMargin * (secOnes)
            }, 200);
        }

        function getSeconds() {
            var tensValue = $.grep($scope.Seconds.TenSpot, function (v) { return v.isSelected; })[0].value;
            var onesValue = $.grep($scope.Seconds.OneSpot, function (v) { return v.isSelected; })[0].value;

            return (tensValue * 10) + onesValue;
        }

        function getMinutes() {
            var tensValue = $.grep($scope.Minutes.TenSpot, function (v) { return v.isSelected; })[0].value;
            var onesValue = $.grep($scope.Minutes.OneSpot, function (v) { return v.isSelected; })[0].value;

            return (tensValue * 10) + onesValue;
        }

        function updateSelectedTime(secOnes, secTens, minOnes, minTens) {
            resetSelected();
            $scope.Minutes.TenSpot[minTens].isSelected = true;
            $scope.Minutes.OneSpot[minOnes].isSelected = true;
            $scope.Seconds.TenSpot[secTens].isSelected = true;
            $scope.Seconds.OneSpot[secOnes].isSelected = true;
        }

        function resetSelected() {
            $.grep($scope.Seconds.TenSpot, function (v) { return v.isSelected; })[0].isSelected = false;
            $.grep($scope.Seconds.OneSpot, function (v) { return v.isSelected; })[0].isSelected = false;
            $.grep($scope.Minutes.TenSpot, function (v) { return v.isSelected; })[0].isSelected = false;
            $.grep($scope.Minutes.OneSpot, function (v) { return v.isSelected; })[0].isSelected = false;
        }


        function createNumberArray(topNumber, id) {
            var numbers = [];

            for (var i = 0; i <= topNumber; i++) {
                numbers.push({ value: i, isSelected: (i === 0), id: id + "_" + i });
            }
            return numbers;
        }

        $scope.changeTime = function (array, id) {
            var parent = $("#" + id).parent();

            $.each(array, function(i, v) {
                if (v.isSelected && v.value < array.length -1) {
                    v.isSelected = false;
                    array[i + 1].isSelected = true;
                    parent.animate({
                        scrollTop: scrollMargin * (v.value + 1)
                    }, 300);
                    return false;
                }
            });




            //var $this = $(element);

            ////get currently selected
            //var selected = parseInt($this.find('.selected').text());

            ////if (selected === 9 && !moveup) return;

            //if (moveup) {
            //    selected = selected === 0 ? 0 : selected - 1;
            //} else {
            //    selected++;
            //}

            ////clear classes
            //$this.children().removeClass('selected');
            //var child = $this.find('li:contains(' + selected + ')');

            //if (child.length > 0) {
            //    child.addClass('selected');
            //} else {
            //    selected = moveup ? selected + 1 : selected - 1;
            //}

            

        }
    }
]);
