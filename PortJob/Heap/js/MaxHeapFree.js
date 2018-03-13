///<reference path="methods.ts"/>
///<reference path="drawGraph.ts"/>
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
var MaxHeapFree = /** @class */ (function (_super) {
    __extends(MaxHeapFree, _super);
    function MaxHeapFree(size) {
        var _this = _super.call(this, size) || this;
        for (var i = 0; i < size; i++) {
            var $elem = $("#arrayElem" + i).children(".content");
            $elem.empty();
            $elem.append(" ");
        }
        _this.currIndex = 0;
        return _this;
    }
    MaxHeapFree.prototype.clearArrayValues = function () {
        for (var i = 0; i <= this.getArray().length; i++) {
            this.changeVal(i, " ");
        }
    };
    MaxHeapFree.prototype.changeVal = function (i, val) {
        var $elem = $("#arrayElem" + i).children(".content");
        $elem.empty();
        $elem.append(val);
    };
    MaxHeapFree.prototype.maxHeapFreeInit = function () {
        for (var i = 0; i < this.getArray().length; i++) {
            $("#node" + i).remove();
        }
        allNodes = [];
        superNode.children = [];
    };
    MaxHeapFree.prototype.add = function (a) {
        // Add to array and start frontendevents
        if (this.currIndex > 10) {
            this.array.push(a);
            insertNewElem(this.currIndex++, a); // Create element in frontendarray
        }
        else {
            this.array[this.currIndex] = a;
            setValueAtIndex(this.currIndex, a);
            insertNewNode(this.currIndex++, a);
        }
        // Swim to te correct index and start frontendevents
        if (this.currIndex == 1) {
            positioningNodes(1000);
        }
        else {
            //positioningNodes(0);
            insertNewElemConnect(this.currIndex - 1, Math.floor((this.currIndex - 2) / 2));
            _super.prototype.swim.call(this, this.currIndex - 1);
        }
        control.saveState(this.array); // Save the new state
    };
    MaxHeapFree.prototype.remove = function () {
        // Remove root element, set last element to root and start frontendevents
        this.currIndex--;
        this.exch(0, this.currIndex);
        control.swapNode(this.currIndex, 0);
        control.removeElem(this.currIndex, false);
        control.setValueAtIndex(this.currIndex, " ");
        this.sink(0, this.currIndex - 1);
        control.saveState(this.array);
    };
    MaxHeapFree.prototype.getName = function () {
        return "FreeMode";
    };
    return MaxHeapFree;
}(MaxHeap));
