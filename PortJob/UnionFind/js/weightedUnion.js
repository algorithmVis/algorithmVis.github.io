///<reference path="controller.ts"/>
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
var weightedUnion = /** @class */ (function (_super) {
    __extends(weightedUnion, _super);
    function weightedUnion(arrSize) {
        var _this = _super.call(this, arrSize) || this;
        _this.paused = false;
        _this.treeSize = [];
        for (var i = 0; i < arrSize; i++)
            _this.treeSize[i] = 1;
        _this.paused = false;
        return _this;
    }
    weightedUnion.prototype.union = function (aIndex, bIndex) {
        var aRoot = this.simpleFind(aIndex, "green");
        control.displaySize(aRoot, this.treeSize[aRoot]);
        var bRoot = this.simpleFind(bIndex, "green");
        control.displaySize(bRoot, this.treeSize[bRoot]);
        control.saveState(_super.prototype.getArray.call(this));
        //Only connectNodes if they were not already in the same tree
        if (aRoot != bRoot) {
            if (this.treeSize[bRoot] < this.treeSize[aRoot]) {
                control.connectNodes(bRoot, aRoot);
                control.setValueAtIndex(bRoot, aRoot);
                _super.prototype.getArray.call(this)[bRoot] = aRoot;
                this.treeSize[aRoot] += this.treeSize[bRoot];
            }
            else {
                control.connectNodes(aRoot, bRoot);
                control.setValueAtIndex(aRoot, bRoot);
                _super.prototype.getArray.call(this)[aRoot] = bRoot;
                this.treeSize[bRoot] += this.treeSize[aRoot];
            }
        }
        _super.prototype.delay.call(this, _super.prototype.getDelayTime.call(this) * 2);
        _super.prototype.removeHighlighting.call(this, aRoot);
        _super.prototype.removeHighlighting.call(this, bRoot);
        control.setSelectedIndex(aIndex, false);
        control.setSelectedIndex(bIndex, false);
    };
    weightedUnion.prototype.invertPause = function () {
        this.paused = !this.paused;
    };
    weightedUnion.prototype.setController = function (c) {
        _super.prototype.setController.call(this, c);
    };
    weightedUnion.prototype.simpleFind = function (pIndex, color) {
        var root = pIndex;
        while (root != _super.prototype.getArray.call(this)[root]) {
            _super.prototype.highlightSingleNode.call(this, root, "orange");
            _super.prototype.delay.call(this, _super.prototype.getDelayTime.call(this));
            _super.prototype.removeHighlighting.call(this, root);
            root = _super.prototype.getArray.call(this)[root];
        }
        _super.prototype.highlightSingleNode.call(this, root, color);
        return root;
    };
    weightedUnion.prototype.getName = function () {
        return "Weighted Union";
    };
    weightedUnion.prototype.setArray = function (array) {
        _super.prototype.setArray.call(this, array);
        this.refreshSizeArray(array);
    };
    weightedUnion.prototype.connectedNoGUIUpdate = function (a, b) {
        return this.getRoot(a) == this.getRoot(b);
    };
    /**
     * After a new array has been set (by StateControl), sizeTree needs to be refreshed
     * @param array
     */
    weightedUnion.prototype.refreshSizeArray = function (array) {
        this.treeSize = [];
        for (var i = 0; i < array.length; i++) {
            var root = this.getRoot(array[i]);
            this.treeSize[root]++;
        }
    };
    weightedUnion.prototype.getRoot = function (index) {
        var root = index;
        while (root != _super.prototype.getArray.call(this)[root]) {
            root = _super.prototype.getArray.call(this)[root];
        }
        return root;
    };
    return weightedUnion;
}(quickUnion));
