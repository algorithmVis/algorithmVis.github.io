/**
 * File created by Øyvind Skeie Liland 01.02.18.
 */
///<reference path="View.ts"/>
var iColor = 2;
var jColor = 0;
var controller = /** @class */ (function () {
    function controller() {
    }
    controller.prototype.setJElement = function (j, bool) {
        this.setColorInArrayElement(j, viewer.colors[jColor], bool);
    };
    controller.prototype.setColorInArrayElement = function (index, color, colorOn) {
        viewer.setColorInArrayElement(index, color, colorOn);
    };
    controller.prototype.setElementBeingComparedTo = function (j, bool) {
        this.setColorInArrayElement(j, viewer.colors[iColor], bool);
    };
    controller.prototype.storePermValue = function (j) {
        viewer.storePermValue(j);
    };
    controller.prototype.releasePermValue = function (i) {
        viewer.releasePermValue(i);
    };
    controller.prototype.switchArrayElements = function (indexA, indexB) {
        viewer.switchArrayElements(indexA, indexB);
    };
    controller.prototype.moveArrayElementToIndex = function (i, j) {
        viewer.moveArrayElementToIndex(i, j);
    };
    controller.prototype.moveArrayElementToIndexFromSpecifiedJIndex = function (i, j, k) {
        viewer.moveArrayElementToIndexFromSpecifiedJIndex(i, j, k);
    };
    controller.prototype.setKValue = function (k) {
        viewer.setKValue(k);
    };
    controller.prototype.setKLeftAndRight = function (i, k) {
        viewer.setKLeftAndRight(i, k);
    };
    controller.prototype.setHeadText = function (str) {
        viewer.setHeadText(str);
    };
    controller.prototype.unhideK = function () {
        viewer.unhideK();
    };
    controller.prototype.hideK = function () {
        viewer.hideK();
    };
    return controller;
}());
var control = new controller();
