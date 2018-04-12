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
    Controller.prototype.highlightEdge = function (node1, node2, edgeId, weight) {
        viewer.setHighlightEdge(node1, node2, edgeId, weight);
    };
    Controller.prototype.dehighlightEdge = function (node1, node2, edgeId) {
        viewer.dehighlightEdge(node1, node2, edgeId);
    };
    Controller.prototype.selectTwoNodes = function (node1, node2) {
        viewer.selectTheseNodes(node1, node2);
    };
    Controller.prototype.excludeEdges = function (edgeList) {
        viewer.excludeEdges(edgeList);
    };
    return Controller;
}());
var controller = new Controller();
