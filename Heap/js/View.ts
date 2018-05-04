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


declare var $;

class View {

    colors: string[] = ["#7FFF00", "not used", "#FFB366"];
    k: number = 0;
    started: boolean = false;
    playing: boolean = false;
    animSpeed: number = 500;

    displayThisArray(array: number[]) {
        displayArray(JSON.stringify(array));
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

    stepForward() {
        if (manager.nextEvents.length <= 0)
            return;

        if (control.getAlgoName() === "MaxHeapFree" || control.getAlgoName() === "MaxHeap")
            this.setPause(true);

        $('#forward').attr('disabled', 'disabled');
        setTimeout(function () {
            $('#forward').removeAttr('disabled');
        }, 350);

        this.clickedPlay = false;
        manager.next();
    }

    stepBack() {
        if (manager.previousEvents.length <= 0)
            return;
        if (control.getAlgoName() === "MaxHeapFree" || control.getAlgoName() === "MaxHeap")
            this.setPause(true);
        if (firstSelected != -1) {
            selectIndex(firstSelected, false);
            firstSelected = -1;
        } else {
            $('#backward').attr('disabled', 'disabled');
            lockPlay(false);
            manager.previous();
            setTimeout(function () {
                $('#backward').removeAttr('disabled');
            }, 350);
        }
    }

    resetAll() {
        this.started = false;
        this.playing = false;
        $("#play").text("Play");
        $("#arrow").addClass("hidden").animate({left: ($("#arrayElem0").position().left + 9) + "px"}, 0);
        manager.pause();
        manager.nextEvents = new Array;
        manager.previousEvents = new Array;
        screenLock(false);
        let arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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

    setSlow() {
        manager.delayTime = 2000;
        this.restartManager();
    }

    setMedium() {
        manager.delayTime = 1200;
        this.restartManager();
    }

    setFast() {
        manager.delayTime = 600;
        this.restartManager();
    }

    restartManager() {
        if (this.playing) {
            manager.pause();
            manager.start();
        }
    }

    switchAlgorithm(algo: string) {
        $("#sortArray").hide();
        $("#sortArrayUL").children("li").remove();
        $("#buildHeap, #sortHeap").hide();
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
            case "MaxHeapCombined": {
                this.resetAll();
                $("#sortArray").show();
                $("#buildHeap, #sortHeap").show();
                control.initController(new MaxHeapCombined(10));
                this.play();
                lockBackForward(true);
                lockPlay(false);
                break;
            }
            case "BuildHeap": {
                this.resetAll();
                control.initController(new BuildHeap(10));
                screenLock(true);
                control.getAlgorithm().build();
                this.setPause(true);
                lockPlay(false);
                lockBackForward(true);
                $("#play").text("Play");
                break;
            }
            case "HeapSort": {
                this.resetAll();
                $("#sortArray").show();
                control.initController(new HeapSort(10));
                screenLock(true);
                (<HeapSort>control.getAlgorithm()).sort();
                this.setPause(true);
                lockPlay(false);
                lockBackForward(true);
                $("#play").text("Play");
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

    addNode(val: number) {
        control.addNode(val);
        setupRadio();
    }

    removeNode() {
        control.removeNode();
    }

    sortHeap() {
        control.buildHeap();
        control.sortHeap();
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
                setValueAtIndex(index, " ");
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
                setOnClickListener();

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

    highlightTwoNodes(index1: number, index2: number, color: string) {
        let forward = function (index1, index2, color) {
            return function () {
                highlightNode(index1, color);
                highlightNode(index2, color);
            }
        }(index1, index2, color);

        let backward = function (index1, index2) {
            return function () {
                removeHighlight(index2);
                removeHighlight(index1);
            }
        }(index1, index2);

        manager.addEvent(new FrontendEvent(forward, backward, 1500));
    }

    removeHighlightTwoNodes(index1: number, index2: number, color: string) {
        let forward = function (index1, index2) {
            return function () {
                removeHighlight(index1);
                removeHighlight(index2);
            }
        }(index1, index2);

        let backward = function (index1, index2, color) {
            return function () {
                highlightNode(index1, color);
                highlightNode(index2, color);
            }
        }(index1, index2, color);

        manager.addEvent(new FrontendEvent(forward, backward, 1500));
    }

    sortHighlightTwoNodes(arrIndex: number, sortIndex: number, color: string) {
        let forward = function (arrIndex, sortIndex, color) {
            return function () {
                selectIndex(arrIndex, true);
                highlightNode(arrIndex, "orange");
                sortHighlightElem(sortIndex, "orange");
            }
        }(arrIndex, sortIndex, color);

        let backward = function (index1, index2, color) {
            return function () {
                removeSortHighlight(sortIndex);
                removeHighlight(index1);
                selectIndex(index1, false);
            }
        }(arrIndex, sortIndex, color);

        manager.addEvent(new FrontendEvent(forward, backward, 1500));
    }

    exchangeElemAndNodes(index1: number, value1: any, index2: number, value2: any) {
        let forward = function (index1, value1, index2, value2) {
            return function () {
                swapNodes(index1, index2);
                setValueAtIndex(index1, value2);
                setValueAtIndex(index2, value1);
            }
        }(index1, value1, index2, value2);

        let backward = function (index1, value1, index2, value2) {
            return function () {
                setValueAtIndex(index1, value1);
                setValueAtIndex(index2, value2);
                swapNodes(index1, index2);
            }
        }(index1, value1, index2, value2);

        manager.addEvent(new FrontendEvent(forward, backward, 1500));
    }

    setSortValAndDeselect(sortIndex: number, val: any) {
        let forward = function (sortIndex, val) {
            return function () {
                setValueAtSortIndex(sortIndex, val);
                selectIndex(sortIndex, false);
            }
        }(sortIndex, val);

        let backward = function (sortIndex, val) {
            return function () {
                selectIndex(sortIndex, true);
                setValueAtSortIndex(sortIndex, " ");
            }
        }(sortIndex, val);

        manager.addEvent(new FrontendEvent(forward, backward, 1500));
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
            lockPlay(false);
            lockBackForward(false);
        } else {
            this.playing = true;
            manager.start();
            $("#play").text("Pause");
            lockPlay(false);
            lockBackForward(true);
        }
    }

    // Used in eventmanager for freemode and predefined
    playButtonState() {
        let algo = control.getAlgorithm().getName();
        if (!(algo === "MaxHeap" || algo === "MaxHeapFree")) {
            return;
        }

        if (manager.nextEvents.length > 0 && this.clickedPlay) {
            this.playing = true;
            lockPlay(false);
            lockBackForward(true);
            $("#play").text("Pause");
        } else if (manager.nextEvents.length > 0) {
            lockPlay(false);
            this.playing = false;
            return;
        } else {
            lockPlay(true);
            lockBackForward(false);
        }
    }
}

var viewer: View = new View();
