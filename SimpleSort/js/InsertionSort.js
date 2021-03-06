/**
 * File created by Øyvind Skeie Liland 01.02.18.
 */
///<reference path="Controller.ts"/>
///<reference path="EventManager.ts"/>
///<reference path="fillWithListElements.ts"/>
//private IntArrayGenerator gen = new IntArrayGenerator();
var array = [];
var savedArray;
var n = 10;
var algoIns = true;
/**
 * Check if an algorithm is already running - if that is the case reset the view
 */
function checkIfAlreadyRunning() {
    array = savedArray.slice();
    k.hide();
    $("#arrayUl li").css('background-color', '#FFFFFF');
    manager.clear();
    viewer.setPause();
}
/**
 * Start insertionSort
 */
function startInsertionSort() {
    checkIfAlreadyRunning();
    control.hideK();
    control.setHeadText("Insertion Sort");
    setArray(viewer.serializeArray(array));
    var j; // Elements sorted, starting on second position
    var key; // Current element
    var i; // Index moving backwards with key
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
}
function startShellSort() {
    checkIfAlreadyRunning();
    control.setHeadText("Shell Sort");
    setArray(viewer.serializeArray(array));
    // Setup K
    var k = (Math.floor(array.length / 2)); // Gap
    control.setKValue(k);
    control.setKLeftAndRight(0, k);
    control.unhideK();
    while (k != 0) {
        for (var j = k; j < array.length; j++) {
            control.setKLeftAndRight(j - k, j);
            control.setJElement(j, true);
            control.setElementBeingComparedTo(j - k, true);
            var key = array[j];
            control.storePermValue(j);
            var i = void 0;
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
}
/**
 * Fill the array with random integers
 */
function setRandomArray() {
    for (var i = 0; i < n; i++)
        array[i] = randomInt(0, 100);
    return array;
}
function setSortedArray() {
    var arr = setRandomArray();
    return arr.sort(function (n1, n2) { return n1 - n2; });
}
function setInvSortedArray() {
    return setSortedArray().reverse();
}
function isSorted(arr) {
    return arr.forEach(function (n1, n2) { return n1 <= n2; });
}
function setAlmostSortedArray() {
    var arr = setSortedArray();
    for (var i = 1; i < arr.length - 1; i++) {
        if (Math.random() < 0.70) {
            if (Math.random() < 0.5) {
                var temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
            }
            else {
                var temp = arr[i];
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
