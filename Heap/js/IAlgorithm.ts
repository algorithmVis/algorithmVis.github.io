///<reference path="Controller.ts"/>

/**
 * Created by Øyvind Skeie Liland 07.02.18
 */

interface IAlgorithm {

    /**
     * Add an element to the heap
     * @param {number} a
     */
    add(a: number): void;

    /**
     * Remove an element to the heap
     * @param {number} a
     */
    remove(): void;

    /**
     * Return the name of the algorithm running
     * @return {string}
     */
    getName(): string;

    /**
     *  Return the current state of the array
     * @return
     */
    getArray(): number[];

    /**
     * Build heap
     */
    build(): void

    /**
     * Get size of array
     */
    getArrayLength(): number

    /**
     *  Set the current state of the algorithm to the given array
     * @param array
     */
    setArray(array: number[]): void;

    /**
     * Display FrontEndArray
     */
    setIndex(): void

    /**
     * Connect parent and child nodes
     */
    connectNodes(): void

    /**
     * Remove nodes in indexes > currIndex
     */
    removeNodes(): void
}