/**
 * File created by Kenneth Apeland 01.02.18
 */

///<reference path="controller.ts"/>
declare var $;

class view {

    colors: string[] = ["#7FFF00", "not used", "#FFB366"];
    arrayIsReset: boolean = false;
    k: number = 0
    kLeft: number = 0
    kRight: number = 0;
    currentAlgorithmName: string = "Union Find";
    paused: boolean = false;
    animSpeed: number = 500;



    displayArray(array: number[]) {
        manager.addEvent()
    }

    moveArrayElementToIndexFromSpecifiedJIndex(fromIndex: number, toIndex: number, jIndex: number) {
        var forwardSteps = function (fromIndex, toIndex) {
            return function () {
                setPosition(fromIndex, toIndex * 70, 0);
                swapId(fromIndex, toIndex);
            }
        }(fromIndex, toIndex);
        var backwardSteps = function (fromIndex, jIndex) {
            return function () {
                setPosition(fromIndex, jIndex * 70, 0);
            }
        }(fromIndex, jIndex);

        manager.addEvent(new FrontendEvent(forwardSteps, forwardSteps, this.animSpeed));
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
                console.log("perm");
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

        this.k = value;
        manager.addEvent(new FrontendEvent(forwardSteps, forwardSteps, this.animSpeed));
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

    setSlow() {
        this.animSpeed = 250;
    }

    setMedium() {
        this.animSpeed = 500;
    }

    setFast() {
        this.animSpeed = 750;
    }

    setArrow(index: number) {
        
    }
}

var viewer: view = new view();