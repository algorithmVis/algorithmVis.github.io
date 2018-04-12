/**
 * File created by Philip Hoang 21.03.18
 */

///<reference path="graphUI.ts"/>
///<reference path="Controller.ts"/>
///<reference path="EventManager.ts"/>
///<reference path="View.ts"/>
///<reference path="methods.ts"/>

let arr: number[] = [];
let queue: number[] = [];
let currentEdge: number = 0;

function startKruskal() {
    let edgeList = sortEdges();

    for (let i = 0; i < edgeList.length; i++) {
        arr[i] = i;

        let [node1, node2, weight] = edgeList[edgeList.length - 1 - i];
        currentEdge = getEdgeId(node1, node2);
        writeEdge(currentEdge, node1, node2, weight);
    }

    let j: number = 0;

    while (edgeList.length > 0) {
        // Optimization -> Stop algorithm after n-1 edges are in the MST
        if (j >= nodes - 1) {
            controller.excludeEdges(edgeList);
            break;
        }

        let [node1, node2, weight] = edgeList.pop();
        currentEdge = getEdgeId(node1, node2);
        controller.selectTwoNodes(node1, node2);

        if (connected(node1, node2) == false) {
            controller.highlightEdge(node1, node2, currentEdge, weight);
            union(node1, node2);
            j++;

        } else {
            controller.dehighlightEdge(node1, node2, currentEdge);
        }
    }

    arr = [];
    queue = [];
    currentEdge = 0;
}

function find(index: number) {
    let root: number = index;

    while (root != arr[root]) {
        root = arr[root];
    }

    return root;
}

function connected(aIndex: number, bIndex: number) {
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
    if (sorted.length > 0) {
        for (let i = 0; i < sorted.length; i++) {
            for (let j = 0; j < sorted.length; j++) {
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