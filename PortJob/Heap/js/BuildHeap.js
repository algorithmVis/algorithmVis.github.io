/**
 * Created by Øyvind Skeie Liland on 13.03.18
 */
///<reference path="Controller.ts"/>
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
var BuildHeap = /** @class */ (function (_super) {
    __extends(BuildHeap, _super);
    function BuildHeap(size) {
        var _this = _super.call(this, size) || this;
        _this.array.reverse(); // revert back
        $(".buttons").append("<button id='play' class='btn btn-primary' onclick='control.getAlgorithm().build()'> Play </button>");
        return _this;
    }
    BuildHeap.prototype.getName = function () {
        return "BuildHeap";
    };
    return BuildHeap;
}(MaxHeap));
