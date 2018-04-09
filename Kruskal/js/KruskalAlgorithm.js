/**
 * File created by Philip Hoang 21.03.18
 */
///<reference path="graphUI.ts"/>
///<reference path="Controller.ts"/>
///<reference path="EventManager.ts"/>
///<reference path="View.ts"/>
///<reference path="methods.ts"/>
var arr = [];
var queue = [];
var currentEdge = 0;
function startKruskal() {
    controller.disableStartButton();
    var edgeList = sortEdges();
    for (var i = 0; i < edgeList.length; i++) {
        arr[i] = i;
        var _a = edgeList[edgeList.length - 1 - i], node1 = _a[0], node2 = _a[1], weight = _a[2];
        currentEdge = getEdgeId(node1, node2);
        writeEdge(currentEdge, node1, node2, weight);
    }
    var j = 0;
    while (edgeList.length > 0) {
        // Optimization -> Stop algorithm after n-1 edges are in the MST
        if (j >= nodes - 1) {
            controller.excludeEdges(edgeList);
            break;
        }
        var _b = edgeList.pop(), node1 = _b[0], node2 = _b[1], weight = _b[2];
        currentEdge = getEdgeId(node1, node2);
        if (connected(node1, node2) == false) {
            controller.selectTwoNodes(node1, node2);
            controller.highlightEdgeText(currentEdge);
            controller.highlightMyEdge(currentEdge);
            union(node1, node2);
            controller.addWeightToSum(weight);
            j++;
        }
        else {
            controller.dehighlightMyEdge(currentEdge);
            controller.transparentMyEdge(currentEdge);
            controller.excludeEdgeText(currentEdge);
        }
        controller.deselectTwoNodes(node1, node2);
    }
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
