/**
 * File created by Philip Hoang 06.2.
 * written by Øyvind
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
    }
    QuickFind.prototype.union = function (aIndex, bIndex) {
        var aRoot = this.arr[aIndex];
        var bRoot = this.arr[bIndex];
        if (aRoot == bRoot) {
            control.setSelectedIndex(aIndex, false);
            control.setSelectedIndex(bIndex, false);
            return;
        }
        control.saveState(this.arr);
        for (var i = 0; i < this.arr.length; i++) {
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
        control.setSelectedIndex(bIndex, false);
        control.removeHighlight(this.arr[bIndex]);
        control.setSelectedIndex(aIndex, false);
        control.removeHighlight(this.arr[aIndex]);
        control.checkMark(aIndex, bIndex, false);
        control.redCross(aIndex, bIndex, false);
        return connected;
    };
    QuickFind.prototype.getName = function () {
        return this.name;
    };
    QuickFind.prototype.find = function (pIndex) {
        var root = this.simpleFind(pIndex, "green");
        control.removeHighlight(root);
        control.setSelectedIndex(pIndex, false);
        return root;
    };
    QuickFind.prototype.simpleFind = function (pIndex, color) {
        var root = this.arr[pIndex];
        if (pIndex != root) {
            control.highlightNode(pIndex, "orange");
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
    QuickFind.prototype.connectedNoGUIUpdate = function (a, b) {
        return this.arr[a] == this.arr[b];
    };
    QuickFind.prototype.getDelayTime = function () {
        return this.DELAY + control.getSpeed();
    };
    return QuickFind;
}());
