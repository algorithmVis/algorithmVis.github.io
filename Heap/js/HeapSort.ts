/**
 * File created by Øyvind Skeie Liland on 15.03.18
 **/
///<reference path="methods.ts"/>


class HeapSort extends MaxHeap {
    private sortIndex;

    constructor(size: number) {
        super(size);
        HeapSort.insertElems(size);
        this.sortIndex = this.currIndex - 1;
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


    static insertElems(size: number) {
        for (var i = 0; i < size; i++) {
            $("#sortArrayUL").append("<li id='sortArrayElem" + i + "'><div class='index'>" + i + "</div><div class='content' id='sortArrayContent" + i + "'>" + " " + "</div></li>");
        }

        // Spreading elements horizontally
        $("document").ready(function () {
            for (var i = 0; i < size; i++) {
                var left = (i * 70) + "px";
                $("#sortArrayElem" + i).animate({ left: left }, 1000);
            }
            var arrayWidth = ((size - 1) * 70) + 50;
            $("#sortArrayUL").animate({ left: (-arrayWidth / 2 + 20) + "px" }, 500); // +20? Ul is default 40px -> 40/2 = 20. Dont touch.
        });
    }

    getName() {
        return "HeapSort";
    }
}