/**
 * File created by Philip Hoang 21.03.18
 */

///<reference path="graphUI.ts"/>
///<reference path="graphController.ts"/>
///<reference path="eventManager.ts"/>
// /<reference path="methods.ts"/>

var visited: boolean [];
var queue: number [];
var currentEdge: number = 0;

let triplets: any[] = [];

triplets[0] = [1, "s", true];
triplets[1] = ["t", 2, false];
let [a, b, c] = triplets[0];

console.log(a + " " + b + " " + c);


function startKruskal() {
    exampleGraph1();

    queue = [];
    console.log("Not sorted: " + weights);
    var sortedWeights = weights.sort();
    console.log("Sorted: "  + sortedWeights);

    while (sortedWeights.length > 1) {
        var currentEdge = sortedWeights.pop();
        console.log(currentEdge);
    }


}