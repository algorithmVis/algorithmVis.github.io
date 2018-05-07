/**
 * File created by Philip Hoang 12.02.18
 * File designed and written by Kenneth Apeland
 */
///<reference path="EventManager.ts"/>
// /<reference path="View.ts"/>
///<reference path="InitArray.ts"/>
var n = 10;
var sortArray = [];
var copyArray = [];
var pivotElements = [];
var pivCount = 0;
var running = true;
function checkIfAlreadyRunning() {
    manager.clear();
    control.setPause();
}
function startMergeSort() {
    checkIfAlreadyRunning();
    copyArray = returnArray();
    mergesort(copyArray);
}
function mergesort(array) {
    if (array.length < 2) {
        pivotHelper(array[0]);
        return array;
    }
    else {
        var mid = void 0;
        var left = void 0;
        var right = void 0;
        mid = Math.floor(array.length * 0.5);
        left = array.slice(0, mid);
        right = array.slice(mid);
        control.setPivotElement(right[0]);
        pivotElements[pivCount] = right[0];
        pivCount++;
        control.setColorInMultipleArrays(left, 1, right, 2);
        control.lowerElements(left);
        control.lowerElements(right);
        control.setColorInMultipleArrays(left, 4, right, 4);
        //Split until there is only 1 element left
        return merge(mergesort(left), mergesort(right));
    }
}
function merge(left, right) {
    var result = [];
    var testing = copyArray.slice(0);
    var workingNumbers = left.concat(right);
    control.setPivotElement(right[0]);
    pivotElements[pivCount] = right[0];
    pivCount++;
    var tempLeftIndex = 0;
    var tempRightIndex = 0;
    var counter = copyArray.indexOf(left[0]);
    var leftAlreadyColored = false;
    while (tempLeftIndex < left.length && tempRightIndex < right.length) {
        //Compare the elements from each array
        if (!leftAlreadyColored) {
            control.setColorInArrayElement(left[tempLeftIndex], 0);
            leftAlreadyColored = true;
        }
        control.setColorInArrayElement(right[tempRightIndex], 0);
        if (left[tempLeftIndex] < right[tempRightIndex]) {
            control.setColorInArrayElement(left[tempLeftIndex], 3);
            control.moveElementToPlace(left[tempLeftIndex], counter, copyArray.indexOf(left[tempLeftIndex]));
            result.push(left[tempLeftIndex]);
            testing[counter] = left[tempLeftIndex];
            leftAlreadyColored = false;
            counter++;
            tempLeftIndex++;
        }
        else {
            pivotHelper(right[0]);
            control.setColorInArrayElement(right[tempRightIndex], 3);
            control.moveElementToPlace(right[tempRightIndex], counter, copyArray.indexOf(right[tempRightIndex]));
            result.push(right[tempRightIndex]);
            testing[counter] = right[tempRightIndex];
            counter++;
            tempRightIndex++;
        }
    }
    if (left.slice(tempLeftIndex).length > 0) {
        var moreLeft = left.slice(tempLeftIndex);
        control.setColorInArrayElements(moreLeft, 3);
        var elems = [];
        var count = [];
        var back = [];
        for (var i = 0; i < moreLeft.length; i++) {
            elems[i] = moreLeft[i];
            count[i] = counter;
            back[i] = copyArray.indexOf(moreLeft[i]);
            testing[counter] = moreLeft[i];
            counter++;
        }
        control.moveElementsToPlace(elems, count, back);
    }
    if (right.slice(tempRightIndex).length > 0) {
        pivotHelper(right[0]);
        var moreRight = right.slice(tempRightIndex);
        control.setColorInArrayElements(moreRight, 3);
        var elems = [];
        var count = [];
        var back = [];
        for (var i = 0; i < moreRight.length; i++) {
            elems[i] = moreRight[i];
            count[i] = counter;
            back[i] = copyArray.indexOf(moreRight[i]);
            testing[counter] = moreRight[i];
            counter++;
        }
        control.moveElementsToPlace(elems, count, back);
    }
    copyArray = testing.slice(0);
    control.setColorInArrayElements(workingNumbers, 4);
    return result.concat(left.slice(tempLeftIndex)).concat(right.slice(tempRightIndex));
}
function pivotHelper(number) {
    for (var i = 0; i < pivotElements.length; i++) {
        if (pivotElements[i] == number) {
            pivotElements = pivotElements.filter(function (item) {
                return item !== number;
            });
            pivCount--;
            control.deselectPivotElement(number);
        }
    }
}
function setRandomMyArray() {
    for (var i = 0; i < n; i++) {
        sortArray[i] = randomInt(0, 99);
    }
    return sortArray;
}
function setSortedArray() {
    var arr = setRandomMyArray();
    return arr.sort(function (n1, n2) { return n1 - n2; });
}
function setInvSortedArray() {
    return setSortedArray().reverse();
}
function isSorted(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }
    return true;
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
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
