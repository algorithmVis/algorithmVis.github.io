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
let pivotElements: number[] = [];
let pivCount: number = 0;
let running = true;

function checkIfAlreadyRunning() {
    manager.clear();
    control.setPause();
}

function startMergeSort() {
    checkIfAlreadyRunning();

    copyArray = returnArray();
    mergesort(copyArray);
}

function mergesort(array: number[]): any {
    if (array.length < 2) {
        pivotHelper(array[0]);
        return array;

    } else {
        let mid: number;
        let left: number[];
        let right: number[];

        mid = Math.floor(array.length * 0.5);
        left = array.slice(0, mid);
        right = array.slice(mid);

        control.setPivotElement(right[0]);
        pivotElements[pivCount] = right[0];
        pivCount++;

        control.setColorInArrayElements(left, 1);
        control.setColorInArrayElements(right, 2);

        control.lowerElements(left);
        control.lowerElements(right);

        control.setColorInArrayElements(left, 4);
        control.setColorInArrayElements(right, 4);

        //Split until there is only 1 element left
        return merge(mergesort(left), mergesort(right));
    }
}

function merge(left: number[], right: number[]) {
    let result: number[] = [];
    let testing: number[] = copyArray.slice(0);
    let workingNumbers: number[] = left.concat(right);

    control.setPivotElement(right[0]);
    pivotElements[pivCount] = right[0];
    pivCount++;

    let tempLeftIndex: number = 0;
    let tempRightIndex: number = 0;
    let counter: number = copyArray.indexOf(left[0]);
    let leftAlreadyColored: boolean = false;

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

        } else {
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
        let moreLeft = left.slice(tempLeftIndex);
        control.setColorInArrayElements(moreLeft, 3);
        let elems: number[] = [];
        let count: number[] = [];
        let back: number[] = [];

        for (let i = 0; i < moreLeft.length; i++) {
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
        let moreRight = right.slice(tempRightIndex);
        control.setColorInArrayElements(moreRight, 3);
        let elems: number[] = [];
        let count: number[] = [];
        let back: number[] = [];

        for (let i = 0; i < moreRight.length; i++) {
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

function pivotHelper(number: number) {
    for (let i = 0; i < pivotElements.length; i++) {
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