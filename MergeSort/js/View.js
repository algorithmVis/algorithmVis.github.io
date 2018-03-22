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
    view.prototype.setColorInArrayElement = function (index, i, colorOn) {
        var forwardSteps = function (index, i, colorOn, colors) {
            return function () {
                setColor(index, i, colorOn);
            };
        }(index, i, colorOn, colors);
        var backwardSteps = function (index, i, colorOn, colors) {
            return function () {
                setColor(index, i, !colorOn);
            };
        }(index, i, colorOn, colors);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.setColorInArrayElements = function (index, i, colorOn) {
        var forwardSteps = function (index, i, colorOn, colors) {
            return function () {
                setColors(index, i, colorOn);
            };
        }(index, i, colorOn, colors);
        var backwardSteps = function (index, i, colorOn, colors) {
            return function () {
                setColors(index, i, !colorOn);
            };
        }(index, i, colorOn, colors);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.pause = function () {
        if (!this.paused) {
            this.paused = true;
            manager.pause();
            $("#togglePause").html("Resume");
        }
        else {
            this.paused = false;
            manager.unpause();
            $("#togglePause").html("Pause");
        }
    };
    view.prototype.setPause = function () {
        this.paused = true;
        manager.pause();
        $("#togglePause").html("Start");
    };
    view.prototype.forward = function () {
        manager.next();
    };
    view.prototype.backward = function () {
        manager.previous();
    };
    return view;
}());
//Craete a global variable
var viewer = new view();
