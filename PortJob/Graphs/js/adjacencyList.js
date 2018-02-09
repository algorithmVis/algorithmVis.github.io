///<reference path="graphStructureController.ts"/>
///<reference path="dfsBfsController.ts"/>
var adjacencyList = [];
function addNewAdjList(nodeId) {
    adjacencyList.push([]);
    $("#adjacencyList").append("<div " +
        "id='adjListDiv" + nodeId + "' " +
        "class='adjListDiv' </div>");
    $("#adjListDiv" + nodeId).append("<p " +
        "id='listIndex" + nodeId + "' " +
        "class='adjListText adjListIndex'" +
        ">" + nodeId + "</p>");
    $("#adjListDiv" + nodeId).append("<p " +
        "id='adjList" + nodeId + "' " +
        "class='adjList adjListText'" +
        "> [ ] </p>");
    if (collapse == "YES") {
        collapseAdjacencyList(nodeId);
        $("#listIndex" + nodeId).hover(function () {
            expandAdjacencyList(nodeId);
        }, function () {
            collapseAdjacencyList(nodeId);
        });
    }
    else {
        $("#adjList" + nodeId).css({ left: 65 });
    }
}
function addEdgeToAdjList(from, to) {
    if ($.inArray(from, adjacencyList[to]) == -1) {
        adjacencyList[to].push(from);
        $("#adjList" + to).html("" + getAdjListAsText(to));
    }
    if ($.inArray(to, adjacencyList[from]) == -1) {
        adjacencyList[from].push(to);
        $("#adjList" + from).html("" + getAdjListAsText(from));
    }
    if (collapse == "YES") {
        instantCollapseAll();
    }
}
function getAdjListAsText(node) {
    var returnString = "[ ";
    for (var i = 0; i < adjacencyList[node].length; i++) {
        returnString += adjacencyList[node][i] + (i == adjacencyList[node].length - 1 ? " ]" : ", ");
    }
    return returnString;
}
function resetAdjList() {
    adjacencyList = [];
    $("#adjacencyList div").each(function () {
        $(this).remove();
    });
}
