/**
 * File created by Kenneth Apeland 01.02.18
 */
///<reference path="Controller.ts"/>
///<reference path="EventManager.ts"/>
///<reference path="StateController.ts"/>
///<reference path="methods.ts"/>
///<reference path="MaxHeap.ts"/>
///<reference path="MaxHeapFree.ts"/>
///<reference path="BuildHeap.ts"/>
///<reference path="HeapSort.ts"/>
var View = /** @class */ (function () {
    function View() {
        this.colors = ["#7FFF00", "not used", "#FFB366"];
        this.k = 0;
        this.paused = false;
        this.playing = false;
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
        var val = $("#arrayElem" + i).text();
        var forwardSteps = function (i, bValue) {
            return function () {
                setValueAtIndex(i, bValue);
            };
        }(i, bValue);
        var backwardSteps = function (i, oldVal) {
            return function () {
                setValueAtIndex(i, oldVal);
            };
        }(i, val);
        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    };
    View.prototype.setValueAtThisSortIndex = function (i, bValue) {
        var forwardSteps = function (i, bValue) {
            return function () {
                setValueAtSortIndex(i, bValue);
            };
        }(i, bValue);
        var backwardSteps = function (i, bValue) {
            return function () {
                setValueAtSortIndex(i, i);
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
        var backward = function (index) {
            return function () {
                removeHighlight(index);
            };
        }(index);
        manager.addEvent(new FrontendEvent(forward, backward, this.animSpeed));
    };
    View.prototype.highlightThisSortElem = function (index, color) {
        var forward = function (index, color) {
            return function () {
                sortHighlightElem(index, color);
            };
        }(index, color);
        manager.addEvent(new FrontendEvent(forward, forward, this.animSpeed));
    };
    View.prototype.removeThisHighlight = function (index) {
        // Find the current color
        var color = "";
        var classList = document.getElementById('arrayElem' + index).className.split(/\s+/);
        for (var i = 0; i < classList.length; i++) {
            if (classList[i] === 'orange' || classList[i] === 'green') {
                color = classList[i];
            }
        }
        var forward = function (index) {
            return function () {
                removeHighlight(index);
            };
        }(index);
        var backward = function (index, color) {
            return function () {
                highlightNode(index, color);
            };
        }(index, color);
        manager.addEvent(new FrontendEvent(forward, forward, this.animSpeed));
    };
    View.prototype.setThisState = function (relationships, backendArray) {
        setState(JSON.stringify(backendArray).toString(), JSON.stringify(relationships).toString());
    };
    View.prototype.stepBack = function (twoDimRelationshipsJSON, backendArray) {
        this.step("backward", twoDimRelationshipsJSON, backendArray);
    };
    View.prototype.stepForward = function (twoDimRelationshipsJSON, backendArray) {
        //this.step("forward", twoDimRelationshipsJSON, backendArray);
        manager.next();
        if (manager.nextEvents.length <= 0)
            manager.start();
    };
    View.prototype.step = function (dir, twoDimRelationshipsJSON, backendArray) {
        var relationships = JSON.parse(twoDimRelationshipsJSON);
        var backendArr = JSON.parse(backendArray);
        if (dir === "forward")
            stepper.stepForward(relationships, backendArr);
        else if (dir === "backward")
            stepper.stepBack(relationships, backendArr);
    };
    View.prototype.resetAll = function () {
        this.paused = false;
        this.playing = false;
        $("#play").text("Play");
        manager.pause();
        manager.nextEvents = new Array;
        manager.previousEvents = new Array;
        screenLock(false);
        var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        stepper = new StateController(control, this);
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
    View.prototype.screenLockThis = function (locked) {
        var lck = function (lock) {
            return function () {
                screenLock(lock);
            };
        }(locked);
        var notLck = function (lock) {
            return function () {
                screenLock(!lock);
            };
        }(locked);
        manager.addEvent(new FrontendEvent(lck, notLck, this.animSpeed));
    };
    View.prototype.setSlow = function () {
        this.animSpeed = 250;
        manager.delayTime = 900;
        this.restartManager();
    };
    View.prototype.setMedium = function () {
        this.animSpeed = 600;
        manager.delayTime = 600;
        this.restartManager();
    };
    View.prototype.setFast = function () {
        this.animSpeed = 300;
        manager.delayTime = 300;
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
                break;
            }
            case "HeapSort": {
                this.resetAll();
                lockPlay(false);
                $("#sortArray").show();
                control.initController(new HeapSort(10));
                screenLock(true);
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
    /**
     * Må implementeres for å få backward/forward til å fungere
     * @param clone
     */
    View.prototype.executeSaveMethodInJavaScript = function (clone) {
        var arr = JSON.stringify(clone).toString();
        saveState(arr);
    };
    View.prototype.addNode = function (val) {
        control.addNode(val);
        setOnClickListener();
        setKeyListener();
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
            };
        }(i, removeArr);
        var backward = function (index, val) {
            return function () {
                insertNewElem(index, val);
            };
        }(i, val);
        manager.addEvent(new FrontendEvent(forward, backward, manager.delayTime));
    };
    View.prototype.play = function () {
        var algo = control.getAlgorithm().getName();
        if (algo === "BuildHeap" && !this.paused && !this.playing) {
            control.getAlgorithm().build();
            this.paused = true;
            this.playing = true;
            $("#play").text("Pause");
        }
        else if (algo === "HeapSort" && !this.paused && !this.playing) {
            control.getAlgorithm().sort();
            this.paused = true;
            this.playing = true;
            $("#play").text("Pause");
        }
        else {
            if (this.playing) {
                manager.pause();
                $("#play").text("Resume");
                this.playing = false;
            }
            else {
                this.playing = true;
                manager.start();
                $("#play").text("Pause");
            }
        }
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
    return View;
}());
var viewer = new View();
