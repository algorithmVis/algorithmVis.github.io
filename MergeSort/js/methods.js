///<reference path="initArray.ts"/>
///<reference path="arrowMethods.ts"/>
var insElemNr = "insElemNr";
var LEVEL_HEIGHT = 85;
function lowerElement(element) {
    var newTop;
    var $elem = $("#" + insElemNr + element);
    newTop = parseInt($elem.css('top'), 10) + LEVEL_HEIGHT;
    $elem.animate({ top: newTop + "px" }, 500);
    lowerArrows(300);
}
function liftElement(element) {
    var $elem = $("#" + insElemNr + element);
    if ($elem.offset().top > 170) {
        var newTop = parseInt($elem.css('top'), 10) - LEVEL_HEIGHT;
        $elem.animate({ top: newTop + "px" }, 500);
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
function highlightNode(index) {
    $("#insElemNr" + index).addClass("highlightNode");
}
function deHighlightNode(index) {
    $("#insElemNr" + index).removeClass("highlightNode");
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
function moveElementToPlace(element, px) {
    console.log("--------------------------------------------------------");
    var $elem = $("#" + insElemNr + element);
    var moveLeft = $elem.css("left");
    var pos = (Number)(moveLeft.substring(0, moveLeft.length - 2));
    console.log(pos + " " + px);
    if (pos > px) {
        if ($elem.offset().top > 170) {
            var newTop = parseInt($elem.css('top'), 10) - LEVEL_HEIGHT;
            $elem.animate({ top: newTop + "px" }, 500);
        }
        $elem.animate({ left: px + "px" }, 1000);
    }
    else {
        $elem.animate({ left: px + "px" }, 1000);
        if ($elem.offset().top > 170) {
            var newTop = parseInt($elem.css('top'), 10) - LEVEL_HEIGHT;
            $elem.animate({ top: newTop + "px" }, 500);
        }
    }
}
