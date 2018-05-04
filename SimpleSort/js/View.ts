/**
 * File created by Øyvind Skeie Liland 01.02.18
 */

///<reference path="Controller.ts"/>
///<reference path="KValue.ts"/>
///<reference path="InsertionSort.ts"/>
///<reference path="ViewFunctions.ts"/>
declare var $;

class view {

    colors: string[] = ["#7FFF00", "not used", "#FFB366"];
    k: number = 0
    kLeft: number = 0
    kRight: number = 0;
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

        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
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
        var forwardSteps = function (k: kValue, left, right, top) {
            return function () {
                k.setLeftAndRight(left, right, top);
            }
        }(k, left, right, this.animSpeed);
        var backwardSteps = function (k: kValue, kLeft, kRight, top) {
            return function () {
                k.setLeftAndRight(kLeft, kRight, top);
            }
        }(k, this.kLeft, this.kRight, 0);

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

    pause() {
        if (!this.paused) {
            this.paused = true;
            manager.pause();
            $('#backward').removeAttr('disabled');
            $('#forward').removeAttr('disabled');
            $("#togglePause").html("Resume");
        } else {
            this.paused = false;
            manager.unpause();
            $('#backward').attr('disabled', 'disabled');
            $('#forward').attr('disabled', 'disabled');
            $("#togglePause").html("Pause");
        }
    }

    setPause() {
        this.paused = true;
        manager.pause();
        $("#togglePause").html("Start");
        $('#backward').removeAttr('disabled');
        $('#forward').removeAttr('disabled');
    }

    forward() {
        $('#forward').attr('disabled', 'disabled');
        manager.next();
        setTimeout(function () {
            $('#forward').removeAttr('disabled');
        }, 350);

    }

    backward() {
        $('#backward').attr('disabled', 'disabled');
        manager.previous();
        setTimeout(function () {
            $('#backward').removeAttr('disabled');
        }, 350);

    }

    slow() {
        manager.slow();
    }

    medium() {
        manager.medium();
    }

    fast() {
        manager.fast();
    }

}

var viewer: view = new view();