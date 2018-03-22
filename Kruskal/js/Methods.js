"use strict";
///<reference path="graphUI.ts"/>
///<reference path="graphController.ts"/>
///<reference path="View.ts"/>
var randomWeight = 0;
var nodes = 0;
var MAX_NODES = 8;
var edges = 0;
function highilightThisEdge(index, highlight) {
    if (highlight == true)
        'æ';
    {
        $("#edge" + index).css({ "stroke": "rgb(16, 130, 219)", "stroke-width": "6" });
    } //add highlight
    {
        $("#edge" + index).css({ "stroke": "rgb(0, 0, 0)", "stroke-width": "4" });
    } //remove highlight
}
function removeEdge(index) {
    $("#edge" + index).remove();
    $("#edgeWeight" + index).remove();
}
function addThisNode(x, y) {
    if (nodes < MAX_NODES) {
        addNode(nodes, x, y);
        nodes++;
    }
}
function connectNodes(node1, node2) {
    randomWeight = Math.floor(Math.random() * 10) + 1;
    addWeightedEdge(edges++, node1, node2, randomWeight);
}
function resetGraph() {
    resetGraphUI();
    nodes = 0;
    edges = 0;
    manager = new EventManager();
}
function exampleGraph1() {
    resetGraph();
    // Add nodes
    addThisNode(150, 300);
    addThisNode(320, 450);
    addThisNode(320, 120);
    addThisNode(620, 450);
    addThisNode(620, 120);
    addThisNode(820, 300);
    // Add edges
    connectNodes(0, 1);
    connectNodes(1, 2);
    connectNodes(0, 2);
    connectNodes(2, 3);
    connectNodes(3, 4);
    connectNodes(3, 5);
    connectNodes(4, 5);
    console.log(weights);
}
