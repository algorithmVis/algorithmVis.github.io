/**
 * File created by Philip Hoang 21.03.18
 */

///<reference path="graphUI.ts"/>
///<reference path="graphController.ts"/>
///<reference path="EventManager.ts"/>
///<reference path="View.ts"/>

var visited: boolean [];
var queue: number [];
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
    console.log(edgeList);
    let [node1, node2, weight] = edgeList[0];

}


function highlightMe() {
    //$("#edge" + getEdgeId(0,1)).css({"stroke": "rgb(16, 130, 219)", "stroke-width": "6"});
    highilightThisEdge(1, true);
}

function sortEdges() {
    let temp = 0;
    let sorted = triplets;
    for (var i = 0; i < sorted.length; i++) {
        for (var j = 0; j < sorted.length; j++) {
            let [a, b, c] = sorted[i];
            let [d, e, f] = sorted[j];
            if (c < f) {
                temp = sorted[i];
                sorted[i] = sorted[j];
                sorted[j] = temp;
            }
        }
    }
    return sorted;
}