/**
 * File created by Philip Hoang 21.03.18
 */

///<reference path="graphUI.ts"/>
///<reference path="graphController.ts"/>
///<reference path="EventManager.ts"/>
///<reference path="View.ts"/>

var visited: boolean [];
var arr: number[] = [];
var queue: number [] = [];
var currentEdge: number = 0;

/*
let triplets: any[] = [];

triplets[0] = [1, "s", true];
triplets[1] = ["t", 2, false];
let [a, b, c] = triplets[0];

console.log(a + " " + b + " " + c);
*/

function startKruskal() {
    exampleGraph1();


    let edgeList = sortEdges();

    for (let i = 0; i < edgeList.length; i++) {
        arr[i] = i;
    }


    while (edgeList.length > 0) {
        let [node1, node2, weight] = edgeList.pop();
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


function simpleFind(index: number) {
    let root: number = index;

    while (root != arr[root]) {
        root = arr[root];
    }

    return root;
}

function connected(aIndex: number, bIndex: number){
    let aRoot = simpleFind(aIndex);
    let bRoot = simpleFind(bIndex);
    console.log("a " + aRoot);
    console.log("b " + bRoot);

    let connected: boolean = (aRoot == bRoot);
    console.log(connected);
    return connected;
}

function union(aIndex: number, bIndex: number) {
    let aRoot = simpleFind(aIndex);
    let bRoot = simpleFind(bIndex);

    if (aRoot != bRoot) {
        arr[aRoot] = bRoot;
    }
}

function sortEdges() {
    let temp = 0;
    let sorted = triplets;
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
    return sorted;
}