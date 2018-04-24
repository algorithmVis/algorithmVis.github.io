/**
 * File created by Kenneth Apeland 01.02.18
 */
///<reference path="Controller.ts"/>
///<reference path="EventManager.ts"/>
///<reference path="methods.ts"/>
///<reference path="MaxHeap.ts"/>
///<reference path="MaxHeapFree.ts"/>
///<reference path="BuildHeap.ts"/>
///<reference path="HeapSort.ts"/>
var View = /** @class */ (function () {
    function View() {
        this.colors = ["#7FFF00", "not used", "#FFB366"];
        this.k = 0;
        this.started = false;
        this.playing = false;
        this.animSpeed = 500;
        this.clickedPlay = true;
    }
    View.prototype.displayThisArray = function (array) {
        displayArray(JSON.stringify(array));
    };
    View.prototype.setThisArrow = function (index) {
        var forward = function (index) {
            return function () {
                setArrow(index);
            };
        }(index);
        var backward = function (index) {
            return function () {
                setArrow(-1);
            };
        }(index);
        manager.addEvent(new FrontendEvent(forward, backward, this.animSpeed));
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
    View.prototype.highlightThisSortElem = function (index, color) {
        var forward = function (index, color) {
            return function () {
                sortHighlightElem(index, color);
            };
        }(index, color);
        var backward = function (index) {
            return function () {
                removeSortHighlight(index);
            };
        }(index);
        manager.addEvent(new FrontendEvent(forward, backward, this.animSpeed));
    };
    View.prototype.stepForward = function () {
        if (manager.nextEvents.length <= 0)
            return;
        if (control.getAlgoName() === "MaxHeapFree" || control.getAlgoName() === "MaxHeap")
            this.setPause(true);
        this.clickedPlay = false;
        manager.next();
    };
    View.prototype.stepBack = function () {
        if (manager.nextEvents.length <= 0)
            return;
        if (control.getAlgoName() === "MaxHeapFree" || control.getAlgoName() === "MaxHeap")
            this.setPause(true);
        if (firstSelected != -1) {
            selectIndex(firstSelected, false);
            firstSelected = -1;
        }
        else {
            manager.previous();
        }
    };
    View.prototype.resetAll = function () {
        this.started = false;
        this.playing = false;
        $("#play").text("Play");
        $("#arrow").addClass("hidden").animate({ left: ($("#arrayElem0").position().left + 9) + "px" }, 0);
        manager.pause();
        manager.nextEvents = new Array;
        manager.previousEvents = new Array;
        screenLock(false);
        var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.resetArray(arr);
        this.displayThisArray(arr);
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
    View.prototype.setSlow = function () {
        manager.delayTime = 1500;
        this.restartManager();
    };
    View.prototype.setMedium = function () {
        manager.delayTime = 1000;
        this.restartManager();
    };
    View.prototype.setFast = function () {
        manager.delayTime = 600;
        this.restartManager();
    };
    View.prototype.restartManager = function () {
        manager.pause();
        manager.start();
    };
    View.prototype.switchAlgorithm = function (algo) {
        $("#sortArray").hide();
        $("#sortArrayUL").children("li").remove();
        lockPlay(true);
        switch (algo) {
            case "MaxHeap": {
                this.resetAll();
                control.initController(new MaxHeap(5));
                break;
            }
            case "MaxHeapFree": {
                this.resetAll();
                control.initController(new MaxHeapFree(10));
                break;
            }
            case "BuildHeap": {
                this.resetAll();
                lockPlay(false);
                control.initController(new BuildHeap(10));
                screenLock(true);
                control.getAlgorithm().build();
                this.setPause(true);
                $("#play").text("Play");
                break;
            }
            case "HeapSort": {
                this.resetAll();
                lockPlay(false);
                $("#sortArray").show();
                control.initController(new HeapSort(10));
                screenLock(true);
                control.getAlgorithm().sort();
                this.setPause(true);
                $("#play").text("Play");
                break;
            }
            default: {
                control.initController(new MaxHeap(10));
                break;
            }
        }
    };
    View.prototype.displayNodeSize = function (root, size) {
    };
    View.prototype.addNode = function (val) {
        control.addNode(val);
        setOnClickListener();
        setupRadio();
    };
    View.prototype.removeNode = function () {
        control.removeNode();
    };
    View.prototype.swapNode = function (child, parent) {
        var forward = function (child, parent) {
            return function () {
                swapNodes(child, parent);
            };
        }(child, parent);
        var backward = function (child, parent) {
            return function () {
                swapNodes(child, parent);
            };
        }(child, parent);
        manager.addEvent(new FrontendEvent(forward, backward, 1000));
    };
    View.prototype.removeElem = function (i, removeArr) {
        var val = control.getArrayClone()[i];
        var forward = function (index, removeArr) {
            return function () {
                removeElem(index, removeArr);
                setValueAtIndex(index, " ");
            };
        }(i, removeArr);
        var backward = function (index, value, parent) {
            return function () {
                setValueAtIndex(index, value);
                insertNewNode(index, value);
                insertNewElemConnect(index, parent);
                // If first node -> Position with a nice animation
                if (control.getAlgorithm().getArrayLength() == 1)
                    positioningNodes(1500);
            };
        }(i, val, Math.floor((i - 1) / 2));
        manager.addEvent(new FrontendEvent(forward, backward, manager.delayTime));
    };
    View.prototype.insertNewElemThis = function (child, value, parent) {
        var forward = function (index, value, parent) {
            return function () {
                setValueAtIndex(index, value);
                insertNewNode(index, value);
                insertNewElemConnect(index, parent);
                // If first node -> Position with a nice animation
                if (control.getAlgorithm().getArrayLength() == 1)
                    positioningNodes(1500);
            };
        }(child, value, parent);
        var backward = function (index, parent) {
            return function () {
                allNodes[parent].removeChild(allNodes[index]);
                //removeElem(index, true);
                setValueAtIndex(index, "");
                removeNode(index);
            };
        }(child, parent);
        manager.addEvent(new FrontendEvent(forward, backward, manager.delayTime));
    };
    View.prototype.highlightTwoNodes = function (index1, index2, color) {
        var forward = function (index1, index2, color) {
            return function () {
                highlightNode(index1, color);
                highlightNode(index2, color);
            };
        }(index1, index2, color);
        var backward = function (index1, index2) {
            return function () {
                removeHighlight(index2);
                removeHighlight(index1);
            };
        }(index1, index2);
        manager.addEvent(new FrontendEvent(forward, backward, 1500));
    };
    View.prototype.removeHighlightTwoNodes = function (index1, index2, color) {
        var forward = function (index1, index2) {
            return function () {
                removeHighlight(index1);
                removeHighlight(index2);
            };
        }(index1, index2);
        var backward = function (index1, index2, color) {
            return function () {
                highlightNode(index1, color);
                highlightNode(index2, color);
            };
        }(index1, index2, color);
        manager.addEvent(new FrontendEvent(forward, backward, 1500));
    };
    View.prototype.sortHighlightTwoNodes = function (arrIndex, sortIndex, color) {
        var forward = function (arrIndex, sortIndex, color) {
            return function () {
                selectIndex(0, true);
                highlightNode(0, "orange");
                sortHighlightElem(sortIndex, "orange");
            };
        }(arrIndex, sortIndex, color);
        var backward = function (index1, index2, color) {
            return function () {
                removeSortHighlight(sortIndex);
                removeHighlight(0);
                selectIndex(0, false);
            };
        }(arrIndex, sortIndex, color);
        manager.addEvent(new FrontendEvent(forward, backward, 1500));
    };
    View.prototype.exchangeElemAndNodes = function (index1, value1, index2, value2) {
        var forward = function (index1, value1, index2, value2) {
            return function () {
                swapNodes(index1, index2);
                setValueAtIndex(index1, value2);
                setValueAtIndex(index2, value1);
            };
        }(index1, value1, index2, value2);
        var backward = function (index1, value1, index2, value2) {
            return function () {
                setValueAtIndex(index1, value1);
                setValueAtIndex(index2, value2);
                swapNodes(index1, index2);
            };
        }(index1, value1, index2, value2);
        manager.addEvent(new FrontendEvent(forward, backward, 1500));
    };
    View.prototype.setSortValAndDeselect = function (sortIndex, val) {
        var forward = function (sortIndex, val) {
            return function () {
                setValueAtSortIndex(sortIndex, val);
                selectIndex(0, false);
            };
        }(sortIndex, val);
        var backward = function (sortIndex, val) {
            return function () {
                selectIndex(0, true);
                setValueAtSortIndex(sortIndex, " ");
            };
        }(sortIndex, val);
        manager.addEvent(new FrontendEvent(forward, backward, 1500));
    };
    View.prototype.play = function () {
        this.clickedPlay = true;
        var algo = control.getAlgorithm().getName();
        if (algo === "BuildHeap" && !this.started && !this.playing) {
            control.getAlgorithm().build();
            this.started = true;
            this.setPause(false);
        }
        else if (algo === "HeapSort" && !this.started && !this.playing) {
            this.started = true;
            this.setPause(false);
        }
        else {
            if (this.playing) {
                this.setPause(true);
            }
            else {
                this.setPause(false);
            }
        }
    };
    View.prototype.setPause = function (bool) {
        if (bool) {
            this.playing = false;
            manager.pause();
            $("#play").text("Resume");
            lockBackForward(false);
        }
        else {
            this.playing = true;
            manager.start();
            $("#play").text("Pause");
            lockBackForward(true);
        }
    };
    // Used in eventmanager for freemode and predefined
    View.prototype.playButtonState = function () {
        var algo = control.getAlgorithm().getName();
        if (!(algo === "MaxHeap" || algo === "MaxHeapFree")) {
            return;
        }
        if (manager.nextEvents.length > 0 && this.clickedPlay) {
            this.playing = true;
            lockPlay(false);
            lockBackForward(true);
            $("#play").text("Pause");
        }
        else if (manager.nextEvents.length > 0) {
            lockPlay(false);
            this.playing = false;
            return;
        }
        else {
            lockPlay(true);
            lockBackForward(false);
        }
    };
    return View;
}());
var viewer = new View();
