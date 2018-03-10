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
