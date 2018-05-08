///<reference path="adjacencyList.ts"/>
///<reference path="graphUI.ts"/>
///<reference path="graphStructureController.ts"/>
///<reference path="eventManager.ts"/>
///<reference path="visitedArray.ts"/>

let visited: boolean [];
let bfsQueue: number [];
let currentNode: number;
let highlightEventDuration = 0;
let visitEventDuration = 2000;
let paused = true;
let algoRunning = "";
let color: boolean[] = [];
let colorEdge: boolean[] = [];
let firstNode: boolean;
let BFSfirst: boolean;

function helpStartBfs() {
    if (algoRunning != "BFS") {
        resetForNewAlgo();
        algoRunning = "BFS";
        startBfs(0);
        $("#dfs").html("DFS");
        paused = true;
    }
    togglePauseBfs();
}

function togglePauseBfs() {
    if (paused) {
        manager.start();
        $('#backward').attr('disabled', 'disabled');
        $('#forward').attr('disabled', 'disabled');
        $("#bfs").html("Pause");
        paused = false;

    } else {
        $('#backward').removeAttr('disabled');
        $('#forward').removeAttr('disabled');
        $("#bfs").html("Resume");
        manager.pause();
        paused = true;
    }
}

function startBfs(startIndex: number) {
    resetVisited(nodes);
    bfsQueue = [];
    currentNode = startIndex;
    let lastElemtent: number = 0;
    bfsQueue.push(startIndex);

    while (bfsQueue.length != 0) {
        let v = bfsQueue.shift();
        popFromBfsQueue(v);
        visit(v);
        lastElemtent = v;

        let adjacent = adjacencyList[v];
        for (let i = 0; i < adjacent.length; i++) {
            let w: number = adjacent[i];
            if (!visited[w] && $.inArray(w, bfsQueue)) {
                addToBfsQueue(w);
                bfsQueue.push(w);
            }
        }
    }
    removeHighlighting(lastElemtent);
}

function addToBfsQueue(v: number) {
    let forward = function (id) {
        return function () {
            addQueueElement(id);
        };
    }(v);

    let backwards = function (id) {
        return function () {
            popQueueElement(id);
        };
    }(v);

    manager.addEvent(new FrontendEvent(forward, backwards, visitEventDuration))
}

function popFromBfsQueue(v: number) {
    let forward = function (id) {
        return function () {
            popQueueElement(id);
        };
    }(v);

    let backwards = function (id, BFSfirst) {
        return function () {
            if (!BFSfirst)
                addQueueElement(id);
        };
    }(v, BFSfirst);
    BFSfirst = false;
    manager.addEvent(new FrontendEvent(forward, backwards, visitEventDuration))
}

function helpStartDfs() {
    if (algoRunning != "DFS") {
        resetForNewAlgo();
        algoRunning = "DFS";
        startDfs(0);
        $("#bfs").html("BFS");
        paused = true;
    }
    togglePauseDfs();
}

function togglePauseDfs() {
    if (paused) {
        paused = false;
        manager.start();
        $('#backward').attr('disabled', 'disabled');
        $('#forward').attr('disabled', 'disabled');
        $("#dfs").html("Pause");
    } else {
        paused = true;
        manager.pause();
        $('#backward').removeAttr('disabled');
        $('#forward').removeAttr('disabled');
        $("#dfs").html("Resume");
    }
}

function startDfs(startIndex: number) {
    resetVisited(nodes);
    currentNode = startIndex;
    dfs(startIndex);
    removeHighlighting(startIndex);
}

function dfs(v: number) {
    visit(v);

    let adjacent = adjacencyList[v];
    for (let i = 0; i < adjacent.length; i++) {
        if (visited[adjacent[i]]) continue;
        setHighlightEdge(getEdgeId(v, adjacent[i]), true);
        dfs(adjacent[i]);
        setHighlightEdge(getEdgeId(v, adjacent[i]), false);
        visit(v);
    }
}

