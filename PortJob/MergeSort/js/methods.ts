///<reference path="initArray.ts"/>
///<reference path="arrowMethods.ts"/>

declare var $;
declare var javaBinder;
var insElemNr = "insElemNr";
var LEVEL_HEIGHT: number = 85;

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

function moveElementToPlace(element: number, end: number, moveTo: number, rest: boolean) {
    console.log("--------------------------------------------------------");
    console.log("elem " + element + " end " + end + " moveTo " + moveTo);

    let swap: boolean = true;
    let place: number = moveTo;
    let steps : number = element - moveTo;
    if (element != moveTo) {
        for (let i = element; i <= end; i++) {
            if (i == element && swap) {
                swap = false;
                console.log("swap me");
                var $elem = $("#" + insElemNr + i);
                let moveLeft: number = $("#" + insElemNr + moveTo).css("left");
                console.log(moveLeft);
                $("#" + insElemNr + moveTo).attr("id", insElemNr + 100);
                $("#" + insElemNr + element).attr("id", insElemNr + moveTo);
                $elem.animate({left: moveLeft}, 500);
                i = place - 1;
            } else if (steps == 1 || steps == -1) {
                console.log("steps == 1");
                var $elem = $("#" + insElemNr + 100);
                let moveLeft: string = $elem.css("left");
                let move: number = (((Number)(moveLeft.substring(0, moveLeft.length - 2))) + 85);
                $elem.attr("id", insElemNr + element);
                $elem.animate({left: move + "px"}, 500);
                break;
            } else if (place == end) {
                console.log("i == end-1");
                var $elem = $("#" + insElemNr + 100);
                let moveLeft: string = $elem.css("left");
                let move: number = (((Number)(moveLeft.substring(0, moveLeft.length - 2))) + 85);
                $elem.attr("id", insElemNr + place);
                $elem.animate({left: move + "px"}, 500);

            } else if (i < end - 1) {
                console.log("else" + i);
                var $elem = $("#" + insElemNr + 100);
                let moveLeft: string = $elem.css("left");
                let move: number = (((Number)(moveLeft.substring(0, moveLeft.length - 2))) + 85);
                $("#" + insElemNr + i).attr("id", insElemNr + 100);
                $elem.attr("id", insElemNr + i);
                $elem.animate({left: move + "px"}, 500);
            }


            place++;
        }
    }


}


