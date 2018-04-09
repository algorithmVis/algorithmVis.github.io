/**
 * File created by Øyvind Liland on 22.02.18.
 */
///<reference path="View.ts"/>
///<reference path="IAlgorithm.ts"/>
///<reference path="EventManager.ts"/>
///<reference path="IView.ts"/>
///<reference path="methods.ts"/>
///<reference path="MaxHeapFree.ts"/>

class Controller {
    private algorithm: IAlgorithm;
    private speed: number;

    initController(algo: IAlgorithm) {
        this.algorithm = algo;
        this.speed = 50;
        viewer.changeToCurrentAlgorithm();
        if (algo.getName() == "FreeMode") {
            (<MaxHeapFree> this.algorithm).clearArrayValues();
            (<MaxHeapFree> this.algorithm).maxHeapFreeInit();
            manager.start();
        } else {
            this.algorithm.setIndex();
            viewer.displayThisArray(this.algorithm.getArray());
            this.algorithm.removeNodes();
            manager.start();
            this.algorithm.connectNodes();
        }
    }

    getAlgorithm() {
        return this.algorithm;
    }

    lockScreen(b: boolean) {
        viewer.screenLockThis(b);
    }

    setArrow(index: number) {
        viewer.setThisArrow(index);
    }

    setSelectedIndex(index: number, select: boolean) {
        viewer.selectThisIndex(index, select);
    }

    setValueAtIndex(i: number, bValue : any, oldVal : any) {
        viewer.setValueAtThisIndex(i, bValue, oldVal);
    }

    setValueAtSortIndex(i: number, bValue) {
        viewer.setValueAtThisSortIndex(i, bValue);
    }

    connectNodes(child: number, parent: number) {
        viewer.connectThisNodes(child, parent);
    }

    highlightNode(index: number, color: string) {
        viewer.highlightThisNode(index, color);
    }

    highlightSortElem(index: number, color: string) {
        viewer.highlightThisSortElem(index, color);
    }

    removeHighlight(node: number) {
        viewer.removeThisHighlight(node);
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

    displaySize(root: number, size: number) {
        viewer.displayNodeSize(root, size);
    }

    addNode(i: number) {
        this.algorithm.add(i);
    }

    swapNode(child: number, parent: number) {
        viewer.swapNode(child, parent);
    }

    /**
     * Remove the maximum/minimum element
     */
    removeNode() {
        this.algorithm.remove();
    }

    removeElem(i: number, removeArr: boolean) {
        viewer.removeElem(i, removeArr);
    }

    insertNewElem(child: number, value: number, parent: number) {
        viewer.insertNewElemThis(child, value, parent);
    }

    getArrayLength() {
        return this.algorithm.getArrayLength();
    }
}

var control: Controller = new Controller();

