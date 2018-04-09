/**
 * File created by Kenneth Apeland 04.04.18.
 */
///<reference path="View.ts"/>
var controller = /** @class */ (function () {
    function controller() {
    }
    controller.prototype.lowerElements = function (elems) {
        viewer.lowerElements(elems);
    };
    controller.prototype.setPivotElement = function (index) {
        viewer.setPivotElement(index);
    };
    controller.prototype.deselectPivotElement = function (index) {
        viewer.deselectPivotElement(index);
    };
    controller.prototype.moveElementToPlace = function (element, px, back) {
        viewer.moveElementToPlace(element, px, back);
    };
    controller.prototype.moveElementsToPlace = function (element, px, back) {
        viewer.moveElementsToPlace(element, px, back);
    };
    controller.prototype.setColorInArrayElement = function (index, color) {
        viewer.setColorInArrayElement(index, color);
    };
    controller.prototype.setColorInArrayElements = function (index, color) {
        viewer.setColorInArrayElements(index, color);
    };
    controller.prototype.setPause = function () {
        viewer.setPause();
    };
    return controller;
}());
var control = new controller();
