///<reference path="InitArray.ts"/>
var insElemNr = "insElemNr";
var LEVEL_HEIGHT = 85;
var defaultColor = "#fff";
var colors = ["#f1f500", "#f4a742", "#f49050", "#3adb04"];
function lowerElements(elements) {
    for (var i = 0; i < elements.length; i++) {
        var newTop = void 0;
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
    $("#insElemNr" + index).addClass("middle");
}
function setColor(index, color, colorOn) {
    if (colorOn) {
        $("#insElemNr" + index).css('backgroundColor', colors[color]);
    }
    else {
        $("#insElemNr" + index).css('backgroundColor', defaultColor); // Default color here
    }
}
function setColors(index, color, colorOn) {
    for (var i = 0; i < index.length; i++) {
        if (colorOn) {
            $("#insElemNr" + index[i]).css('backgroundColor', colors[color]);
        }
        else {
            $("#insElemNr" + index[i]).css('backgroundColor', defaultColor); // Default color here
        }
    }
}
function deselectPivotElement(index) {
    $("#insElemNr" + index).removeClass("middle");
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
