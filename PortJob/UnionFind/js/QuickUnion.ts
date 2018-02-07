/**
 * File created by Kenneth Apeland 03.02.18.
 * based on QuickUnion.java
 */
///<reference path="controller.ts"/>

class QuickUnion implements IAlgorithm{
    DELAY_TIME: number = 100;
    arr: number[];
    pause: boolean;
    name: string = "Quick Union";

    // noinspection JSAnnotator

    /**
     * Initializes an array of given length with values equal to each index
     *
     * @param size
     */
    constructor(size: number) {
        arr = new Array(size);
        for (let i = 0; i < size; i++) {
            arr[i] = i;
        }
    }

    /**
     * Connects two components together. Make root of A point to root of B.
     *
     * @param aIndex
     * @param bIndex
     */
    union(aIndex: number, bIndex: number) {
        let aRoot = simpleFind(aIndex, "green");
        let bRoot = simpleFind(bIndex, "green");
        //SaveState i controller??

        if (aRoot != bRoot) {
            removeHighlight(aRoot);
            control.connectNodes(aRoot, bRoot);
            control.setValueAtIndex(aRoot, bRoot);
            arr[aRoot] = bRoot;
        }
        delay(getDelayTime() * 2);

        this.removeHighlighting(aRoot);
        this.removeHighlighting(bRoot);
        control.setSelectedIndex(aIndex, false);
        control.setSelectedIndex(bIndex, false);
    }

    /**
     * Checks if two indexes are in the same component
     * @return
     */
    connected(aIndex: number, bIndex: number) {
        let aRoot = simpleFind(aIndex, "orange");
        let bRoot = simpleFind(bIndex, "orange");
        let connected: boolean = (aRoot == bRoot);

        if (connected) {
            control.highlightNode(aRoot, "green");
            control.checkMark(aIndex, bIndex, true);
        } else {
            control.redCross(aIndex, bIndex, true);
        }

        this.removeHighlighting(aRoot);
        this.removeHighlighting(bRoot);

        control.checkMark(aIndex, bIndex, false);
        control.redCross(aIndex, bIndex, false);
        control.setSelectedIndex(aIndex, false);
        control.setSelectedIndex(bIndex, false);
        return connected;
    }

    /**
     * Finds the component (root) of given index
     *
     * @param pIndex
     * @return
     */
    find(pIndex: number) {
        let root: number = simpleFind(pIndex, "green");
        delay(getDelayTime());
        this.removeHighlighting(root);
        control.setSelectedIndex(pIndex, false);

        return root;
    }


    simpleFind(index: number, color: string) {
        let root: number = index;
        this.removeHighlighting(root);

        while (root != arr[root]) {
            this.highlightSingleNode(root, "orange");
            delay(getDelayTime());
            this.removeHighlighting(root);
            root = arr[root];
        }
        this.highlightSingleNode(root, color);
        return root;
    }


    removeHighlighting(node: number) {
        control.removeHighlight(node);
    }


    getRoot(index: number) {
        let root: number = index;

        while (root != arr[root]) {
            root = arr[root];
        }
        return root;
    }


    getArray() {
        return arr;
    }


    getName() {
        return name;
    }


    invertPause() {
        pause = !pause;
    }


    setArray(array: number[]) {
        arr = array;
    }


    connectedNoGUIUpdate(a: number, b: number) {
        return this.getRoot(a) == this.getRoot(b);
    }

    /**
     *  Highlight a single node in the graphical
     *  This removes all other highlighting
     * @param nodeIndex
     */
    highlightSingleNode(node: number, color: string) {
        control.highlightNode(node, color);
    }

    /**
     *  Sleep the current thread for delayTime milliseconds
     * @param delayTime
     */
    delay(delayTime: number) {
        let start = new Date().getTime();
        for (let i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > delayTime) {
                break;
            }
        }
    }

    setController(control: controller): void {
    }

    getDelayTime() {
        return this.DELAY_TIME + control.getSpeed() * 50;
    }
}
