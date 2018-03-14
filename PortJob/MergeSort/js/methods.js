///<reference path="initArray.ts"/>
///<reference path="arrowMethods.ts"/>
var insElemNr = "insElemNr";
var LEVEL_HEIGHT = 30;
function lowerElements(start, end) {
    var newTop;
    for (var i = 0; i < array.length; i++) {
        if (i >= start && i <= end) {
            var $elem = $("#" + insElemNr + i);
            newTop = parseInt($elem.css('top'), 10) + LEVEL_HEIGHT;
            $elem.animate({ top: newTop + "px" }, 300);
        }
    }
    lowerArrows(300);
}
function liftElements(start, end) {
    for (var i = 0; i < array.length; i++) {
        if (i >= start && i <= end) {
            var $elem = $("#" + insElemNr + i);
            //Test to check if it should stop going up, might need a var instead of number
            if ($elem.offset().top > 168) {
                var newTop = parseInt($elem.css('top'), 10) - LEVEL_HEIGHT;
                $elem.animate({ top: newTop + "px" }, 300);
            }
        }
    }
    liftArrows(300);
}
function swapElements(a, b) {
    console.log("arrayElem: " + getArrayElement(a) + " " + getArrayElement(b) + "ins " + insElemNr);
    getArrayElement(a).swap(getArrayElement(b), insElemNr, 1500);
}
function pushElement(i, place) {
    getArrayElement(i).push(place, insElemNr, 1500);
}
function setPauseButtonText(n) {
    // console.log("PauseButtonText: " + n);
}
function togglePauseIcon(n) {
    if (n == 1) {
        $("#paused").addClass("hidden");
    }
    else {
        $("#paused").removeClass("hidden");
    }
}
function selectPivotElement(index) {
    var insElem = $("#insElemNr" + index);
    insElem.addClass("pivot");
    insElem.append('<p id="pivotChar">P</p>');
}
function deselectPivotElement(index) {
    $("#insElemNr" + index).removeClass("pivot");
    $("#insElemNr" + index).children("p").remove();
}
function setToFinished(index) {
    $("#insElemNr" + index).addClass("finished");
}
function setToNotFinished(index) {
    $("#insElemNr" + index).removeClass("finished");
}
function clearScreen() {
    resetArrows();
}
function setLevelHeight(height) {
    LEVEL_HEIGHT = height;
}
function moveElementToPlace(element, end, moveTo) {
    console.log("elem " + element + " end " + end + " moveTo " + moveTo);
    var copy = array;
    var first;
    var second;
    var notSwap = false;
    for (var i = element; i <= end; i++) {
        console.log("help me  " + i + element);
        if (i == element && !notSwap) {
            first = i;
            var $elem = $("#" + insElemNr + i);
            var moveLeft = $("#" + insElemNr + moveTo).css("left");
            second = moveTo;
            console.log(moveLeft);
            $elem.animate({ left: moveLeft }, 1000, function () {
                $("#" + insElemNr + 0).attr("id", insElemNr + 100);
                $("#" + insElemNr + i).attr("id", insElemNr + moveTo);
            });
            notSwap = true;
        }
        else if (i == end) {
            var $elem = $("#" + insElemNr + 100);
            var moveLeft = $("#" + insElemNr + moveTo).css("left");
            console.log(moveLeft + " " + moveTo);
            moveLeft.replace("px", "");
            second = moveTo;
            console.log(moveLeft);
            $elem.animate({ left: (Number(moveLeft)) + "px" }, 1000, function () {
                $("#" + insElemNr + 100).attr("id", insElemNr + end);
            });
        }
        else {
            var $elem = $("#" + insElemNr + 100);
            var moveLeft = $("#" + insElemNr + moveTo).css("left");
            console.log(moveLeft + " " + moveTo);
            moveLeft.replace("px", "");
            second = moveTo;
            console.log(moveLeft);
            $elem.animate({ left: (Number(moveLeft)) + "px" }, 1000, function () {
                $("#" + insElemNr + 100).attr("id", insElemNr + moveTo);
                $("#" + insElemNr + moveTo + 1).attr("id", insElemNr + 100);
            });
        }
        moveTo++;
        i = moveTo;
    }
}
