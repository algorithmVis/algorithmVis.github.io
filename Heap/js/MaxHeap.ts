///<reference path="methods.ts"/>
///<reference path="drawGraph.ts"/>

/**
 * File created by Øyvind Skeie Liland on 24.02.18
 */

class MaxHeap implements IAlgorithm {
    private arraySize: number;
    protected array: number[];
    private name: string = "MaxHeap";
    protected currIndex: number;


    constructor(size: number) {
        this.arraySize = size;
        this.currIndex = size;
        this.array = new Array;
        for (let i = 0; i < 10; i++) {
            this.array[i] = Math.floor((Math.random() * 10)) + 1;
        }
        this.backEndBuild();
        //    this.array[i] = i;
        //this.array.reverse();
    }

    setIndex() {
        for (let i = 0; i < this.array.length; i++) {
            if (i >= this.currIndex)
                setValueAtIndex(i, " ");
            else
                setValueAtIndex(i, this.array[i]);
        }
    }

    removeNodes() {
        for (let i = this.currIndex; i < this.getArray().length; i++) {
            allNodes.pop();
            superNode.children.pop();
            $("#node" + i).remove();
        }
    }

    connectNodes() {
        for (let i = 0; i <= Math.floor(this.array.length / 2); i++) {
            let parent = i;

            if (this.array[2 * i + 1] !== null) {
                connectNodes(2 * i + 1, parent);
            }
            if (this.array[2 * i + 2] !== null) {
                connectNodes((2 * i) + 2, parent);
            }
        }
    }

    /**
     * Build a max heap on the backend with no frontend events
     */
    backEndBuild() {
        let n: number = this.array.length;
        for (let k: number = Math.floor((n - 1) / 2); k >= 0; k--) {
            this.backendSink(k, n);
        }
    }

    /**
     * Sink on the backend with no frontend events
     * @param {number} index
     * @param {number} length
     */
    backendSink(index: number, length: number) {
        let left: number = index * 2 + 1;
        let right: number = index * 2 + 2;

        if (left > length)
            return;
        if (this.array[index] >= this.array[left] && this.array[index] >= this.array[right])
            return;

        // Sink
        let other;
        if (right >= length)
            other = left;
        else if (this.array[right] > this.array[left]) {
            other = right;
        } else {
            other = left;
        }

        // Check once more before exchange
        if (this.array[index] >= this.array[other])
            return;

        this.backEndExch(index, other);
        this.backendSink(other, length);
    }

    backEndExch(index: number, other: number) {
        let tmp: number = this.array[other];
        this.array[other] = this.array[index];
        this.array[index] = tmp;
    }

    /**
     * Build a max heap
     */
    build() {
        let n: number = this.array.length;
        for (let k: number = Math.floor((n - 1) / 2); k >= 0; k--)
            this.sink(k, n);
    }

    protected exch(number: number, number2: number) {
        if (this.array[number] === undefined || this.array[number2] === undefined || number > this.currIndex || number > this.currIndex)
            return;

        control.saveState(this.array);

        let tmp = this.array[number];
        this.array[number] = this.array[number2];
        control.setValueAtIndex(number, this.array[number], tmp);
        this.array[number2] = tmp;
        control.setValueAtIndex(number2, this.array[number2], this.array[number]);
        //console.log("fst: " + this.array[number] + ", second: " + this.array[number2]);

        //control.swapArrayElems(number, this.array[number], number2, this.array[number2]);
    }

    add(a: number): void {
        control.saveState(this.array);

        // Add to array and start frontendevents
        if (this.currIndex > 10) {
            return;
        } else {
            control.lockScreen(true);
            this.array[this.currIndex] = a;
            control.insertNewElem(this.currIndex++, a, Math.floor((this.currIndex - 2) / 2));
        }
        this.swim(this.currIndex - 1);
        control.lockScreen(false);
    }

    remove(): void {
        control.saveState(this.array);

        control.lockScreen(true);
        // Remove root element, set last element to root and start frontendevents
        this.currIndex--;
        let oldVal = this.array[0];
        this.exch(0, this.currIndex);
        control.swapNode(this.currIndex, 0);
        control.removeElem(this.currIndex, false);
        control.setValueAtIndex(this.currIndex, " ", oldVal);
        this.sink(0, this.currIndex - 1);
        control.saveState(this.array);
        control.lockScreen(false);
    }

    protected sink(index: number, length: number): void {
        let left: number = index * 2 + 1;
        let right: number = index * 2 + 2;

        if (right > length)
            return;
        if (this.array[index] >= this.array[left] && this.array[index] >= this.array[right])
            return;

        // Sink
        let other;
        if (this.array[right] > this.array[left]) {
            other = right;
        } else {
            other = left;
        }

        control.saveState(this.array);

        control.highlightNode(index, "orange");
        control.highlightNode(other, "orange");
        control.swapNode(index, other);
        this.exch(index, other);
        control.highlightNode(index, "green");
        control.highlightNode(other, "green");
        control.removeHighlight(index);
        control.removeHighlight(other);
        this.sink(other, length);
    }

    protected swim(index: number): void {
        let other: number = Math.floor((index - 1) / 2);
        while (other >= 0 && this.array[index] > this.array[other]) {
            control.saveState(this.array);
            control.highlightNode(index, "orange");
            control.highlightNode(other, "orange");
            control.swapNode(index, other);
            this.exch(index, other);
            control.highlightNode(index, "green");
            control.highlightNode(other, "green");
            control.removeHighlight(index);
            control.removeHighlight(other);
            index = Math.floor((index - 1) / 2);
            other = Math.floor((index - 1) / 2);
        }

        if (index !== 0) {
            control.highlightNode(index, "green");
            control.highlightNode(other, "green");
            control.removeHighlight(index);
            control.removeHighlight(other);
        }
    }

    getName(): string {
        return this.name;
    }

    getArray(): number[] {
        return this.array;
    }

    getArrayLength(): number {
        return this.currIndex;
    }

    setArray(array: number[]): void {
    }

}