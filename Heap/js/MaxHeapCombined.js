/**
 * Created by Øyvind Skeie Liland on 13.03.18
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
///<reference path="methods.ts"/>
///<reference path="drawGraph.ts"/>
var MaxHeapCombined = /** @class */ (function (_super) {
    __extends(MaxHeapCombined, _super);
    function MaxHeapCombined(size) {
        var _this = _super.call(this, size) || this;
        HeapSort.insertElems(10);
        _this.sortIndex = _this.currIndex - 1;
        return _this;
    }
    MaxHeapCombined.prototype.add = function (a) {
        this.sortIndex++;
        if (this.currIndex > 10) {
            return;
        }
        else {
            this.array[this.currIndex] = a;
            control.insertNewElem(this.currIndex++, a, Math.floor((this.currIndex - 2) / 2));
        }
    };
    MaxHeapCombined.prototype.sort = function () {
        for (var i = this.sortIndex; i >= 0; i--) {
            control.setArrow(this.sortIndex);
            this.remove();
        }
    };
    MaxHeapCombined.prototype.remove = function () {
        // Switch root and last element, remove root and start frontendevents
        var oldVal = this.array[0];
        this.exch(0, --this.currIndex);
        control.sortHighlightTwoNodes(this.currIndex, this.sortIndex, "orange");
        control.setSortValAndDeselect(this.sortIndex, oldVal);
        control.removeElem(this.currIndex, false);
        this.sink(0, this.currIndex);
        control.highlightSortElem(this.sortIndex--, "green");
    };
    MaxHeapCombined.prototype.getName = function () {
        return "MaxHeapCombined";
    };
    return MaxHeapCombined;
}(MaxHeapFree));
