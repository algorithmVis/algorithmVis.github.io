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

    transparentEdge(edgeId: number) {
        var forward = function (edgeId) {
            return function () {
                transparentEdge(edgeId);
            }
        }(edgeId);

        var backward = function (edgeId) {
            return function () {
                detransparentEdge(edgeId);
            }
        }(edgeId);

        manager.addEvent(new FrontendEvent(forward, backward, this.highlightEventDuration));
    }

    detransparentEdge(edgeId: number) {
        var forward = function (edgeId) {
            return function () {
                detransparentEdge(edgeId);
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
        var forward = function() {
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
        var forward = function() {
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

    resetAll() {
        resetGraphUI();
        manager = new EventManager();
        manager.pause();
        manager.nextEvents = new Array;
        manager.previousEvents = new Array;
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
}

var viewer: View = new View();