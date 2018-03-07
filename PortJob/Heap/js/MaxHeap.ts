///<reference path="methods.ts"/>

/**
 * File created by Øyvind Skeie Liland on 24.02.18
 */

class MaxHeap implements IAlgorithm {
    private arraySize: number;
    private array: number[];
    private name: string = "MaxHeap";

    constructor(size: number) {
        this.arraySize = size;
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
                connectNodes(this.array[2 * i + 1], this.array[parent]);
            }
            if (this.array[2 * i + 2] !== null) {
                connectNodes(this.array[(2 * i) + 2], this.array[parent]);
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

    private exch(number: number, number2: number) {
        let tmp = this.array[number];
        this.array[number] = this.array[number2];
        this.array[number2] = tmp;
    }

    add(a: number): void {
        // Add to array and start frontendevents
        this.array.push(a);
        insertNewElem(this.array.length - 1, a); // Create element in frontendarray
        control.saveState(this.array); // Save the new state
        control.connectNodes(this.array.length - 1, Math.floor((this.array.length - 1) / 2));

        // Swim to te correct index and start frontendevents
        this.swim(this.array.length - 1);

    }

    remove(): void {
        // Remove root element, set last element to root and start frontendevents
        this.array[0] = this.array[this.array.length - 1];
        this.array[this.array.length - 1] = null;
        this.sink(0, this.array.length - 1);
    }

    private sink(index: number, length: number): void {
        let left: number = index * 2 + 1;
        let right: number = index * 2 + 2;
    }

    private swim(index: number): void {
        let other: number = Math.floor(index / 2);
        while (other >= 0 && this.array[index] > this.array[other]) {
            this.exch(index, other);
            index = Math.floor(index / 2);
            other = Math.floor(index / 2);
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