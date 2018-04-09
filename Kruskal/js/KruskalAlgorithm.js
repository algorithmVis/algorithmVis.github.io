/**
 * File created by Philip Hoang 21.03.18
 */
///<reference path="graphUI.ts"/>
///<reference path="Controller.ts"/>
///<reference path="EventManager.ts"/>
///<reference path="View.ts"/>
var arr = [];
var queue = [];
var currentEdge = 0;
function startKruskal() {
    controller.disableStartButton();
    var edgeList = sortEdges();
    for (var i = 0; i < edgeList.length; i++) {
        arr[i] = i;
    }
    var sum = 0;
    var j = 0;
    while (edgeList.length > 0) {
        var _a = edgeList.pop(), node1 = _a[0], node2 = _a[1], weight = _a[2];
        currentEdge = getEdgeId(node1, node2);
        writeEdge(currentEdge, node1, node2, weight);
        controller.selectTwoNodes(node1, node2);
        controller.highlightEdgeText(currentEdge);
        controller.highlightMyEdge(currentEdge);
        console.log("Edge: " + currentEdge);
        if (connected(node1, node2) == false) {
            union(node1, node2);
            sum = sum + weight;
            controller.addWeightToSum(sum);
        }
        else {
            controller.dehighlightMyEdge(currentEdge);
            controller.transparentMyEdge(currentEdge);
            controller.excludeEdgeText(currentEdge);
        }
        controller.deselectTwoNodes(node1, node2);
        j++;
    }
    /*
    swapTwoElements(0, 1);
    swapTwoElements(1,2);
*/
    arr = [];
    queue = [];
    currentEdge = 0;
    controller.enableStartButtion();
}
function find(index) {
    var root = index;
    while (root != arr[root]) {
        root = arr[root];
    }
    return root;
}
function connected(aIndex, bIndex) {
    var aRoot = find(aIndex);
    var bRoot = find(bIndex);
    var connected = (aRoot == bRoot);
    return connected;
}
function union(aIndex, bIndex) {
    var aRoot = find(aIndex);
    var bRoot = find(bIndex);
    if (aRoot != bRoot) {
        arr[aRoot] = bRoot;
    }
}
function sortEdges() {
    var temp = 0;
    var sorted = triplets;
    console.log(triplets);
    console.log(sorted);
    if (sorted.length > 0) {
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
    }
    return sorted;
}
