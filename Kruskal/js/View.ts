///<reference path="KruskalAlgorithm.ts"/>
///<reference path="graphController.ts"/>
///<reference path="graphUI.ts"/>
///<reference path="EventManager.ts"/>
///<reference path="Methods.ts"/>

declare var $;

class View {

    highlightEventDuration = 1000;


    setHighlightEdge(edgeId: number, highlight: boolean) {
        console.log("view");
        var forward = function (edgeId, highlight) {
            return function () {
                highlightThisMyEdge(edgeId, highlight);
            };
        }(edgeId, highlight);

        var backward = function (edgeId, highlight) {
            return function () {
                highlightThisMyEdge(edgeId, highlight);
            };
        }(edgeId, highlight);

        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    }


    removeEdge(edgeId: number) {
        var forward = function (edgeId) {
            return function () {
                removeEdge(edgeId);
            }
        }(edgeId);

        var backward = function (edgeId) {
            return function () {
                removeEdge(edgeId);
            }
        }(edgeId);

        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));

    }

    addNodeToGraph(x: number, y: number) {
        var forward = function (x, y) {
            return function () {
                addThisNode(x, y);
            }
        }(x, y);

        var backward = function (x, y) {
            return function () {
                //Skal være rmeove her
                addThisNode(x, y);
            }
        }(x, y);

        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    }


    connectTheseNodes(node1: number, node2: number) {
        var forward = function (node1, node2) {
            return function () {
                connectNodes(node1, node2);
            }
        }(node1, node2);

        var backward = function (node1, node2) {
            return function () {
                //Skal være remove her
                addThisNode(node1, node2);
            }
        }(node1, node2);

        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    }
}

var viewer: View = new View();