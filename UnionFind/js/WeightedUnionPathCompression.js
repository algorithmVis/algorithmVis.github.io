/**
 * File created by Øyvind Skeie Liland on 15.02.18
 * Inspired by WeightedUnionPathCompression.java
 */
///<reference path="QuickUnionPathCompression.ts"/>
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
var WeightedUnionPathCompression = /** @class */ (function (_super) {
    __extends(WeightedUnionPathCompression, _super);
    function WeightedUnionPathCompression(size) {
        var _this = _super.call(this, size) || this;
        _this.paused = false;
        _this.treeSize = [];
        for (var i = 0; i < size; i++)
            _this.treeSize[i] = 1;
        _this.paused = false;
        return _this;
    }
    WeightedUnionPathCompression.prototype.union = function (aIndex, bIndex) {
        var aRoot = this.simpleFind(aIndex, "green");
        control.displaySize(aRoot, this.treeSize[aRoot]);
        var bRoot = this.simpleFind(bIndex, "green");
        control.displaySize(bRoot, this.treeSize[bRoot]);
        control.saveState(this.getArray());
        //Only connectNodes if they were not already in the same tree
        if (aRoot != bRoot) {
            if (this.treeSize[bRoot] < this.treeSize[aRoot]) {
                control.connectNodes(bRoot, aRoot);
                control.setValueAtIndex(bRoot, aRoot);
                this.getArray()[bRoot] = aRoot;
                this.treeSize[aRoot] += this.treeSize[bRoot];
            }
            else {
                control.connectNodes(aRoot, bRoot);
                control.setValueAtIndex(aRoot, bRoot);
                this.getArray()[aRoot] = bRoot;
                this.treeSize[bRoot] += this.treeSize[aRoot];
            }
        }
        //delay((getDelayTime() * 2));
        this.removeHighlighting(aRoot);
        this.removeHighlighting(bRoot);
        control.setSelectedIndex(aIndex, false);
        control.setSelectedIndex(bIndex, false);
    };
    WeightedUnionPathCompression.prototype.getName = function () {
        return "WeightedUnionPathCompression";
    };
    WeightedUnionPathCompression.prototype.refreshSizeArray = function (array) {
        this.treeSize = [];
        for (var i = 0; i < array.length; i++) {
            var root = _super.prototype.getRoot.call(this, (array[i]));
            this.treeSize[root]++;
        }
    };
    return WeightedUnionPathCompression;
}(QuickUnionPathCompression));
