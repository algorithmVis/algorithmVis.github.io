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



    displayArray(array : number[]) {
        let returnString : string = "";
        for (let i of array) {
            returnString = returnString.concat(i + "|");
        }
        return returnString.substr(0, returnString.length - 1);
    }

    selectIndex (index : number, b : boolean) {
        //
    }

    saveState(twoDimRelationships : string, backendArray : string) {
        //json
    }

    setArrow(index: number) {
        //
    }

    setValueAtIndex(i : number, bValue : number) {
        //
    }

    connectedNodes(child : number, parent : number) {

    }

    //executeSaveMethodInJavaScript

    highlightNode(index : number, color : string) {
        //
    }

    removeHighlight(index : number) {
        //
    }

    checkMark(aIndex : number, bIndex : number, set : boolean) {
        //
    }

    redCross(aIndex : number, bIndex : number, set : boolean) {

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
}

var viewer: view = new view();