function setHighlightEdge(edgeId: number, highlight: boolean) {
    let forward = function (id, h) {
        return function () {
            if (h) {
                $("#edge" + id).css({"stroke": "rgb(16, 130, 219)", "stroke-width": "6"});
            } //add highlight
            else {
                $("#edge" + id).css({"stroke": "rgb(0, 0, 0)", "stroke-width": "4"});
            } //remove highlight
        };
    }(edgeId, highlight);

    let backwards = function (id, bool) {
        return function () {
            if (bool === false) {
                $("#edge" + id).css({"stroke": "rgb(0, 0, 0)", "stroke-width": "4"});
            } else {
                $("#edge" + id).css({"stroke": "rgb(16, 130, 219)", "stroke-width": "6"});
            }
        };
    }(edgeId, colorEdge[edgeId]);
    colorEdge[edgeId] = highlight;
    manager.addEvent(new FrontendEvent(forward, backwards, highlightEventDuration))
}

function visit(id: number) {
    visited[id] = true;
    let forward = function (v, curr) {
        return function () {
            $("#node" + curr).css("border", "6px solid black");
            $("#node" + v).css("background-color", "rgb(80, 250, 80)");
            $("#node" + v).css("border", "6px solid rgb(16, 130, 219)");
            $("#insElemNr" + v).html("<p>" + v + "</p><div> T </div>");
            $("#insElemNr" + v).addClass("marked");
        };
    }(id, currentNode);

    let backwards = function (v, curr, bool, firstNode) {
        return function () {
            if (firstNode) {
                $("#node" + v).css("background-color", "white");
                $("#node" + v).css("border", "6px solid black");
                $("#node" + curr).css("border", "6px solid rgb(0, 0, 0)");
                $("#insElemNr" + v).html("<p>" + v + "</p><div> F </div>");
                $("#insElemNr" + v).removeClass("marked");
            } else {
                if (!bool) {
                    $("#node" + v).css("background-color", "white");
                    $("#node" + v).css("border", "6px solid black");
                    $("#node" + curr).css("border", "6px solid rgb(16, 130, 219)");
                    $("#insElemNr" + v).html("<p>" + v + "</p><div> F </div>");
                    $("#insElemNr" + v).removeClass("marked");
                } else {
                    $("#node" + curr).css("border", "6px solid black");
                    $("#node" + v).css("background-color", "rgb(80, 250, 80)");
                    $("#node" + v).css("border", "6px solid rgb(16, 130, 219)");
                    $("#insElemNr" + v).html("<p>" + v + "</p><div> T </div>");
                    $("#insElemNr" + v).addClass("marked");
                }
            }


        };
    }(id, currentNode, color[id], firstNode);
    color[id] = true;
    firstNode = false;
    manager.addEvent(new FrontendEvent(forward, backwards, visitEventDuration));
    currentNode = id;
}

function removeHighlighting(v: number) {
    let forward = function (v) {
        return function () {
            $("#node" + v).css({"border-color": "black"});
        };
    }(v);

    let backwards = function (v) {
        return function () {
            $("#node" + v).css("border", "6px solid rgb(16, 130, 219)");
        };
    }(v);
    manager.addEvent(new FrontendEvent(forward, backwards, visitEventDuration))
}

function resetVisited(numNodes: number) {
    visited = [];
    for (let i = 0; i < numNodes; i++) visited.push(false);
    setInitialArray();
}

function instantCollapseAll() {
    for (let i = 0; i < nodes; i++) {
        let width: number = $("#adjList" + i).width();
        $("#adjList" + i).css({left: -width});
    }
}

function collapseAdjacencyList(index: number) {
    for (let i = 0; i < nodes; i++) {
        $("#adjList" + i).finish();
    }

    let width: number = $("#adjList" + index).width();
    $("#adjList" + index).animate({left: -width});

}

function expandAdjacencyList(index: number) {
    for (let i = 0; i < nodes; i++) {
        $("#adjList" + i).finish();
        collapseAdjacencyList(i)
    }

    $("#adjList" + index).animate({left: 65}, 350);
}

function stepForward() {
    $('#forward').attr('disabled', 'disabled');
    manager.next();
    setTimeout(function () {
        $('#forward').removeAttr('disabled');
    }, 350);
}

function stepBackwards() {
    $('#backward').attr('disabled', 'disabled');
    manager.previous();
    setTimeout(function () {
        $('#backward').removeAttr('disabled');
    }, 350);
}