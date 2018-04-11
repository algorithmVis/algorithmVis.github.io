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

function startBfs(startIndex: number) {
    resetVisited(nodes);
    bfsQueue = [];
    currentNode = startIndex;

    bfsQueue.push(startIndex);

    while (bfsQueue.length != 0) {
        let v = bfsQueue.shift();
        popFromBfsQueue(v);
        visit(v);

        let adjacent = adjacencyList[v];
        for (let i = 0; i < adjacent.length; i++) {
            let w: number = adjacent[i];
            if (!visited[w] && $.inArray(w, bfsQueue)) {
                addToBfsQueue(w);
                bfsQueue.push(w);
            }
        }
    }

    resetAfterSearch();
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

    let backwards = function (id) {
        return function () {
            addQueueElement(id);
        };
    }(v);

    manager.addEvent(new FrontendEvent(forward, backwards, visitEventDuration))
}


function startDfs(startIndex: number) {
    resetVisited(nodes);
    currentNode = startIndex;
    dfs(startIndex);
    resetAfterSearch();
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

    let backwards = function (id, h) {
        return function () {
            if (h) {
                $("#edge" + id).css({"stroke": "rgb(0, 0, 0)", "stroke-width": "4"});
            } //remove highlight
            else {
                $("#edge" + id).css({"stroke": "rgb(16, 130, 219)", "stroke-width": "6"});
            } // add highlight
        };
    }(edgeId, highlight);

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

    let backwards = function (v, curr) {
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
    let forward = function (curr) {
        return function () {
            $("#node" + curr).css("border", "6px solid black");
            for (let i = 0; i < nodes; i++) {
                $("#node" + i).css("background-color", "white");
            }
        };
    }(currentNode);

    let backwards = function (curr) {
        return function () {
            $("#node" + curr).css("border", "6px solid rgb(16, 130, 219)");
            for (let i = 0; i < nodes; i++) {
                $("#node" + i).css("background-color", "rgb(80, 250, 80)");
            }
        };
    }(currentNode);

    manager.addEvent(new FrontendEvent(forward, backwards, visitEventDuration));
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