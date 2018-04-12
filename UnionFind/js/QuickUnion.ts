/**
 * File created by Kenneth Apeland 03.02.18.
 * based on QuickUnion.java
 */
///<reference path="Controller.ts"/>

class QuickUnion implements IAlgorithm {
    DELAY_TIME: number = 100;
    arr: number[];
    name: string = "Quick Union";

    // noinspection JSAnnotator

    /**
     * Initializes an array of given length with values equal to each index
     *
     * @param size
     */
    constructor(size: number) {
        this.arr = new Array(size);
        for (let i = 0; i < size; i++) {
            this.arr[i] = i;
        }
    }

    /**
     * Connects two components together. Make root of A point to root of B.
     *
     * @param aIndex
     * @param bIndex
     */
    union(aIndex: number, bIndex: number) {
        let aRoot = this.simpleFind(aIndex, "green");
        let bRoot = this.simpleFind(bIndex, "green");
        //SaveState i Controller??
        control.saveState(this.getArray());

        if (aRoot != bRoot) {
            control.removeHighlight(aRoot);
            control.connectNodes(aRoot, bRoot);
            control.setValueAtIndex(aRoot, bRoot);
            this.arr[aRoot] = bRoot;
        }

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
        let aRoot = this.simpleFind(aIndex, "orange");
        let bRoot = this.simpleFind(bIndex, "orange");
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
        let root: number = this.simpleFind(pIndex, "green");
        this.removeHighlighting(root);
        control.setSelectedIndex(pIndex, false);

        return root;
    }


    simpleFind(index: number, color: string) {
        let root: number = index;
        this.removeHighlighting(root);

        while (root != this.arr[root]) {
            this.highlightSingleNode(root, "orange");
            this.removeHighlighting(root);
            root = this.arr[root];
        }
        this.highlightSingleNode(root, color);
        return root;
    }


    removeHighlighting(node: number) {
        control.removeHighlight(node);
    }


    getRoot(index: number) {
        let root: number = index;

        while (root != this.arr[root]) {
            root = this.arr[root];
        }
        return root;
    }


    getArray() {
        return this.arr;
    }


    getName() {
        return this.name;
    }


    setArray(array: number[]) {
        this.arr = array;
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

    getDelayTime() {
        return this.DELAY_TIME + control.getSpeed();
    }
}
