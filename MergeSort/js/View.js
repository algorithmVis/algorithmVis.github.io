///<reference path="MergeSortAlgorithm.ts"/>
///<reference path="Methods.ts"/>
var view = /** @class */ (function () {
    function view() {
        this.paused = false;
        this.lastArrowIndex = 0;
        this.lastArrowNr = 0;
        this.animSpeed = 500;
    }
    view.prototype.serializeArray = function (array) {
        var returnString = "";
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var i = array_1[_i];
            returnString = returnString.concat(i + "|");
        }
        return returnString.substring(0, returnString.length - 1);
    };
    view.prototype.lowerElements = function (elems) {
        var forwardSteps = function (elems) {
            return function () {
                lowerElements(elems);
            };
        }(elems);
        var backwardSteps = function (elems) {
            return function () {
                liftElements(elems);
            };
        }(elems);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.liftElements = function (elems) {
        var forwardSteps = function (elems) {
            return function () {
                liftElements(elems);
            };
        }(elems);
        var backwardSteps = function (elems) {
            return function () {
                lowerElements(elems);
            };
        }(elems);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.setPivotElement = function (index) {
        var forwardSteps = function (index) {
            return function () {
                selectPivotElement(index);
            };
        }(index);
        var backwardSteps = function (index) {
            return function () {
                deselectPivotElement(index);
            };
        }(index);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.deselectPivotElement = function (index) {
        var forwardSteps = function (index) {
            return function () {
                deselectPivotElement(index);
            };
        }(index);
        var backwardSteps = function (index) {
            return function () {
                selectPivotElement(index);
            };
        }(index);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.moveElementToPlace = function (element, px, back) {
        var forwardSteps = function (element, px) {
            return function () {
                moveElementToPlace(element, px);
            };
        }(element, px);
        var backwardSteps = function (element, back) {
            return function () {
                moveElementBackToPlace(element, back);
            };
        }(element, back);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.moveElementsToPlace = function (element, px, back) {
        var forwardSteps = function (element, px) {
            return function () {
                moveElementsToPlace(element, px);
            };
        }(element, px);
        var backwardSteps = function (element, back) {
            return function () {
                moveElementsBackToPlace(element, back);
            };
        }(element, back);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.setColorInArrayElement = function (index, color, colorOn) {
        var forwardSteps = function (index, color, colorOn) {
            return function () {
                setColor(index, color, colorOn);
            };
        }(index, color, colorOn);
        var backwardSteps = function (index, color, colorOn) {
            return function () {
                setColor(index, color, !colorOn);
            };
        }(index, color, colorOn);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.setColorInArrayElements = function (index, color, colorOn) {
        var forwardSteps = function (index, color, colorOn) {
            return function () {
                setColors(index, color, colorOn);
            };
        }(index, color, colorOn);
        var backwardSteps = function (index, color, colorOn) {
            return function () {
                setColors(index, color, !colorOn);
            };
        }(index, color, !colorOn);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.pause = function () {
        if (!this.paused) {
            this.paused = true;
            manager.pause();
            $('#backward').removeAttr('disabled');
            $('#forward').removeAttr('disabled');
            $("#togglePause").html("Resume");
        }
        else {
            this.paused = false;
            manager.unpause();
            $('#backward').attr('disabled', 'disabled');
            $('#forward').attr('disabled', 'disabled');
            $("#togglePause").html("Pause");
        }
    };
    view.prototype.setPause = function () {
        this.paused = true;
        manager.pause();
        $("#togglePause").html("Start");
        $('#backward').removeAttr('disabled');
        $('#forward').removeAttr('disabled');
    };
    view.prototype.forward = function () {
        manager.next();
    };
    view.prototype.backward = function () {
        manager.previous();
    };
    view.prototype.slow = function () {
        manager.slow();
    };
    view.prototype.medium = function () {
        manager.medium();
    };
    view.prototype.fast = function () {
        manager.fast();
    };
    return view;
}());
//Craete a global variable
var viewer = new view();
