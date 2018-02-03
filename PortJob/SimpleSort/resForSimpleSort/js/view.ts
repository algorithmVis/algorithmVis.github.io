/**
 * File created by Øyvind Skeie Liland 01.02.18
 */

///<reference path="controller.ts"/>
///<reference path="kValue.ts"/>
///<reference path="viewFunctions.js"/>
///<reference path="insertionSort.js"/>
declare var $;

class view {

    colors: string[] = ["#7FFF00", "not used", "#FFB366"];
    arrayIsReset: boolean = false;
    k: number = 0
    kLeft: number = 0
    kRight: number = 0;
    currentAlgorithmName: string = "Insertion sort";
    paused: boolean = false;
    animSpeed: number = 500;

    serializeArray(array: number[]) {
        let returnString: string = "";
        for (let i of array)
            returnString = returnString.concat(i + "|");
        return returnString.substring(0, returnString.length - 1);
    }


    switchArrayElements(indexA: number, indexB: number) {
        var forwardSteps = function (indexA, indexB) {
            return function () {
                setPosition(indexA, indexB * 70, 0);
                setPosition(indexB, indexA * 70, 0);
                swapId(indexA, indexB);
            }
        }(indexA, indexB);

        var backwardSteps = function (indexA, indexB) {
            return function () {
                setPosition(indexB, indexB * 70, 0);
                setPosition(indexA, indexA * 70, 0);
                swapId(indexA, indexB);
            }
        }(indexA, indexB);

        manager.addEvent(new FrontendEvent(forwardSteps, forwardSteps, this.animSpeed));
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
                setPosition(fromIndex, fromIndex * 70, 0);
            }
        }(fromIndex, toIndex);

        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    }

    moveArrayElementToIndexFromSpecifiedJIndex(fromIndex: number, toIndex: number, jIndex: number) {
        var forwardSteps = function (fromIndex, toIndex) {
            return function () {
                setPosition(fromIndex, toIndex * 70, 0);
                //swapId(fromIndex, toIndex);
            }
        }(fromIndex, toIndex);
        var backwardSteps = function (fromIndex, jIndex) {
            return function () {
                setPosition(fromIndex, jIndex * 70, 0);
            }
        }(fromIndex, jIndex);

        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    }

    storePermValue(index: number) {
        var forwardSteps = function (index) {
            return function () {
                storePermaValue(index);
            }
        }(index);

        var backwardSteps = function (index) {
            return function () {
                releasePermaValue(index);
            }
        }(index);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    }

    releasePermValue(index: number) {
        var forwardSteps = function (index) {
            return function () {
                releasePermaValue(index);
            }
        }(index);

        var backwardSteps = function (index) {
            return function () {
                storePermaValue(index);
            }
        }(index);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    }


    unpause() {
        manager.start();
        this.paused = false;
    }

    pause() {
        if (!this.paused) {
            manager.pause();
            this.paused = true;
            document.getElementById('togglePause').innerText = "resume";
        } else {
            this.unpause()
            document.getElementById('togglePause').innerText = "pause";
        }

    }

    forward() {
        manager.next();
    }

    backward() {
        manager.previous();
    }

    setKValue(value: number) {
        var forwardSteps = function (k: kValue, value) {
            return function () {
                k.setValue(value);
            }
        }(k, value);

        var backwardSteps = function (k: kValue, value) {
            return function () {
                k.setValue(value);
            }
        }(k, this.k);
        this.k = value;
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    }

    setKLeftAndRight(left: number, right: number) {
        var forwardSteps = function (k: kValue, left, right) {
            return function () {
                k.setLeftAndRight(left, right, this.animSpeed);
            }
        }(k, left, right);
        var backwardSteps = function (k: kValue, kLeft, kRight) {
            return function () {
                k.setLeftAndRight(kLeft, kRight, this.animSpeed);
            }
        }(k, this.kLeft, this.kRight);

        this.kLeft = left;
        this.kRight = right;
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

    /*
        setRandomArray() {
            manager.clear();
            manager.start();
            controller.setRandomArray();
            arrayIsReset = true;
        }
    */
    setHeadText(str: string) {
        setHeaderText(str);
    }

    unhideK() {
        var forwardSteps = function (k: kValue) {
            return function () {
                k.unhide();
            }
        }(k);

        var backwardSteps = function (k: kValue) {
            return function () {
                k.hide();
            }
        }(k);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    }

    hideK() {
        var forwardSteps = function (k: kValue) {
            return function () {
                k.hide();
            }
        }(k);

        var backwardSteps = function (k: kValue) {
            return function () {
                k.unhide();
            }
        }(k);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    }
}

var viewer: view = new view();