/**
 * File created by Kenneth Apeland 03.02.18.
 */
///<reference path="View.ts"/>
///<reference path="IAlgorithm.ts"/>
///<reference path="EventManager.ts"/>
///<reference path="IView.ts"/>
///<reference path="methods.ts"/>
///<reference path="MaxHeapFree.ts"/>
var iColor = 2;
var jColor = 0;
var Controller = /** @class */ (function () {
    function Controller() {
        this.methodToUse = "Union";
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
            manager.start();
            this.algorithm.connectNodes();
        }
    };
    Controller.prototype.changeSpeed = function (newSpeed) {
        this.speed = newSpeed;
    };
    Controller.prototype.getSpeed = function () {
        return this.speed;
    };
    Controller.prototype.getAlgorithm = function () {
        return this.algorithm;
    };
    Controller.prototype.lockScreen = function (b) {
        viewer.screenLockThis(b);
    };
    /**
     * Remove the maximum/minimum element
     */
    Controller.prototype.remove = function () {
        viewer.screenLockThis(true);
        //this.algorithm.remove();
        viewer.screenLockThis(false);
    };
    Controller.prototype.union = function (firstIndex, secondIndex) {
        viewer.screenLockThis(true);
        //this.algorithm.union(firstIndex, secondIndex);
        viewer.screenLockThis(false);
    };
    Controller.prototype.setArrow = function (index) {
        viewer.setThisArrow(index);
    };
    Controller.prototype.setSelectedIndex = function (index, select) {
        viewer.selectThisIndex(index, select);
    };
    Controller.prototype.setValueAtIndex = function (i, bValue) {
        viewer.setValueAtThisIndex(i, bValue);
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
    Controller.prototype.setAlgorithm = function (algo) {
        this.algorithm = algo;
    };
    Controller.prototype.removeHighlight = function (node) {
        viewer.removeThisHighlight(node);
    };
    Controller.prototype.setMethodToUse = function (methodToUse) {
        this.methodToUse = methodToUse;
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
    Controller.prototype.checkMark = function (aIndex, bIndex, set) {
        viewer.checkMark(aIndex, bIndex, set);
    };
    Controller.prototype.redCross = function (aIndex, bIndex, set) {
        viewer.redCross(aIndex, bIndex, set);
    };
    Controller.prototype.displaySize = function (root, size) {
        viewer.displayNodeSize(root, size);
    };
    Controller.prototype.saveState = function (arr) {
        viewer.executeSaveMethodInJavaScript(this.getArrayClone());
    };
    Controller.prototype.addNode = function (i) {
        this.algorithm.add(i);
    };
    Controller.prototype.swapNode = function (child, parent) {
        viewer.swapNode(child, parent);
    };
    Controller.prototype.removeNode = function () {
        this.algorithm.remove();
    };
    Controller.prototype.removeElem = function (i, removeArr) {
        viewer.removeElem(i, removeArr);
    };
    Controller.prototype.insertNewElem = function (child, value, parent) {
        viewer.insertNewElemThis(child, value, parent);
    };
    return Controller;
}());
var control = new Controller();
