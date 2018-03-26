/**
 * Created by Øyvind Skeie Liland on 13.03.18
 */

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

    getName() {
        return "FreeMode";
    }
}