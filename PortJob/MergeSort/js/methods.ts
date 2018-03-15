///<reference path="initArray.ts"/>
///<reference path="arrowMethods.ts"/>

declare var $;
declare var javaBinder;
var insElemNr = "insElemNr";
var LEVEL_HEIGHT: number = 30;

function lowerElements(start: number, end: number) {
    var newTop: number;
    for (var i = 0; i < array.length; i++) {
        if (i >= start && i <= end) {
            var $elem = $("#" + insElemNr + i);
            newTop = parseInt($elem.css('top'), 10) + LEVEL_HEIGHT;
            $elem.animate({top: newTop + "px"}, 300);
        }
    }
    lowerArrows(300);
}

function liftElements(start: number, end: number) {
    for (var i = 0; i < array.length; i++) {
        if (i >= start && i <= end) {
            var $elem = $("#" + insElemNr + i);
            //Test to check if it should stop going up, might need a var instead of number
            if ($elem.offset().top > 168) {
                var newTop: number = parseInt($elem.css('top'), 10) - LEVEL_HEIGHT;
                $elem.animate({top: newTop + "px"}, 300);
            }
        }
    }
    liftArrows(300);
}

function swapElements(a: number, b: number) {
    console.log("arrayElem: " + getArrayElement(a) + " " + getArrayElement(b) + "ins " + insElemNr);

    getArrayElement(a).swap(getArrayElement(b), insElemNr, 1500);
}

function pushElement(i: number, place: number) {
    getArrayElement(i).push(place, insElemNr, 1500);
}


function setPauseButtonText(n: number) {
    // console.log("PauseButtonText: " + n);
}

function togglePauseIcon(n: number) {
    if (n == 1) {
        $("#paused").addClass("hidden");
    } else {
        $("#paused").removeClass("hidden");
    }
}

function selectPivotElement(index: number) {
    var insElem = $("#insElemNr" + index);
    insElem.addClass("pivot");
    insElem.append('<p id="pivotChar">P</p>');
}

function highlightNode(index: number) {
    $("#insElemNr" + index).addClass("highlightNode");
}

function deHighlightNode(index: number) {
    $("#insElemNr" + index).removeClass("highlightNode");
}

function deselectPivotElement(index: number) {
    $("#insElemNr" + index).removeClass("pivot");
    $("#insElemNr" + index).children("p").remove();
}

function setToFinished(index: number) {
    $("#insElemNr" + index).addClass("finished");
}

function setToNotFinished(index: number) {
    $("#insElemNr" + index).removeClass("finished");
}

function clearScreen() {
    resetArrows();
}

function setLevelHeight(height: number) {
    LEVEL_HEIGHT = height;
}

function moveElementToPlace(element: number, end: number, moveTo: number) {
    console.log("elem " + element + " end " + end + " moveTo " + moveTo);
    var copy = array;

    let first: number;
    let second: number;
    let notSwap: boolean = false;

    for (var i = element; i <= end; i++) {
        console.log("help me  " + i + element);
        if (i == element && !notSwap) {
            first = i;
            var $elem = $("#" + insElemNr + i);
            let moveLeft: number = $("#" + insElemNr + moveTo).css("left");
            second = moveTo;
            console.log(moveLeft);
            $elem.animate({left: moveLeft}, 1000, function () {
                $("#" + insElemNr + 0).attr("id", insElemNr + 100);
                $("#" + insElemNr + i).attr("id", insElemNr + moveTo);
            });
            notSwap = true;
        } else if (i == end) {
            var $elem = $("#" + insElemNr + 100);
            let moveLeft: string = $("#" + insElemNr + moveTo).css("left");
            console.log(moveLeft + " " + moveTo);
            moveLeft.replace("px", "");
            second = moveTo;
            console.log(moveLeft);
            $elem.animate({left: (Number(moveLeft)) + "px"}, 1000, function () {
                $("#" + insElemNr + 100).attr("id", insElemNr + end);
            });
        } else {
            var $elem = $("#" + insElemNr + 100);
            let moveLeft: string = $("#" + insElemNr + moveTo).css("left");
            console.log(moveLeft + " " + moveTo);
            moveLeft.replace("px", "");
            second = moveTo;
            console.log(moveLeft);
            $elem.animate({left: (Number(moveLeft)) + "px"}, 1000, function () {
                $("#" + insElemNr + 100).attr("id", insElemNr + moveTo);
                $("#" + insElemNr + moveTo + 1).attr("id", insElemNr + 100);
            });
        }
        moveTo++;
        i = moveTo;
    }
}


