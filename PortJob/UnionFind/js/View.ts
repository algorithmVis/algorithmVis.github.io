/**
 * File created by Kenneth Apeland 01.02.18
 */

///<reference path="Controller.ts"/>
///<reference path="EventManager.ts"/>
///<reference path="StateController.ts"/>
///<reference path="methods.ts"/>
///<reference path="QuickFind.ts"/>
///<reference path="WeightedUnion.ts"/>
///<reference path="QuickUnion.ts"/>


declare var $;

class View implements IView {
    colors: string[] = ["#7FFF00", "not used", "#FFB366"];
    arrayIsReset: boolean = false;
    k: number = 0
    kLeft: number = 0
    kRight: number = 0;
    currentAlgorithmName: string = "Union Find";
    paused: boolean = false;
    animSpeed: number = 500;
    listOfAlgorithms: string[] = ["QuickFind", "QuickUnion", "WeightedUnion", "QuickUnionPathCompression", "WeightedUnionPathCompression"];
    currentAlgorithm: number = 0;

    //ok??? - Tror det ja.
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
        let twoDimRelationshipsJSON = JSON.parse(JSON.stringify(twoDimRelationships));
        let arrJSON = JSON.parse(JSON.stringify(backendArray));
        stepper.saveState(twoDimRelationshipsJSON, arrJSON);
    }

    setThisArrow(index: number) {
        setArrow(index);
    }

    setValueAtThisIndex(i: number, bValue: number) {
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

    //executeSaveMethodInJavaScript(clonedBackendArray)

    highlightThisNode(index: number, color: string) {
        highlightNode(index, color);
    }

    removeThisHighlight(index: number) {
        removeHighlight(index);
    }

    checkMark(aIndex: number, bIndex: number, set: boolean) {
        setCheckMark(set, aIndex, bIndex);
    }

    redCross(aIndex: number, bIndex: number, set: boolean) {
        setWrongMark(set, aIndex, bIndex);
    }

    setThisState(relationships: JSON, backendArray: JSON) {
        setState(backendArray.parse("\\'%s\\'"), relationships.parse("\\'%s\\'"));
    }

    stepBack(twoDimRelationshipsJSON: string, backendArray: string) {
        this.step("backward", twoDimRelationshipsJSON, backendArray);
    }

    stepForward(twoDimRelationshipsJSON: string, backendArray: string) {
        this.step("forward", twoDimRelationshipsJSON, backendArray);
    }

    step(dir: string, twoDimRelationshipsJSON: string, backendArray: string) {
        let relationships: JSON = JSON.parse(JSON.stringify(twoDimRelationshipsJSON));
        let backendArr: JSON = JSON.parse(JSON.stringify(backendArray));
        if (dir === "forward")
            stepper.stepForward(relationships, backendArr);
        else if (dir === "backward")
            stepper.stepBack(relationships, backendArr);
    }

    //executeScripts()
    //javascriptReady()

    nextAlgorithm() {
        this.incrementAlgorithmIndex();
        this.changeToCurrentAlgorithm();
    }

    resetAll() {
        let arr: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
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

    incrementAlgorithmIndex() {

    }

    screenLockThis(locked: boolean) {
        let lck = function (lock: boolean) {
            return function () {
                screenLock(lock);
            }
        }(locked);

        manager.addEvent(new FrontendEvent(lck, lck, this.animSpeed));
    }

    union(indexA: number, indexB: number) {
        control.union(indexA, indexB);
    }

    connected(indexA: number, indexB: number) {
        control.connected(indexA, indexB);
    }

    find(index: number) {
        control.find(index);
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
            case "QuickUnion": {
                control.initController(new QuickUnion(10));
                break;
            }
            case "QuickFind": {
                control.initController((new QuickFind(10)));
                break;
            }
            case "WeightedUnion": {
                control.initController(new WeightedUnion(10));
                break;
            }
            case "QuickUnionPathCompression": {
                break;
            }
            case "WeightedUnionPathCompression": {
                break;
            }
            default: {
                control.initController(new QuickFind(10));
                break;
            }
        }
    }

    displayNodeSize(root: number, size: number) {

    }

    executeSaveMethodInJavaScript(clone: any) {

    }
}

var viewer: View = new View();