//noinspection SpellCheckingInspection
/**
 * This script deserializes the array and writes them to DOM
 */

function setArray(serializedArray: any) {
    // Remove elements
    $("#arrayUl li, #indices p").each(function () {
        $(this).remove();
    });
    $("#arrayUl").remove();
    // Insert new elements
    savedArray = serializedArray.split('|'); // Deserialize array
    $("#array").append("<ul id='arrayUl' class='insElements'></ul>"); // TODO: this adds arrayUl without deleting it
    for (var i = 0; i < savedArray.length; i++) {
        $("#indices").append("<p id='ind" + i + "' >" + i + "</p>");
        $("#arrayUl").append("<li id='insElemNr" + i + "'><div>" + savedArray[i] + "</div></li>");
    }

    // Spreading elements horizontally
    $("document").ready(function () {
        for (var i = 0; i < savedArray.length; i++) {
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
    var arrayWidth = ((savedArray.length - 1) * 70) + 50;
    var left = -arrayWidth / 2 + 20;
    $("#indices").animate({left: left + "px"}, 500);
    $("#arrayUl").animate({left: left + "px"}, 500); // +20? Ul is default 40px -> 40/2 = 20. Dont touch.
    $("svg#k-svg").animate({left: (left - 7) + "px"}, 500);
}

function getArray(ran: string) {
    if (ran === "random") {
        savedArray = setRandomArray();
    }
    else if (ran === "sorted") {
        savedArray = setSortedArray();
    }
    else if (ran === "inverted") {
        savedArray = setInvSortedArray();
    }
    else if (ran === "almostSorted") {
        savedArray = setAlmostSortedArray();
    }
    else { // If all else fails
        savedArray = [14, 11, 19, 18, 7, 17, 15, 5];
    }
    setArray(viewer.serializeArray(savedArray));
    if (algoIns) {
        startInsertionSort();
    } else
        startShellSort();
}

