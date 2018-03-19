///<reference path="methods.ts"/>
///<reference path="drawGraph.ts"/>
/**
 * File created by Øyvind Skeie Liland on 24.02.18
 */
var MaxHeap = /** @class */ (function () {
    function MaxHeap(size) {
        this.name = "MaxHeap";
        this.arraySize = size;
        this.currIndex = size - 1;
        this.array = new Array;
        for (var i = 0; i < size; i++) {
            this.array[i] = Math.floor((Math.random() * 10)) + 1;
        }
        this.backEndBuild();
        //    this.array[i] = i;
        //this.array.reverse();
    }
    MaxHeap.prototype.setIndex = function () {
        for (var i = 0; i < this.array.length; i++) {
            setValueAtIndex(i, this.array[i]);
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
        console.log(this.array);
    };
    MaxHeap.prototype.exch = function (number, number2) {
        if (this.array[number] === undefined || this.array[number2] === undefined)
            return;
        var tmp = this.array[number];
        this.array[number] = this.array[number2];
        control.setValueAtIndex(number, this.array[number]);
        this.array[number2] = tmp;
        control.setValueAtIndex(number2, this.array[number2]);
    };
    MaxHeap.prototype.add = function (a) {
        // Add to array and start frontendevents
        this.array.push(a);
        insertNewElem(this.array.length - 1, a); // Create element in frontendarray
        insertNewElemConnect(this.array.length - 1, Math.floor((this.array.length - 2) / 2));
        control.saveState(this.array); // Save the new state
        // Swim to te correct index and start frontendevents
        this.swim(this.array.length - 1);
    };
    MaxHeap.prototype.remove = function () {
        // Remove root element, set last element to root and start frontendevents
        this.exch(0, this.array.length - 1);
        control.swapNode(this.array.length - 1, 0);
        control.removeElem(this.array.length - 1, true);
        this.array.pop();
        control.saveState(this.array);
        this.sink(0, this.array.length - 1);
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
        control.highlightNode(index, "orange");
        control.highlightNode(other, "orange");
        control.swapNode(index, other);
        this.exch(index, other);
        control.highlightNode(index, "green");
        control.highlightNode(other, "green");
        control.removeHighlight(index);
        control.removeHighlight(other);
        control.saveState(this.getArray());
        this.sink(other, length);
    };
    MaxHeap.prototype.swim = function (index) {
        var other = Math.floor((index - 1) / 2);
        while (other >= 0 && this.array[index] > this.array[other]) {
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
            control.saveState(this.getArray());
        }
    };
    MaxHeap.prototype.getName = function () {
        return this.name;
    };
    MaxHeap.prototype.getArray = function () {
        return this.array;
    };
    MaxHeap.prototype.setArray = function (array) {
    };
    return MaxHeap;
}());
