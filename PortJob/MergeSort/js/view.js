///<reference path="MergeSortAlgorithm.ts"/>
///<reference path="methods.ts"/>
var view = /** @class */ (function () {
    function view() {
        this.colors = ["#7FFF00", "not used", "#FFB366"];
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
    view.prototype.moveArrayElementToIndex = function (fromIndex, toIndex) {
        var forwardSteps = function (fromIndex, toIndex) {
            return function () {
                setPosition(fromIndex, toIndex * 70, 0);
                swapId(fromIndex, toIndex);
            };
        }(fromIndex, toIndex);
        var backwardSteps = function (fromIndex, toIndex) {
            return function () {
                swapId(toIndex, fromIndex);
                setPosition(fromIndex, toIndex * 70, 0);
            };
        }(fromIndex, toIndex);
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
    view.prototype.lowerElements = function (lo, hi) {
        if (lo > hi)
            return;
        var forwardSteps = function (lo, hi) {
            return function () {
                lowerElements(lo, hi);
            };
        }(lo, hi);
        var backwardSteps = function (lo, hi) {
            return function () {
                liftElements(lo, hi);
            };
        }(lo, hi);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.liftElements = function (lo, hi) {
        if (lo > hi)
            return;
        var forwardSteps = function (lo, hi) {
            return function () {
                liftElements(lo, hi);
            };
        }(lo, hi);
        var backwardSteps = function (lo, hi) {
            return function () {
                lowerElements(lo, hi);
            };
        }(lo, hi);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.swapElements = function (i, j) {
        var forwardSteps = function (i, j) {
            return function () {
                swapElements(i, j);
            };
        }(i, j);
        manager.addEvent(new FrontendEvent(forwardSteps, forwardSteps, this.animSpeed));
    };
    view.prototype.pushElement = function (i, place) {
        var forwardSteps = function (i, j) {
            return function () {
                pushElement(i, j);
            };
        }(i, place);
        manager.addEvent(new FrontendEvent(forwardSteps, forwardSteps, this.animSpeed));
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
    view.prototype.setArrow = function (arrowNr) {
        if (this.lastArrowIndex == arrowNr)
            return;
        var forwardSteps = function (arrowNr) {
            return function () {
                moveArrowToIndex(arrowNr, 0);
            };
        }(arrowNr);
        var backwardSteps = function (lastArrowIndex) {
            return function () {
                moveArrowToIndex(lastArrowIndex, 0);
            };
        }(this.lastArrowIndex);
        this.lastArrowIndex = arrowNr;
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.showArrow = function () {
        var forwardSteps = function () {
            return function () {
                showArrow();
            };
        };
        var backwardSteps = function () {
            return function () {
                hideArrow();
            };
        };
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.hideArrow = function () {
        var forwardSteps = function () {
            return function () {
                hideArrow();
            };
        };
        var backwardSteps = function () {
            return function () {
                showArrow();
            };
        };
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.moveArrow = function (index) {
        var forwardSteps = function (index) {
            return function () {
                moveArrowToIndex(index, 1000);
            };
        }(index);
        var backwardSteps = function (lastArrowIndex) {
            return function () {
                moveArrowToIndex(lastArrowIndex, 1000);
            };
        }(this.lastArrowIndex);
        this.lastArrowIndex = index;
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.setToFinished = function (index) {
        var forwardSteps = function (index) {
            return function () {
                setToFinished(index);
            };
        }(index);
        var backwardSteps = function (index) {
            return function () {
                setToNotFinished(index);
            };
        }(index);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.setPivotToFinished = function (index) {
        var forwardSteps = function (index) {
            return function () {
                deselectPivotElement(index);
                setToFinished(index);
            };
        }(index);
        var backwardSteps = function (index) {
            return function () {
                setToNotFinished(index);
                selectPivotElement(index);
            };
        }(index);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.setArrowNumber = function (nr) {
        var forwardSteps = function (nr) {
            return function () {
                setArrowNumber(nr);
            };
        }(nr);
        var backwardSteps = function (lastArrowNr) {
            return function () {
                setArrowNumber(lastArrowNr);
            };
        }(this.lastArrowNr);
        this.lastArrowNr = nr;
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.moveElementToPlace = function (tempElement, end, moveTo) {
        var forwardSteps = function (tempElement, end, moveTo) {
            return function () {
                moveElementToPlace(tempElement, end, moveTo);
            };
        }(tempElement, end, moveTo);
        manager.addEvent(new FrontendEvent(forwardSteps, forwardSteps, this.animSpeed));
    };
    /*
      setRandomArray() {
        manager.clear();
        manager.start();
        controller.setRandomArray();
        arrayIsReset = true;
      }
     */
    view.prototype.pause = function () {
        if (!this.paused) {
            this.paused = true;
            manager.pause();
            $("#togglePause").html("resume");
        }
        else {
            this.paused = false;
            manager.unpause();
            $("#togglePause").html("pause");
        }
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
