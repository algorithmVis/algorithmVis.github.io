/**
 * File created by Kenneth Apeland 03.02.18.
 */
///<reference path="View.ts"/>
///<reference path="IAlgorithm.ts"/>
///<reference path="EventManager.ts"/>
///<reference path="IView.ts"/>
///<reference path="methods.ts"/>

let iColor = 2;
let jColor = 0;

class Controller {

    //algorithm og methodToUse skal ikke være string, men dei e det for nå
    //programmet vil ikje fungere
    private algorithm: IAlgorithm;
    private methodToUse: string = "Union";
    private speed: number;
    private GUI: IView; // Mulig forskjellig View for ulike algoritmer?

    initController(algo: IAlgorithm) {
        this.algorithm = algo;
        this.speed = 50;
        viewer.changeToCurrentAlgorithm();
        this.algorithm.setIndex();
        viewer.displayThisArray(this.algorithm.getArray());
        manager.start();
        this.algorithm.connectNodes();
    }

    changeSpeed(newSpeed: number) {
        this.speed = newSpeed;
    }

    getSpeed() {
        return this.speed;
    }

    /**
     * Remove the maximum/minimum element
     */
    remove() {
        viewer.screenLockThis(true);
        //this.algorithm.remove();
        viewer.screenLockThis(false);
    }

    union(firstIndex: number, secondIndex: number) {
        viewer.screenLockThis(true);
        //this.algorithm.union(firstIndex, secondIndex);
        viewer.screenLockThis(false);
    }

    setArrow(index: number) {
        viewer.setThisArrow(index);
    }

    setSelectedIndex(index: number, select: boolean) {
        viewer.selectThisIndex(index, select);
    }

    setValueAtIndex(i: number, bValue: number) {
        viewer.setValueAtThisIndex(i, bValue);
    }

    connectNodes(child: number, parent: number) {
        viewer.connectThisNodes(child, parent);
    }

    highlightNode(index: number, color: string) {
        viewer.highlightThisNode(index, color);
    }

    setAlgorithm(algo: IAlgorithm) {
        this.algorithm = algo;
    }

    removeHighlight(node: number) {
        viewer.removeThisHighlight(node);
    }

    setMethodToUse(methodToUse: string) {
        this.methodToUse = methodToUse;
    }

    getNameOfCurrentAlgorithm() {
        return this.algorithm.getName();
    }

    getArrayClone() {
        return this.algorithm.getArray().slice(0, this.algorithm.getArray().length);
    }

    setArray(array: number[]) {
        this.algorithm.setArray(array);
    }

    checkMark(aIndex: number, bIndex: number, set: boolean) {
        viewer.checkMark(aIndex, bIndex, set);
    }

    redCross(aIndex: number, bIndex: number, set: boolean) {
        viewer.redCross(aIndex, bIndex, set);
    }

    displaySize(root: number, size: number) {
        viewer.displayNodeSize(root, size);
    }

    saveState(arr: number[]) {
        viewer.executeSaveMethodInJavaScript(this.getArrayClone());
    }

    addNode(i: number) {
        this.algorithm.add(i);
    }

    swapNode(child: number, parent: number) {
        viewer.swapNode(child, parent);
    }
}

var control: Controller = new Controller();

