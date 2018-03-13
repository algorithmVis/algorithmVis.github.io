/**
 * Created by Øyvind Skeie Liland on 13.03.18
 */
///<reference path="Controller.ts"/>

class BuildHeap extends MaxHeap {
    constructor(size: number) {
        super(size);
        this.array.reverse(); // revert back
        $(".buttons").append("<button id='play' class='btn btn-primary' onclick='control.getAlgorithm().build()'> Play </button>");
    }

    getName(): string {
        return "BuildHeap";
    }
}