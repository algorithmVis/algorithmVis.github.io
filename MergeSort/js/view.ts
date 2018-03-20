///<reference path="MergeSortAlgorithm.ts"/>
///<reference path="methods.ts"/>

/**
 * File created by Philip Hoang 12.2.18
 */

/*
 Note to self; Funksjoner som ikke finnes i methods.ts, men som blir kalt her
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

    moveArrayElementToIndex(fromIndex: number, toIndex: number) {
        var forwardSteps = function (fromIndex, toIndex) {
            return function () {
                setPosition(fromIndex, toIndex * 70, 0);
                swapId(fromIndex, toIndex);
            }
        }(fromIndex, toIndex);

        var backwardSteps = function (fromIndex, toIndex) {
            return function () {
                swapId(toIndex, fromIndex);
                setPosition(fromIndex, toIndex * 70, 0);
            }
        }(fromIndex, toIndex);

        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
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

    swapElements(i: number, j: number) {
        var forwardSteps = function (i, j) {
            return function () {
                swapElements(i, j);
            }
        }(i, j);

        manager.addEvent(new FrontendEvent(forwardSteps, forwardSteps, this.animSpeed));
    }

    pushElement(i: number, place: number) {
        var forwardSteps = function (i, j) {
            return function () {
                pushElement(i, j);
            }
        }(i, place);

        manager.addEvent(new FrontendEvent(forwardSteps, forwardSteps, this.animSpeed));
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


    setArrow(arrowNr: number) {
        if (this.lastArrowIndex == arrowNr) return;

        var forwardSteps = function (arrowNr) {
            return function () {
                moveArrowToIndex(arrowNr, 0);
            }
        }(arrowNr);

        var backwardSteps = function (lastArrowIndex) {
            return function () {
                moveArrowToIndex(lastArrowIndex, 0);
            }
        }(this.lastArrowIndex);

        this.lastArrowIndex = arrowNr;

        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    }

    showArrow() {
        var forwardSteps = function () {
            return function () {
                showArrow();
            }
        };

        var backwardSteps = function () {
            return function () {
                hideArrow();
            }
        };

        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    }

    hideArrow() {
        var forwardSteps = function () {
            return function () {
                hideArrow();
            }
        };

        var backwardSteps = function () {
            return function () {
                showArrow();
            }
        };

        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    }

    moveArrow(index: number) {
        var forwardSteps = function (index) {
            return function () {
                moveArrowToIndex(index, 1000);
            }
        }(index);

        var backwardSteps = function (lastArrowIndex) {
            return function () {
                moveArrowToIndex(lastArrowIndex, 1000);
            }
        }(this.lastArrowIndex);

        this.lastArrowIndex = index;

        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    }

    setToFinished(index: number) {
        var forwardSteps = function (index) {
            return function () {
                setToFinished(index);
            }
        }(index);

        var backwardSteps = function (index) {
            return function () {
                setToNotFinished(index);
            }
        }(index);

        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    }

    setPivotToFinished(index: number) {
        var forwardSteps = function (index) {
            return function () {
                deselectPivotElement(index);
                setToFinished(index);
            }
        }(index);

        var backwardSteps = function (index) {
            return function () {
                setToNotFinished(index);
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

    setArrowNumber(nr: number) {
        var forwardSteps = function (nr) {
            return function () {
                setArrowNumber(nr);
            }
        }(nr);

        var backwardSteps = function (lastArrowNr) {
            return function () {
                setArrowNumber(lastArrowNr);
            }
        }(this.lastArrowNr);

        this.lastArrowNr = nr;
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    }

    moveElementToPlace(element: number, px: number) {
        var forwardSteps = function (tempElement, end, moveTo, rest) {
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