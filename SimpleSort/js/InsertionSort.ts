/**
 * File created by Øyvind Skeie Liland 01.02.18.
 */

///<reference path="Controller.ts"/>
///<reference path="EventManager.ts"/>
///<reference path="fillWithListElements.ts"/>

//private IntArrayGenerator gen = new IntArrayGenerator();
let array: number[] = [];
const n = 10;

/**
 * Check if an algorithm is already running - if that is the case reset the view
 */
function checkIfAlreadyRunning() {

    let arr = setRandomArray();
    setArray(viewer.serializeArray(arr));
    manager.clear();
    viewer.setPause();
}

/**
 * Start insertionSort
 */
function startInsertionSort() {
    checkIfAlreadyRunning();
    viewer.setPause();
    control.hideK();
    control.setHeadText("Insertion Sort");
    let j: number; // Elements sorted, starting on second position
    let key: number; // Current element
    let i: number; // Index moving backwards with key
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
    checkIfAlreadyRunning();
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
            for (i = j - k; i >= 0 && Number(array[i]) > Number(key); i = i - k) {
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
        k = Math.floor(k / 2);
        control.setKValue(k);
    }
    control.hideK();
    manager.start()
}

/**
 * Fill the array with random integers
 */
function setRandomArray() {
    for (let i: number = 0; i < n; i++)
        array[i] = randomInt(0, 100);
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

function setAlmostSortedArray(): number[] {
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
function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
