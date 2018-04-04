///<reference path="InitArray.ts"/>

declare var $;
let insElemNr: string = "insElemNr";
let LEVEL_HEIGHT: number = 85;
let defaultColor: string = "#fff";
let colors: string[] = ["#f1f500", "#f4a742", "#f49050", "#3adb04"];

function lowerElements(elements: number[]) {
    for (let i = 0; i < elements.length; i++) {
        let newTop: number;
        let $elem = $("#" + insElemNr + elements[i]);
        newTop = parseInt($elem.css('top'), 10) + LEVEL_HEIGHT;
        $elem.animate({top: newTop + "px"}, 500);
    }
}

function liftElements(elements: number[]) {
    for (let i = 0; i < elements.length; i++) {
        let $elem = $("#" + insElemNr + elements[i]);
        if ($elem.offset().top > 170) {
            let newTop: number = parseInt($elem.css('top'), 10) - LEVEL_HEIGHT;
            $elem.animate({top: newTop + "px"}, 500);
        }
    }
}

function selectPivotElement(index: number) {
    console.log(index);
    $("#insElemNr" + index).addClass("middle");
}

function setColor(index: number, color: number, colorOn: boolean) {
    if (colorOn) {
        $("#insElemNr" + index).css('backgroundColor', colors[color]);
    } else {
        $("#insElemNr" + index).css('backgroundColor', defaultColor); // Default color here
    }
}

function setColors(index: number[], color: number, colorOn: boolean) {

    for (let i = 0; i < index.length; i++) {
        if (colorOn) {
            $("#insElemNr" + index[i]).css('backgroundColor', colors[color]);
        } else {
            $("#insElemNr" + index[i]).css('backgroundColor', defaultColor); // Default color here
        }
    }

}

function deselectPivotElement(index: number) {
    $("#insElemNr" + index).removeClass("middle");
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



