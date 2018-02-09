/**
 * File created by Kenneth Apeland 01.02.18
 */
///<reference path="controller.ts"/>
///<reference path="eventManager.ts"/>
///<reference path="stateController.ts"/>
///<reference path="methods.ts"/>
var view = /** @class */ (function () {
    function view() {
        this.colors = ["#7FFF00", "not used", "#FFB366"];
        this.arrayIsReset = false;
        this.k = 0;
        this.kLeft = 0;
        this.kRight = 0;
        this.currentAlgorithmName = "Union Find";
        this.paused = false;
        this.animSpeed = 500;
        this.listOfAlgorithms = ["QuickFind", "QuickUnion", "WeightedUnion", "QuickUnionPathCompression", "WeightedUnionPathCompression"];
        this.currentAlgorithm = 0;
    }
    //ok??? - Tror det ja.
    view.prototype.displayThisArray = function (array) {
        displayArray(JSON.stringify(array));
    };
    view.prototype.selectThisIndex = function (index, b) {
        var forwardSteps = function (index, b) {
            return function () {
                selectIndex(index, b);
            };
        }(index, b);
        var backwardSteps = function (index, b) {
            return function () {
                selectIndex(index, !b);
            };
        }(index, b);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.saveState = function (twoDimRelationships, backendArray) {
        var twoDimRelationshipsJSON = JSON.parse(JSON.stringify(twoDimRelationships));
        var arrJSON = JSON.parse(JSON.stringify(backendArray));
        stepper.saveState(twoDimRelationshipsJSON, arrJSON);
    };
    view.prototype.setThisArrow = function (index) {
        setArrow(index);
    };
    view.prototype.setValueAtThisIndex = function (i, bValue) {
        var forwardSteps = function (i, bValue) {
            return function () {
                setValueAtIndex(i, bValue);
            };
        }(i, bValue);
        var backwardSteps = function (i, bValue) {
            return function () {
                setValueAtIndex(i, i);
            };
        }(i, bValue);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    view.prototype.connectThisNodes = function (child, parent) {
        var forwardSteps = function (child, parent) {
            return function () {
                connectNodes(child, parent);
            };
        }(child, parent);
        var backwardSteps = function (child, parent) {
            return function () {
                connectNodes(child, child);
            };
        }(child, parent);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    //executeSaveMethodInJavaScript(clonedBackendArray)
    view.prototype.highlightThisNode = function (index, color) {
        highlightNode(index, color);
    };
    view.prototype.removeThisHighlight = function (index) {
        removeHighlight(index);
    };
    view.prototype.checkMark = function (aIndex, bIndex, set) {
        setCheckMark(set, aIndex, bIndex);
    };
    view.prototype.redCross = function (aIndex, bIndex, set) {
        setWrongMark(set, aIndex, bIndex);
    };
    view.prototype.setThisState = function (relationships, backendArray) {
        setState(backendArray.parse("\\'%s\\'"), relationships.parse("\\'%s\\'"));
    };
    view.prototype.stepBack = function (twoDimRelationshipsJSON, backendArray) {
        this.step("backward", twoDimRelationshipsJSON, backendArray);
    };
    view.prototype.stepForward = function (twoDimRelationshipsJSON, backendArray) {
        this.step("forward", twoDimRelationshipsJSON, backendArray);
    };
    view.prototype.step = function (dir, twoDimRelationshipsJSON, backendArray) {
        var relationships = JSON.parse(JSON.stringify(twoDimRelationshipsJSON));
        var backendArr = JSON.parse(JSON.stringify(backendArray));
        if (dir === "forward")
            stepper.stepForward(relationships, backendArr);
        else if (dir === "backward")
            stepper.stepBack(relationships, backendArr);
    };
    //executeScripts()
    //javascriptReady()
    view.prototype.nextAlgorithm = function () {
        this.incrementAlgorithmIndex();
        this.changeToCurrentAlgorithm();
    };
    view.prototype.resetAll = function () {
    };
    view.prototype.changeToCurrentAlgorithm = function () {
        this.resetAll();
        setHeaderText(control.getNameOfCurrentAlgorithm());
    };
    view.prototype.resetArray = function (arr) {
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var i = arr_1[_i];
            setValueAtIndex(i, i);
        }
    };
    view.prototype.incrementAlgorithmIndex = function () {
    };
    view.prototype.screenLockThis = function (locked) {
        var f = function (lock) {
            return function () {
                screenLock(lock);
            };
        }(locked);
        manager.addEvent(new FrontendEvent(f, f, this.animSpeed));
    };
    view.prototype.union = function (indexA, indexB) {
        control.union(indexA, indexB);
    };
    view.prototype.connected = function (indexA, indexB) {
        control.connected(indexA, indexB);
    };
    view.prototype.find = function (index) {
        control.find(index);
    };
    view.prototype.setSlow = function () {
        this.animSpeed = 250;
    };
    view.prototype.setMedium = function () {
        this.animSpeed = 500;
    };
    view.prototype.setFast = function () {
        this.animSpeed = 750;
    };
    view.prototype.switchAlgorithm = function (algo) {
    };
    view.prototype.displayNodeSize = function (root, size) {
    };
    view.prototype.executeSaveMethodInJavaScript = function (clone) {
    };
    return view;
}());
var viewer = new view();
