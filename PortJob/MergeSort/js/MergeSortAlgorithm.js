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
    console.log("MERGE her med " + left + " : " + right);
    var result = [];
    var indexLeft = 0;
    var indexRight = 0;
    while (indexLeft < left.length && indexRight < right.length) {
        //Compare the elements from each array
        if (left[indexLeft] < right[indexRight]) {
            console.log("merge " + left[indexLeft] + " mindre enn " + right[indexRight]);
            result.push(left[indexLeft]);
            viewer.liftElements(copyArray.indexOf(left[indexLeft]), copyArray.indexOf(left[indexLeft]));
            indexLeft++;
        }
        else {
            console.log("------------");
            console.log("merge (L>R) " + left[indexLeft] + " større enn " + right[indexRight]);
            console.log("SWAP " + copyArray.indexOf(left[indexLeft]), copyArray.indexOf(right[indexRight]));
            console.log(copyArray);
            result.push(right[indexRight]);
            console.log("For Swap array " + copyArray[copyArray.indexOf(left[indexLeft])] + " " + copyArray[copyArray.indexOf(right[indexRight])]);
            viewer.swapElements(copyArray.indexOf(left[indexLeft]), copyArray.indexOf(right[indexRight]));
            swapInArray(copyArray.indexOf(left[indexLeft]), copyArray.indexOf(right[indexRight]));
            console.log("etter " + copyArray[copyArray.indexOf(left[indexLeft])] + " " + copyArray[copyArray.indexOf(right[indexRight])]);
            console.log("etter viewer swap " + copyArray[copyArray.indexOf(left[indexLeft])] + " " + copyArray[copyArray.indexOf(right[indexRight])]);
            viewer.liftElements(copyArray.indexOf(left[indexLeft]), copyArray.indexOf(left[indexLeft]));
            viewer.liftElements(copyArray.indexOf(right[indexRight]), copyArray.indexOf(right[indexRight]));
            indexRight++;
        }
    }
    if (right.length > 0) {
        console.log("right slice = " + right.slice(indexRight));
        for (var i = 0; i < right.slice(indexRight).length; i++) {
            viewer.liftElements(copyArray.indexOf(right.slice(indexRight)[i]), copyArray.indexOf(right.slice(indexRight)[i]));
            viewer.deselectPivotElement(copyArray.indexOf(right.slice(indexRight)[i]));
        }
    }
    if (left.length > 0) {
        console.log("left slice = " + left.slice(indexLeft));
        for (var i = 0; i < left.slice(indexLeft).length; i++) {
            viewer.liftElements(copyArray.indexOf(left.slice(indexLeft)[i]), copyArray.indexOf(left.slice(indexLeft)[i]));
            viewer.deselectPivotElement(copyArray.indexOf(left.slice(indexLeft)[i]));
        }
    }
    console.log(copyArray + "right slice = " + right.slice(indexRight) + "left slice = " + left.slice(indexLeft));
    console.log("result : " + result.concat(left.slice(indexLeft)).concat(right.slice(indexRight)));
    return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
}
function swapInArray(a, b) {
    var tempVal = copyArray[a];
    copyArray[a] = copyArray[b];
    copyArray[b] = tempVal;
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
