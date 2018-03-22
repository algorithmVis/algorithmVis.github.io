/**
 * File created by Philip Hoang 21.03.18
 */
///<reference path="graphUI.ts"/>
///<reference path="graphController.ts"/>
///<reference path="eventManager.ts"/>
// /<reference path="methods.ts"/>
var visited;
var queue;
var currentEdge = 0;
function startKruskal() {
    exampleGraph1();
    queue = [];
    console.log("Not sorted: " + weights);
    var sortedWeights = weights.sort();
    console.log("Sorted: " + sortedWeights);
    while (sortedWeights.length > 1) {
        var currentEdge = sortedWeights.pop();
        console.log(currentEdge);
    }
}
