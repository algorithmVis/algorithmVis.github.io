/**
 * Created by Øyvind Skeie Liland on 13.03.18
 */
///<reference path="Controller.ts"/>

class BuildHeap extends MaxHeap {
    constructor(size: number) {
        super(size);
        this.array.reverse(); // revert back
    }

    getName(): string {
        return "BuildHeap";
    }
}