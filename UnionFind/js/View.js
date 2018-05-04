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
var View = /** @class */ (function () {
    function View() {
        this.colors = ["#7FFF00", "not used", "#FFB366"];
        this.paused = false;
        this.animSpeed = 500;
    }
    View.prototype.displayThisArray = function (array) {
        displayArray(JSON.stringify(array));
    };
    View.prototype.selectThisIndex = function (index, b) {
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
    View.prototype.saveState = function (twoDimRelationships, backendArray) {
        var twoDimRelationshipsJSON = JSON.parse(twoDimRelationships);
        var arrJSON = JSON.parse(backendArray);
        stepper.saveState(twoDimRelationshipsJSON, arrJSON);
    };
    View.prototype.setThisArrow = function (index) {
        var forward = function (index) {
            return function () {
                setArrow(index);
            };
        }(index);
        var backward = function (index) {
            return function () {
                setArrow(index);
            };
        }(index);
        manager.addEvent(new FrontendEvent(forward, forward, this.animSpeed));
    };
    View.prototype.setValueAtThisIndex = function (i, bValue) {
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
    View.prototype.connectThisNodes = function (child, parent) {
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
    View.prototype.highlightThisNode = function (index, color) {
        var forward = function (index, color) {
            return function () {
                highlightNode(index, color);
            };
        }(index, color);
        manager.addEvent(new FrontendEvent(forward, forward, this.animSpeed));
    };
    View.prototype.removeThisHighlight = function (index) {
        var forward = function (index) {
            return function () {
                removeHighlight(index);
            };
        }(index);
        manager.addEvent(new FrontendEvent(forward, forward, this.animSpeed));
    };
    View.prototype.checkMark = function (aIndex, bIndex, set) {
        var forward = function (aIndex, bIndex, set) {
            return function () {
                setCheckMark(set, aIndex, bIndex);
            };
        }(aIndex, bIndex, set);
        manager.addEvent(new FrontendEvent(forward, forward, this.animSpeed));
    };
    View.prototype.redCross = function (aIndex, bIndex, set) {
        var forward = function (aIndex, bIndex, set) {
            return function () {
                setWrongMark(set, aIndex, bIndex);
            };
        }(aIndex, bIndex, set);
        manager.addEvent(new FrontendEvent(forward, forward, this.animSpeed));
    };
    View.prototype.setThisState = function (relationships, backendArray) {
        setState(JSON.stringify(backendArray).toString(), JSON.stringify(relationships).toString());
    };
    View.prototype.stepBack = function (twoDimRelationshipsJSON, backendArray) {
        $('#backward').attr('disabled', 'disabled');
        this.step("backward", twoDimRelationshipsJSON, backendArray);
        setTimeout(function () {
            $('#backward').removeAttr('disabled');
        }, 350);
    };
    View.prototype.stepForward = function (twoDimRelationshipsJSON, backendArray) {
        $('#forward').attr('disabled', 'disabled');
        this.step("forward", twoDimRelationshipsJSON, backendArray);
        setTimeout(function () {
            $('#forward').removeAttr('disabled');
        }, 350);
    };
    View.prototype.step = function (dir, twoDimRelationshipsJSON, backendArray) {
        var relationships = JSON.parse(twoDimRelationshipsJSON);
        var backendArr = JSON.parse(backendArray);
        if (dir === "forward")
            stepper.stepForward(relationships, backendArr);
        else if (dir === "backward")
            stepper.stepBack(relationships, backendArr);
    };
    View.prototype.nextAlgorithm = function () {
        this.changeToCurrentAlgorithm();
    };
    View.prototype.resetAll = function () {
        var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        stepper = new StateController(control, this);
        $("#arrow").addClass("hidden").animate({ left: ($("#arrayElem0").position().left + 9) + "px" }, 0);
        this.resetArrayColors();
        screenLock(false);
        manager.clear();
        this.resetArray(arr);
        this.displayThisArray(arr);
    };
    View.prototype.resetArrayColors = function () {
        $("#arrayUL li").removeClass("selected");
    };
    View.prototype.changeToCurrentAlgorithm = function () {
        this.resetAll();
        setHeaderText(control.getNameOfCurrentAlgorithm());
    };
    View.prototype.resetArray = function (arr) {
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var i = arr_1[_i];
            setValueAtIndex(i, i);
        }
    };
    View.prototype.screenLockThis = function (locked) {
        var lck = function (lock) {
            return function () {
                screenLock(lock);
            };
        }(locked);
        manager.addEvent(new FrontendEvent(lck, lck, this.animSpeed));
    };
    View.prototype.union = function (indexA, indexB) {
        control.union(indexA, indexB);
    };
    View.prototype.connected = function (indexA, indexB) {
        control.connected(indexA, indexB);
    };
    View.prototype.find = function (index) {
        control.find(index);
    };
    View.prototype.setSlow = function () {
        manager.delayTime = 1500;
        this.restartManager();
    };
    View.prototype.setMedium = function () {
        manager.delayTime = 1000;
        this.restartManager();
    };
    View.prototype.setFast = function () {
        manager.delayTime = 500;
        this.restartManager();
    };
    View.prototype.restartManager = function () {
        manager.pause();
        manager.start();
    };
    View.prototype.switchAlgorithm = function (algo) {
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
    };
    View.prototype.displayNodeSize = function (root, size) {
    };
    View.prototype.executeSaveMethodInJavaScript = function (clone) {
        var arr = JSON.stringify(clone).toString();
        saveState(arr);
    };
    return View;
}());
var viewer = new View();
