/**
 * File created by Kenneth Apeland 03.02.18.
 */
///<reference path="view.ts"/>
let iColor = 2;
let jColor = 0;

class controller {
    private algorithm : String;
    private methodName : string = "Union";
    private speed: number;

    initController (algo : string) {
        this.algorithm = algo;
        this.speed = 50;
    }

    changeSpeed(newSpeed : number) {
        this.speed = newSpeed;
    }

    getSpeed() {
        return this.speed;
    }

    connected(firstIndex : number, secondIndex : number) {
        //Kossen gjør eg detta??
        this.algorithm.connected(firstIndex, secondIndex);
    }

    union(firstIndex : number, secondIndex : number) {
        //same shit som over
        this.algorithm.union(firstIndex, secondIndex);
    }

    setArrow(index : number) {
        viewer.setArrow(index);
    }

    connectedNodes(aRoot: any, bRoot: any) {

    }

    setValueAtIndex(aRoot: number, bRoot: number) {

    }

    setSelectedIndex(index : number, bool : boolean) {

    }

    highlightNode(index : number, color : string) {

    }

    checkMark(aIndex : number, bIndex : number, bool : boolean) {

    }

    redCross(aIndex : number, bIndex : number, bool : boolean) {

    }

    removeHighlight(index : number) {

    }
}

var control: controller = new controller();

