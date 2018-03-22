"use strict";
/**
 * File created by Knut Anders Stokke, Kristiand Rosland, Ragnhild AAlvik
 * Modified by Philip Hoang 21.03.2018
 */
///<reference path="graphUI.ts"/>
///<reference path="View.ts"/>
///<reference path="KruskalAlgorithm.ts"/>
///<reference path="View.ts"/>
///<reference path="EventManager.ts"/>
///<reference path="Methods.ts"/>
var graphController = /** @class */ (function () {
    function graphController() {
        this.randomWeight = 0;
        this.nodes = 0;
        this.MAX_NODES = 8;
        this.edges = 0;
    }
    graphController.prototype.addNode = function (x, y) {
        viewer.addNodeToGraph(x, y);
    };
    /**
     * Connect two nodes and give the edge a weight
     *
     * @param {number} node1 First node
     * @param {number} node2 Second node
     */
    graphController.prototype.connectTwoNodes = function (node1, node2) {
        viewer.connectTheseNodes(node1, node2);
    };
    graphController.prototype.resetGraph = function () {
        resetGraphUI();
        nodes = 0;
        edges = 0;
        manager = new EventManager();
    };
    graphController.prototype.highlightMyEdge = function (edgeId, highlight) {
        console.log("graph");
        //$("#edge" + 2).css({"stroke": "rgb(16, 130, 219)", "stroke-width": "6"});
        viewer.setHighlightEdge(edgeId, highlight);
    };
    graphController.prototype.removeMyEdge = function (edgeId) {
        viewer.removeEdge(edgeId);
    };
    return graphController;
}());
var controller = new graphController();
