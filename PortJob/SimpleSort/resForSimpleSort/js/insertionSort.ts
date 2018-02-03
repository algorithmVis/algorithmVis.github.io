/**
 * File created by Øyvind Skeie Liland 01.02.18.
 */
import NumberFormat = Intl.NumberFormat;

///<reference path="controller.ts"/>

//private IntArrayGenerator gen = new IntArrayGenerator();
var array: number[] = [];
const n = 10;

/**
 * Start insertionSort
 */
function startInsertionSort() {
    control.setHeadText("Insertion Sort");
    //hideK();
    var j: number; // Elements sorted, starting on second position
    var key: number; // Current element
    var i: number; // Index moving backwards with key
    console.log(array.toString());
    for (j = 1; j < array.length; j++) {
        control.setJElement(j, true);
        control.setElementBeingComparedTo(j - 1, true);
        key = array[j];
        control.storePermValue(j);
        for (i = j - 1; i >= 0 && Number(array[i]) > Number(key); i--) {
            control.setElementBeingComparedTo(i, true);
            control.moveArrayElementToIndex(i, i + 1);
            array[i + 1] = array[i];
            control.setElementBeingComparedTo(i + 1, false);
        }
        control.moveArrayElementToIndexFromSpecifiedJIndex(i + 1, i + 1, j);
        array[i + 1] = key; // i+1 because for i will decrease one extra in the for loop
        control.releasePermValue(i + 1);
        control.setJElement(i + 1, false);
        control.setElementBeingComparedTo(j - 1, false);
    }
    manager.start();
}

function startShellSort() {
    control.setHeadText("Shell Sort");

    // Setup K
    let k: number = (Math.floor(array.length / 2)); // Gap
    control.setKValue(k);
    control.setKLeftAndRight(0, k);
    control.unhideK();

    while (k != 0) {
        for (let j: number = k; j < array.length; j++) {
            control.setKLeftAndRight(j - k, j);
            control.setJElement(j, true);
            control.setElementBeingComparedTo(j - k, true);

            let key: number = array[j];
            control.storePermValue(j);

            let
                i: number;
            for (i = j - k; i >= 0 && array[i] > key; i = i - k) {
                control.setKLeftAndRight(i, i + k);
                control.setElementBeingComparedTo(i, true);
                array[i + k] = array[i];
                control.switchArrayElements(i + k, i);
                control.setElementBeingComparedTo(i + k, false);
            }
            array[i + k] = key;
            control.releasePermValue(i + k);
            control.setElementBeingComparedTo(j - k, false);
            control.setJElement(i + k, false);

        }
        k =
            Math.floor(k / 2);
        control.setKValue(k);
    }
    control.hideK();
    manager.start()
}

function delay() {
    try {
        setTimeout(0);
    } catch (e
        ) {
        e.printStackTrace();
    }
}

function setArray(array: number[]) {
    this.array = array;
}

function getArray() {
    return array;
}

/**
 * Fill the array with random integers
 */
function setRandomArray() {
    manager.clear();
    for (let i: number = 0; i < n; i++)
        array[i] = randomInt(0, 100);
    //controller.setArrayInFrontend(array);
    return array;
}

function setSortedArray() {
    let arr: number[] = setRandomArray();
    return arr.sort((n1, n2) => n1 - n2);
}

function setInvSortedArray() {
    return setSortedArray().reverse();
}

function isSorted(arr: number[]) {
    return arr.forEach((n1, n2) => n1 <= n2);
}

function setAlmostSortedArray() {
    let arr: number[] = setSortedArray();
    for (let i: number = 1; i < arr.length - 1; i++) {
        if (Math.random() < 0.70) {
            if (Math.random() < 0.5) {
                let temp: number = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
            } else {
                let temp: number = arr[i];
                arr[i] = arr[i - 1];
                arr[i - 1] = temp;
            }
        }
    }


    //If sorted array, try again.
    if (isSorted(arr)) {
        return setAlmostSortedArray();
    }

    return arr;
}

/**
 * generate a random integer between min and max
 * @param {Number} min
 * @param {Number} max
 * @return {Number} random generated integer
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
