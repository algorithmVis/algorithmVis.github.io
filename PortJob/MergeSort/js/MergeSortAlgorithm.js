/**
 * File created bu Philip Hoang 12.02.18
 */
///<reference path="eventManager.ts"/>
///<reference path="view.ts"/>
var sortArray = [];
var copyArray = [];
var n = 10;
var running = true;
function checkIfAlreadyRunning() {
    if (running) {
        manager.clear();
        var arry = setRandomArray();
        console.log(arry);
        setArray(viewer.serializeArray(arry));
        viewer.pause();
    }
    else {
        running = true;
    }
}
function startMergeSort() {
    checkIfAlreadyRunning();
    mergesort(sortArray);
}
function mergesort(array) {
    if (array.length === 1) {
        viewer.deselectPivotElement(array[0]);
        return array;
    }
    else {
        var mid = void 0;
        var left = void 0;
        var right = void 0;
        mid = Math.floor(array.length * 0.5);
        viewer.setPivotElement(mid);
        left = array.slice(0, mid);
        viewer.lowerElements(0, mid);
        right = array.slice(mid);
        viewer.lowerElements(mid, array.length);
        viewer.deselectPivotElement(mid);
        //Split until there is only 1 element left
        return merge(mergesort(left), mergesort(right));
    }
}
function merge(left, right) {
    //liftElements here
    var result = [];
    var indexLeft = 0;
    var indexRight = 0;
    while (indexLeft < left.length && indexRight < right.length) {
        //Compare the elements from each array
        if (left[indexLeft] < right[indexRight]) {
            console.log("left < right" + left[indexLeft] + " " + right[indexRight]);
            result.push(left[indexLeft]);
            viewer.deselectPivotElement(indexLeft);
            viewer.liftElements(indexLeft, indexLeft);
            indexLeft++;
        }
        else {
            result.push(right[indexRight]);
            viewer.liftElements(indexLeft, indexLeft);
            viewer.deselectPivotElement(indexRight);
            indexRight++;
        }
    }
    /**
    while(indexLeft < left.length) {
        result.push(left[indexLeft]);
        viewer.liftElements(left.indexOf(0), indexLeft);
        viewer.deselectPivotElement(indexLeft);

        indexLeft++;
    }

    while(indexRight < right.length) {
        result.push(right[indexRight]);

        viewer.liftElements(right.lastIndexOf(0), indexRight);
        viewer.deselectPivotElement(indexLeft);

        indexRight++;
    }
     */
    //console.log(result.concat(left.slice(indexLeft)).concat(right.slice(indexRight)));
    return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
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
function setRandomArray() {
    for (var i = 0; i < n; i++) {
        sortArray[i] = randomInt(0, 100);
    }
    return sortArray;
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
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
