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
    mergesort(copyArray);
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
        //viewer.setPivotElement(copyArray.indexOf(array[mid - 1]));
        left = array.slice(0, mid);
        for (var i = 0; i < left.length; i++) {
            console.log("left " + left[i]);
            viewer.lowerElement(left[i]);
        }
        right = array.slice(mid);
        for (var i = 0; i < right.length; i++) {
            console.log("right " + right[i]);
            viewer.lowerElement(right[i]);
        }
        //Split until there is only 1 element left
        return merge(mergesort(left), mergesort(right));
    }
}
function merge(left, right) {
    console.log("array " + copyArray + " left " + left + "right " + right);
    var result = [];
    var tempLeftIndex = 0;
    var tempRightIndex = 0;
    var counter = copyArray.indexOf(left[0]);
    var testing = copyArray.slice(0);
    while (tempLeftIndex < left.length && tempRightIndex < right.length) {
        //Compare the elements from each array
        //viewer.highLightNode(tempLeftIndex)
        //viewer.highLightNode(tempRightIndex)
        if (left[tempLeftIndex] < right[tempRightIndex]) {
            console.log("LEFT of : " + left[tempLeftIndex] + " to place " + counter * 85);
            //viewer.liftElement(left[tempLeftIndex]);
            viewer.moveElementToPlace(left[tempLeftIndex], counter * 85);
            result.push(left[tempLeftIndex]);
            testing[counter] = left[tempLeftIndex];
            counter++;
            tempLeftIndex++;
        }
        else {
            console.log("RIGHT  of : " + right[tempRightIndex] + " to place " + counter * 85);
            //viewer.liftElement(right[tempRightIndex]);
            viewer.moveElementToPlace(right[tempRightIndex], counter * 85);
            result.push(right[tempRightIndex]);
            testing[counter] = right[tempRightIndex];
            counter++;
            tempRightIndex++;
        }
    }
    if (right.slice(tempRightIndex).length > 0) {
        var moreRight = right.slice(tempRightIndex);
        for (var i = 0; i < moreRight.length; i++) {
            console.log("MoRe right " + moreRight[i] + " to place " + counter * 85);
            testing[counter] = moreRight[i];
            viewer.moveElementToPlace(moreRight[i], counter * 85);
            //viewer.liftElement(moreRight[i]);
            viewer.deselectPivotElement(moreRight[i]);
            counter++;
        }
    }
    if (left.slice(tempLeftIndex).length > 0) {
        var moreLeft = left.slice(tempLeftIndex);
        for (var i = 0; i < moreLeft.length; i++) {
            console.log("MoRe right " + moreLeft[i] + " to place " + counter * 85);
            testing[counter] = moreLeft[i];
            viewer.moveElementToPlace(moreLeft[i], counter * 85);
            //viewer.liftElement(moreLeft[i]);
            viewer.deselectPivotElement(moreLeft[i]);
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
