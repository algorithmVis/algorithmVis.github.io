/**
 * File created bu Philip Hoang 12.02.18
 */

///<reference path="eventManager.ts"/>
///<reference path="view.ts"/>

let sortArray: number[] = [];
let copyArray: number[] = [];
const n = 10;
let running = true;
let mid: number = 0;
let left: number[];
let right: number[];

function checkIfAlreadyRunning(){
    if (running) {
        manager.clear();
        setArray(viewer.serializeArray(setRandomArray()));
    }
    else {
        running = true;
    }
}

function startMergeSort() {
    checkIfAlreadyRunning();

    mergesort(sortArray);
}

function mergesort(array: number[]) {
    if (array.length < 2) {
        viewer.deselectPivotElement(array[0]);
        return array;
    } else {

        mid = Math.floor(array.length *0.5);
        viewer.setPivotElement(mid);


        left = array.slice(0, mid);
        viewer.lowerElements(0, mid);

        right = array.slice(mid);
        viewer.lowerElements(mid, array.length);

        //Split until there is only 1 element left

        return merge(mergesort(left), mergesort(right));
    }

}


function merge(left: number[], right: number[]) {
    //liftElements here

    let result: number[] = [];
    let indexLeft = 0;
    let indexRight = 0;

    while(indexLeft < left.length && indexRight < right.length) {

        //Compare the elements from each array
        if(left[indexLeft] < right[indexRight]) {
            result.push(left[indexLeft]);

            viewer.deselectPivotElement(indexLeft);
            viewer.liftElements(indexLeft, indexLeft);

            indexLeft++;

        } else {

            result.push(right[indexRight]);
            viewer.liftElements(indexLeft, indexLeft);
            viewer.deselectPivotElement(indexRight);

            indexRight++;

        }
    }

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

    return result;
}


function delay() {
    try {
        setTimeout(0);
    } catch (e) {
        e.printStackTrace();
    }
}


function getThisArray() {
    return sortArray;
}

function setRandomArray() {
    for (let i: number = 0; i < n; i++) {
        sortArray[i] = randomInt(0, 100);
    }

    return sortArray;
}

function setSortedArray(){
    let arr: number[] = setRandomArray();
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