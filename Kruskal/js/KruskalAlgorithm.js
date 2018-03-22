/**
 * File created by Philip Hoang 21.03.18
 */
///<reference path="graphUI.ts"/>
///<reference path="graphController.ts"/>
///<reference path="EventManager.ts"/>
///<reference path="View.ts"/>
var visited;
var arr = [];
var queue = [];
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
    for (var i = 0; i < edgeList.length; i++) {
        arr[i] = i;
    }
    while (edgeList.length > 0) {
        var _a = edgeList.pop(), node1 = _a[0], node2 = _a[1], weight = _a[2];
        currentEdge = getEdgeId(node1, node2);
        controller.highlightMyEdge(currentEdge, true);
        if (connected(node1, node2) == false) {
            union(node1, node2);
            controller.highlightMyEdge(currentEdge, true);
        }
        else {
            controller.removeMyEdge(currentEdge);
        }
    }
}
function simpleFind(index) {
    var root = index;
    while (root != arr[root]) {
        root = arr[root];
    }
    return root;
}
function connected(aIndex, bIndex) {
    var aRoot = simpleFind(aIndex);
    var bRoot = simpleFind(bIndex);
    console.log("a " + aRoot);
    console.log("b " + bRoot);
    var connected = (aRoot == bRoot);
    console.log(connected);
    return connected;
}
function union(aIndex, bIndex) {
    var aRoot = simpleFind(aIndex);
    var bRoot = simpleFind(bIndex);
    if (aRoot != bRoot) {
        arr[aRoot] = bRoot;
    }
}
function sortEdges() {
    var temp = 0;
    var sorted = triplets;
    for (var i = 0; i < sorted.length; i++) {
        for (var j = 0; j < sorted.length; j++) {
            var _a = sorted[i], a = _a[0], b = _a[1], c = _a[2];
            var _b = sorted[j], d = _b[0], e = _b[1], f = _b[2];
            if (c > f) {
                temp = sorted[i];
                sorted[i] = sorted[j];
                sorted[j] = temp;
            }
        }
    }
    return sorted;
}
