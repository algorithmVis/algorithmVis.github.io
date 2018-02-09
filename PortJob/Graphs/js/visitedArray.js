///<reference path="adjacencyList.ts"/>
///<reference path="graphUI.ts"/>
///<reference path="graphStructureController.ts"/>
///<reference path="eventManager.ts"/>
var $;
var arrayElements = new Array;
var array;
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
function getArrayElement(id) {
    if (id < 0 || id >= arrayElements.length) {
        console.log("Illegal argument for getArrayElement: " + id);
        return;
    }
    return arrayElements.filter(function (elem) { return elem.id == id; })[0];
}
function removeVisitedArray() {
    // Remove elements
    $("#visitedUL").html("");
}
function setInitialArray() {
    var arr = [];
    // Remove elements
    removeVisitedArray();
    $("#visitedUL").append("<p id='visitedText' class='visited-text'>visited</p>");
    $("#visitedUL").append("<img id='leftBracket' class='bracket' src='assets/square_left.png'/>");
    for (var i = 0; i < nodes; i++) {
        $("#visitedUL").append("<li id='insElemNr" + i + "'><div>" + "F</div></li>");
        arr.push('F');
        $("#insElemNr" + i).prepend("<p id='ind" + i + "'>" + i + "</p>");
    }
    // place right bracket
    //<img id="rightBracket" class="bracket" src="assets/square_right.png"/>
    var posLeft = nodes * (20);
    //style='left="+ posLeft + "px'
    $("#visitedUL").append("<img id='rightBracket' class='bracket' src='assets/square_right.png'/>");
}
function centerElements() {
    var arrayWidth = ((array.length - 1) * 85) + 50;
    var left = -arrayWidth / 2 + 20;
    $("#indices").animate({ left: (left) + "px" }, 500);
    $("#visitedUL").animate({ left: left + "px" }, 500); // +20? Ul is default 40px -> 40/2 = 20. Don't touch.
    //$("svg#k-svg").animate({left: (left-7) + "px"}, 500);
    $("#rightBracket").animate({ left: (arrayWidth + 15) + "px" }, 600);
}
