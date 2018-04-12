///<reference path="drawGraph.ts"/>
///<reference path="Controller.ts"/>
///<reference path="View.ts"/>
/**
 * Methods called from Viewer and Algorithms
 * @author Øyvind
 *
 */
var firstSelected = -1;
var locked = false;
var contentHidden = false;
// Displays new array
function displayArray(jsonString) {
    var $array = $.parseJSON(jsonString);
    createAndDrawNodes($array);
}
$(window).click(function (e) {
    if ($(e.target).closest("#arrayUL li").length > 0) {
        return false;
    }
    deselectArrayElemSelections();
    deselectNodeSelections();
});
// Setup nodes and array elements to activate algorithm when clicked
function setOnClickListener() {
    $("#arrayUL li").each(function () {
        $(this).click(function () {
            if (locked) {
                return;
            }
            var id = $(this).attr("id");
            var idInt = "";
            for (var i = 0; i < id.length; i++)
                if (!isNaN(parseInt(id[i])))
                    idInt += id[i];
            if (isHighlighted(parseInt(idInt))) {
                deselectArrayElemSelections();
                deselectNodeSelections();
                return;
            }
            selectElement(parseInt(idInt));
        });
    });
}
setOnClickListener();
function isHighlighted(id) {
    if ($("#arrayElem" + id).hasClass("selected"))
        return true;
    return false;
}
// Selects an element. If method==find call method, else wait for second element before union or connected
function selectElement(index) {
    // Set new class for selected index
    deselectNodeSelections();
    deselectArrayElemSelections();
    var $selected = $("#arrayElem" + index);
    if ($selected.hasClass("selected")) {
        $selected.removeClass("selected");
    }
    else {
        selectIndex(index, true);
        //Children to the highlighted node
        var highlightChildren = allNodes[index].children;
        if (highlightChildren.length > 0) {
            for (var i = 0; i < highlightChildren.length; i++) {
                highlightNode(highlightChildren[i].id, "green");
            }
            selectChild(index * 2 + 1);
            selectChild(index * 2 + 2);
        }
    }
}
// Reset selected values when new method is chosen
function setupRadio() {
    $('input[name=algorithm]:radio').change(function () {
        resetElementSelections();
        deselectArrayElemSelections();
    });
}
setupRadio();
// Methods for positioning arrow
function setArrow(index) {
    var $arrow = $("#arrow");
    if (index == -1) {
        $arrow.addClass("hidden");
        $arrow.animate({ left: ($("#sortArrayElem0").position().left + 9) + "px" }, 0);
        return;
    }
    var left = $("#sortArrayElem" + index).position().left + 9;
    $arrow.removeClass("hidden");
    $arrow.animate({ left: left + "px" }, 200);
}
// New value in arrayElem
function setValueAtIndex(i, value) {
    var $elem = $("#arrayElem" + i).children(".content");
    $elem.empty();
    $elem.append("" + value);
}
// New value in arrayElem
function setValueAtSortIndex(i, value) {
    var $elem = $("#sortArrayElem" + i).children(".content");
    $elem.empty();
    $elem.append("" + value);
}
// Add a new element to the array
function insertNewElem(i, val) {
    $("#arrayUL").append("<li id='arrayElem" + i + "'><div class='index'>" + i + "</div><div class='content' id='arrayContent" + i + "'>" + val + "</div></li>");
    var left = (i * 70) + "px";
    $("#arrayElem" + i).animate({ left: left }, 0);
    insertNewNode(i, val);
}
function insertNewElemConnect(child, parent) {
    if (allNodes[child] === undefined || allNodes[parent] === undefined)
        return;
    // If the two nodes are the same
    if (child == parent) {
        $("#graphUL li").each(function () {
            $(this).removeClass("selected");
        });
        return;
    }
    var parentNode = allNodes[parent];
    var childNode = allNodes[child];
    //To avoid removing and re-adding a child to its own parent
    if (childNode.parent == parentNode) {
        return;
    }
    parentNode.addChild(childNode);
    positioningNodes(500);
}
function removeElem(i, delArray) {
    if (allNodes[i] === undefined)
        return;
    // Set timeout to avoid deleting node before swapElement function has finished executing
    setTimeout(function () {
        var arrayLength = control.getArrayClone().length;
        $("#rightBracket").css({
            "left": 683 + ((arrayLength - 10) * 70) + "px"
        });
        if (delArray)
            $("#arrayElem" + i).remove();
        removeNode(i);
        positioningNodes(500);
    }, 1000);
}
function removeNode(i) {
    $("#node" + i).fadeOut(2000, function () {
        $(this).remove();
    });
    allNodes[i].parent.removeChild(allNodes[i]);
    allNodes.pop();
}
// Swap position of two graphNodes
function swapNodes(child, parent) {
    if (allNodes[parent] === undefined)
        return;
    // Get coordinates
    var tmp = allNodes[parent].value;
    var pTop = allNodes[parent].top;
    var pLeft = allNodes[parent].left;
    var cTop = allNodes[child].top;
    var cLeft = allNodes[child].left;
    // Animate swap => when done change value and reset position
    $("#node" + parent).animate({
        left: allNodes[child].left + 'px',
        top: allNodes[child].top + 'px'
    }, 1000, function () {
        allNodes[parent].changeValue(allNodes[child].value);
        // Reset node position
        $("#node" + parent).css({ 'left': pLeft + 'px', 'top': pTop + 'px' });
    });
    $("#node" + child).animate({
        left: allNodes[parent].left + 'px',
        top: allNodes[parent].top + 'px'
    }, 1000, function () {
        if (allNodes[child] == undefined)
            return;
        allNodes[child].changeValue(tmp);
        // Reset node position
        $("#node" + child).css({ 'left': cLeft + 'px', 'top': cTop + 'px' });
    });
}
// Connecting two nodes
function connectNodes(child, parent) {
    if (allNodes[child] === undefined)
        return;
    // If the two nodes are the same
    if (child == parent) {
        $("#graphUL li").each(function () {
            $(this).removeClass("selected");
        });
        return;
    }
    var parentNode = allNodes[parent];
    var childNode = allNodes[child];
    //To avoid removing and re-adding a child to its own parent
    if (childNode.parent == parentNode) {
        return;
    }
    parentNode.addChild(childNode);
    positioningNodes(animationTime);
}
function selectIndex(index, select) {
    $("#arrayElem" + index + ", #node" + index).each(function () {
        if (select) {
            $(this).addClass("selected");
        }
        else {
            $(this).removeClass("selected");
        }
    });
}
function selectChild(index) {
    $("#arrayElem" + index).addClass("child");
    $("#node" + index).addClass("green");
}
function deselectNodeIndex(index) {
    $("#node" + index).each(function () {
        $(this).removeClass("selected");
        $(this).removeClass("green");
    });
}
function deselectArrayElement(index) {
    $("#arrayElem" + index).removeClass("selected child");
}
function highlightNode(index, color) {
    if (color.toLowerCase() == "green" || color.toLowerCase() == "orange") {
        $("#arrayElem" + index + ", #node" + index).each(function () {
            removeHighlight(index);
            $(this).addClass(color);
        });
    }
    else {
        console.log("*** WARNING: Unknown color, " + color + " *** ");
    }
}
function sortHighlightElem(index, color) {
    if (color.toLowerCase() === "green" || color.toLowerCase() === "orange") {
        removeSortHighlight(index);
        $("#sortArrayElem" + index).addClass(color);
    }
    else {
        console.log("*** WARNING: Unknown color, " + color + " *** ");
    }
}
function removeSortHighlight(index) {
    $("#sortArrayElem" + index).removeClass("orange green");
}
function removeHighlight(index) {
    $("#arrayElem" + index + ", #node" + index).each(function () {
        $(this).removeClass("green");
        $(this).removeClass("orange");
    });
}
function resetElementSelections() {
    firstSelected = -1;
    for (var i = 0; i < 10; i++) {
        selectIndex(i, false);
    }
}
function deselectNodeSelections() {
    for (var i = 0; i < 10; i++) {
        deselectNodeIndex(i);
    }
}
function deselectArrayElemSelections() {
    for (var i = 0; i < 10; i++) {
        deselectArrayElement(i);
    }
}
function screenLock(lock) {
    locked = lock;
    if (lock) {
        $("#addElem").attr({ "disabled": "true" });
        $("#removeElem").attr({ "disabled": "true" });
    }
    else {
        $("#addElem").removeAttr("disabled");
        $("#removeElem").removeAttr("disabled");
    }
}
function lockPlay(lock) {
    if (lock) {
        $("#play").attr({ "disabled": "true" });
    }
    else {
        $("#play").removeAttr("disabled");
    }
}
function lockBackForward(lock) {
    if (lock) {
        $("#backward").attr({ "disabled": "true" });
        $("#forward").attr({ "disabled": "true" });
    }
    else {
        $("#backward").removeAttr("disabled");
        $("#forward").removeAttr("disabled");
    }
}
function setHeaderText(text) {
    $("#headerText").html(text);
}
function setUpAddButton() {
    $("#addElem").click(function () {
        var val = prompt("Which value do you want to add? Integer >= 0. Maximum number of elements is 10");
        if (isNaN(parseInt(val)) || control.getArrayLength() >= 10) {
            return;
        }
        viewer.addNode(parseInt(val));
    });
}
setUpAddButton();
function setUpRemoveButton() {
    $("#removeElem").click(function () {
        viewer.removeNode();
    });
}
setUpRemoveButton();
