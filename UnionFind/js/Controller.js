/**
 * File created by Kenneth Apeland 03.02.18.
 */
///<reference path="View.ts"/>
///<reference path="IAlgorithm.ts"/>
///<reference path="EventManager.ts"/>
///<reference path="IView.ts"/>
var iColor = 2;
var jColor = 0;
var Controller = /** @class */ (function () {
    function Controller() {
        this.methodToUse = "Union";
    }
    Controller.prototype.initController = function (algo) {
        manager.start();
        this.algorithm = algo;
        this.speed = 50;
        viewer.changeToCurrentAlgorithm();
        viewer.displayThisArray(this.algorithm.getArray());
    };
    Controller.prototype.changeSpeed = function (newSpeed) {
        this.speed = newSpeed;
    };
    Controller.prototype.getSpeed = function () {
        return this.speed;
    };
    Controller.prototype.connected = function (firstIndex, secondIndex) {
        viewer.screenLockThis(true);
        //Kossen gjør eg detta?? - fixed tror jeg
        this.algorithm.connected(firstIndex, secondIndex);
        viewer.screenLockThis(false);
    };
    Controller.prototype.union = function (firstIndex, secondIndex) {
        viewer.screenLockThis(true);
        //samme som over - fixed tror jeg
        this.algorithm.union(firstIndex, secondIndex);
        viewer.screenLockThis(false);
    };
    Controller.prototype.find = function (index) {
        viewer.screenLockThis(true);
        //SEND HELP PLEASE
        this.algorithm.find(index);
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
    Controller.prototype.connectNodes = function (child, parent) {
        viewer.connectThisNodes(child, parent);
    };
    Controller.prototype.highlightNode = function (index, color) {
        viewer.highlightThisNode(index, color);
    };
    Controller.prototype.invertPauseState = function () {
        this.algorithm.invertPause();
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
    return Controller;
}());
var control = new Controller();
