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
        this.currIndex = size - 1;
        this.array = new Array;
        for (let i = 0; i < size; i++) {
            this.array[i] = Math.floor((Math.random() * 10)) + 1;
        }
        this.backEndBuild();
        //    this.array[i] = i;
        //this.array.reverse();
    }

    setIndex() {
        for (let i = 0; i < this.array.length; i++) {
            setValueAtIndex(i, this.array[i]);
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

        console.log(this.array);
    }

    protected exch(number: number, number2: number) {
        if (this.array[number] === undefined || this.array[number2] === undefined)
            return;

        control.saveState(this.array);

        let tmp = this.array[number];
        this.array[number] = this.array[number2];
        control.setValueAtIndex(number, this.array[number]);
        this.array[number2] = tmp;
        control.setValueAtIndex(number2, this.array[number2]);
    }

    add(a: number): void {
        control.saveState(this.array); // Save the new state
        // Add to array and start frontendevents
        control.lockScreen(true)
        this.array.push(a);
        //insertNewElem(this.array.length - 1, a); // Create element in frontendarray
        //insertNewElemConnect(this.array.length - 1, Math.floor((this.array.length - 2) / 2));
        control.insertNewElem(this.array.length - 1, a, Math.floor((this.array.length - 2) / 2));

        // Swim to te correct index and start frontendevents
        this.swim(this.array.length - 1);
        control.lockScreen(false);
        control.saveState(this.array);
    }

    remove(): void {
        control.saveState(this.array);

        control.lockScreen(true);
        // Remove root element, set last element to root and start frontendevents
        this.exch(0, this.array.length - 1);
        control.swapNode(this.array.length - 1, 0);
        control.removeElem(this.array.length - 1, true);
        this.array.pop();
        this.sink(0, this.array.length - 1);
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
    }

    getName(): string {
        return this.name;
    }

    getArray(): number[] {
        return this.array;
    }

    setArray(array: number[]): void {
    }

}