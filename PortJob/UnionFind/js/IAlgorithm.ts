///<reference path="Controller.ts"/>

/**
 * Created by Øyvind Skeie Liland 07.02.18
 * Based on IAlgorithm.java
 */

interface IAlgorithm {

    /**
     *  Union two elements on indexA and indexB
     * @param a index a
     * @param b index b
     */
    union(a: number, b: number): void;

    find(a: number): number;

    connected(a: number, b: number): boolean;

    getName(): string;

    /**
     *  Return the current state of the array
     * @return
     */
    getArray(): number[];

    /**
     *  Called when the pause-button (SPACE) is hit
     *  Sets the pause variable to !pause
     */
    invertPause(): void;

    /**
     *  Set the Controller for this algorithm
     * @param Controller
     */
    setController(control: Controller): void;

    /**
     *  Set the current state of the algorithm to the given array
     * @param array
     */
    setArray(array: number[]): void;

    /**
     *  Does the same as connected but does not update the GUI
     */
    connectedNoGUIUpdate(a: number, b: number): boolean;

}