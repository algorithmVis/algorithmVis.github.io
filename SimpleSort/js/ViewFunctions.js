var nr = "#insElemNr";
var defaultColor = "#fff";
// List of controllers (buttons) which is disabled under algorithm execution
var lockingControllers = ["start", "random", "almost", "sorted"];
function setColor(index, color, colorOn) {
    if (colorOn) {
        $(nr + index).css('backgroundColor', color);
    }
    else
        $(nr + index).css('backgroundColor', defaultColor); // Default color here
}
function setPosition(index, left, top) {
    var leftpx = left + "px";
    $(nr + index).animate({ left: leftpx }, 700);
}
function swapId(a, b) {
    var midlA = $(nr + a).attr('id');
    var midlB = $(nr + b).attr('id');
    $(nr + b).attr('id', "Midl");
    $(nr + a).attr('id', midlB);
    $("#Midl").attr('id', midlA);
    return true;
}
function setId(oldId, newId) {
    var midlNew = $(nr + newId).attr('id');
    $(nr + oldId).attr('id', midlNew);
    return true;
}
function storePermaValue(index) {
    $(nr + index).animate({ top: "50px" });
}
function releasePermaValue(index) {
    $(nr + index).animate({ top: "0px" });
}
function setHeaderText(name) {
    $("#header").text(name);
}
