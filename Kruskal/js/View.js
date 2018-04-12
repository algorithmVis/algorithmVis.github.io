/**
 * File created by Philip Hoang 22.03.18
 */
///<reference path="KruskalAlgorithm.ts"/>
///<reference path="Controller.ts"/>
///<reference path="graphUI.ts"/>
///<reference path="EventManager.ts"/>
///<reference path="Methods.ts"/>
var View = /** @class */ (function () {
    function View() {
        this.highlightEventDuration = 1000;
        this.paused = false;
    }
    View.prototype.setHighlightEdge = function (node1, node2, edgeId, weight) {
        var forward = function (edgeId, weight, node1, node2) {
            return function () {
                higlightEdgeText(edgeId);
                highlightThisEdge(edgeId);
                writeTotalWeight(weight);
                selectNodes(node1, node2, false);
            };
        }(edgeId, weight, node1, node2);
        var backward = function (edgeId, weight, node1, node2) {
            return function () {
                selectThisEdge(edgeId);
                dehighlightEdgeText(edgeId);
                writeTotalWeight(-weight);
                selectNodes(node1, node2, true);
                selectEdgeText(edgeId);
            };
        }(edgeId, weight, node1, node2);
        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    };
    View.prototype.dehighlightEdge = function (node1, node2, edgeId) {
        var forward = function (edgeId, node1, node2) {
            return function () {
                dehighlightThisEdge(edgeId);
                transparentEdge(edgeId);
                dehighlightThisEdge(edgeId);
                excludeEdgeText(edgeId);
                selectNodes(node1, node2, false);
            };
        }(edgeId, node1, node2);
        var backward = function (edgeId, node1, node2) {
            return function () {
                includeEdgeText(edgeId);
                detransparentEdge(edgeId);
                selectThisEdge(edgeId);
                selectNodes(node1, node2, true);
                selectEdgeText(edgeId);
            };
        }(edgeId, node1, node2);
        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    };
    View.prototype.removeEdge = function (edgeId) {
        var _a = getEdgeInfo(edgeId), node1 = _a[0], node2 = _a[1], weight = _a[2];
        var forward = function (edgeId) {
            return function () {
                removeEdge(edgeId);
            };
        }(edgeId);
        var backward = function (edgeId) {
            return function () {
                addWeightedEdge(edgeId, node1, node2, weight);
            };
        }(edgeId);
        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    };
    View.prototype.addNodeToGraph = function (x, y) {
        var forward = function (x, y) {
            return function () {
                addThisNode(x, y);
            };
        }(x, y);
        var backward = function () {
            return function () {
                removeThisNode();
            };
        }();
        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    };
    View.prototype.connectTheseNodes = function (node1, node2) {
        var forward = function (node1, node2) {
            return function () {
                connectNodes(node1, node2);
            };
        }(node1, node2);
        var backward = function () {
            return function () {
                removeConnectedNodes();
            };
        }();
        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    };
    View.prototype.selectTheseNodes = function (node1, node2) {
        var edge = getEdgeId(node1, node2);
        var forward = function (node1, node2, edge) {
            return function () {
                selectNodes(node1, node2, true);
                selectThisEdge(edge);
                selectEdgeText(edge);
            };
        }(node1, node2, edge);
        var backward = function (node1, node2, edge) {
            return function () {
                selectNodes(node1, node2, false);
                dehighlightThisEdge(edge);
                dehighlightEdgeText(edge);
            };
        }(node1, node2, edge);
        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    };
    View.prototype.excludeEdges = function (edgeList) {
        var forward = function (edgeList) {
            return function () {
                for (var index in edgeList) {
                    var _a = edgeList[index], node1 = _a[0], node2 = _a[1], weight = _a[2];
                    var currentEdge_1 = getEdgeId(node1, node2);
                    transparentEdge(currentEdge_1);
                    excludeEdgeText(currentEdge_1);
                }
            };
        }(edgeList);
        var backward = function (edgeList) {
            return function () {
                for (var index in edgeList) {
                    var _a = edgeList[index], node1 = _a[0], node2 = _a[1], weight = _a[2];
                    var currentEdge_2 = getEdgeId(node1, node2);
                    detransparentEdge(currentEdge_2);
                    includeEdgeText(currentEdge_2);
                }
            };
        }(edgeList);
        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    };
    View.prototype.resetMyAll = function () {
        resetGraphUI();
        manager.clear();
        clearTotalWeight();
        this.setPause();
        arr = [];
        nodes = 0;
        edges = 0;
    };
    View.prototype.pause = function () {
        if (!this.paused) {
            this.paused = true;
            manager.pause();
            $("#togglePause").html("Resume");
        }
        else {
            this.paused = false;
            manager.start();
            $("#togglePause").html("Pause");
        }
    };
    View.prototype.setPause = function () {
        this.paused = true;
        manager.pause();
        $("#togglePause").html("Start");
        $('#backward').removeAttr('disabled');
        $('#forward').removeAttr('disabled');
    };
    View.prototype.forward = function () {
        this.paused = false;
        this.pause();
        manager.next();
    };
    View.prototype.backward = function () {
        this.paused = false;
        this.pause();
        manager.previous();
    };
    View.prototype.slow = function () {
        manager.slow();
    };
    View.prototype.medium = function () {
        manager.medium();
    };
    View.prototype.fast = function () {
        manager.fast();
    };
    return View;
}());
var viewer = new View();
