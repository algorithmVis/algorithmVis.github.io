/**
 * File created by Kenneth Apeland 01.02.18
 */

///<reference path="controller.ts"/>
declare var $;

class view {

    colors: string[] = ["#7FFF00", "not used", "#FFB366"];
    arrayIsReset: boolean = false;
    k: number = 0
    kLeft: number = 0
    kRight: number = 0;
    currentAlgorithmName: string = "Union Find";
    paused: boolean = false;
    animSpeed: number = 500;


    //ok???
    displayThisArray(array : number[]) {
        displayArray(JSON.stringify(array))
    }

    selectThisIndex (index : number, b : boolean) {
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

    saveState(twoDimRelationships : string, backendArray : string) {
        //json
    }

    setThisArrow(index: number) {
        setArrow(index);
    }

    setValueAtThisIndex(i : number, bValue : number) {
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

    connectThisNodes(child : number, parent : number) {
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

    highlightThisNode(index : number, color : string) {
        highlightNode(index, color);
    }

    removeThisHighlight(index : number) {
        removeHighlight(index);
    }

    checkMark(aIndex : number, bIndex : number, set : boolean) {
        setCheckMark(set, aIndex, bIndex);
    }

    redCross(aIndex : number, bIndex : number, set : boolean) {
        setWrongMark(set, aIndex, bIndex);
    }

    //setState()

    stepBack(twoDimRelationshipsJSON : string, backendArray : string) {

    }

    stepForward(twoDimRelationshipsJSON : string, backendArray : string) {

    }

    step(dir : string, twoDimRelationshipsJSON : string, backendArray : string) {

    }

    //executeScripts()
    //javascriptReady()

    nextAlgorithm() {
        incrementAlgorithmIndex();
        changeToCurrentAlgorithm();
    }

    resetAll() {

    }

    changeToCurrentAlgorithm() {
        resetAll();
    }

    resetArray(arr : number[]) {
        for (let i of arr.length)
            setValueAtIndex(i, i);
    }

    incrementAlgorithmIndex(){

    }

    screenLock(locked : boolean) {

    }

    union(indexA : number, indexB : number) {
        control.union(indexA, indexB);
    }

    connected(indexA : number, indexB : number) {
        control.connected(indexA, indexB);
    }

    find(index : number) {
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

    switchAlgorithm() {
        //
    }

    displayNodeSize(root: number, size: number) {
        
    }

    executeSaveMethodInJavaScript(clone: any) {
        
    }
}

var viewer: view = new view();