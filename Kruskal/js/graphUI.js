///<reference path="graphController.ts"/>
var edgeIdList = [[]];
var weights = [];
var triplets = [];
triplets[0] = [1, "s", true];
triplets[1] = ["t", 2, false];
var _a = triplets[0], a = _a[0], b = _a[1], c = _a[2];
console.log(a + " " + b + " " + c);
function addNode(id, xPos, yPos) {
    edgeIdList.push([]);
    $("#graphUI").append("<div id='node" + id + "' class='nodeUI' style='left:" + (xPos - 40) + "px; top:" + (yPos - 40) + "px;'><p>" + id + "</p></div>");
}
function addEdge(id, node1, node2) {
    edgeIdList[node1][node2] = id;
    edgeIdList[node2][node1] = id;
    var r = getNodeWidth(node1) / 2;
    var p1 = getNodePosition(node1), p2 = getNodePosition(node2);
    var line = parseLine(id, p1.left + r, p1.top + r, p2.left + r, p2.top + r);
    document.getElementById('edgeSvg').appendChild(line);
}
function addWeightedEdge(id, n1, n2, weight) {
    addEdge(id, n1, n2);
    weights[id] = weight;
    var edge = $("#edge" + id);
    var x1 = parseInt(edge.attr("x1")), y1 = parseInt(edge.attr("y1"));
    var x2 = parseInt(edge.attr("x2")), y2 = parseInt(edge.attr("y2"));
    var x = x1 + (x2 - x1) / 2, y = y1 + (y2 - y1) / 2;
    var normal = getNormal(x1, y1, x2, y2);
    var unit = getUnit(normal.x, normal.y);
    var unitScale = 25;
    $("#graphUI").append("<p id='edgeWeight" + id + "' " +
        "class='edgeWeight' " +
        "style='top: " + (y + unitScale * unit.y) + "px; left: " + (x + unitScale * unit.x) + "px'>" +
        weight + "</p>");
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
}
function parseLine(id, x1, y1, x2, y2) {
    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute("id", "edge" + id);
    line.setAttribute("x1", x1 + "");
    line.setAttribute("y1", y1 + "");
    line.setAttribute("x2", x2 + "");
    line.setAttribute("y2", y2 + "");
    return line;
}
function getEdgeId(v, w) {
    return edgeIdList[v][w];
}
function getNodePosition(id) {
    return $("#node" + id).position();
}
function getNormal(x1, y1, x2, y2) {
    var dx = x2 - x1, dy = y2 - y1;
    return { x: -dy, y: dx };
}
function getUnit(x, y) {
    var length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    return { x: x / length, y: y / length };
}
function deselectTwoNodes(n1, n2) {
    $("#node" + n1).removeClass("selected");
    $("#node" + n2).removeClass("selected");
}
function getNodeWidth(id) {
    return $("#node" + id).outerWidth();
}
