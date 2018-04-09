/**
 * File created by Philip Hoang 22.03.18
 */

///<reference path="KruskalAlgorithm.ts"/>
///<reference path="Controller.ts"/>
///<reference path="graphUI.ts"/>
///<reference path="EventManager.ts"/>
///<reference path="Methods.ts"/>

declare var $;

class View {
    highlightEventDuration = 1000;
    paused: boolean = false;

    setHighlightEdge(edgeId: number) {
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
    }

    setDehighlightEdge(edgeId: number) {
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
    }


    removeEdge(edgeId: number) {
        let [node1, node2, weight] = getEdgeInfo(edgeId);

        var forward = function (edgeId) {
            return function () {
                removeEdge(edgeId);
            }
        }(edgeId);

        var backward = function (edgeId) {
            return function () {
                addWeightedEdge(edgeId, node1, node2, weight);
            }
        }(edgeId);

        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    }

    transparentEdge(edgeId: number) {
        var forward = function (edgeId) {
            return function () {
                transparentEdge(edgeId);
            }
        }(edgeId);

        var backward = function (edgeId) {
            return function () {
                deTransparentEdge(edgeId);
            }
        }(edgeId);

        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    }

    deTransparentEdge(edgeId: number) {
        var forward = function (edgeId) {
            return function () {
                deTransparentEdge(edgeId);
            }
        }(edgeId);

        var backward = function (edgeId) {
            return function () {
                transparentEdge(edgeId);
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

        var backward = function () {
            return function () {
                removeThisNode();
            }
        }();

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
                removeConnectedNodes();
            }
        }(node1, node2);

        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    }

    selectTheseNodes(node1: number, node2: number) {
        var forward = function (node1, node2) {
            return function () {
                selectNodes(node1, node2, true);
            }
        }(node1, node2);

        var backward = function (node1, node2) {
            return function () {
                selectNodes(node1, node2, false);
            }
        }(node1, node2);

        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    }

    deselectTheseNodes(node1: number, node2: number) {
        var forward = function (node1, node2) {
            return function () {
                selectNodes(node1, node2, false);
            }
        }(node1, node2);

        var backward = function (node1, node2) {
            return function () {
                selectNodes(node1, node2, true);
            }
        }(node1, node2);

        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    }


    disableThisButton() {
        var forward = function () {
            return function () {
                disableButton();
            }
        }();

        var backward = function () {
            return function () {
                enableButton();
            }
        }();

        manager.addEvent(new FrontendEvent(forward, backward, 10));
    }

    enableThisButton() {
        var forward = function () {
            return function () {
                enableButton();
            }
        }();

        var backward = function () {
            return function () {
                disableButton();
            }
        }();

        manager.addEvent(new FrontendEvent(forward, backward, 10));
    }

    excludeText(i: number) {
        var forward = function (i) {
            return function () {
                excludeEdgeText(i);
            }
        }(i);

        var backward = function (i) {
            return function () {
                includeEdgeText(i);
            }
        }(i);

        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    }

    highlighText(i: number) {
        var forward = function (i) {
            return function () {
                higlightEdgeText(i);
            }
        }(i);

        var backward = function (i) {
            return function () {
                deHighlightEdgeText(i);
            }
        }(i);

        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    }

    addWeightToSum(weight: number) {
        var forward = function (weight) {
            return function () {
                writeTotalWeight(weight);
            }
        }(weight);

        var backward = function (weight) {
            return function () {
                writeTotalWeight(-weight);
            }
        }(weight);

        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    }

    resetAll() {
        resetGraphUI();
        manager = new EventManager();
        manager.pause();
        manager.nextEvents = new Array;
        manager.previousEvents = new Array;
        clearTotalWeight();
        arr = [];
        nodes = 0;
        edges = 0;
    }

    pause() {
        if (!this.paused) {
            this.paused = true;
            manager.pause();
            $("#togglePause").html("Resume");
        } else {
            this.paused = false;
            manager.start();
            $("#togglePause").html("Pause");
        }
    }

    forward() {
        manager.next();
    }

    backward() {
        manager.previous();
    }

    excludeEdges(edgeList: any): void {
        var forward = function (edgeList) {
            return function () {
                for (let index in edgeList) {
                    let [node1, node2, weight] = edgeList[index];
                    let currentEdge = getEdgeId(node1, node2);
                    dehighlightThisEdge(currentEdge);
                    transparentEdge(currentEdge);
                    excludeEdgeText(currentEdge);
                }
            }
        }(edgeList);

        var backward = function (edgeList) {
            return function () {
                for (let index in edgeList) {
                    let [node1, node2, weight] = edgeList[index];
                    let currentEdge = getEdgeId(node1, node2);
                    includeEdgeText(currentEdge);
                    deTransparentEdge(currentEdge);
                }
            }
        }(edgeList);

        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    }
}

var viewer: View = new View();