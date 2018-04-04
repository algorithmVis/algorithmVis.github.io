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
        for (var i = 0; i < 10; i++) {
            this.array[i] = Math.floor((Math.random() * 10)) + 1;
        }
        this.backEndBuild();
        //    this.array[i] = i;
        //this.array.reverse();
    }
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
        var n = this.array.length;
        for (var k = Math.floor((n - 1) / 2); k >= 0; k--)
            this.sink(k, n);
    };
    MaxHeap.prototype.exch = function (number, number2) {
        if (this.array[number] === undefined || this.array[number2] === undefined || number > this.currIndex || number > this.currIndex)
            return;
        control.saveState(this.array);
        var tmp = this.array[number];
        this.array[number] = this.array[number2];
        control.setValueAtIndex(number, this.array[number]);
        this.array[number2] = tmp;
        control.setValueAtIndex(number2, this.array[number2]);
    };
    MaxHeap.prototype.add = function (a) {
        control.saveState(this.array);
        // Add to array and start frontendevents
        if (this.currIndex > 10) {
            return;
        }
        else {
            control.lockScreen(true);
            this.array[this.currIndex] = a;
            control.insertNewElem(this.currIndex++, a, Math.floor((this.currIndex - 2) / 2));
        }
        this.swim(this.currIndex - 1);
        control.lockScreen(false);
    };
    MaxHeap.prototype.remove = function () {
        control.saveState(this.array);
        control.lockScreen(true);
        // Remove root element, set last element to root and start frontendevents
        this.currIndex--;
        this.exch(0, this.currIndex);
        control.swapNode(this.currIndex, 0);
        control.removeElem(this.currIndex, false);
        control.setValueAtIndex(this.currIndex, " ");
        this.sink(0, this.currIndex - 1);
        control.saveState(this.array);
        control.lockScreen(false);
    };
    MaxHeap.prototype.sink = function (index, length) {
        var left = index * 2 + 1;
        var right = index * 2 + 2;
        if (right > length)
            return;
        if (this.array[index] >= this.array[left] && this.array[index] >= this.array[right])
            return;
        // Sink
        var other;
        if (this.array[right] > this.array[left]) {
            other = right;
        }
        else {
            other = left;
        }
        control.saveState(this.array);
        control.highlightNode(index, "orange");
        control.highlightNode(other, "orange");
        control.swapNode(index, other);
        this.exch(index, other);
        control.highlightNode(index, "green");
        control.highlightNode(other, "green");
        control.removeHighlight(index);
        control.removeHighlight(other);
        this.sink(other, length);
    };
    MaxHeap.prototype.swim = function (index) {
        var other = Math.floor((index - 1) / 2);
        while (other >= 0 && this.array[index] > this.array[other]) {
            control.saveState(this.array);
            control.highlightNode(index, "orange");
            control.highlightNode(other, "orange");
            control.swapNode(index, other);
            this.exch(index, other);
            control.highlightNode(index, "green");
            control.highlightNode(other, "green");
            control.removeHighlight(index);
            control.removeHighlight(other);
            index = Math.floor((index - 1) / 2);
            other = Math.floor((index - 1) / 2);
        }
        if (index !== 0) {
            control.highlightNode(index, "green");
            control.highlightNode(other, "green");
            control.removeHighlight(index);
            control.removeHighlight(other);
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
