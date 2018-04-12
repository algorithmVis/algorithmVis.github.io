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
///<reference path="QuickUnionPathCompression.ts"/>
///<reference path="WeightedUnionPathCompression.ts"/>


declare var $;

class View implements IView {
    colors: string[] = ["#7FFF00", "not used", "#FFB366"];
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

    nextAlgorithm() {
        this.changeToCurrentAlgorithm();
    }

    resetAll() {
        let arr: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        stepper = new StateController(control, this);
        $("#arrow").addClass("hidden").animate({ left: ($("#arrayElem0").position().left + 9) + "px" }, 0);
        this.resetArrayColors();
        screenLock(false);
        manager.clear()
        this.resetArray(arr);
        this.displayThisArray(arr);
    }

    resetArrayColors() {
        $("#arrayUL li").removeClass("selected");
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
        manager.delayTime = 1500
        this.restartManager();
    }

    setMedium() {
        manager.delayTime = 1000;
        this.restartManager();
    }

    setFast() {
        manager.delayTime = 500;
        this.restartManager();
    }

    restartManager() {
        manager.pause();
        manager.start()
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
                control.initController(new QuickUnionPathCompression(10));
                break;
            }
            case "WeightedUnionPathCompression": {
                control.initController(new WeightedUnionPathCompression(10));
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

    executeSaveMethodInJavaScript(clone: number[]) {
        let arr: string = JSON.stringify(clone).toString();
        saveState(arr);
    }
}

var viewer: View = new View();
