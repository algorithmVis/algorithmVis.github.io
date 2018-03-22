///<reference path="InitArray.ts"/>

declare var $;
var insElemNr = "insElemNr";
var LEVEL_HEIGHT: number = 85;

function lowerElements(elements: number[]) {
    for (let i = 0; i < elements.length; i++) {
        var newTop: number;
        var $elem = $("#" + insElemNr + elements[i]);
        newTop = parseInt($elem.css('top'), 10) + LEVEL_HEIGHT;
        $elem.animate({top: newTop + "px"}, 500);
    }
}

function liftElements(elements: number[]) {
    for (let i = 0; i < elements.length; i++) {
        var $elem = $("#" + insElemNr + elements[i]);
        if ($elem.offset().top > 170) {
            var newTop: number = parseInt($elem.css('top'), 10) - LEVEL_HEIGHT;
            $elem.animate({top: newTop + "px"}, 500);
        }
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

function highlightNodes(index: number[]) {
    for (let i = 0; i < index.length; i++) {
        $("#insElemNr" + index[i]).addClass("highlightNode");
    }
}

function deHighlightNodes(index: number[]) {
    for (let i = 0; i < index.length; i++) {
        $("#insElemNr" + index[i]).removeClass("highlightNode");
    }
}

function deselectPivotElement(index: number) {
    $("#insElemNr" + index).removeClass("pivot");
    $("#insElemNr" + index).children("p").remove();
}



function moveElementToPlace(element: number, px: number) {
    let $elem = $("#" + insElemNr + element);
    let moveLeft: string = $elem.css("left");
    let pos: number = (Number)(moveLeft.substring(0, moveLeft.length - 2));
    px = px * 85;

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

function moveElementBackToPlace(element: number, px: number) {
    console.log(px + " " + element);
    let $elem = $("#" + insElemNr + element);
    let moveLeft: string = $elem.css("left");
    let pos: number = (Number)(moveLeft.substring(0, moveLeft.length - 2));
    px = px * 85;

    if (pos > px) {
        if ($elem.offset().top > 170) {
            var newTop: number = parseInt($elem.css('top'), 10) + LEVEL_HEIGHT;
            $elem.animate({top: newTop + "px"}, 500);
        }
        $elem.animate({left: px + "px"}, 1000);
    } else {
        $elem.animate({left: px + "px"}, 1000);
        if ($elem.offset().top > 170) {
            var newTop: number = parseInt($elem.css('top'), 10) + LEVEL_HEIGHT;
            $elem.animate({top: newTop + "px"}, 500);
        }
    }
}



