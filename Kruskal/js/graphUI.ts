///<reference path="Controller.ts"/>
///<reference path="KruskalAlgorithm.ts"/>
///<reference path="View.ts"/>
///<reference path="EventManager.ts"/>

declare var $;

var edgeIdList: number[][] = [[]];
var weights: number[] = [];
let triplets: any[] = [];

function addNode(id: number, xPos: number, yPos: number) {
    edgeIdList.push([]);
    $("#graphUI").append("<div id='node" + id + "' class='nodeUI' style='left:" + (xPos - 40) + "px; top:" + (yPos - 40) + "px;'><p>" + id + "</p></div>");
}

function removeNode(id: number) {
    $("#node" + id).remove();
}

function addEdge(id: number, node1: number, node2: number) {
    edgeIdList[node1][node2] = id;
    edgeIdList[node2][node1] = id;
    var r: number = getNodeWidth(node1) / 2;
    var p1 = getNodePosition(node1), p2 = getNodePosition(node2);
    var line = parseLine(id, p1.left + r, p1.top + r, p2.left + r, p2.top + r);
    document.getElementById('edgeSvg').appendChild(line);
}

function addWeightedEdge(id: number, n1: number, n2: number, weight: number) {
    addEdge(id, n1, n2);
    addNodeAndEdge(id, n1, n2, weight);
    var edge = $("#edge" + id);
    var x1: number = parseInt(edge.attr("x1")), y1: number = parseInt(edge.attr("y1"));
    var x2: number = parseInt(edge.attr("x2")), y2: number = parseInt(edge.attr("y2"));
    var x: number = x1 + (x2 - x1) / 2, y: number = y1 + (y2 - y1) / 2;
    var normal = getNormal(x1, y1, x2, y2);
    var unit = getUnit(normal.x, normal.y);
    var unitScale = 25;
    $("#graphUI").append("<p id='edgeWeight" + id + "' " +
        "class='edgeWeight' " +
        "style='top: " + (y + unitScale * unit.y) + "px; left: " + (x + unitScale * unit.x) + "px'>" +
        weight + "</p>");
}

function removeWeightedEdge(id: number) {
    $("#edge" + id).remove();
    $("#edgeWeight" + id).remove();
}

function addNodeAndEdge(id: number, node1: number, node2: number, weight: number) {
    triplets[id] = [node1, node2, weight];
}

function getEdgeInfo(id: number) {
    return triplets[id];
}


function resetGraphUI() {
    $("#graphUI div.nodeUI").each(function () {
        $(this).remove();
    });
    $("#graphUI p.edgeWeight").each(function () {
        $(this).remove();
    });
    $("#edgeSvg line").each(function () {
        $(this).remove();
    });
    $("#queueUI div").each(function () {
        $(this).remove();
    });

    edgeIdList = [[]];
    weights = [];
    triplets = [];
}

function parseLine(id: number, x1: number, y1: number, x2: number, y2: number) {
    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute("id", "edge" + id);
    line.setAttribute("x1", x1 + "");
    line.setAttribute("y1", y1 + "");
    line.setAttribute("x2", x2 + "");
    line.setAttribute("y2", y2 + "");
    return line;
}


function getEdgeId(v: number, w: number) {
    return edgeIdList[v][w];
}

function getNodePosition(id: number) {
    return $("#node" + id).position();
}

function getNormal(x1: number, y1: number, x2: number, y2: number) {
    var dx = x2 - x1, dy = y2 - y1;
    return { x: -dy, y: dx };
}

function getUnit(x, y) {
    var length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    return { x: x / length, y: y / length };
}

function deselectTwoNodes(n1: number, n2: number) {
    $("#node" + n1).removeClass("selected");
    $("#node" + n2).removeClass("selected");
}

function getNodeWidth(id: number) {
    return $("#node" + id).outerWidth();
}