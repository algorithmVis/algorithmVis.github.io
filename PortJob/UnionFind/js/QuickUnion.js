/**
 * File created by Kenneth Apeland 03.02.18.
 * based on QuickUnion.java
 */
///<reference path="controller.ts"/>
var QuickUnion = /** @class */ (function () {
    // noinspection JSAnnotator
    /**
     * Initializes an array of given length with values equal to each index
     *
     * @param size
     */
    function QuickUnion(size) {
        this.DELAY_TIME = 100;
        this.name = "Quick Union";
        arr = new Array(size);
        for (var i = 0; i < size; i++) {
            arr[i] = i;
        }
    }
    /**
     * Connects two components together. Make root of A point to root of B.
     *
     * @param aIndex
     * @param bIndex
     */
    QuickUnion.prototype.union = function (aIndex, bIndex) {
        var aRoot = this.simpleFind(aIndex, "green");
        var bRoot = this.simpleFind(bIndex, "green");
        //SaveState i controller??
        if (aRoot != bRoot) {
            control.removeHighlight(aRoot);
            control.connectNodes(aRoot, bRoot);
            control.setValueAtIndex(aRoot, bRoot);
            arr[aRoot] = bRoot;
        }
        this.delay(this.getDelayTime() * 2);
        this.removeHighlighting(aRoot);
        this.removeHighlighting(bRoot);
        control.setSelectedIndex(aIndex, false);
        control.setSelectedIndex(bIndex, false);
    };
    /**
     * Checks if two indexes are in the same component
     * @return
     */
    QuickUnion.prototype.connected = function (aIndex, bIndex) {
        var aRoot = this.simpleFind(aIndex, "orange");
        var bRoot = this.simpleFind(bIndex, "orange");
        var connected = (aRoot == bRoot);
        if (connected) {
            control.highlightNode(aRoot, "green");
            control.checkMark(aIndex, bIndex, true);
        }
        else {
            control.redCross(aIndex, bIndex, true);
        }
        this.removeHighlighting(aRoot);
        this.removeHighlighting(bRoot);
        control.checkMark(aIndex, bIndex, false);
        control.redCross(aIndex, bIndex, false);
        control.setSelectedIndex(aIndex, false);
        control.setSelectedIndex(bIndex, false);
        return connected;
    };
    /**
     * Finds the component (root) of given index
     *
     * @param pIndex
     * @return
     */
    QuickUnion.prototype.find = function (pIndex) {
        var root = this.simpleFind(pIndex, "green");
        this.delay(getDelayTime());
        this.removeHighlighting(root);
        control.setSelectedIndex(pIndex, false);
        return root;
    };
    QuickUnion.prototype.simpleFind = function (index, color) {
        var root = index;
        this.removeHighlighting(root);
        while (root != arr[root]) {
            this.highlightSingleNode(root, "orange");
            this.delay(getDelayTime());
            this.removeHighlighting(root);
            root = arr[root];
        }
        this.highlightSingleNode(root, color);
        return root;
    };
    QuickUnion.prototype.removeHighlighting = function (node) {
        control.removeHighlight(node);
    };
    QuickUnion.prototype.getRoot = function (index) {
        var root = index;
        while (root != arr[root]) {
            root = arr[root];
        }
        return root;
    };
    QuickUnion.prototype.getArray = function () {
        return arr;
    };
    QuickUnion.prototype.getName = function () {
        return this.name;
    };
    QuickUnion.prototype.invertPause = function () {
        this.pause = !pause;
    };
    QuickUnion.prototype.setArray = function (array) {
        this.arr = array;
    };
    QuickUnion.prototype.connectedNoGUIUpdate = function (a, b) {
        return this.getRoot(a) == this.getRoot(b);
    };
    /**
     *  Highlight a single node in the graphical
     *  This removes all other highlighting
     * @param nodeIndex
     */
    QuickUnion.prototype.highlightSingleNode = function (node, color) {
        control.highlightNode(node, color);
    };
    /**
     *  Sleep the current thread for delayTime milliseconds
     * @param delayTime
     */
    QuickUnion.prototype.delay = function (delayTime) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > delayTime) {
                break;
            }
        }
    };
    QuickUnion.prototype.setController = function (control) {
    };
    QuickUnion.prototype.getDelayTime = function () {
        return this.DELAY_TIME + control.getSpeed() * 50;
    };
    return QuickUnion;
}());
