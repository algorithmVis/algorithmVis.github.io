///<reference path="MergeSortAlgorithm.ts"/>
///<reference path="Methods.ts"/>

/**
 * File created by Philip Hoang 12.2.18
 */

declare var $;

class view {

    paused: boolean = false;
    lastArrowIndex: number = 0;
    lastArrowNr: number = 0;
    animSpeed: number = 500;

    serializeArray(array: number[]) {
        let returnString: string = "";
        for (let i of array)
            returnString = returnString.concat(i + "|");
        return returnString.substring(0, returnString.length - 1);
    }

    lowerElements(elems: number[]) {
        var forwardSteps = function (elems) {
            return function () {
                lowerElements(elems);
            }
        }(elems);

        var backwardSteps = function (elems) {
            return function () {
                liftElements(elems);
            }
        }(elems);

        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    }

    liftElements(elems: number[]) {
        var forwardSteps = function (elems) {
            return function () {
                liftElements(elems);
            }
        }(elems);

        var backwardSteps = function (elems) {
            return function () {
                lowerElements(elems);
            }
        }(elems);

        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    }

    setPivotElement(index: number) {
        var forwardSteps = function (index) {
            return function () {
                selectPivotElement(index);
            }
        }(index);

        var backwardSteps = function (index) {
            return function () {
                deselectPivotElement(index);
            }
        }(index);

        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    }

    deselectPivotElement(index: number) {
        var forwardSteps = function (index) {
            return function () {
                deselectPivotElement(index);
            }
        }(index);

        var backwardSteps = function (index) {
            return function () {
                selectPivotElement(index);
            }
        }(index);

        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    }

    moveElementToPlace(element: number, px: number, back: number) {
        var forwardSteps = function (element, px) {
            return function () {
                moveElementToPlace(element, px);
            }
        }(element, px);

        var backwardSteps = function (element, back) {
            return function () {
                moveElementBackToPlace(element, back);
            }
        }(element, back);

        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    }

    setColorInArrayElement(index: number, i: number, colorOn: boolean) {
        var forwardSteps = function (index, i, colorOn, colors) {
            return function () {
                setColor(index, i, colorOn);
            }
        }(index, i, colorOn, colors);

        var backwardSteps = function (index, i, colorOn, colors) {
            return function () {
                setColor(index, i, !colorOn);
            }
        }(index, i, colorOn, colors);

        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    }

    setColorInArrayElements(index: number[], i: number, colorOn: boolean) {
        var forwardSteps = function (index, i, colorOn, colors) {
            return function () {
                setColors(index, i, colorOn);
            }
        }(index, i, colorOn, colors);

        var backwardSteps = function (index, i, colorOn, colors) {
            return function () {
                setColors(index, i, !colorOn);
            }
        }(index, i, colorOn, colors);

        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    }

    pause() {
        if (!this.paused) {
            this.paused = true;
            manager.pause();
            $("#togglePause").html("Resume");
        } else {
            this.paused = false;
            manager.unpause();
            $("#togglePause").html("Pause");
        }
    }

    setPause() {
        this.paused = true;
        manager.pause();
        $("#togglePause").html("Start");
    }

    forward() {
        manager.next();
    }

    backward() {
        manager.previous();
    }

}

//Craete a global variable
var viewer: view = new view();