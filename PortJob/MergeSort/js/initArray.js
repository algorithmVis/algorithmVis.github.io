"use strict";
///<reference path="arrowMethods.ts"/>
var array;
if (typeof javaBinder != "undefined") {
    console.log = function (msg) {
        javaBinder.print(msg);
    };
}
var ArrayElement = /** @class */ (function () {
    function ArrayElement(id) {
        this.id = id;
    }
    ArrayElement.prototype.animateLeft = function (left, animTime, arrayId) {
        this.left = left;
        $("#" + arrayId + this.id).animate({ left: left }, animTime);
    };
    ArrayElement.prototype.changeId = function (newId, arrayId) {
        $("#" + arrayId + this.id).stop();
        $("#" + arrayId + this.id).attr("id", arrayId + newId);
        this.id = newId;
    };
    ArrayElement.prototype.swap = function (otherElement, arrayId, animTime) {
        // Swap Id
        var thisId = this.id;
        var otherId = otherElement.id;
        this.changeId(100, arrayId); // So it doesnt get selected when selecting the other element
        otherElement.changeId(thisId, arrayId);
        this.changeId(otherId, arrayId);
        // Swap position
        var thisLeft = this.left;
        this.animateLeft(otherElement.left, animTime, arrayId);
        otherElement.animateLeft(thisLeft, animTime, arrayId);
    };
    return ArrayElement;
}());
var arrayElements = new Array;
function getArrayElement(id) {
    if (id < 0 || id >= arrayElements.length) {
        console.log("Illegal argument for getArrayElement: " + id);
        return;
    }
    return arrayElements.filter(function (elem) { return elem.id == id; })[0];
}
function setArray(jsonArray) {
    array = JSON.parse(jsonArray);
    arrayElements = [];
    // Remove elements
    $("#arrayUl li, #indices p").each(function () {
        $(this).remove();
    });
    for (var i = 0; i < array.length; i++) {
        $("#indices").append("<p id='ind" + i + "' >" + i + "</p>");
        $("#arrayUl").append("<li id='insElemNr" + i + "'><div>" + array[i] + "</div></li>");
        arrayElements.push(new ArrayElement(i));
    }
    // Spreading elements horizontally
    $(document).ready(function () {
        for (var i = 0; i < array.length; i++) {
            var left = (i * 85);
            var indLeft = (left + 7) - (i > 9 ? 7 : 0);
            $("#ind" + i).animate({ left: indLeft + "px" }, 1000);
            arrayElements[i].animateLeft(left, 1000, "insElemNr");
        }
    });
    // Center elements
    centerElements();
    $(window).resize(centerElements());
    setupArrows();
}
function centerElements() {
    var arrayWidth = ((array.length - 1) * 85) + 50;
    var left = -arrayWidth / 2 + 20;
    $("#indices").animate({ left: (left) + "px" }, 500);
    $("#arrayUl").animate({ left: left + "px" }, 500); // +20? Ul is default 40px -> 40/2 = 20. Don't touch.
    $("svg#k-svg").animate({ left: (left - 7) + "px" }, 500);
    $("#rightBracket").animate({ left: (arrayWidth + 15) + "px" }, 600);
}
if (typeof javaBinder !== 'undefined') {
    javaBinder.setRandomArray();
}
else {
    $(document).ready(function () {
        var testArray = [4, 3, 3, 1, 6, 5, 8, 7];
        setArray(JSON.stringify(testArray));
    });
}
