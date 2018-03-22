///<reference path="MergeSortAlgorithm.ts"/>
declare var $;

let array: number[];

class ArrayElement {
    left: number;
    id: number;

    constructor(id: number) {
        this.id = id;
    }

    animateLeft(left: number, animTime: number, arrayId: string) {
        this.left = left;
        $("#" + arrayId + this.id).animate({left: left}, animTime);
    }
}

var arrayElements = new Array;

function setMyArray(jsonArray: string) {
    array = JSON.parse(jsonArray);
    arrayElements = [];

    // Remove elements
    $("#arrayUl li, #indices p").each(function () {
        $(this).remove();
    });

    for (var i = 0; i < array.length; i++) {
        $("#indices").append("<p id='ind" + i + "' >" + i + "</p>");
        $("#arrayUl").append("<li id='insElemNr" + array[i] + "'><div>" + array[i] + "</div></li>");
        arrayElements.push(new ArrayElement(array[i]));
    }

    // Spreading elements horizontally
    $(document).ready(function () {
        for (var i = 0; i < array.length; i++) {
            var left = (i * 85);
            var indLeft = (left + 7) - (i > 9 ? 7 : 0);
            $("#ind" + i).animate({left: indLeft + "px"}, 1000)
            arrayElements[i].animateLeft(left, 1000, "insElemNr");
        }
    });

    // Center elements
    centerElements();
    $(window).resize(centerElements());
}

function centerElements() {
    var arrayWidth = ((array.length - 1) * 85) + 50;
    var left = -arrayWidth / 2 + 20;
    $("#indices").animate({left: (left) + "px"}, 500);
    $("#arrayUl").animate({left: left + "px"}, 500); // +20? Ul is default 40px -> 40/2 = 20. Don't touch.
    $("svg#k-svg").animate({left: (left - 7) + "px"}, 500);
    $("#rightBracket").animate({left: (arrayWidth + 15) + "px"}, 600);
}

function returnArray() {
    return array;
}

function getArray(ran:string) {
// Setting Random array
    if (ran === "random") {
        array = setRandomMyArray();
    }
    else if (ran === "sorted") {
        array = setSortedArray();
    }
    else if (ran === "inverted") {
        array = setInvSortedArray();
    }
    else if (ran === "almostSorted") {
        array = setAlmostSortedArray();
    }
    else { // If page is tested in another browser
        array = [14, 11, 19, 18, 7, 17, 15, 5];
    }

    if (checkDupli(array)) {
        return getArray(ran);
    } else {
        viewer.serializeArray(array);
        setMyArray(JSON.stringify(array));
        startMergeSort();
    }
}

function checkDupli(arr: number[]) {
    for (let i = 0; i <= arr.length; i++) {
        for (let j = i; j <= arr.length; j++) {
            if (i != j && arr[i] == arr[j]) {
                return true;
            }
        }
    }
    return false;
}