/**
 * File created by Philip Hoang 21.03.18
 */
///<reference path="graphUI.ts"/>
///<reference path="graphController.ts"/>
///<reference path="EventManager.ts"/>
///<reference path="View.ts"/>
var visited;
var queue;
var currentEdge = 0;
/*
let triplets: any[] = [];

triplets[0] = [1, "s", true];
triplets[1] = ["t", 2, false];
let [a, b, c] = triplets[0];

console.log(a + " " + b + " " + c);
*/
function startKruskal() {
    exampleGraph1();
    var edgeList = sortEdges();
    console.log(edgeList);
    var _a = edgeList[0], node1 = _a[0], node2 = _a[1], weight = _a[2];
}
function highlightMe() {
    //$("#edge" + getEdgeId(0,1)).css({"stroke": "rgb(16, 130, 219)", "stroke-width": "6"});
    highilightThisEdge(1, true);
}
function sortEdges() {
    var temp = 0;
    var sorted = triplets;
    for (var i = 0; i < sorted.length; i++) {
        for (var j = 0; j < sorted.length; j++) {
            var _a = sorted[i], a = _a[0], b = _a[1], c = _a[2];
            var _b = sorted[j], d = _b[0], e = _b[1], f = _b[2];
            if (c < f) {
                temp = sorted[i];
                sorted[i] = sorted[j];
                sorted[j] = temp;
            }
        }
    }
    return sorted;
}
