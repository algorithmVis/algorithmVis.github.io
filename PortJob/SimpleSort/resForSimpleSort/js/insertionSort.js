/**
 * File created by Øyvind Skeie Liland 01.02.18.
 */
///<reference path="controller.ts"/>
//private IntArrayGenerator gen = new IntArrayGenerator();
var array = [];
/**
 * Start insertionSort
 */
function startInsertionSort() {
    //controller.setHeaderText("Insertion Sort");
    //hideK();
    var j; // Elements sorted, starting on second position
    var key; // Current element
    var i; // Index moving backwards with key
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
}
function setArray(array) {
    this.array = array;
}
function getArray() {
    return array;
}
/**
 * Fill the array with random integers
 */
function setRandomArray() {
    for (var i = 0; i < array.length; i++)
        array[i] = randomInt(0, 100);
    //controller.setArrayInFrontend(array);
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
