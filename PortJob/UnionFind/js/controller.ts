/**
 * File created by Kenneth Apeland 03.02.18.
 */
///<reference path="view.ts"/>
let iColor = 2;
let jColor = 0;

class controller {

    //algorithm og methodToUse skal ikke være string, men dei e det for nå
    //programmet vil ikje fungere
    private algorithm : String;
    private methodToUse : string = "Union";
    private speed: number;

    initController (algo : string) {
        this.algorithm = algo;
        this.speed = 50;
        viewer.displayArray(this.algorithm.getArray());
    }

    changeSpeed(newSpeed : number) {
        this.speed = newSpeed;
    }

    getSpeed() {
        return this.speed;
    }

    connected(firstIndex : number, secondIndex : number) {
        viewer.screenLock(true);
        //Kossen gjør eg detta??
        this.algorithm.connected(firstIndex, secondIndex);
        viewer.screenLock(false);
    }

    union(firstIndex : number, secondIndex : number) {
        viewer.screenLock(true);
        //samme som over
        this.algorithm.union(firstIndex, secondIndex);
        viewer.screenLock(false);
    }

    find(index : number) {
        viewer.screenLock(true);
        //SEND HELP PLEASE
        this.algorithm.union(firstIndex, secondIndex);
        viewer.screenLock(false);
    }

    setArrow(index : number) {
        viewer.setArrow(index);
    }

    setSelectedIndex(index : number, select : boolean) {
        viewer.selectIndex(index, select);
    }

    setValueAtIndex(i : number, bValue : number) {
        viewer.setValueAtIndex(i, bValue);
    }

    connectNodes(child : number, parent : number) {
        viewer.connectNodes(child, parent);
    }

    highlightNode(index : number, color : string) {
        viewer.highlightNode(index, color);
    }

    invertPauseState() {
        this.algorithm.invertPause();
    }

    setAlgorithm(algo : string) {
        this.algorithm = algo;
    }

    removeHighlight(node : number) {
        viewer.removeHighlight(node);
    }

    setMethodToUse(methodToUse : string) {
        this.methodToUse = methodToUse;
    }

    getNameOfCurrentAlgorithm() {
        return this.algorithm;
    }

    getArrayClone() {
        return this.algorithm.getArray().clone();
    }

    setArray(array : number[]) {
        this.algorithm.setArray(array);
    }

    checkMark(aIndex : number, bIndex : number, set : boolean) {
        viewer.checkMark(aIndex, bIndex, set);
    }

    redCross(aIndex : number, bIndex : number, set : boolean) {
        viewer.redCross(aIndex, bIndex, set);
    }

    displaySize(root : number, size : number) {
        viewer.displayNodeSize(root, size);
    }

    saveState(arr : number[]) {
        viewer.executeSaveMethodInJavaScript(arr.clone());
    }
}

var control: controller = new controller();

