/**
 * File created by Philip Hoang 21.03.18
 */

///<reference path="graphUI.ts"/>
///<reference path="Controller.ts"/>
///<reference path="EventManager.ts"/>
///<reference path="View.ts"/>

let arr: number[] = [];
let queue: number [] = [];
let currentEdge: number = 0;



function startKruskal() {
    controller.disableStartButton();

    let edgeList = sortEdges();

    for (let i = 0; i < edgeList.length; i++) {
        arr[i] = i;
    }

    while (edgeList.length > 0) {
        let [node1, node2, weight] = edgeList.pop();
        currentEdge = getEdgeId(node1, node2);
        controller.selectTwoNodes(node1, node2);
        controller.highlightMyEdge(currentEdge);
        if (connected(node1, node2) == false) {
            union(node1, node2);
        }
        else {
            controller.dehighlightMyEdge(currentEdge);
            controller.transparentMyEdge(currentEdge);
        }
        controller.deselectTwoNodes(node1, node2);
    }

    arr = [];
    queue = [];
    currentEdge = 0;

    controller.enableStartButtion();
}

function find(index: number) {
    let root: number = index;

    while (root != arr[root]) {
        root = arr[root];
    }

    return root;
}

function connected(aIndex: number, bIndex: number){
    let aRoot = find(aIndex);
    let bRoot = find(bIndex);
    let connected: boolean = (aRoot == bRoot);

    return connected;
}

function union(aIndex: number, bIndex: number) {
    let aRoot = find(aIndex);
    let bRoot = find(bIndex);

    if (aRoot != bRoot) {
        arr[aRoot] = bRoot;
    }
}

function sortEdges() {
    let temp = 0;
    let sorted = triplets;
    console.log(triplets);
    console.log(sorted);
    if (sorted.length > 0) {
        for (var i = 0; i < sorted.length; i++) {
            for (var j = 0; j < sorted.length; j++) {
                let [a, b, c] = sorted[i];
                let [d, e, f] = sorted[j];
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