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


declare var $;

class View implements IView {

    colors: string[] = ["#7FFF00", "not used", "#FFB366"];
    k: number = 0;
    started: boolean = false;
    playing: boolean = false;
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
                setArrow(-1);
            }
        }(index);

        manager.addEvent(new FrontendEvent(forward, backward, this.animSpeed));
    }

    setValueAtThisIndex(i: number, bValue: any, oldVal: any) {
        let forwardSteps = function (i, bValue) {
            return function () {
                setValueAtIndex(i, bValue);
            }
        }(i, bValue);

        let backwardSteps = function (i, oldVal) {
            return function () {
                setValueAtIndex(i, oldVal);
            }
        }(i, oldVal);

        manager.addEvent(new FrontendEvent(forwardSteps, backwardSteps, this.animSpeed));
    }

    setValueAtThisSortIndex(i: number, bValue) {
        let forwardSteps = function (i, bValue) {
            return function () {
                setValueAtSortIndex(i, bValue);
            }
        }(i, bValue);

        let backwardSteps = function (i, bValue) {
            return function () {
                setValueAtSortIndex(i, "");
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

        let backward = function (index: number) {
            return function () {
                removeHighlight(index);
            }
        }(index);

        manager.addEvent(new FrontendEvent(forward, backward, this.animSpeed));
    }

    highlightThisSortElem(index: number, color: string) {
        let forward = function (index: number, color: string) {
            return function () {
                sortHighlightElem(index, color);
            }
        }(index, color);

        let backward = function (index: number) {
            return function () {
                removeSortHighlight(index);
            }
        }(index);

        manager.addEvent(new FrontendEvent(forward, backward, this.animSpeed));
    }


    removeThisHighlight(index: number) {
        // Find the current color
        let color: string = "";
        var classList = document.getElementById('arrayElem' + index).className.split(/\s+/);
        for (var i = 0; i < classList.length; i++) {
            if (classList[i] === 'orange' || classList[i] === 'green') {
                color = classList[i];
            }
        }

        let forward = function (index: number) {
            return function () {
                removeHighlight(index);
            }
        }(index);

        let backward = function (index: number, color: string) {
            return function () {
                highlightNode(index, color);
            }
        }(index, color);

        manager.addEvent(new FrontendEvent(forward, forward, this.animSpeed));
    }

    setThisState(relationships: JSON, backendArray: JSON) {
        setState(JSON.stringify(backendArray).toString(), JSON.stringify(relationships).toString());
    }

    stepBack(twoDimRelationshipsJSON: string, backendArray: string) {
        this.step("backward", twoDimRelationshipsJSON, backendArray);
    }

    stepForward(twoDimRelationshipsJSON: string, backendArray: string) {
        //this.step("forward", twoDimRelationshipsJSON, backendArray);
        this.clickedPlay = false;
        manager.next();
        if (manager.nextEvents.length <= 0) {
            this.playing = true;
            manager.start();
        }
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
        this.started = false;
        this.playing = false;
        $("#play").text("Play");
        manager.pause();
        manager.nextEvents = new Array;
        manager.previousEvents = new Array;
        screenLock(false);
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

        let notLck = function (lock: boolean) {
            return function () {
                screenLock(!lock);
            }
        }(locked);
        manager.addEvent(new FrontendEvent(lck, notLck, this.animSpeed));
    }

    setSlow() {
        this.animSpeed = 250;
        manager.delayTime = 900;
        this.restartManager();
    }

    setMedium() {
        this.animSpeed = 600;
        manager.delayTime = 600;
        this.restartManager();
    }

    setFast() {
        this.animSpeed = 300;
        manager.delayTime = 300;
        this.restartManager();
    }

    restartManager() {
        manager.pause();
        manager.start();
    }

    switchAlgorithm(algo: string) {
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
                swapNodes(child, parent);
            }
        }(child, parent);
        manager.addEvent(new FrontendEvent(forward, backward, 1000));
    }

    removeElem(i: number, removeArr: boolean) {
        let val = control.getArrayClone()[i];
        let forward = function (index, removeArr) {
            return function () {
                removeElem(index, removeArr);
            }
        }(i, removeArr);

        let backward = function (index, value, parent) {
            return function () {
                setValueAtIndex(index, value);
                insertNewNode(index, value);
                insertNewElemConnect(index, parent);

                // If first node -> Position with a nice animation
                if (control.getAlgorithm().getArrayLength() == 1)
                    positioningNodes(1500);
            }
        }(i, val, Math.floor((i - 1) / 2));


        manager.addEvent(new FrontendEvent(forward, backward, manager.delayTime));
    }

    insertNewElemThis(child: number, value: number, parent: number) {
        let forward = function (index, value, parent) {
            return function () {
                setValueAtIndex(index, value);
                insertNewNode(index, value);
                insertNewElemConnect(index, parent);

                // If first node -> Position with a nice animation
                if (control.getAlgorithm().getArrayLength() == 1)
                    positioningNodes(1500);
            }
        }(child, value, parent);

        let backward = function (index, parent) {
            return function () {
                allNodes[parent].removeChild(allNodes[index]);
                //removeElem(index, true);
                setValueAtIndex(index, "");
                removeNode(index);
            }
        }(child, parent);


        manager.addEvent(new FrontendEvent(forward, backward, manager.delayTime));

    }

    clickedPlay = true;
    play() {
        this.clickedPlay = true;
        let algo = control.getAlgorithm().getName();
        if (algo === "BuildHeap" && !this.started && !this.playing) {
            control.getAlgorithm().build();
            this.started = true;
            this.setPause(false);
        } else if (algo === "HeapSort" && !this.started && !this.playing) {
            (<HeapSort>control.getAlgorithm()).sort();
            this.started = true;
            this.setPause(false);
        } else {
            if (this.playing) {
                this.setPause(true);
            } else {
                this.setPause(false);
            }
        }
    }

    setPause(bool: boolean) {
        if (bool) {
            this.playing = false;
            manager.pause();
            $("#play").text("Resume");
            lockBackForward(false);
        } else {
            this.playing = true;
            manager.start();
            $("#play").text("Pause");
            lockBackForward(true);
        }
    }

    // Used in eventmanager for freemode and predefined
    playButtonState() {
        let algo = control.getAlgorithm().getName();
        if (!(algo === "MaxHeap" || algo === "MaxHeapFree"))
            return;

        if (manager.nextEvents.length > 0 && this.clickedPlay) {
            this.playing = true;
            lockPlay(false);
            lockBackForward(true);
            $("#play").text("Pause");
        } else if (manager.nextEvents.length > 0) {
            return;
        } else {
            lockPlay(true);
            lockBackForward(false);
        }
    }
}

var viewer: View = new View();
