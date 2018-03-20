///<reference path="MergeSortAlgorithm.ts"/>
///<reference path="Methods.ts"/>

/**
 * File created by Philip Hoang 12.2.18
 */

/*
 Note to self; Funksjoner som ikke finnes i Methods.ts, men som blir kalt her
 - setPosition()
 - swapId()
 - setColor()
 */

declare var $;

class view {
    colors: string[] = ["#7FFF00", "not used", "#FFB366"];

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

    setColorInArrayElement(index: number, color: string, colorOn: boolean) {
        var forwardSteps = function (index, color, colorOn) {
            return function () {
                setColor(index, color, colorOn);
            }
        }(index, color, colorOn);

        var backwardSteps = function (index, color, colorOn) {
            return function () {
                setColor(index, color, !colorOn);
            }
        }(index, color, colorOn);

        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    }

    lowerElement(lo: number) {
        var forwardSteps = function (lo) {
            return function () {
                lowerElement(lo);
            }
        }(lo);

        var backwardSteps = function (lo) {
            return function () {
                liftElement(lo);
            }
        }(lo);

        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    }

    liftElement(lo: number) {
        var forwardSteps = function (lo) {
            return function () {
                liftElement(lo);
            }
        }(lo);

        var backwardSteps = function (lo) {
            return function () {
                lowerElement(lo);
            }
        }(lo);

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

    highlightNode(index: number) {
        var forwardSteps = function (index) {
            return function () {
                highlightNode(index);
            }
        }(index);

        var backwardSteps = function (index) {
            return function () {
                deHighlightNode(index);
            }
        }(index);

        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed))
    }

    deHighlightNode(index: number) {
        var forwardSteps = function (index) {
            return function () {
                deHighlightNode(index);
            }
        }(index);

        var backwardSteps = function (index) {
            return function () {
                highlightNode(index);
            }
        }(index);

        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    }

    moveElementToPlace(element: number, px: number) {
        var forwardSteps = function (element, px) {
            return function () {
                moveElementToPlace(element, px);
            }
        }(element, px);
        manager.addEvent(new FrontendEvent(forwardSteps, forwardSteps, this.animSpeed));
    }


    /*
      setRandomArray() {
        manager.clear();
        manager.start();
        controller.setRandomArray();
        arrayIsReset = true;
      }
     */

    pause() {
        if (!this.paused) {
            this.paused = true;
            manager.pause();
            $("#togglePause").html("resume");
        } else {
            this.paused = false;
            manager.unpause();
            $("#togglePause").html("pause");
        }
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