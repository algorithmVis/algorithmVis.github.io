/**
 * File created by Øyvind Liland on 22.02.18.
 */
///<reference path="View.ts"/>
///<reference path="IAlgorithm.ts"/>
///<reference path="EventManager.ts"/>
///<reference path="IView.ts"/>
///<reference path="methods.ts"/>
///<reference path="MaxHeapFree.ts"/>
var Controller = /** @class */ (function () {
    function Controller() {
    }
    Controller.prototype.initController = function (algo) {
        this.algorithm = algo;
        this.speed = 50;
        viewer.changeToCurrentAlgorithm();
        if (algo.getName() == "FreeMode") {
            this.algorithm.clearArrayValues();
            this.algorithm.maxHeapFreeInit();
            manager.start();
        }
        else {
            this.algorithm.setIndex();
            viewer.displayThisArray(this.algorithm.getArray());
            this.algorithm.removeNodes();
            manager.start();
            this.algorithm.connectNodes();
        }
    };
    Controller.prototype.getAlgorithm = function () {
        return this.algorithm;
    };
    Controller.prototype.lockScreen = function (b) {
        viewer.screenLockThis(b);
    };
    Controller.prototype.setArrow = function (index) {
        viewer.setThisArrow(index);
    };
    Controller.prototype.setSelectedIndex = function (index, select) {
        viewer.selectThisIndex(index, select);
    };
    Controller.prototype.setValueAtIndex = function (i, bValue, oldVal) {
        viewer.setValueAtThisIndex(i, bValue, oldVal);
    };
    Controller.prototype.setValueAtSortIndex = function (i, bValue) {
        viewer.setValueAtThisSortIndex(i, bValue);
    };
    Controller.prototype.connectNodes = function (child, parent) {
        viewer.connectThisNodes(child, parent);
    };
    Controller.prototype.highlightNode = function (index, color) {
        viewer.highlightThisNode(index, color);
    };
    Controller.prototype.highlightSortElem = function (index, color) {
        viewer.highlightThisSortElem(index, color);
    };
    Controller.prototype.removeHighlight = function (node) {
        viewer.removeThisHighlight(node);
    };
    Controller.prototype.getNameOfCurrentAlgorithm = function () {
        return this.algorithm.getName();
    };
    Controller.prototype.getArrayClone = function () {
        return this.algorithm.getArray().slice(0, this.algorithm.getArray().length);
    };
    Controller.prototype.setArray = function (array) {
        this.algorithm.setArray(array);
    };
    Controller.prototype.displaySize = function (root, size) {
        viewer.displayNodeSize(root, size);
    };
    Controller.prototype.addNode = function (i) {
        this.algorithm.add(i);
    };
    Controller.prototype.swapNode = function (child, parent) {
        viewer.swapNode(child, parent);
    };
    /**
     * Remove the maximum/minimum element
     */
    Controller.prototype.removeNode = function () {
        this.algorithm.remove();
    };
    Controller.prototype.removeElem = function (i, removeArr) {
        viewer.removeElem(i, removeArr);
    };
    Controller.prototype.insertNewElem = function (child, value, parent) {
        viewer.insertNewElemThis(child, value, parent);
    };
    Controller.prototype.getArrayLength = function () {
        return this.algorithm.getArrayLength();
    };
    Controller.prototype.exchangeElemAndNodes = function (index1, value1, index2, value2) {
        viewer.exchangeElemAndNodes(index1, value1, index2, value2);
    };
    Controller.prototype.highlightTwoNodes = function (index1, index2, color) {
        viewer.highlightTwoNodes(index1, index2, color);
    };
    Controller.prototype.removeHighlightTwoNodes = function (index1, index2, color) {
        viewer.removeHighlightTwoNodes(index1, index2, color);
    };
    Controller.prototype.sortHighlightTwoNodes = function (arrIndex, sortIndex, color) {
        viewer.sortHighlightTwoNodes(0, sortIndex, "orange");
    };
    Controller.prototype.setSortValAndDeselect = function (sortIndex, val) {
        viewer.setSortValAndDeselect(sortIndex, val);
    };
    return Controller;
}());
var control = new Controller();
