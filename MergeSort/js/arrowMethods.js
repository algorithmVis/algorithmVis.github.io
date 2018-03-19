///<reference path="initArray.ts"/>
///<reference path="methods.ts"/>
var MARGIN_TO_ARROW = 100;
var ARROW_LEVEL = 0;
function setupArrows() {
    setArrowLevel(0, 0);
}
function setArrowLevel(level, animTime) {
    var top = MARGIN_TO_ARROW + LEVEL_HEIGHT * level;
    $("#leftArrow").each(function () {
        $(this).animate({ top: top + "px" }, animTime);
    });
}
function resetArrows() {
    ARROW_LEVEL = 0;
    hideLeftArrow();
}
function liftArrows(animTime) {
    setArrowLevel(--ARROW_LEVEL, animTime);
}
function lowerArrows(animTime) {
    setArrowLevel(++ARROW_LEVEL, animTime);
}
function hideArrow() {
    var $elem = $("#leftArrow");
    if ($elem.length == 0) {
        return;
    }
    $elem.addClass("hidden");
}
function showArrow() {
    $("#leftArrow").removeClass("hidden");
}
function moveArrowToIndex(i, animationTime) {
    $("#leftArrow").animate({ left: (85 * i - 5) + "px" }, animationTime);
}
function setArrowNumber(nr) {
    $("div#leftArrow div.arrowText").html("while<br>&lt; " + nr);
}
