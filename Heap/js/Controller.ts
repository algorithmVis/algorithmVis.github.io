/**
 * File created by Øyvind Liland on 22.02.18.
 */
///<reference path="View.ts"/>
///<reference path="IAlgorithm.ts"/>
///<reference path="EventManager.ts"/>
///<reference path="View.ts"/>
///<reference path="methods.ts"/>
///<reference path="MaxHeapFree.ts"/>

class Controller {
    private algorithm: IAlgorithm;
    private speed: number;
    private algoName: string;

    initController(algo: IAlgorithm) {
        this.algorithm = algo;
        this.algoName = this.algorithm.getName();
        this.speed = 50;
        viewer.changeToCurrentAlgorithm();
        if (algo.getName() == "FreeMode" || algo.getName() == "MaxHeapFree") {
            (<MaxHeapFree>this.algorithm).clearArrayValues();
            (<MaxHeapFree>this.algorithm).maxHeapFreeInit();
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

    setArrow(index: number) {
        viewer.setThisArrow(index);
    }

    connectNodes(child: number, parent: number) {
        viewer.connectThisNodes(child, parent);
    }

    highlightSortElem(index: number, color: string) {
        viewer.highlightThisSortElem(index, color);
    }

    getNameOfCurrentAlgorithm() {
        return this.algorithm.getName();
    }

    getArrayClone() {
        return this.algorithm.getArray().slice(0, this.algorithm.getArray().length);
    }

    displaySize(root: number, size: number) {
        viewer.displayNodeSize(root, size);
    }

    addNode(i: number) {
        this.algorithm.add(i);
    }

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

    exchangeElemAndNodes(index1: number, value1: number, index2: number, value2: number) {
        viewer.exchangeElemAndNodes(index1, value1, index2, value2);
    }

    highlightTwoNodes(index1: number, index2: number, color: string) {
        viewer.highlightTwoNodes(index1, index2, color);
    }

    removeHighlightTwoNodes(index1: number, index2: number, color: string) {
        viewer.removeHighlightTwoNodes(index1, index2, color);
    }

    sortHighlightTwoNodes(arrIndex: number, sortIndex: number, color: string) {
        viewer.sortHighlightTwoNodes(0, sortIndex, "orange");
    }
    setSortValAndDeselect(sortIndex: number, val: any) {
        viewer.setSortValAndDeselect(sortIndex, val);
    }

    getAlgoName() {
        return this.algoName;
    }
}

var control: Controller = new Controller();

