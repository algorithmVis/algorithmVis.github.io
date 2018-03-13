///<reference path="methods.ts"/>
///<reference path="drawGraph.ts"/>

class MaxHeapFree extends MaxHeap {
    constructor(size: number) {
        super(size);

        for (let i = 0; i < size; i++) {
            var $elem = $("#arrayElem" + i).children(".content");
            $elem.empty();
            $elem.append(" ");
        }
        this.currIndex = 0;
    }

    clearArrayValues() {
        for (let i = 0; i <= this.getArray().length; i++) {
            this.changeVal(i, " ");
        }
    }

    private changeVal(i: number, val) {
        var $elem = $("#arrayElem" + i).children(".content");
        $elem.empty();
        $elem.append(val);
    }

    maxHeapFreeInit() {
        for (let i = 0; i < this.getArray().length; i++) {
            $("#node" + i).remove();
        }
        allNodes = [];
        superNode.children = [];
    }

    add(a: number): void {
        // Add to array and start frontendevents
        if (this.currIndex > 10) {
            this.array.push(a);
            insertNewElem(this.currIndex++, a); // Create element in frontendarray
        }
        else {
            this.array[this.currIndex] = a;
            setValueAtIndex(this.currIndex, a);
            insertNewNode(this.currIndex++, a);
        }

        // Swim to te correct index and start frontendevents
        if (this.currIndex == 1) {
            positioningNodes(1000);
        } else {
            //positioningNodes(0);
            insertNewElemConnect(this.currIndex - 1, Math.floor((this.currIndex - 2) / 2));
            super.swim(this.currIndex - 1);
        }
        control.saveState(this.array); // Save the new state

    }

    remove(): void {
        // Remove root element, set last element to root and start frontendevents
        this.currIndex--;
        this.exch(0, this.currIndex);
        control.swapNode(this.currIndex, 0);
        control.removeElem(this.currIndex, false);
        control.setValueAtIndex(this.currIndex, " ");
        this.sink(0, this.currIndex - 1);
        control.saveState(this.array);
    }

    getName() {
        return "FreeMode";
    }
}