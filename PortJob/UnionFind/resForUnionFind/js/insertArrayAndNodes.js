/**
 * Created by knutandersstokke on 11.08.2016.
 */

var arrayLength = arrayLength || 10;

// This functions inserts the array into the webpage
function insertArray() {
    for (var i=0; i<arrayLength; i++) {

        $("#arrayUL").append("<li id='arrayElem" + i + "'><div class='index'>" + i + "</div><div class='content' id='arrayContent"+i+"'>" + i + "</div></li>");
    }

    // Spreading elements horizontally
    $("document").ready(function() {
        for (var i = 0; i < arrayLength; i++) {
            var left = (i * 70) + "px";
            $("#arrayElem" + i).animate({left: left}, 1000);
        }
        var arrayWidth = ((arrayLength-1) * 70) + 50;
        $("#arrayUL").animate({left: (-arrayWidth/2 + 20) + "px"}, 500); // +20? Ul is default 40px -> 40/2 = 20. Dont touch.
    });
}

insertArray();