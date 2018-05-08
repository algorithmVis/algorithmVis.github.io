///<reference path="adjacencyList.ts"/>
///<reference path="graphUI.ts"/>

declare let algorithm: string;
declare let collapse: string;

let nodes: number = 0;
let MAX_NODES: number = 8;
let edges: number = 0;

function graphUIClicked(x: number, y: number) {
    if (nodes < MAX_NODES) {
        if (!checkOverlap(x, y)) {
            addNode(nodes, x, y);
            addNewAdjList(nodes);
            nodes++;
        }
    }
}

function twoNodesClicked(n1: number, n2: number) {
    addEdgeToAdjList(n1, n2);
    addEdge(edges++, n1, n2);
}

function resetAll() {
    resetGraphUI();
    resetAdjList();
    removeVisitedArray();
    manager.clear();
    nodes = 0;
    edges = 0;
    $("#dfs").html("DFS");
    $("#bfs").html("BFS");
    algoRunning = "";
    $('#forward').attr('disabled', 'disabled');
    $('#backward').attr('disabled', 'disabled');
}

function resetForNewAlgo() {
    manager.clear();
    $("#queueUI").find("div.nodeUI").each(function () {
        $(this).remove();
    });
    for (let i = 0; i < edges; i++) {
        $("#edge" + i).css({"stroke": "rgb(0, 0, 0)", "stroke-width": "4"});
    }
    for (let i = 0; i < nodes; i++) {
        $("#node" + i).css({"background-color": "white", "border-color": "black"});
    }

    deselectAllNodes();
    removeVisitedArray();

    for (let i = 0; i < nodes; i++) {
        color.push(false);
    }
}

function checkOverlap(x: number, y: number) {
    let overlap = false;
    $("#graphUI").children().each(function () {
        if (this.id !== "edgeSvg") {
            let pos = $("#" + this.id).position();
            if (pos.left - 35 < x && pos.left + 115 > x && pos.top - 35 < y && pos.top + 115 > y) {
                overlap = true;
            }
        }
    });
    return overlap;
}


/*************************************************************** */

/*******************  Example Graphs  ****************************/
/*************************************************************** */

function exampleGraphStar() {
    resetAll();
    graphUIClicked(73, 98);
    graphUIClicked(287, 230);
    graphUIClicked(266, 49);
    graphUIClicked(470, 82);
    graphUIClicked(573, 290);
    graphUIClicked(472, 464);
    graphUIClicked(201, 485);
    graphUIClicked(49, 325);
    graphUIClicked(298, 227);
    graphUIClicked(281, 235);

    twoNodesClicked(0, 1);
    twoNodesClicked(2, 0);
    twoNodesClicked(1, 3);
    twoNodesClicked(1, 4);
    twoNodesClicked(1, 5);
    twoNodesClicked(1, 6);
    twoNodesClicked(1, 7);
    twoNodesClicked(1, 2);
    twoNodesClicked(2, 3);
    twoNodesClicked(3, 4);
    twoNodesClicked(4, 5);
    twoNodesClicked(5, 6);
    twoNodesClicked(6, 7);
    twoNodesClicked(7, 0);
    instantCollapseAll();
}

function exampleGraphAllConnected() {
    resetAll();
    graphUIClicked(60, 70);
    graphUIClicked(350, 70);
    graphUIClicked(600, 70);
    graphUIClicked(60, 300);
    graphUIClicked(350, 300);
    graphUIClicked(600, 300);
    graphUIClicked(60, 500);
    graphUIClicked(600, 500);

    twoNodesClicked(0, 1);
    twoNodesClicked(1, 2);
    twoNodesClicked(0, 3);
    twoNodesClicked(0, 4);
    twoNodesClicked(4, 6);
    twoNodesClicked(3, 4);
    twoNodesClicked(2, 5);
    twoNodesClicked(1, 5);
    twoNodesClicked(1, 4);
    twoNodesClicked(3, 6);
    twoNodesClicked(4, 7);
    instantCollapseAll();
}
