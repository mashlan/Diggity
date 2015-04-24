

myControllers.controller("MyLiftsCtrl", ["$routeParams", "$scope", "Exercise", "UnitOfMeasure", "ExerciseType", "PersonalRecords",
    function ($routeParams, $scope, Exercise, UnitOfMeasure, ExerciseType, PersonalRecords) {
        "use strict";

        $scope.hideShowContent = function (selector) {
            var elem = $("#" + selector);

            //get parent panel
            var panel = elem.closest(".panel");
            var listGroup = panel.find(".list-group");

            if (elem.hasClass("fa-rotate-180")) {
                elem.removeClass("fa-rotate-180");
                listGroup.show("slow");
            } else {
                elem.addClass("fa-rotate-180");
                listGroup.hide("slow");
            }
        }
    }
]);