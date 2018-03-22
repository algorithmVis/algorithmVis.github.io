///<reference path="InitArray.ts"/>
var insElemNr = "insElemNr";
var LEVEL_HEIGHT = 85;
function lowerElements(elements) {
    for (var i = 0; i < elements.length; i++) {
        var newTop;
        var $elem = $("#" + insElemNr + elements[i]);
        newTop = parseInt($elem.css('top'), 10) + LEVEL_HEIGHT;
        $elem.animate({ top: newTop + "px" }, 500);
    }
}
function liftElements(elements) {
    for (var i = 0; i < elements.length; i++) {
        var $elem = $("#" + insElemNr + elements[i]);
        if ($elem.offset().top > 170) {
            var newTop = parseInt($elem.css('top'), 10) - LEVEL_HEIGHT;
            $elem.animate({ top: newTop + "px" }, 500);
        }
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
function highlightNodes(index) {
    for (var i = 0; i < index.length; i++) {
        $("#insElemNr" + index[i]).addClass("highlightNode");
    }
}
function deHighlightNodes(index) {
    for (var i = 0; i < index.length; i++) {
        $("#insElemNr" + index[i]).removeClass("highlightNode");
    }
}
function deselectPivotElement(index) {
    $("#insElemNr" + index).removeClass("pivot");
    $("#insElemNr" + index).children("p").remove();
}
function moveElementToPlace(element, px) {
    var $elem = $("#" + insElemNr + element);
    var moveLeft = $elem.css("left");
    var pos = (Number)(moveLeft.substring(0, moveLeft.length - 2));
    px = px * 85;
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
function moveElementBackToPlace(element, px) {
    console.log(px + " " + element);
    var $elem = $("#" + insElemNr + element);
    var moveLeft = $elem.css("left");
    var pos = (Number)(moveLeft.substring(0, moveLeft.length - 2));
    px = px * 85;
    if (pos > px) {
        if ($elem.offset().top > 170) {
            var newTop = parseInt($elem.css('top'), 10) + LEVEL_HEIGHT;
            $elem.animate({ top: newTop + "px" }, 500);
        }
        $elem.animate({ left: px + "px" }, 1000);
    }
    else {
        $elem.animate({ left: px + "px" }, 1000);
        if ($elem.offset().top > 170) {
            var newTop = parseInt($elem.css('top'), 10) + LEVEL_HEIGHT;
            $elem.animate({ top: newTop + "px" }, 500);
        }
    }
}
