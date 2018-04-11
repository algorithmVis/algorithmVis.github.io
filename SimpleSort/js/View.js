/**
 * File created by Øyvind Skeie Liland 01.02.18
 */
///<reference path="Controller.ts"/>
///<reference path="KValue.ts"/>
///<reference path="InsertionSort.ts"/>
///<reference path="ViewFunctions.ts"/>
var view = /** @class */ (function () {
    function view() {
        this.colors = ["#7FFF00", "not used", "#FFB366"];
        this.k = 0;
        this.kLeft = 0;
        this.kRight = 0;
        this.paused = false;
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
    view.prototype.switchArrayElements = function (indexA, indexB) {
        var forwardSteps = function (indexA, indexB) {
            return function () {
                setPosition(indexA, indexB * 70, 0);
                setPosition(indexB, indexA * 70, 0);
                swapId(indexA, indexB);
            };
        }(indexA, indexB);
        var backwardSteps = function (indexA, indexB) {
            return function () {
                setPosition(indexB, indexB * 70, 0);
                setPosition(indexA, indexA * 70, 0);
                swapId(indexA, indexB);
            };
        }(indexA, indexB);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
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
                setPosition(fromIndex, fromIndex * 70, 0);
            };
        }(fromIndex, toIndex);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.moveArrayElementToIndexFromSpecifiedJIndex = function (fromIndex, toIndex, jIndex) {
        var forwardSteps = function (fromIndex, toIndex) {
            return function () {
                setPosition(fromIndex, toIndex * 70, 0);
                //swapId(fromIndex, toIndex);
            };
        }(fromIndex, toIndex);
        var backwardSteps = function (fromIndex, jIndex) {
            return function () {
                setPosition(fromIndex, jIndex * 70, 0);
            };
        }(fromIndex, jIndex);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.storePermValue = function (index) {
        var forwardSteps = function (index) {
            return function () {
                storePermaValue(index);
            };
        }(index);
        var backwardSteps = function (index) {
            return function () {
                releasePermaValue(index);
            };
        }(index);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.releasePermValue = function (index) {
        var forwardSteps = function (index) {
            return function () {
                releasePermaValue(index);
            };
        }(index);
        var backwardSteps = function (index) {
            return function () {
                storePermaValue(index);
            };
        }(index);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.setKValue = function (value) {
        var forwardSteps = function (k, value) {
            return function () {
                k.setValue(value);
            };
        }(k, value);
        var backwardSteps = function (k, value) {
            return function () {
                k.setValue(value);
            };
        }(k, this.k);
        this.k = value;
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.setKLeftAndRight = function (left, right) {
        var forwardSteps = function (k, left, right, top) {
            return function () {
                k.setLeftAndRight(left, right, top);
            };
        }(k, left, right, this.animSpeed);
        var backwardSteps = function (k, kLeft, kRight, top) {
            return function () {
                k.setLeftAndRight(kLeft, kRight, top);
            };
        }(k, this.kLeft, this.kRight, 0);
        this.kLeft = left;
        this.kRight = right;
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
    view.prototype.setHeadText = function (str) {
        setHeaderText(str);
    };
    view.prototype.unhideK = function () {
        var forwardSteps = function (k) {
            return function () {
                k.unhide();
            };
        }(k);
        var backwardSteps = function (k) {
            return function () {
                k.hide();
            };
        }(k);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.hideK = function () {
        var forwardSteps = function (k) {
            return function () {
                k.hide();
            };
        }(k);
        var backwardSteps = function (k) {
            return function () {
                k.unhide();
            };
        }(k);
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
    view.backward = function () {
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
var viewer = new view();
