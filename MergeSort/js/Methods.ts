///<reference path="InitArray.ts"/>

declare var $;
var insElemNr = "insElemNr";
var LEVEL_HEIGHT: number = 85;

function lowerElement(element: number) {
    var newTop: number;
    var $elem = $("#" + insElemNr + element);
    newTop = parseInt($elem.css('top'), 10) + LEVEL_HEIGHT;
    $elem.animate({top: newTop + "px"}, 500);
}

function liftElement(element: number) {
    var $elem = $("#" + insElemNr + element);
    if ($elem.offset().top > 170) {
        var newTop: number = parseInt($elem.css('top'), 10) - LEVEL_HEIGHT;
        $elem.animate({top: newTop + "px"}, 500);
    }
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

function moveElementToPlace(element: number, px: number) {
    let $elem = $("#" + insElemNr + element);
    let moveLeft: string = $elem.css("left");
    let pos: number = (Number)(moveLeft.substring(0, moveLeft.length - 2));

    if (pos > px) {
        if ($elem.offset().top > 170) {
            var newTop: number = parseInt($elem.css('top'), 10) - LEVEL_HEIGHT;
            $elem.animate({top: newTop + "px"}, 500);
        }
        $elem.animate({left: px + "px"}, 1000);
    } else {
        $elem.animate({left: px + "px"}, 1000);
        if ($elem.offset().top > 170) {
            var newTop: number = parseInt($elem.css('top'), 10) - LEVEL_HEIGHT;
            $elem.animate({top: newTop + "px"}, 500);
        }
    }


}



