/**
 * File created by Philip Hoang 12.02.18
 * File designed and written by Kenneth Apeland
 */

///<reference path="EventManager.ts"/>
// /<reference path="View.ts"/>
///<reference path="InitArray.ts"/>
let n: number = 10;

let sortArray: number[] = [];
let copyArray: number[] = [];
let running = true;

function checkIfAlreadyRunning() {
    manager.clear();
    control.setPause();
}

function startMergeSort() {
    checkIfAlreadyRunning();

    copyArray = returnArray();
    mergesort(copyArray);
    control.setColorInArrayElements(copyArray, 3, true);
}

function mergesort(array: number[]): any {
    if (array.length < 2) {
        //denne er ekkel
        control.deselectPivotElement(array[0]);
        return array;

    } else {

        let mid: number;
        let left: number[];
        let right: number[];

        mid = Math.floor(array.length * 0.5);
        left = array.slice(0, mid);
        right = array.slice(mid);

        //denne og er ekkel
        control.setPivotElement(right[0]);

        control.setColorInArrayElements(left, 1, true);
        control.setColorInArrayElements(right, 2, true);

        control.lowerElements(left);
        control.lowerElements(right);

        control.setColorInArrayElements(array, 1, false);

        //Split until there is only 1 element left
        return merge(mergesort(left), mergesort(right));
    }
}

function merge(left: number[], right: number[]) {
    let result: number[] = [];
    let testing: number[] = copyArray.slice(0);

    let tempLeftIndex: number = 0;
    let tempRightIndex: number = 0;
    let counter: number = copyArray.indexOf(left[0]);

    while (tempLeftIndex < left.length && tempRightIndex < right.length) {
        //Compare the elements from each array
        control.setColorInArrayElement(left[tempLeftIndex], 0, true);
        control.setColorInArrayElement(right[tempRightIndex], 0, true);

        if (left[tempLeftIndex] < right[tempRightIndex]) {
            control.setColorInArrayElement(left[tempLeftIndex], 3, true);
            control.moveElementToPlace(left[tempLeftIndex], counter, copyArray.indexOf(left[tempLeftIndex]));

            result.push(left[tempLeftIndex]);
            testing[counter] = left[tempLeftIndex];

            counter++;
            tempLeftIndex++;

        } else {
            control.setColorInArrayElement(right[tempRightIndex], 3, true);
            control.moveElementToPlace(right[tempRightIndex], counter, copyArray.indexOf(right[tempRightIndex]));

            result.push(right[tempRightIndex]);
            testing[counter] = right[tempRightIndex];

            counter++;
            tempRightIndex++;
        }
    }

    if (right.slice(tempRightIndex).length > 0) {
        let moreRight = right.slice(tempRightIndex);
        control.setColorInArrayElements(moreRight, 3, true);
        for (let i = 0; i < moreRight.length; i++) {
            control.moveElementToPlace(moreRight[i], counter, copyArray.indexOf(moreRight[i]));

            testing[counter] = moreRight[i];
            counter++;
        }
    }
    if (left.slice(tempLeftIndex).length > 0) {
        let moreLeft = left.slice(tempLeftIndex);
        control.setColorInArrayElements(moreLeft, 3, true);
        for (let i = 0; i < moreLeft.length; i++) {
            control.moveElementToPlace(moreLeft[i], counter, copyArray.indexOf(moreLeft[i]));

            testing[counter] = moreLeft[i];
            counter++;
        }
    }
    copyArray = testing.slice(0);
    control.setColorInArrayElements(testing, 3, false);
    return result.concat(left.slice(tempLeftIndex)).concat(right.slice(tempRightIndex));
}

function setRandomMyArray() {
    for (let i: number = 0; i < n; i++) {
        sortArray[i] = randomInt(0, 99);
    }
    return sortArray;
}

function setSortedArray() {
    let arr: number[] = setRandomMyArray();
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


function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}