/**
 * File created by Knut Anders Stokke, Kristiand Rosland, Ragnhild AAlvik
 * Modified by Philip Hoang 21.03.2018
 */
///<reference path="graphUI.ts"/>
///<reference path="methods.ts"/>
var randomWeight = 0; //Tilfeldig number for hver funksjon kall?
var nodes = 0;
var MAX_NODES = 8;
var edges = 0;
/**
 * Add a node to the graph
 *
 * @param {number} x is the x-position
 * @param {number} y is the y-position
 */
function addThisNode(x, y) {
    if (nodes < MAX_NODES) {
        addNode(nodes, x, y);
        nodes++;
    }
}
/**
 * Connect two nodes and give the edge a weight
 *
 * @param {number} node1 First node
 * @param {number} node2 Second node
 */
function connectTwoNodes(node1, node2) {
    randomWeight = Math.floor(Math.random() * 10) + 1;
    addWeightedEdge(edges++, node1, node2, randomWeight);
}
function resetGraph() {
    resetGraphUI();
    nodes = 0;
    edges = 0;
    manager = new EventManager();
}
function highlightMe() {
    $("#edge" + 4).remove();
    /*
    $("#edge" + 4).each(function () {
        $(this).remove();
    });
    */
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
    connectTwoNodes(0, 1);
    connectTwoNodes(1, 2);
    connectTwoNodes(0, 2);
    connectTwoNodes(2, 3);
    connectTwoNodes(3, 4);
    connectTwoNodes(3, 5);
    connectTwoNodes(4, 5);
    console.log(weights);
}
