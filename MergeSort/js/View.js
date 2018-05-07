///<reference path="MergeSortAlgorithm.ts"/>
///<reference path="Methods.ts"/>
var colorInArray = [];
var myArray;
var view = /** @class */ (function () {
    function view() {
        this.paused = false;
        this.animSpeed = 500;
    }
    view.prototype.serializeArray = function (array) {
        var returnString = "";
        myArray = array;
        for (var i = 0; i < array.length; i++) {
            colorInArray[i] = 4;
            returnString = returnString.concat(array[i] + "|");
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
    view.prototype.setColorInArrayElement = function (index, color) {
        var forwardSteps = function (index, color) {
            return function () {
                setColor(index, color);
            };
        }(index, color);
        var oldColor = colorInArray[myArray.indexOf(index)];
        var backwardSteps = function (index, oldColor) {
            return function () {
                setColor(index, oldColor);
            };
        }(index, oldColor);
        colorInArray[myArray.indexOf(index)] = color;
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.setColorInArrayElements = function (index, color) {
        var colorList = [];
        for (var i = 0; i < index.length; i++) {
            colorList[i] = color;
        }
        var forwardSteps = function (index, colorList) {
            return function () {
                setColors(index, colorList);
            };
        }(index, colorList);
        var oldColor = [];
        for (var i = 0; i < index.length; i++) {
            oldColor[i] = colorInArray[myArray.indexOf(index[i])];
        }
        var backwardSteps = function (index, oldColor) {
            return function () {
                setColors(index, oldColor);
            };
        }(index, oldColor);
        for (var i = 0; i < index.length; i++) {
            colorInArray[myArray.indexOf(index[i])] = color;
        }
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.setColorInMultipleArrays = function (left, color1, right, color2) {
        var colorList1 = [];
        for (var i = 0; i < left.length; i++) {
            colorList1[i] = color1;
        }
        var colorList2 = [];
        for (var i = 0; i < right.length; i++) {
            colorList2[i] = color2;
        }
        var forwardSteps = function (left, colorList1, right, colorList2) {
            return function () {
                setColors(left, colorList1);
                setColors(right, colorList2);
            };
        }(left, colorList1, right, colorList2);
        var oldColor1 = [];
        for (var i = 0; i < left.length; i++) {
            oldColor1[i] = colorInArray[myArray.indexOf(left[i])];
        }
        var oldColor2 = [];
        for (var i = 0; i < right.length; i++) {
            oldColor2[i] = colorInArray[myArray.indexOf(right[i])];
        }
        var backwardSteps = function (left, oldColor1, right, oldColor2) {
            return function () {
                setColors(left, oldColor1);
                setColors(right, oldColor2);
            };
        }(left, oldColor1, right, oldColor2);
        for (var i = 0; i < left.length; i++) {
            colorInArray[myArray.indexOf(left[i])] = color1;
        }
        for (var i = 0; i < right.length; i++) {
            colorInArray[myArray.indexOf(right[i])] = color2;
        }
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
        $('#forward').attr('disabled', 'disabled');
        manager.next();
        setTimeout(function () {
            $('#forward').removeAttr('disabled');
        }, 350);
    };
    view.prototype.backward = function () {
        $('#backward').attr('disabled', 'disabled');
        manager.previous();
        setTimeout(function () {
            $('#backward').removeAttr('disabled');
        }, 350);
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
