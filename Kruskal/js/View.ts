/**
 * File created by Philip Hoang 22.03.18
 */

///<reference path="KruskalAlgorithm.ts"/>
///<reference path="Controller.ts"/>
///<reference path="graphUI.ts"/>
///<reference path="EventManager.ts"/>
///<reference path="Methods.ts"/>

class View {
    highlightEventDuration = 1000;
    paused: boolean = false;

    setHighlightEdge(node1: number, node2: number, edgeId: number, weight: number) {

        let forward = function (edgeId, weight, node1, node2) {
            return function () {
                higlightEdgeText(edgeId);
                highlightThisEdge(edgeId);
                writeTotalWeight(weight);
                selectNodes(node1, node2, false);
            };
        }(edgeId, weight, node1, node2);

        let backward = function (edgeId, weight, node1, node2) {
            return function () {
                selectThisEdge(edgeId);
                dehighlightEdgeText(edgeId);
                writeTotalWeight(-weight);
                selectNodes(node1, node2, true);
                selectEdgeText(edgeId);
            };
        }(edgeId, weight, node1, node2);

        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    }

    dehighlightEdge(node1: number, node2: number, edgeId: number) {
        let forward = function (edgeId, node1, node2) {
            return function () {
                dehighlightThisEdge(edgeId);
                transparentEdge(edgeId);
                dehighlightThisEdge(edgeId);
                excludeEdgeText(edgeId);
                selectNodes(node1, node2, false);

            };
        }(edgeId, node1, node2);

        let backward = function (edgeId, node1, node2) {
            return function () {
                includeEdgeText(edgeId);
                detransparentEdge(edgeId);
                selectThisEdge(edgeId);
                selectNodes(node1, node2, true);
                selectEdgeText(edgeId);
            };
        }(edgeId, node1, node2);

        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    }

    removeEdge(edgeId: number) {
        let [node1, node2, weight] = getEdgeInfo(edgeId);

        let forward = function (edgeId) {
            return function () {
                removeEdge(edgeId);
            }
        }(edgeId);

        let backward = function (edgeId) {
            return function () {
                addWeightedEdge(edgeId, node1, node2, weight);
            }
        }(edgeId);

        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    }

    addNodeToGraph(x: number, y: number) {
        let forward = function (x, y) {
            return function () {
                addThisNode(x, y);
            }
        }(x, y);

        let backward = function () {
            return function () {
                removeThisNode();
            }
        }();

        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    }

    connectTheseNodes(node1: number, node2: number) {
        let forward = function (node1, node2) {
            return function () {
                connectNodes(node1, node2);
            }
        }(node1, node2);

        let backward = function () {
            return function () {
                removeConnectedNodes();
            }
        }();

        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    }

    selectTheseNodes(node1: number, node2: number) {
        let edge = getEdgeId(node1, node2);
        let forward = function (node1, node2, edge) {
            return function () {
                selectNodes(node1, node2, true);
                selectThisEdge(edge);
                selectEdgeText(edge);
            }
        }(node1, node2, edge);

        let backward = function (node1, node2, edge) {
            return function () {
                selectNodes(node1, node2, false);
                dehighlightThisEdge(edge);
                dehighlightEdgeText(edge);
            }
        }(node1, node2, edge);

        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    }

    excludeEdges(edgeList: any): void {
        let forward = function (edgeList) {
            return function () {
                for (let index in edgeList) {
                    let [node1, node2, weight] = edgeList[index];
                    let currentEdge = getEdgeId(node1, node2);
                    transparentEdge(currentEdge);
                    excludeEdgeText(currentEdge);
                }
            }
        }(edgeList);

        let backward = function (edgeList) {
            return function () {
                for (let index in edgeList) {
                    let [node1, node2, weight] = edgeList[index];
                    let currentEdge = getEdgeId(node1, node2);
                    detransparentEdge(currentEdge);
                    includeEdgeText(currentEdge);
                }
            }
        }(edgeList);

        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    }

    resetMyAll() {
        resetGraphUI();
        manager.clear();
        clearTotalWeight();
        this.setPause();
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

    setPause() {
        this.paused = true;
        manager.pause();
        $("#togglePause").html("Start");
        $('#backward').removeAttr('disabled');
        $('#forward').removeAttr('disabled');
    }

    forward() {
        this.paused = false;
        this.pause();
        manager.next();
    }

    backward() {
        this.paused = false;
        this.pause();
        manager.previous();
    }

    slow() {
        manager.slow();
    }

    medium() {
        manager.medium();
    }

    fast() {
        manager.fast();
    }
}

let viewer: View = new View();