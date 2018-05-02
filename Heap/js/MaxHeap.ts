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
            let val = this.generateRandomNum();
            while (this.array.filter(function (x) { return x === val }).length > 1)
                val = this.generateRandomNum();

            this.array[i] = val;
        }
        this.backEndBuild();
    }

    generateRandomNum() {
        return Math.floor((Math.random() * 10)) + 1;
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
        let n: number = this.currIndex;
        for (let k: number = Math.floor((n - 1) / 2); k >= 0; k--)
            this.sink(k, n);
    }

    protected exch(number: number, number2: number) {
        if (this.array[number] === undefined || this.array[number2] === undefined)
            return;

        control.highlightTwoNodes(number, number2, "orange");
        control.removeHighlightTwoNodes(number, number2, "orange");
        control.exchangeElemAndNodes(number, this.array[number], number2, this.array[number2]);
        this.backEndExch(number, number2);
    }

    add(a: number): void {
        // Add to array and start frontendevents
        if (this.currIndex > 10) {
            return;
        } else {
            this.array[this.currIndex] = a;
            control.insertNewElem(this.currIndex++, a, Math.floor((this.currIndex - 2) / 2));
        }
        this.swim(this.currIndex - 1);
    }

    remove(): void {
        // Remove root element, set last element to root and start frontendevents
        this.exch(0, --this.currIndex);
        control.removeElem(this.currIndex, false);
        this.sink(0, this.currIndex);
    }

    protected sink(index: number, length: number): void {
        let left: number = index * 2 + 1;
        let right: number = index * 2 + 2;

        if (left >= length)
            return;
        if (this.array[index] >= this.array[left] && this.array[index] >= this.array[right]) {
            if (this.array[left] >= this.array[right] || right >= length) {
                control.highlightTwoNodes(index, left, "green")
                control.removeHighlightTwoNodes(index, left, "green");
            } else {
                control.highlightTwoNodes(index, right, "green");
                control.removeHighlightTwoNodes(index, right, "green");
            }
            return;
        }

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
        if (this.array[index] >= this.array[other]) {
            control.highlightTwoNodes(index, other, "green");
            control.removeHighlightTwoNodes(index, other, "green");
            return;
        }

        this.exch(index, other);
        control.highlightTwoNodes(index, other, "green");
        control.removeHighlightTwoNodes(index, other, "green");
        this.sink(other, length);
    }

    protected swim(index: number): void {
        let other: number = Math.floor((index - 1) / 2);
        while (other >= 0 && this.array[index] > this.array[other]) {
            this.exch(index, other);
            control.highlightTwoNodes(index, other, "green");
            control.removeHighlightTwoNodes(index, other, "green");
            index = Math.floor((index - 1) / 2);
            other = Math.floor((index - 1) / 2);
        }

        if (index !== 0) {
            control.highlightTwoNodes(index, other, "green");
            control.removeHighlightTwoNodes(index, other, "green");
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