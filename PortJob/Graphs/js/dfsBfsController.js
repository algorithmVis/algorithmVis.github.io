///<reference path="adjacencyList.ts"/>
///<reference path="graphUI.ts"/>
///<reference path="graphStructureController.ts"/>
///<reference path="eventManager.ts"/>
///<reference path="visitedArray.ts"/>
var visited;
var bfsQueue;
var currentNode;
var highlightEventDuration = 0;
var visitEventDuration = 2000;
function startBfs(startIndex) {
    resetVisited(nodes);
    bfsQueue = [];
    currentNode = startIndex;
    bfsQueue.push(startIndex);
    while (bfsQueue.length != 0) {
        var v = bfsQueue.shift();
        popFromBfsQueue(v);
        visit(v);
        var adjacent = adjacencyList[v];
        for (var i = 0; i < adjacent.length; i++) {
            var w = adjacent[i];
            if (!visited[w] && $.inArray(w, bfsQueue)) {
                addToBfsQueue(w);
                bfsQueue.push(w);
            }
        }
    }
    resetAfterSearch();
}
function addToBfsQueue(v) {
    var forward = function (id) {
        return function () {
            addQueueElement(id);
        };
    }(v);
    var backwards = function (id) {
        return function () {
            popQueueElement(id);
        };
    }(v);
    manager.addEvent(new FrontendEvent(forward, backwards, visitEventDuration));
}
function popFromBfsQueue(v) {
    var forward = function (id) {
        return function () {
            popQueueElement(id);
        };
    }(v);
    var backwards = function (id) {
        return function () {
            addQueueElement(id);
        };
    }(v);
    manager.addEvent(new FrontendEvent(forward, backwards, visitEventDuration));
}
function startDfs(startIndex) {
    resetVisited(nodes);
    currentNode = startIndex;
    dfs(startIndex);
    resetAfterSearch();
}
function dfs(v) {
    visit(v);
    var adjacent = adjacencyList[v];
    for (var i = 0; i < adjacent.length; i++) {
        if (visited[adjacent[i]])
            continue;
        setHighlightEdge(getEdgeId(v, adjacent[i]), true);
        dfs(adjacent[i]);
        setHighlightEdge(getEdgeId(v, adjacent[i]), false);
        visit(v);
    }
}
function setHighlightEdge(edgeId, highlight) {
    var forward = function (id, h) {
        return function () {
            if (h) {
                $("#edge" + id).css({ "stroke": "rgb(16, 130, 219)", "stroke-width": "6" });
            } //add highlight
            else {
                $("#edge" + id).css({ "stroke": "rgb(0, 0, 0)", "stroke-width": "4" });
            } //remove highlight
        };
    }(edgeId, highlight);
    var backwards = function (id, h) {
        return function () {
            if (h) {
                $("#edge" + id).css({ "stroke": "rgb(0, 0, 0)", "stroke-width": "4" });
            } //remove highlight
            else {
                $("#edge" + id).css({ "stroke": "rgb(16, 130, 219)", "stroke-width": "6" });
            } // add highlight
        };
    }(edgeId, highlight);
    manager.addEvent(new FrontendEvent(forward, backwards, highlightEventDuration));
}
function visit(id) {
    visited[id] = true;
    var forward = function (v, curr) {
        return function () {
            $("#node" + curr).css("border", "6px solid black");
            $("#node" + v).css("background-color", "rgb(80, 250, 80)");
            $("#node" + v).css("border", "6px solid rgb(16, 130, 219)");
            $("#insElemNr" + v).html("<p>" + v + "</p><div> T </div>");
            $("#insElemNr" + v).addClass("marked");
        };
    }(id, currentNode);
    var backwards = function (v, curr) {
        return function () {
            $("#node" + v).css("background-color", "white");
            $("#node" + v).css("border", "6px solid black");
            $("#node" + curr).css("border", "6px solid rgb(16, 130, 219)");
            $("#insElemNr" + v).html("<p>" + v + "</p><div> F </div>");
            $("#insElemNr" + v).removeClass("marked");
        };
    }(id, currentNode);
    manager.addEvent(new FrontendEvent(forward, backwards, visitEventDuration));
    currentNode = id;
}
function resetAfterSearch() {
    var forward = function (curr) {
        return function () {
            $("#node" + curr).css("border", "6px solid black");
            for (var i = 0; i < nodes; i++) {
                $("#node" + i).css("background-color", "white");
            }
        };
    }(currentNode);
    var backwards = function (curr) {
        return function () {
            $("#node" + curr).css("border", "6px solid rgb(16, 130, 219)");
            for (var i = 0; i < nodes; i++) {
                $("#node" + i).css("background-color", "rgb(80, 250, 80)");
            }
        };
    }(currentNode);
    manager.addEvent(new FrontendEvent(forward, backwards, visitEventDuration));
}
function resetVisited(numNodes) {
    visited = [];
    for (var i = 0; i < numNodes; i++)
        visited.push(false);
    setInitialArray();
}
function instantCollapseAll() {
    for (var i = 0; i < nodes; i++) {
        var width = $("#adjList" + i).width();
        $("#adjList" + i).css({ left: -width });
    }
}
function collapseAdjacencyList(index) {
    for (var i = 0; i < nodes; i++) {
        $("#adjList" + i).finish();
    }
    var width = $("#adjList" + index).width();
    $("#adjList" + index).animate({ left: -width });
}
function expandAdjacencyList(index) {
    for (var i = 0; i < nodes; i++) {
        $("#adjList" + i).finish();
        collapseAdjacencyList(i);
    }
    $("#adjList" + index).animate({ left: 65 }, 350);
}
