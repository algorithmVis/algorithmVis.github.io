/**
 * File created by Kenneth Apeland 03.02.18.
 */
///<reference path="view.ts"/>
///<reference path="IAlgorithm.ts"/>
///<reference path="eventManager.ts"/>
var iColor = 2;
var jColor = 0;
var controller = /** @class */ (function () {
    function controller() {
        this.methodToUse = "Union";
    }
    controller.prototype.initController = function (algo) {
        manager.start();
        this.algorithm = algo;
        this.speed = 50;
        viewer.changeToCurrentAlgorithm();
        viewer.displayThisArray(this.algorithm.getArray());
    };
    controller.prototype.changeSpeed = function (newSpeed) {
        this.speed = newSpeed;
    };
    controller.prototype.getSpeed = function () {
        return this.speed;
    };
    controller.prototype.connected = function (firstIndex, secondIndex) {
        viewer.screenLock(true);
        //Kossen gjør eg detta?? - fixed tror jeg
        this.algorithm.connected(firstIndex, secondIndex);
        viewer.screenLock(false);
    };
    controller.prototype.union = function (firstIndex, secondIndex) {
        viewer.screenLock(true);
        //samme som over - fixed tror jeg
        this.algorithm.union(firstIndex, secondIndex);
        viewer.screenLock(false);
    };
    controller.prototype.find = function (index) {
        viewer.screenLock(true);
        //SEND HELP PLEASE
        this.algorithm.find(index);
        viewer.screenLock(false);
    };
    controller.prototype.setArrow = function (index) {
        viewer.setThisArrow(index);
    };
    controller.prototype.setSelectedIndex = function (index, select) {
        viewer.selectThisIndex(index, select);
    };
    controller.prototype.setValueAtIndex = function (i, bValue) {
        viewer.setValueAtThisIndex(i, bValue);
    };
    controller.prototype.connectNodes = function (child, parent) {
        viewer.connectThisNodes(child, parent);
    };
    controller.prototype.highlightNode = function (index, color) {
        viewer.highlightThisNode(index, color);
    };
    controller.prototype.invertPauseState = function () {
        this.algorithm.invertPause();
    };
    controller.prototype.setAlgorithm = function (algo) {
        this.algorithm = algo;
    };
    controller.prototype.removeHighlight = function (node) {
        viewer.removeThisHighlight(node);
    };
    controller.prototype.setMethodToUse = function (methodToUse) {
        this.methodToUse = methodToUse;
    };
    controller.prototype.getNameOfCurrentAlgorithm = function () {
        return this.algorithm.getName();
    };
    controller.prototype.getArrayClone = function () {
        return this.algorithm.getArray().slice(0, this.algorithm.getArray().length);
    };
    controller.prototype.setArray = function (array) {
        this.algorithm.setArray(array);
    };
    controller.prototype.checkMark = function (aIndex, bIndex, set) {
        viewer.checkMark(aIndex, bIndex, set);
    };
    controller.prototype.redCross = function (aIndex, bIndex, set) {
        viewer.redCross(aIndex, bIndex, set);
    };
    controller.prototype.displaySize = function (root, size) {
        viewer.displayNodeSize(root, size);
    };
    controller.prototype.saveState = function (arr) {
        viewer.executeSaveMethodInJavaScript(this.getArrayClone());
    };
    return controller;
}());
var control = new controller();
