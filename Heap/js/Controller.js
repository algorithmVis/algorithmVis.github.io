/**
 * File created by Øyvind Liland on 22.02.18.
 */
///<reference path="View.ts"/>
///<reference path="IAlgorithm.ts"/>
///<reference path="EventManager.ts"/>
///<reference path="View.ts"/>
///<reference path="methods.ts"/>
///<reference path="MaxHeapFree.ts"/>
///<reference path="MaxHeapCombined.ts"/>
var Controller = /** @class */ (function () {
    function Controller() {
    }
    Controller.prototype.initController = function (algo) {
        this.algorithm = algo;
        this.algoName = this.algorithm.getName();
        this.speed = 50;
        viewer.changeToCurrentAlgorithm();
        if (algo.getName() == "FreeMode" || algo.getName() == "MaxHeapFree" || algo.getName() == "MaxHeapCombined") {
            this.algorithm.clearArrayValues();
            this.algorithm.maxHeapFreeInit();
            manager.start();
        }
        else if (algo.getName() == "MaxHeapCombined") {
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
    Controller.prototype.sortHeap = function () {
        if (this.algorithm.getName() === "MaxHeapCombined")
            this.algorithm.sort();
    };
    Controller.prototype.buildHeap = function () {
        if (this.algorithm.getName() === "MaxHeapCombined")
            this.algorithm.build();
    };
    Controller.prototype.setArrow = function (index) {
        viewer.setThisArrow(index);
    };
    Controller.prototype.connectNodes = function (child, parent) {
        viewer.connectThisNodes(child, parent);
    };
    Controller.prototype.highlightSortElem = function (index, color) {
        viewer.highlightThisSortElem(index, color);
    };
    Controller.prototype.getNameOfCurrentAlgorithm = function () {
        return this.algorithm.getName();
    };
    Controller.prototype.getArrayClone = function () {
        return this.algorithm.getArray().slice(0, this.algorithm.getArray().length);
    };
    Controller.prototype.displaySize = function (root, size) {
        viewer.displayNodeSize(root, size);
    };
    Controller.prototype.addNode = function (i) {
        this.algorithm.add(i);
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
        viewer.sortHighlightTwoNodes(arrIndex, sortIndex, "orange");
    };
    Controller.prototype.setSortValAndDeselect = function (sortIndex, val) {
        viewer.setSortValAndDeselect(sortIndex, val);
    };
    Controller.prototype.getAlgoName = function () {
        return this.algoName;
    };
    return Controller;
}());
var control = new Controller();
