/**
 * File created bu Philip Hoang 12.02.18
 */
///<reference path="eventManager.ts"/>
///<reference path="view.ts"/>
///<reference path="initArray.ts"/>
var sortArray = [];
var copyArray = [];
var n = 10;
var running = true;
function checkIfAlreadyRunning() {
    if (running) {
        manager.clear();
        viewer.pause();
    }
    else {
        running = true;
    }
}
function startMergeSort() {
    checkIfAlreadyRunning();
    copyArray = returnArray();
    mergesort(returnArray());
}
function mergesort(array) {
    if (array.length < 2) {
        //viewer.deselectPivotElement(sortArray.indexOf(array[0]));
        //viewer.liftElements(copyArray.indexOf(array[0]), copyArray.indexOf(array[0]));
        return array;
    }
    else {
        var mid = void 0;
        var left = void 0;
        var right = void 0;
        mid = Math.floor(array.length * 0.5);
        viewer.setPivotElement(copyArray.indexOf(array[mid - 1]));
        left = array.slice(0, mid);
        viewer.lowerElements(copyArray.indexOf(left[0]), copyArray.indexOf(left[left.length - 1]));
        right = array.slice(mid);
        viewer.lowerElements(copyArray.indexOf(right[0]), copyArray.indexOf(right[right.length - 1]));
        //Split until there is only 1 element left
        return merge(mergesort(left), mergesort(right));
    }
}
function merge(left, right) {
    console.log("array " + copyArray + " left " + left + "right " + right);
    var result = [];
    var tempLeftIndex = 0;
    var tempRightIndex = 0;
    var start = copyArray.indexOf(left[0]);
    var end = copyArray.indexOf(right[right.length - 1]);
    var counter = start;
    var testing = copyArray.slice(0);
    while (tempLeftIndex < left.length && tempRightIndex < right.length) {
        //Compare the elements from each array
        //viewer.highLightNode(tempLeftIndex)
        //viewer.highLightNode(tempRightIndex)
        if (left[tempLeftIndex] < right[tempRightIndex]) {
            console.log("LEFT of : " + copyArray.indexOf(left[tempLeftIndex]) + " end " + end + " to place " + counter);
            viewer.liftElements(copyArray.indexOf(left[tempLeftIndex]), copyArray.indexOf(left[tempLeftIndex]));
            viewer.moveElementToPlace(copyArray.indexOf(left[tempLeftIndex]), end, counter, false);
            result.push(left[tempLeftIndex]);
            testing[counter] = left[tempLeftIndex];
            counter++;
            tempLeftIndex++;
        }
        else {
            console.log("RIGHT  of : " + copyArray.indexOf(right[tempRightIndex]) + " end " + end + " to place " + counter);
            viewer.liftElements(copyArray.indexOf(right[tempRightIndex]), copyArray.indexOf(right[tempRightIndex]));
            viewer.moveElementToPlace(copyArray.indexOf(right[tempRightIndex]), end, counter, false);
            result.push(right[tempRightIndex]);
            testing[counter] = right[tempRightIndex];
            counter++;
            tempRightIndex++;
        }
    }
    if (right.slice(tempRightIndex).length > 0) {
        var moreRight = right.slice(tempRightIndex);
        console.log("MoRe right " + moreRight);
        for (var i = 0; i < moreRight.length; i++) {
            testing[counter] = moreRight[i];
            viewer.liftElements(testing.indexOf(moreRight[i]), testing.indexOf(moreRight[i]));
            viewer.deselectPivotElement(copyArray.indexOf(moreRight[i]));
            counter++;
        }
    }
    if (left.slice(tempLeftIndex).length > 0) {
        var moreLeft = left.slice(tempLeftIndex);
        console.log("MoRe left " + moreLeft);
        for (var i = 0; i < moreLeft.length; i++) {
            testing[counter] = moreLeft[i];
            viewer.liftElements(testing.indexOf(moreLeft[i]), testing.indexOf(moreLeft[i]));
            viewer.deselectPivotElement(copyArray.indexOf(moreLeft[i]));
            counter++;
        }
    }
    console.log("------------------------");
    console.log(copyArray);
    console.log(testing);
    console.log("------------------------");
    copyArray = testing.slice(0);
    return result.concat(left.slice(tempLeftIndex)).concat(right.slice(tempRightIndex));
}
function delay() {
    try {
        setTimeout(0);
    }
    catch (e) {
        e.printStackTrace();
    }
}
function getThisArray() {
    return sortArray;
}
function setRandomMyArray() {
    for (var i = 0; i < n; i++) {
        sortArray[i] = randomInt(0, 100);
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
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
