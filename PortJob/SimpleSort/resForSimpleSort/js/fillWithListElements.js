//noinspection SpellCheckingInspection
/**
 * This script deserializes the array and writes them to DOM
 */

function setArray(serializedArray) {
    // Remove elements
    $("#arrayUl li, #indices p").each( function() {
        $(this).remove();
    });
    // Insert new elements
    array = serializedArray.split('|'); // Deserialize array
    $("#array").append("<ul id='arrayUl' class='insElements'></ul>"); // TODO: this adds arrayUl without deleting it
    for (var i = 0; i < array.length; i++) {
        $("#indices").append("<p id='ind" + i + "' >" + i + "</p>");
        $("#arrayUl").append("<li id='insElemNr" + i + "'><div>" + array[i] + "</div></li>");
    }

    // Spreading elements horizontally
    $("document").ready(function() {
        for (var i = 0; i < array.length; i++) {
            var left = (i * 70) + "px";
            $("#ind" + i).animate({left: left}, 1000)
            $("#insElemNr" + i).animate({left: left}, 1000);
        }
    });

    // Center elements
    centerElements();
    $(window).resize(centerElements());
}

function centerElements() {
    var arrayWidth = ((array.length-1) * 70) + 50;
    var left = -arrayWidth/2 + 20;
    $("#indices").animate({left: left + "px"}, 500);
    $("#arrayUl").animate({left: left + "px"}, 500); // +20? Ul is default 40px -> 40/2 = 20. Dont touch.
    $("svg#k-svg").animate({left: (left-7) + "px"}, 500);
}

var rand = true;
// Setting Random array
if (rand)
    setArray(viewer.serializeArray(setRandomArray()));
else // If page is tested in another browser
    setArray('14|17|19|18|7|17|15|5');

// If another browser
if (typeof javaLog == 'undefined')
    var javaLog = { log:function(s) { console.log(s); }}
