/**
 * File created by Kenneth Apeland 01.02.18
 */

///<reference path="Controller.ts"/>
///<reference path="EventManager.ts"/>
///<reference path="StateController.ts"/>
///<reference path="methods.ts"/>
///<reference path="MaxHeap.ts"/>
// /<reference path="MaxHeapFree.ts"/>


declare var $;

class View implements IView {

    colors: string[] = ["#7FFF00", "not used", "#FFB366"];
    arrayIsReset: boolean = false;
    k: number = 0
    currentAlgorithmName: string = "MaxHeap";
    paused: boolean = false;
    animSpeed: number = 500;

    displayThisArray(array: number[]) {
        displayArray(JSON.stringify(array));
    }

    selectThisIndex(index: number, b: boolean) {
        let forwardSteps = function (index, b) {
            return function () {
                selectIndex(index, b);
            }
        }(index, b);

        let backwardSteps = function (index, b) {
            return function () {
                selectIndex(index, !b);
            }
        }(index, b);

        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    }

    saveState(twoDimRelationships: string, backendArray: string) {
        let twoDimRelationshipsJSON = JSON.parse(twoDimRelationships);
        let arrJSON = JSON.parse(backendArray);
        stepper.saveState(twoDimRelationshipsJSON, arrJSON);
    }

    setThisArrow(index: number) {
        let forward = function (index) {
            return function () {
                setArrow(index);
            }
        }(index);
        let backward = function (index) {
            return function () {
                setArrow(index)
            }
        }(index);

        manager.addEvent(new FrontendEvent(forward, forward, this.animSpeed));
    }

    setValueAtThisIndex(i: number, bValue) {
        let forwardSteps = function (i, bValue) {
            return function () {
                setValueAtIndex(i, bValue);
            }
        }(i, bValue);

        let backwardSteps = function (i, bValue) {
            return function () {
                setValueAtIndex(i, i);
            }
        }(i, bValue);

        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    }

    connectThisNodes(child: number, parent: number) {
        let forwardSteps = function (child, parent) {
            return function () {
                connectNodes(child, parent);
            }
        }(child, parent);

        let backwardSteps = function (child, parent) {
            return function () {
                connectNodes(child, child);
            }
        }(child, parent);

        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    }

    highlightThisNode(index: number, color: string) {
        let forward = function (index: number, color: string) {
            return function () {
                highlightNode(index, color);
            }
        }(index, color);

        manager.addEvent(new FrontendEvent(forward, forward, this.animSpeed));
    }

    removeThisHighlight(index: number) {
        let forward = function (index: number) {
            return function () {
                removeHighlight(index);
            }
        }(index);

        manager.addEvent(new FrontendEvent(forward, forward, this.animSpeed));
    }

    checkMark(aIndex: number, bIndex: number, set: boolean) {
        let forward = function (aIndex: number, bIndex: number, set: boolean) {
            return function () {
                setCheckMark(set, aIndex, bIndex);
            }
        }(aIndex, bIndex, set);

        manager.addEvent(new FrontendEvent(forward, forward, this.animSpeed));
    }

    redCross(aIndex: number, bIndex: number, set: boolean) {
        let forward = function (aIndex: number, bIndex: number, set: boolean) {
            return function () {
                setWrongMark(set, aIndex, bIndex);

            }
        }(aIndex, bIndex, set);

        manager.addEvent(new FrontendEvent(forward, forward, this.animSpeed));
    }

    setThisState(relationships: JSON, backendArray: JSON) {
        setState(JSON.stringify(backendArray).toString(), JSON.stringify(relationships).toString());
    }

    stepBack(twoDimRelationshipsJSON: string, backendArray: string) {
        this.step("backward", twoDimRelationshipsJSON, backendArray);
    }

    stepForward(twoDimRelationshipsJSON: string, backendArray: string) {
        this.step("forward", twoDimRelationshipsJSON, backendArray);
    }

    step(dir: string, twoDimRelationshipsJSON: string, backendArray: string) {
        let relationships: JSON = JSON.parse(twoDimRelationshipsJSON);
        let backendArr: JSON = JSON.parse(backendArray);
        if (dir === "forward")
            stepper.stepForward(relationships, backendArr);
        else if (dir === "backward")
            stepper.stepBack(relationships, backendArr);
    }

    resetAll() {
        let arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        stepper = new StateController(control, this);

        this.resetArray(arr);
        this.displayThisArray(arr);
    }

    changeToCurrentAlgorithm() {
        this.resetAll();
        setHeaderText(control.getNameOfCurrentAlgorithm());
    }

    resetArray(arr: number[]) {
        for (let i of arr)
            setValueAtIndex(i, i);
    }

    screenLockThis(locked: boolean) {
        let lck = function (lock: boolean) {
            return function () {
                screenLock(lock);
            }
        }(locked);

        manager.addEvent(new FrontendEvent(lck, lck, this.animSpeed));
    }

    setSlow() {
        this.animSpeed = 250;
    }

    setMedium() {
        this.animSpeed = 500;
    }

    setFast() {
        this.animSpeed = 750;
    }

    switchAlgorithm(algo: string) {
        switch (algo) {
            case "MaxHeap": {
                this.resetAll();
                control.initController(new MaxHeap(10));
                break;
            }
            case "MaxHeapFree": {
                this.resetAll();
                control.initController(new MaxHeapFree(10));
                break;
            }
            case "BuildHeap": {
                this.resetAll();
                control.initController(new BuildHeap(10));
                break;
            }
            default: {
                control.initController(new MaxHeap(10));
                break;
            }
        }
    }

    displayNodeSize(root: number, size: number) {

    }

    /**
     * Må implementeres for å få backward/forward til å fungere
     * @param clone
     */
    executeSaveMethodInJavaScript(clone: number[]) {
        let arr: string = JSON.stringify(clone).toString();
        saveState(arr);
    }

    addNode(val: number) {
        control.addNode(val);
        setOnClickListener();
        setKeyListener();
        setupRadio();
    }

    removeNode() {
        control.removeNode();
    }

    swapNode(child: number, parent: number) {
        let forward = function (child, parent) {
            return function () {
                swapNodes(child, parent);
            }
        }(child, parent);

        let backward = function (child, parent) {
            return function () {
                swapNodes(parent, child);
            }
        }(child, parent);
        manager.addEvent(new FrontendEvent(forward, backward, 1000));
    }

    removeElem(i: number, removeArr: boolean) {
        let forward = function (index, removeArr) {
            return function () {
                removeElem(index, removeArr);
            }
        }(i, removeArr);

        manager.addEvent(new FrontendEvent(forward, forward, manager.delayTime));
    }
}

var viewer: View = new View();
