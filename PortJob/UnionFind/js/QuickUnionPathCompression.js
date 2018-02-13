///<reference path="QuickUnion.ts"/>
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
var QuickUnionPathCompression = /** @class */ (function (_super) {
    __extends(QuickUnionPathCompression, _super);
    function QuickUnionPathCompression(size) {
        return _super.call(this, size) || this;
    }
    QuickUnionPathCompression.prototype.union = function (a, b) {
        _super.prototype.union.call(this, a, b);
    };
    QuickUnionPathCompression.prototype.simpleFind = function (pIndex, color) {
        var _this = this;
        var root = pIndex;
        var savedIndex = pIndex;
        while (root != this.getArray()[root]) {
            this.highlightSingleNode(root, "orange");
            this.delay((this.getDelayTime() * 0.75));
            root = this.getArray()[root];
        }
        this.highlightSingleNode(root, color);
        var nodeStack = [];
        while (pIndex != root) {
            this.highlightSingleNode(pIndex, "orange");
            control.connectNodes(pIndex, root);
            control.setValueAtIndex(pIndex, root);
            this.delay((this.getDelayTime() * 1.0));
            nodeStack.push(pIndex);
            var newP = this.getArray()[pIndex];
            this.getArray()[pIndex] = root;
            pIndex = newP;
        }
        nodeStack.forEach(function (n) { return _this.removeHighlighting(n); });
        control.setSelectedIndex(savedIndex, true);
        this.highlightSingleNode(root, color);
        return root;
    };
    QuickUnionPathCompression.prototype.getName = function () {
        return "QuickUnionPathCompression";
    };
    return QuickUnionPathCompression;
}(QuickUnion));
