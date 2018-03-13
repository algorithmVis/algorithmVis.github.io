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
        for (let i = 0; i < size; i++)
            this.array[i] = i;
        this.array.reverse();
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
     * Build a max heap
     */
    build() {
        let n: number = this.array.length;
        for (let k: number = n / 2; k >= 0; k--)
            this.sink(k, n);
        while (n > 1) {
            this.exch(1, n--);
            this.sink(1, n);
        }
    }

    protected exch(number: number, number2: number) {
        let tmp = this.array[number];
        this.array[number] = this.array[number2];
        control.setValueAtIndex(number, this.array[number]);
        this.array[number2] = tmp;
        control.setValueAtIndex(number2, this.array[number2]);
    }

    add(a: number): void {
        // Add to array and start frontendevents
        this.array.push(a);
        insertNewElem(this.array.length - 1, a); // Create element in frontendarray
        insertNewElemConnect(this.array.length - 1, Math.floor((this.array.length - 2) / 2));
        control.saveState(this.array); // Save the new state

        // Swim to te correct index and start frontendevents
        this.swim(this.array.length - 1);
    }

    remove(): void {
        // Remove root element, set last element to root and start frontendevents
        this.exch(0, this.array.length - 1);
        control.swapNode(this.array.length - 1, 0);
        control.removeElem(this.array.length - 1, true);
        this.array.pop();
        control.saveState(this.array);
        this.sink(0, this.array.length - 1);
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
        control.highlightNode(index, "orange");
        control.highlightNode(other, "orange");
        control.swapNode(index, other);
        this.exch(index, other);
        control.highlightNode(index, "green");
        control.highlightNode(other, "green");
        control.removeHighlight(index);
        control.removeHighlight(other);
        control.saveState(this.getArray());
        this.sink(other, length);
    }

    protected swim(index: number): void {
        let other: number = Math.floor((index - 1) / 2);
        while (other >= 0 && this.array[index] > this.array[other]) {
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
            control.saveState(this.getArray());
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