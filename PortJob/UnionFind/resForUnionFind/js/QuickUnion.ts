/**
 * File created by Kenneth Apeland 03.02.18.
 * based on QuickUnion.java
 */
///<reference path="controller.ts"/>

const DELAY_TIME : number = 100;
let arr : number[];
let pause: boolean;
let name : string = "Quick Union";

    // noinspection JSAnnotator
function constructor(size : number) {
    arr =  new Array(size);
    for (let i = 0; i < size; i++) {
        arr[i] = i;
    }
}

function union(aIndex : number, bIndex : number) {
    let aRoot = simpleFind(aIndex,"green");
    let bRoot = simpleFind(bIndex, "green");
    //SaveState i controller??

    if (aRoot != bRoot) {
        removeHighlight(aRoot);
        control.connectedNodes(aRoot, bRoot);
        control.setValueAtIndex(aRoot, bRoot);
        arr[aRoot] = bRoot;
    }
    delay(getDelayTime() * 2);

    removeHighlighting(aRoot);
    removeHighlighting(bRoot);
    control.setSelectedIndex(aIndex, false);
    control.setSelectedIndex(bIndex, false);
}

function connected(aIndex : number, bIndex : number) {
    let aRoot = simpleFind(aIndex,"orange");
    let bRoot = simpleFind(bIndex, "orange");
    let connected : boolean = (aRoot == bRoot);
    
    if (connected) {
        control.highlightNode(aRoot, "green");
        control.checkMark(aIndex, bIndex, true);
    } else {
        control.redCross(aIndex, bIndex, true);
    }

    removeHighlighting(aRoot);
    removeHighlighting(bRoot);

    control.checkMark(aIndex, bIndex, false);
    control.redCross(aIndex, bIndex, false);
    control.setSelectedIndex(aIndex, false);
    control.setSelectedIndex(bIndex, false);
    return connected;
}

function find(pIndex : number) {
    let root : number = simpleFind(pIndex, "green");
    delay(getDelayTime());
    removeHighlighting(root);
    control.setSelectedIndex(pIndex, false);

    return root;
}

function simpleFind(index : number, color : string) {
    let root : number = index;
    removeHighlighting(root);

    while (root != arr[root]) {
        highlightSingleNode(root, "orange");
        delay(getDelayTime());
        removeHighlighting(root);
        root = arr[root];
    }
    highlightSingleNode(root, color);
    return root;
}

function removeHighlighting(node : number) {
    control.removeHighlight(node);
}

function getRoot(index : number) {
    let root : number = index;

    while (root != arr[root]){
        root = arr[root];
    }
    return root;
}

function getArray() {
    return arr;
}

function getName() {
    return name;
}

function invertPause() {
    pause = !pause;
}

function setArray(array : number[]) {
    arr = array;
}

function connectedNoGUIUpdate(a : number, b : number) {
    return getRoot(a) == getRoot(b);
}

function highlightSingleNode(node: number, color: string) {
    control.highlightNode(node, color);
}

function delay(delayTime) {
    let start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > delayTime){
            break;
        }
    }
}

function getDelayTime() {
    return DELAY_TIME + control.getSpeed()*50;
}
