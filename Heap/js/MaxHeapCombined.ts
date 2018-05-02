/**
 * Created by Øyvind Skeie Liland on 13.03.18
 */

///<reference path="methods.ts"/>
///<reference path="drawGraph.ts"/>

class MaxHeapCombined extends MaxHeapFree {
    private sortIndex;

    constructor(size: number) {
        super(size);
        HeapSort.insertElems(10);
        this.sortIndex = this.currIndex - 1;
    }

    add(a: number) {
        this.sortIndex++;
        if (this.currIndex > 10) {
            return;
        } else {
            this.array[this.currIndex] = a;
            control.insertNewElem(this.currIndex++, a, Math.floor((this.currIndex - 2) / 2));
        }
    }

    sort() {
        for (let i = this.sortIndex; i >= 0; i--) {
            control.setArrow(this.sortIndex);
            this.remove();
        }
        control.setArrow(-1);
    }

    remove(): void {
        // Switch root and last element, remove root and start frontendevents
        let oldVal = this.array[0];
        this.exch(0, --this.currIndex);
        control.sortHighlightTwoNodes(this.currIndex, this.sortIndex, "orange");
        control.setSortValAndDeselect(this.sortIndex, oldVal);
        control.removeElem(this.currIndex, false);
        this.sink(0, this.currIndex);
        control.highlightSortElem(this.sortIndex--, "green");
    }

    getName() {
        return "MaxHeapCombined";
    }
}