///<reference path="controller.ts"/>
///<reference path="kValue.ts"/>
///<reference path="viewFunctions.js"/>
var view = /** @class */ (function () {
    function view() {
        this.colors = ["#7FFF00", "not used", "#FFB366"];
        this.arrayIsReset = false;
        this.k = 0;
        this.kLeft = 0;
        this.kRight = 0;
        this.currentAlgorithmName = "Insertion sort";
        /*
            setRandomArray() {
                manager.clear();
                manager.start();
                controller.setRandomArray();
                arrayIsReset = true;
            }
        */
    }
    view.prototype.serializeArray = function (array) {
        var returnString = "";
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var i = array_1[_i];
            returnString = returnString.concat(i + "|");
        }
        return returnString.substring(0, returnString.length - 1);
    };
    view.prototype.switchArrayElements = function (indexA, indexB) {
        var forwardSteps = function (indexA, indexB) {
            return function () {
                window.external.setPosition(indexA, indexB * 70, 0);
                window.external.setPosition(indexB, indexA * 70, 0);
                window.external.swapPosition(indexA, indexB);
            };
        };
        /*
        forwardSteps.push("setPosition(" + indexA + ", " + indexB * 70 + ", 0)");
        forwardSteps.push("setPosition(" + indexB + ", " + indexA * 70 + ", 0)");
        forwardSteps.push("swapId(" + indexA + ", " + indexB + ")");

        let backwardSteps: string[] = [];
        backwardSteps.push("setPosition(" + indexB + ", " + indexB * 70 + ", 0)");
        backwardSteps.push("setPosition(" + indexA + ", " + indexA * 70 + ", 0)");
        backwardSteps.push("swapId(" + indexB + ", " + indexA + ")");
        */
        manager.addEvent(new FrontendEvent(forwardSteps, forwardSteps, manager.delayTime));
    };
    view.prototype.moveArrayElementToIndex = function (i, j) {
        var forwardSteps = function (i, j) {
            return function () {
                setPosition(i, j * 70, 0);
            };
        };
        var backwardSteps = function (fromIndex, jIndex) {
            return function () {
                setPosition(j, i * 70, 0);
            };
        };
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, manager.delayTime));
    };
    view.prototype.moveArrayElementToIndexFromSpecifiedJIndex = function (fromIndex, toIndex, jIndex) {
        var forwardSteps = function (fromIndex, toIndex) {
            return function () {
                setPosition(fromIndex, toIndex * 70, 0);
            };
        };
        var backwardSteps = function (fromIndex, jIndex) {
            return function () {
                setPosition(fromIndex, jIndex * 70, 0);
            };
        };
        /*
        let forwardSteps: string[] = [];
        forwardSteps.push("setPosition(" + fromIndex + ", " + toIndex * 70 + ", 0)");

        //We use jIndex for the backward-step, because this is where it originally came from
        let backwardSteps: string[] = [];
        backwardSteps.push("setPosition(" + fromIndex + ", " + jIndex * 70 + ", 0)");
        */
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, manager.delayTime));
    };
    view.prototype.storePermValue = function (index) {
        var forwardSteps = function (index) {
            return function () {
                storePermValue(index);
                releasePermValue(index);
            };
        };
        var backWardSteps = function (index) {
            releasePermValue(index);
            storePermValue(index);
        };
        manager.addEvent(new FrontendEvent(forwardSteps, forwardSteps, manager.delayTime));
    };
    view.prototype.releasePermValue = function (index) {
        var forwardSteps = function (index) {
            return function () {
                releasePermValue(index);
                storePermValue(index);
            };
        };
        var backwardSteps = function (index) {
            storePermValue(index);
            releasePermValue(index);
        };
        manager.addEvent(new FrontendEvent(forwardSteps, forwardSteps, manager.delayTime));
    };
    view.prototype.unpause = function () {
        manager.start();
    };
    view.prototype.forward = function () {
        manager.next();
    };
    view.prototype.backward = function () {
        manager.previous();
    };
    view.prototype.setKValue = function (value) {
        var forwardSteps = function (k, value) {
            return function () {
                k.setValue(value);
            };
        };
        this.k = value;
        manager.addEvent(new FrontendEvent(forwardSteps, forwardSteps, manager.delayTime));
    };
    view.prototype.setKLeftAndRight = function (left, right) {
        var forwardSteps = function (k, left, right) {
            return function () {
                k.setLeftAndRight(left, right);
            };
        };
        var backwardSteps = function (k, left, right) {
            return function () {
                k.setLeftAndRight(this.kLeft, this.kRight);
            };
        };
        this.kLeft = left;
        this.kRight = right;
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, manager.delayTime));
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
        };
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, manager.delayTime));
    };
    return view;
}());
var viewer = new view();
