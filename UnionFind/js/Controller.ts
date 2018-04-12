/**
 * File created by Kenneth Apeland 03.02.18.
 */
///<reference path="View.ts"/>
///<reference path="IAlgorithm.ts"/>
///<reference path="EventManager.ts"/>
///<reference path="IView.ts"/>

let iColor = 2;
let jColor = 0;

class Controller {

    private algorithm: IAlgorithm;
    private methodToUse: string = "Union";
    private speed: number;
    private GUI: IView;

    initController(algo: IAlgorithm) {
        manager.start();
        this.algorithm = algo;
        this.speed = 50;
        viewer.changeToCurrentAlgorithm();
        viewer.displayThisArray(this.algorithm.getArray());
    }

    changeSpeed(newSpeed: number) {
        this.speed = newSpeed;
    }

    getSpeed() {
        return this.speed;
    }

    connected(firstIndex: number, secondIndex: number) {
        viewer.screenLockThis(true);
        this.algorithm.connected(firstIndex, secondIndex);
        viewer.screenLockThis(false);
    }

    union(firstIndex: number, secondIndex: number) {
        viewer.screenLockThis(true);
        this.algorithm.union(firstIndex, secondIndex);
        viewer.screenLockThis(false);
    }

    find(index: number) {
        viewer.screenLockThis(true);
        this.algorithm.find(index);
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
}

var control: Controller = new Controller();

