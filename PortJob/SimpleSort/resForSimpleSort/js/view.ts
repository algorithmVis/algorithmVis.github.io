///<reference path="controller.ts"/>
///<reference path="kValue.ts"/>
///<reference path="viewFunctions.js"/>

declare var $;

interface External {
    setPosition: Function;
    swapPosition: Function;
    storePermValue: Function;
    releasePermValue: Function;
    setColor: Function;
}

class view {
    colors: string[] = ["#7FFF00", "not used", "#FFB366"];
    arrayIsReset: boolean = false;
    k: number = 0
    kLeft: number = 0
    kRight: number = 0;
    currentAlgorithmName: string = "Insertion sort";


    serializeArray(array: number[]) {
        let returnString: string = "";
        for (let i of array)
            returnString = returnString.concat(i + "|");
        return returnString.substring(0, returnString.length - 1);
    }


    switchArrayElements(indexA: number, indexB: number) {
        var forwardSteps = function (indexA, indexB) {
            return function () {
                window.external.setPosition(indexA, indexB * 70, 0);
                window.external.setPosition(indexB, indexA * 70, 0);
                window.external.swapPosition(indexA, indexB);
            }
        }
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
    }

    moveArrayElementToIndex(i: number, j: number) {
        var forwardSteps = function (i, j) {
            return function () {
                setPosition(i, j * 70, 0);
            }
        }
        var backwardSteps = function (fromIndex, jIndex) {
            return function () {
                setPosition(j, i * 70, 0);
            }
        }
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, manager.delayTime));
    }

    moveArrayElementToIndexFromSpecifiedJIndex(fromIndex: number, toIndex: number, jIndex: number) {
        var forwardSteps = function (fromIndex, toIndex) {
            return function () {
                setPosition(fromIndex, toIndex * 70, 0);
            }
        }
        var backwardSteps = function (fromIndex, jIndex) {
            return function () {
                setPosition(fromIndex, jIndex * 70, 0);
            }
        }
        /*
        let forwardSteps: string[] = [];
        forwardSteps.push("setPosition(" + fromIndex + ", " + toIndex * 70 + ", 0)");

        //We use jIndex for the backward-step, because this is where it originally came from
        let backwardSteps: string[] = [];
        backwardSteps.push("setPosition(" + fromIndex + ", " + jIndex * 70 + ", 0)");
        */
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, manager.delayTime));
    }

    storePermValue(index: number) {
        var forwardSteps = function (index) {
            return function () {
                storePermValue(index);
                releasePermValue(index);
            }
        }
        var backWardSteps = function (index) {
            releasePermValue(index);
            storePermValue(index);
        }
        manager.addEvent(new FrontendEvent(forwardSteps, forwardSteps, manager.delayTime));
    }

    releasePermValue(index: number) {
        var forwardSteps = function (index) {
            return function () {
               releasePermValue(index);
               storePermValue(index);
            }
        }
        var backwardSteps = function (index) {
            storePermValue(index);
            releasePermValue(index);
        }
        manager.addEvent(new FrontendEvent(forwardSteps, forwardSteps, manager.delayTime));
    }


    unpause() {
        manager.start();
    }

    forward() {
        manager.next();
    }

    backward() {
        manager.previous();
    }

    setKValue(value: number) {
        var forwardSteps = function (k, value) {
            return function () {
                k.setValue(value);
            }
        }

        this.k = value;
        manager.addEvent(new FrontendEvent(forwardSteps, forwardSteps, manager.delayTime));
    }

    setKLeftAndRight(left: number, right: number) {
        var forwardSteps = function (k, left, right) {
            return function () {
                k.setLeftAndRight(left, right);
            }
        }
        var backwardSteps = function (k, left, right) {
            return function () {
                k.setLeftAndRight(this.kLeft, this.kRight);
            }
        }

        this.kLeft = left;
        this.kRight = right;
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, manager.delayTime));
    }

    setColorInArrayElement(index: number, color: string, colorOn: boolean) {
        var forwardSteps = function (index, color, colorOn) {
            return function () {
                setColor(index, color, colorOn);
            }
        }(index, color, colorOn)
        var backwardSteps = function (index, color, colorOn) {
            return function () {
                setColor(index, color, !colorOn);
            }
        }
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, manager.delayTime));
    }

    /*
        setRandomArray() {
            manager.clear();
            manager.start();
            controller.setRandomArray();
            arrayIsReset = true;
        }
    */
}

var viewer: view = new view();