/**
 * File created by Philip Hoang 06.2.
 * written by Øyvind
 * based on QuickFind.Java
 */
///<reference path="Controller.ts"/>

class QuickFind implements IAlgorithm {
    DELAY: number = 100;
    arr: number[];
    name: string = "Quick Find";

    // noninspection JSAnnotator

    constructor(size: number) {
        this.arr = [];
        for (let i = 0; i < size; i++) {
            this.arr[i] = i;
        }
    }


    union(aIndex: number, bIndex: number) {
        let aRoot: number = this.arr[aIndex];
        let bRoot: number = this.arr[bIndex];

        if (aRoot == bRoot) {
            control.setSelectedIndex(aIndex, false);
            control.setSelectedIndex(bIndex, false);
            return;
        }

        control.saveState(this.arr);

        for (let i = 0; i < this.arr.length; i++) {
            control.setArrow(i);
            if (this.arr[i] == aRoot) {
                control.setValueAtIndex(i, bRoot);
                control.connectNodes(i, bRoot);
                this.arr[i] = bRoot;
            }
        }

        control.setArrow(-1);
        control.setSelectedIndex(bIndex, false);
        control.setSelectedIndex(aIndex, false);
    }


    connected(aIndex: number, bIndex: number) {
        let connected: boolean = this.simpleFind(aIndex, "orange") == this.simpleFind(bIndex, "orange");

        if (connected) {
            control.highlightNode(this.arr[aIndex], "green");
            control.highlightNode(this.arr[bIndex], "green");
            control.checkMark(aIndex, bIndex, true);
        } else
            control.redCross(aIndex, bIndex, true);

        control.setSelectedIndex(bIndex, false);
        control.removeHighlight(this.arr[bIndex]);
        control.setSelectedIndex(aIndex, false);
        control.removeHighlight(this.arr[aIndex]);        
        control.checkMark(aIndex, bIndex, false);
        control.redCross(aIndex, bIndex, false);

        return connected
    }


    getName() {
        return this.name;
    }

    find(pIndex: number) {
        let root = this.simpleFind(pIndex, "green");

        control.removeHighlight(root);
        control.setSelectedIndex(pIndex, false);

        return root;
    }


    simpleFind(pIndex: number, color: string) {
        let root: number = this.arr[pIndex];

        if (pIndex != root) {
            control.highlightNode(pIndex, "orange");
            control.removeHighlight(pIndex);
        }

        control.highlightNode(root, color);

        return root;
    }


    getArray() {
        return this.arr;
    }


    setArray(array: number[]) {
        this.arr = array;
    }

    connectedNoGUIUpdate(a: number, b: number) {
        return this.arr[a] == this.arr[b];
    }


    getDelayTime() {
        return this.DELAY + control.getSpeed();
    }
}