/**
 * File created by Philip Hoang 06.2.
 * written by Øyvind ;););)
 * based on QuickFind.Java
 */
///<reference path="Controller.ts"/>
var QuickFind = /** @class */ (function () {
    // noninspection JSAnnotator
    function QuickFind(size) {
        this.DELAY = 100;
        this.name = "Quick Find";
        this.arr = [];
        for (var i = 0; i < size; i++) {
            this.arr[i] = i;
        }
        this.pause = false;
    }
    QuickFind.prototype.union = function (aIndex, bIndex) {
        var aRoot = this.arr[aIndex];
        var bRoot = this.arr[bIndex];
        if (aRoot == bRoot) {
            this.delay(this.getDelayTime() * 2);
            control.setSelectedIndex(aIndex, false);
            control.setSelectedIndex(bIndex, false);
            return;
        }
        control.saveState(this.arr);
        for (var i = 0; i < this.arr.length; i++) {
            while (this.pause) {
                this.delay(this.getDelayTime());
            }
            control.setArrow(i);
            this.delay(this.getDelayTime());
            if (this.arr[i] == aRoot) {
                control.setValueAtIndex(i, bRoot);
                control.connectNodes(i, bRoot);
                this.arr[i] = bRoot;
                this.delay(this.getDelayTime());
            }
        }
        control.setArrow(-1);
        control.setSelectedIndex(bIndex, false);
        control.setSelectedIndex(aIndex, false);
    };
    QuickFind.prototype.connected = function (aIndex, bIndex) {
        var connected = this.simpleFind(aIndex, "orange") == this.simpleFind(bIndex, "orange");
        if (connected) {
            control.highlightNode(this.arr[aIndex], "green");
            control.highlightNode(this.arr[bIndex], "green");
            control.checkMark(aIndex, bIndex, true);
        }
        else
            control.redCross(aIndex, bIndex, true);
        this.delay(this.getDelayTime());
        this.removeHighlighFromRoot(aIndex);
        this.removeHighlighFromRoot(bIndex);
        control.checkMark(aIndex, bIndex, false);
        control.redCross(aIndex, bIndex, false);
        return connected;
    };
    QuickFind.prototype.getName = function () {
        return this.name;
    };
    QuickFind.prototype.removeHighlighFromRoot = function (pIndex) {
        control.removeHighlight(this.arr[pIndex]);
    };
    QuickFind.prototype.delay = function (delayTime) {
        /*
        let start = new Date().getTime();
        for (let i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > delayTime)
                break;
        }*/
    };
    QuickFind.prototype.find = function (pIndex) {
        var root = this.simpleFind(pIndex, "green");
        this.delay(this.getDelayTime());
        control.removeHighlight(root);
        control.setSelectedIndex(pIndex, false);
        return root;
    };
    QuickFind.prototype.simpleFind = function (pIndex, color) {
        var root = this.arr[pIndex];
        if (pIndex != root) {
            control.highlightNode(pIndex, "orange");
            this.delay(this.getDelayTime());
            control.removeHighlight(pIndex);
        }
        control.highlightNode(root, color);
        return root;
    };
    QuickFind.prototype.getArray = function () {
        return this.arr;
    };
    QuickFind.prototype.setArray = function (array) {
        this.arr = array;
    };
    QuickFind.prototype.isPause = function () {
        return this.pause;
    };
    QuickFind.prototype.invertPause = function () {
        this.pause = !this.pause;
    };
    QuickFind.prototype.connectedNoGUIUpdate = function (a, b) {
        return this.arr[a] == this.arr[b];
    };
    QuickFind.prototype.getDelayTime = function () {
        return this.DELAY + control.getSpeed();
    };
    QuickFind.prototype.setController = function (control) {
        //
    };
    return QuickFind;
}());
