/**
 * File created by Philip Hoang 21.03.2018
 */
///<reference path="graphUI.ts"/>
///<reference path="View.ts"/>
///<reference path="KruskalAlgorithm.ts"/>
///<reference path="View.ts"/>
///<reference path="EventManager.ts"/>
///<reference path="Methods.ts"/>
var Controller = /** @class */ (function () {
    function Controller() {
    }
    Controller.prototype.addNode = function (x, y) {
        viewer.addNodeToGraph(x, y);
    };
    Controller.prototype.connectTwoNodes = function (node1, node2) {
        viewer.connectTheseNodes(node1, node2);
    };
    Controller.prototype.resetGraph = function () {
        viewer.resetMyAll();
    };
    Controller.prototype.highlightMyEdge = function (edgeId, weight) {
        viewer.setHighlightEdge(edgeId, weight);
    };
    Controller.prototype.dehighlightMyEdge = function (edgeId) {
        viewer.setDehighlightEdge(edgeId);
    };
    Controller.prototype.removeMyEdge = function (edgeId) {
        viewer.removeEdge(edgeId);
    };
    Controller.prototype.selectTwoNodes = function (node1, node2) {
        viewer.selectTheseNodes(node1, node2);
    };
    Controller.prototype.deselectTwoNodes = function (node1, node2) {
        viewer.deselectTheseNodes(node1, node2);
    };
    Controller.prototype.excludeEdgeText = function (index) {
        viewer.excludeText(index);
    };
    Controller.prototype.excludeEdges = function (edgeList) {
        viewer.excludeEdges(edgeList);
    };
    return Controller;
}());
var controller = new Controller();
