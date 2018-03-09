///<reference path="initArray.ts"/>
///<reference path="arrowMethods.ts"/>

declare var $;
declare var javaBinder;
var insElemNr = "insElemNr";
var LEVEL_HEIGHT:number = 30;

function lowerElements(start : number, end : number) {
    var newTop : number;
    for (var i = 0; i < array.length; i++) {
        if (i >= start && i <= end) {
            var $elem = $("#" + insElemNr+i);
            newTop = parseInt($elem.css('top'), 10) + LEVEL_HEIGHT;
            $elem.animate({top: newTop+"px"}, 300);
        }
    }
    lowerArrows(300);
}

function liftElements(start : number, end : number) {
    for (var i = 0; i < array.length; i++) {
        if (i >= start && i <= end) {
            var $elem = $("#" + insElemNr + i);
            //Test to check if it should stop going up, might need a var instead of number
            if ($elem.offset().top > 168) {
                var newTop : number = parseInt($elem.css('top'), 10) - LEVEL_HEIGHT;
                $elem.animate({top: newTop+"px"}, 300);
            }
        }
    }
    liftArrows(300);
}

function swapElements(a : number, b : number) {
    getArrayElement(a).swap(getArrayElement(b), insElemNr, 1500);
}

function setPauseButtonText(n:number){
    // console.log("PauseButtonText: " + n);
}

function togglePauseIcon(n:number) {
    if (n == 1) {
        $("#paused").addClass("hidden");
    } else {
        $("#paused").removeClass("hidden");
    }
}

function selectPivotElement(index:number) {
    var insElem = $("#insElemNr" + index);
    insElem.addClass("pivot");
    insElem.append('<p id="pivotChar">P</p>');
}

function deselectPivotElement(index:number) {
    $("#insElemNr" + index).removeClass("pivot");
    $("#insElemNr" + index).children("p").remove();
}

function setToFinished(index:number) {
    $("#insElemNr" + index).addClass("finished");
}

function setToNotFinished(index:number) {
    $("#insElemNr" + index).removeClass("finished");
}

function clearScreen() {
    resetArrows();
}

function setLevelHeight(height: number) {
    LEVEL_HEIGHT = height;
}


