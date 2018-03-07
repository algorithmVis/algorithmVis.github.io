///<reference path="methods.ts"/>
/**
 * File created by Øyvind Skeie Liland on 24.02.18
 */
var MaxHeap = /** @class */ (function () {
    function MaxHeap(size) {
        this.name = "MaxHeap";
        this.arraySize = size;
        this.array = new Array;
        for (var i = 0; i < size; i++)
            this.array[i] = i;
        this.array.reverse();
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
                connectNodes(this.array[2 * i + 1], this.array[parent_1]);
            }
            if (this.array[2 * i + 2] !== null) {
                connectNodes(this.array[(2 * i) + 2], this.array[parent_1]);
            }
        }
    };
    /**
     * Build a max heap
     */
    MaxHeap.prototype.build = function () {
        var n = this.array.length;
        for (var k = n / 2; k >= 0; k--)
            this.sink(k, n);
        while (n > 1) {
            this.exch(1, n--);
            this.sink(1, n);
        }
    };
    MaxHeap.prototype.exch = function (number, number2) {
        var tmp = this.array[number];
        this.array[number] = this.array[number2];
        this.array[number2] = tmp;
    };
    MaxHeap.prototype.add = function (a) {
        // Add to array and start frontendevents
        this.array.push(a);
        insertNewElem(this.array.length - 1, a); // Create element in frontendarray
        control.saveState(this.array); // Save the new state
        control.connectNodes(this.array.length - 1, Math.floor((this.array.length - 1) / 2));
        // Swim to te correct index and start frontendevents
        this.swim(this.array.length - 1);
    };
    MaxHeap.prototype.remove = function () {
        // Remove root element, set last element to root and start frontendevents
        this.array[0] = this.array[this.array.length - 1];
        this.array[this.array.length - 1] = null;
        this.sink(0, this.array.length - 1);
    };
    MaxHeap.prototype.sink = function (index, length) {
        var left = index * 2 + 1;
        var right = index * 2 + 2;
    };
    MaxHeap.prototype.swim = function (index) {
        var other = Math.floor(index / 2);
        while (other >= 0 && this.array[index] > this.array[other]) {
            this.exch(index, other);
            index = Math.floor(index / 2);
            other = Math.floor(index / 2);
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
