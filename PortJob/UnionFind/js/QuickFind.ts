/**
 * File created by Philip Hoang 06.2.18
 * based on QuickFind.Java
 */
///<reference path="controller.ts"/>

const DELAY : number = 100;
let arr : number[];
let pause : boolean;
let name : string = "Quick Find";

    // noninspection JSAnnotator
function constructor(size : number) {
    arr = new Array(size);
    for (let i = 0; i < size; i++) {
        arr[i] = i;
    }

    pause = false;
}

function union(aIndex : number, bIndex : number) {
    let aRoot : number = arr[aIndex];
    let bRoot : number = arr[bIndex];

    if (aRoot == bRoot) {
        delay(getDelayTime());
        control.setSelectedIndex(aIndex, false);
        control.setSelectedIndex(bIndex, false);
        return;
    }

    control.saveState(arr);

    for (let i = 0; i < arr.length; i++) {

        while (pause) {
            delay(getDelayTime()*0.2);
        }

        control.setArrow(i);
        delay(getDelayTime()*0.5)
        if (arr[i] == aRoot) {
            control.setValueAtIndex(i, bRoot);
            control.connectNodes(i, bRoot);
            arr[i] = bRoot;
            delay(getDelayTime()*0.5)
        }
    }

    control.setArrow(-1);
    control.setSelectedIndex(bIndex, false);
    control.setSelectedIndex(aIndex, false);
}

function connected(aIndex : number, bIndex : number) {
    let connected : boolean = simpleFind(aIndex, "orange") == simpleFind(bIndex, "orange");

    if (connected) {
        control.highlightNode(arr[aIndex], "green");
        control.highlightNode(arr[bIndex], "green");
        control.checkMark(aIndex, bIndex, true);
    } else
        control.redCross(aIndex, bIndex, true);

    delay(getDelayTime()*2);
    removeHighlighFromRoot(aIndex);
    removeHighlighFromRoot(bIndex);
    control.checkMark(aIndex, bIndex, false);
    control.redCross(aIndex, bIndex, false);

    return connected
}

function getName() {
    return name;
}

function removeHighlighFromRoot(pIndex : number) {
    control.removeHighlight(arr[pIndex]);
}

function delay(delayTime : number) {
    let start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > delayTime)
            break;
    }
}

function find(pIndex : number) {
    let root = simpleFind(pIndex, "green");

    delay(getDelayTime());
    control.removeHighlight(root);
    control.setSelectedIndex(pIndex, false);

    return root;
}

function simpleFind(pIndex : number, color : string) {
    let root : number = arr[pIndex];

    if (pIndex != root) {
        control.highlightNode(pIndex, "orange");
        delay(getDelayTime());
        control.removeHighlight(pIndex);
    }

    control.highlightNode(root, color);

    return root;
}

function getArray() {
    return arr;
}

function setArray(array : number[]) {
    arr = array;
}

function isPause() {
    return pause;
}

function invertPause() {
    pause = !pause;
}

function connectedNoGUIUpdate(a : number, b : number) {
    return arr[a] == arr[b];
}

function getDelayTime() {
    return DELAY_TIME + control.getSpeed()*50;
}
