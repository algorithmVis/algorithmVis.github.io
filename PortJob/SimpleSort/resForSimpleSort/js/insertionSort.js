///<reference path="controller.ts"/>
//private IntArrayGenerator gen = new IntArrayGenerator();
var array = [];
/**
 * Start insertionSort
 */
function startInsertionSort() {
    //controller.setHeaderText("Insertion Sort");
    //controller.hideK();
    var j; // Elements sorted, starting on second position
    var key; // Current element
    var i; // Index moving backwards with key
    for (j = 1; j < array.length; j++) {
        setJElement(j, true);
        setElementBeingComparedTo(j - 1, true);
        key = array[j];
        storePermValue(j);
        for (i = j - 1; i >= 0 && array[i] > key; i--) {
            setElementBeingComparedTo(i, true);
            moveArrayElementToIndex(i, i + 1);
            array[i + 1] = array[i];
            setElementBeingComparedTo(i + 1, false);
        }
        moveArrayElementToIndexFromSpecifiedJIndex(i + 1, i + 1, j);
        array[i + 1] = key; // i+1 because for i will decrease one extra in the for loop
        releasePermValue(i + 1);
        setJElement(i + 1, false);
        setElementBeingComparedTo(j - 1, false);
    }
}
function setArray(array) {
    this.array = array;
}
function getArray() {
    return array;
}
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
