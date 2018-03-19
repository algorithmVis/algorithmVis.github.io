/**
 * File created by Philip Hoang 06.2.
 * written by Øyvind ;););)
 * based on QuickFind.Java
 */
///<reference path="Controller.ts"/>

class QuickFind implements IAlgorithm {
    DELAY: number = 100;
    arr: number[];
    pause: boolean;
    name: string = "Quick Find";

    // noninspection JSAnnotator

    constructor(size: number) {
        this.arr = [];
        for (let i = 0; i < size; i++) {
            this.arr[i] = i;
        }
        this.pause = false;
    }


    union(aIndex: number, bIndex: number) {
        let aRoot: number = this.arr[aIndex];
        let bRoot: number = this.arr[bIndex];

        if (aRoot == bRoot) {
            this.delay(this.getDelayTime() * 2);
            control.setSelectedIndex(aIndex, false);
            control.setSelectedIndex(bIndex, false);
            return;
        }

        control.saveState(this.arr);

        for (let i = 0; i < this.arr.length; i++) {

            while (this.pause) {
                this.delay(this.getDelayTime());
            }

            control.setArrow(i);
            this.delay(this.getDelayTime())
            if (this.arr[i] == aRoot) {
                control.setValueAtIndex(i, bRoot);
                control.connectNodes(i, bRoot);
                this.arr[i] = bRoot;
                this.delay(this.getDelayTime())
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

        this.delay(this.getDelayTime());
        this.removeHighlighFromRoot(aIndex);
        this.removeHighlighFromRoot(bIndex);
        control.checkMark(aIndex, bIndex, false);
        control.redCross(aIndex, bIndex, false);

        return connected
    }


    getName() {
        return this.name;
    }


    removeHighlighFromRoot(pIndex: number) {
        control.removeHighlight(this.arr[pIndex]);
    }


    delay(delayTime: number) {
        /*
        let start = new Date().getTime();
        for (let i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > delayTime)
                break;
        }*/
    }


    find(pIndex: number) {
        let root = this.simpleFind(pIndex, "green");

        this.delay(this.getDelayTime());
        control.removeHighlight(root);
        control.setSelectedIndex(pIndex, false);

        return root;
    }


    simpleFind(pIndex: number, color: string) {
        let root: number = this.arr[pIndex];

        if (pIndex != root) {
            control.highlightNode(pIndex, "orange");
            this.delay(this.getDelayTime());
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


    isPause() {
        return this.pause;
    }


    invertPause() {
        this.pause = !this.pause;
    }


    connectedNoGUIUpdate(a: number, b: number) {
        return this.arr[a] == this.arr[b];
    }


    getDelayTime() {
        return this.DELAY + control.getSpeed();
    }

    setController(control: Controller): void {
        //
    }
}