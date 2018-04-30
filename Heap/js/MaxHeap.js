///<reference path="methods.ts"/>
///<reference path="drawGraph.ts"/>
/**
 * File created by Øyvind Skeie Liland on 24.02.18
 */
var MaxHeap = /** @class */ (function () {
    function MaxHeap(size) {
        this.name = "MaxHeap";
        this.arraySize = size;
        this.currIndex = size;
        this.array = new Array;
        var _loop_1 = function (i) {
            var val = this_1.generateRandomNum();
            while (this_1.array.filter(function (x) { return x === val; }).length > 1)
                val = this_1.generateRandomNum();
            this_1.array[i] = val;
        };
        var this_1 = this;
        for (var i = 0; i < 10; i++) {
            _loop_1(i);
        }
        this.backEndBuild();
    }
    MaxHeap.prototype.generateRandomNum = function () {
        return Math.floor((Math.random() * 10)) + 1;
    };
    MaxHeap.prototype.setIndex = function () {
        for (var i = 0; i < this.array.length; i++) {
            if (i >= this.currIndex)
                setValueAtIndex(i, " ");
            else
                setValueAtIndex(i, this.array[i]);
        }
    };
    MaxHeap.prototype.removeNodes = function () {
        for (var i = this.currIndex; i < this.getArray().length; i++) {
            allNodes.pop();
            superNode.children.pop();
            $("#node" + i).remove();
        }
    };
    MaxHeap.prototype.connectNodes = function () {
        for (var i = 0; i <= Math.floor(this.array.length / 2); i++) {
            var parent_1 = i;
            if (this.array[2 * i + 1] !== null) {
                connectNodes(2 * i + 1, parent_1);
            }
            if (this.array[2 * i + 2] !== null) {
                connectNodes((2 * i) + 2, parent_1);
            }
        }
    };
    /**
     * Build a max heap on the backend with no frontend events
     */
    MaxHeap.prototype.backEndBuild = function () {
        var n = this.array.length;
        for (var k = Math.floor((n - 1) / 2); k >= 0; k--) {
            this.backendSink(k, n);
        }
    };
    /**
     * Sink on the backend with no frontend events
     * @param {number} index
     * @param {number} length
     */
    MaxHeap.prototype.backendSink = function (index, length) {
        var left = index * 2 + 1;
        var right = index * 2 + 2;
        if (left > length)
            return;
        if (this.array[index] >= this.array[left] && this.array[index] >= this.array[right])
            return;
        // Sink
        var other;
        if (right >= length)
            other = left;
        else if (this.array[right] > this.array[left]) {
            other = right;
        }
        else {
            other = left;
        }
        // Check once more before exchange
        if (this.array[index] >= this.array[other])
            return;
        this.backEndExch(index, other);
        this.backendSink(other, length);
    };
    MaxHeap.prototype.backEndExch = function (index, other) {
        var tmp = this.array[other];
        this.array[other] = this.array[index];
        this.array[index] = tmp;
    };
    /**
     * Build a max heap
     */
    MaxHeap.prototype.build = function () {
        var n = this.currIndex;
        for (var k = Math.floor((n - 1) / 2); k >= 0; k--)
            this.sink(k, n);
    };
    MaxHeap.prototype.exch = function (number, number2) {
        if (this.array[number] === undefined || this.array[number2] === undefined)
            return;
        control.highlightTwoNodes(number, number2, "orange");
        control.removeHighlightTwoNodes(number, number2, "orange");
        control.exchangeElemAndNodes(number, this.array[number], number2, this.array[number2]);
        this.backEndExch(number, number2);
    };
    MaxHeap.prototype.add = function (a) {
        // Add to array and start frontendevents
        if (this.currIndex > 10) {
            return;
        }
        else {
            this.array[this.currIndex] = a;
            control.insertNewElem(this.currIndex++, a, Math.floor((this.currIndex - 2) / 2));
        }
        this.swim(this.currIndex - 1);
    };
    MaxHeap.prototype.remove = function () {
        // Remove root element, set last element to root and start frontendevents
        this.exch(0, --this.currIndex);
        control.removeElem(this.currIndex, false);
        this.sink(0, this.currIndex);
    };
    MaxHeap.prototype.sink = function (index, length) {
        var left = index * 2 + 1;
        var right = index * 2 + 2;
        if (left >= length)
            return;
        if (this.array[index] >= this.array[left] && this.array[index] >= this.array[right])
            return;
        // Sink
        var other;
        if (right >= length)
            other = left;
        else if (this.array[right] > this.array[left]) {
            other = right;
        }
        else {
            other = left;
        }
        // Check once more before exchange
        if (this.array[index] >= this.array[other]) {
            control.highlightTwoNodes(index, other, "green");
            control.removeHighlightTwoNodes(index, other, "green");
            return;
        }
        this.exch(index, other);
        control.highlightTwoNodes(index, other, "green");
        control.removeHighlightTwoNodes(index, other, "green");
        this.sink(other, length);
    };
    MaxHeap.prototype.swim = function (index) {
        var other = Math.floor((index - 1) / 2);
        while (other >= 0 && this.array[index] > this.array[other]) {
            this.exch(index, other);
            control.highlightTwoNodes(index, other, "green");
            control.removeHighlightTwoNodes(index, other, "green");
            index = Math.floor((index - 1) / 2);
            other = Math.floor((index - 1) / 2);
        }
        if (index !== 0) {
            control.highlightTwoNodes(index, other, "green");
            control.removeHighlightTwoNodes(index, other, "green");
        }
    };
    MaxHeap.prototype.getName = function () {
        return this.name;
    };
    MaxHeap.prototype.getArray = function () {
        return this.array;
    };
    MaxHeap.prototype.getArrayLength = function () {
        return this.currIndex;
    };
    MaxHeap.prototype.setArray = function (array) {
    };
    return MaxHeap;
}());
