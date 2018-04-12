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
    MaxHeapFree.prototype.getName = function () {
        return "MaxHeapFree";
    };
    return MaxHeapFree;
}(MaxHeap));
