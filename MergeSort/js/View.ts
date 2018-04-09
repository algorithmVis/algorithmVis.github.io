///<reference path="MergeSortAlgorithm.ts"/>
///<reference path="Methods.ts"/>

/**
 * File created by Philip Hoang 12.2.18
 * File written by Kenneth Apeland
 */

declare var $;
let colorInArray: number[] = [];
let myArray: number[];

class view {

    paused: boolean = false;
    animSpeed: number = 500;

    serializeArray(array: number[]) {
        let returnString: string = "";
        myArray = array;
        for (let i = 0; i < array.length; i++) {
            colorInArray[i] = 4;
            returnString = returnString.concat(array[i] + "|");
        }
        return returnString.substring(0, returnString.length - 1);
    }

    lowerElements(elems: number[]) {
        let forwardSteps = function (elems) {
            return function () {
                lowerElements(elems);
            }
        }(elems);

        let backwardSteps = function (elems) {
            return function () {
                liftElements(elems);
            }
        }(elems);

        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    }

    setPivotElement(index: number) {
        let forwardSteps = function (index) {
            return function () {
                selectPivotElement(index);
            }
        }(index);

        let backwardSteps = function (index) {
            return function () {
                deselectPivotElement(index);
            }
        }(index);

        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    }

    deselectPivotElement(index: number) {
        let forwardSteps = function (index) {
            return function () {
                deselectPivotElement(index);
            }
        }(index);

        let backwardSteps = function (index) {
            return function () {
                selectPivotElement(index);
            }
        }(index);

        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    }

    moveElementToPlace(element: number, px: number, back: number) {
        let forwardSteps = function (element, px) {
            return function () {
                moveElementToPlace(element, px);
            }
        }(element, px);

        let backwardSteps = function (element, back) {
            return function () {
                moveElementBackToPlace(element, back);
            }
        }(element, back);

        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    }

    moveElementsToPlace(element: number[], px: number[], back: number[]) {
        let forwardSteps = function (element, px) {
            return function () {
                moveElementsToPlace(element, px);
            }
        }(element, px);

        let backwardSteps = function (element, back) {
            return function () {
                moveElementsBackToPlace(element, back);
            }
        }(element, back);

        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    }

    setColorInArrayElement(index: number, color: number) {
        let forwardSteps = function (index, color) {
            return function () {
                setColor(index, color);
            }
        }(index, color);

        let oldColor = colorInArray[myArray.indexOf(index)];
        let backwardSteps = function (index, oldColor) {
            return function () {
                setColor(index, oldColor);
            }
        }(index, oldColor);

        colorInArray[myArray.indexOf(index)] = color;
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    }

    setColorInArrayElements(index: number[], color: number) {
        let colorList: number[] = [];
        for (let i = 0; i < index.length; i++) {
            colorList[i] = color;
        }

        let forwardSteps = function (index, colorList) {
            return function () {
                setColors(index, colorList);
            }
        }(index, colorList);

        let oldColor: number[] = [];
        for (let i = 0; i < index.length; i++) {
            oldColor[i] = colorInArray[myArray.indexOf(index[i])];
        }

        let backwardSteps = function (index, oldColor) {
            return function () {
                setColors(index, oldColor);
            }
        }(index, oldColor);

        for (let i = 0; i < index.length; i++) {
            colorInArray[myArray.indexOf(index[i])] = color;
        }
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
        manager.next();
    }

    backward() {
        manager.previous();
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

//Craete a global variable
let viewer: view = new view();