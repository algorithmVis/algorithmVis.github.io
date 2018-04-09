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
    View.prototype.setHighlightEdge = function (edgeId) {
        var forward = function (edgeId) {
            return function () {
                highlightThisEdge(edgeId);
            };
        }(edgeId);
        var backward = function (edgeId) {
            return function () {
                dehighlightThisEdge(edgeId);
            };
        }(edgeId);
        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    };
    View.prototype.setDehighlightEdge = function (edgeId) {
        var forward = function (edgeId) {
            return function () {
                dehighlightThisEdge(edgeId);
            };
        }(edgeId);
        var backward = function (edgeId) {
            return function () {
                highlightThisEdge(edgeId);
            };
        }(edgeId);
        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    };
    View.prototype.removeEdge = function (edgeId) {
        var forward = function (edgeId) {
            return function () {
                removeEdge(edgeId);
            };
        }(edgeId);
        var backward = function (edgeId) {
            return function () {
                removeEdge(edgeId);
            };
        }(edgeId);
        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    };
    View.prototype.transparentEdge = function (edgeId) {
        var forward = function (edgeId) {
            return function () {
                transparentEdge(edgeId);
            };
        }(edgeId);
        var backward = function (edgeId) {
            return function () {
                detransparentEdge(edgeId);
            };
        }(edgeId);
        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    };
    View.prototype.detransparentEdge = function (edgeId) {
        var forward = function (edgeId) {
            return function () {
                detransparentEdge(edgeId);
            };
        }(edgeId);
        var backward = function (edgeId) {
            return function () {
                transparentEdge(edgeId);
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
        var backward = function (x, y) {
            return function () {
                //Skal være rmeove her
                addThisNode(x, y);
            };
        }(x, y);
        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    };
    View.prototype.connectTheseNodes = function (node1, node2) {
        var forward = function (node1, node2) {
            return function () {
                connectNodes(node1, node2);
            };
        }(node1, node2);
        var backward = function (node1, node2) {
            return function () {
                //Skal være remove her
                addThisNode(node1, node2);
            };
        }(node1, node2);
        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    };
    View.prototype.selectTheseNodes = function (node1, node2) {
        var forward = function (node1, node2) {
            return function () {
                selectNodes(node1, node2, true);
            };
        }(node1, node2);
        var backward = function (node1, node2) {
            return function () {
                selectNodes(node1, node2, false);
            };
        }(node1, node2);
        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    };
    View.prototype.deselectTheseNodes = function (node1, node2) {
        var forward = function (node1, node2) {
            return function () {
                selectNodes(node1, node2, false);
            };
        }(node1, node2);
        var backward = function (node1, node2) {
            return function () {
                selectNodes(node1, node2, true);
            };
        }(node1, node2);
        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    };
    View.prototype.disableThisButton = function () {
        var forward = function () {
            return function () {
                disableButton();
            };
        }();
        var backward = function () {
            return function () {
                enableButton();
            };
        }();
        manager.addEvent(new FrontendEvent(forward, backward, 10));
    };
    View.prototype.enableThisButton = function () {
        var forward = function () {
            return function () {
                enableButton();
            };
        }();
        var backward = function () {
            return function () {
                disableButton();
            };
        }();
        manager.addEvent(new FrontendEvent(forward, backward, 10));
    };
    View.prototype.excludeText = function (i) {
        var forward = function (i) {
            return function () {
                excludeEdgeText(i);
            };
        }(i);
        manager.addEvent(new FrontendEvent(forward, forward, this.highlightEventDuration));
    };
    View.prototype.highlighText = function (i) {
        var forward = function (i) {
            return function () {
                higlightEdgeText(i);
            };
        }(i);
        manager.addEvent(new FrontendEvent(forward, forward, this.highlightEventDuration));
    };
    View.prototype.addWeightToSum = function (weight) {
        var forward = function (weight) {
            return function () {
                writeTotalWeight(weight);
            };
        }(weight);
        manager.addEvent(new FrontendEvent(forward, forward, this.highlightEventDuration));
    };
    View.prototype.resetAll = function () {
        resetGraphUI();
        manager = new EventManager();
        manager.pause();
        manager.nextEvents = new Array;
        manager.previousEvents = new Array;
        clearTotalWeight();
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
    View.prototype.forward = function () {
        manager.next();
    };
    View.prototype.backward = function () {
        manager.previous();
    };
    return View;
}());
var viewer = new View();
