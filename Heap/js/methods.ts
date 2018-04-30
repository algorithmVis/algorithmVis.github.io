///<reference path="drawGraph.ts"/>
///<reference path="Controller.ts"/>
///<reference path="View.ts"/>
/**
 * Methods called from Viewer and Algorithms
 * @author Øyvind
 *
 */
let firstSelected: number = -1;
let locked: boolean = false;
let contentHidden: boolean = false;

// Displays new array
function displayArray(jsonString: string): void {
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
            var id: string = $(this).attr("id");
            let idInt = "";
            for (let i = 0; i < id.length; i++)
                if (!isNaN(parseInt(id[i])))
                    idInt += id[i];
            selectElement(parseInt(idInt));
        });
    });
}

setOnClickListener();

function isHighlighted(id: number): boolean {
    if ($("#arrayElem" + id).hasClass("selected"))
        return true;
    return false;
}

// Selects an element. If method==find call method, else wait for second element before union or connected
function selectElement(index: number) {

    // Set new class for selected index
    deselectNodeSelections();
    deselectArrayElemSelections();

    let $selected = $("#arrayElem" + index);
    if ($selected.hasClass("selected")) {
        $selected.removeClass("selected");
    }
    else {
        selectIndex(index, true);
        //Children to the highlighted node
        let highlightChildren: GraphNode[] = allNodes[index].children;
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
function setArrow(index: number) {
    var $arrow = $("#arrow");
    if (index == -1) {
        $arrow.addClass("hidden");
        $arrow.animate({ left: ($("#sortArrayElem0").position().left + 9) + "px" }, 0);
        return;
    }
    var left: number = $("#sortArrayElem" + index).position().left + 9;
    $arrow.removeClass("hidden");
    $arrow.animate({ left: left + "px" }, 200);
}

// New value in arrayElem
function setValueAtIndex(i: number, value) {
    var $elem = $("#arrayElem" + i).children(".content");
    $elem.empty();
    $elem.append("" + value);
}

// New value in arrayElem
function setValueAtSortIndex(i: number, value) {
    var $elem = $("#sortArrayElem" + i).children(".content");
    $elem.empty();
    $elem.append("" + value);
}

// Add a new element to the array
function insertNewElem(i: number, val: number): void {
    $("#arrayUL").append("<li id='arrayElem" + i + "'><div class='index'>" + i + "</div><div class='content' id='arrayContent" + i + "'>" + val + "</div></li>");
    var left = (i * 70) + "px";
    $("#arrayElem" + i).animate({ left: left }, 0);

    insertNewNode(i, val);
}

function insertNewElemConnect(child: number, parent: number): void {
    if (allNodes[child] === undefined || allNodes[parent] === undefined)
        return;

    // If the two nodes are the same
    if (child == parent) {
        $("#graphUL li").each(function () {
            $(this).removeClass("selected");
        });
        return;
    }
    var parentNode: GraphNode = allNodes[parent];
    var childNode: GraphNode = allNodes[child];

    //To avoid removing and re-adding a child to its own parent
    if (childNode.parent == parentNode) {
        return;
    }
    parentNode.addChild(childNode);
    positioningNodes(500);
}

function removeElem(i: number, delArray: boolean) {
    if (allNodes[i] === undefined)
        return;

    // Set timeout to avoid deleting node before swapElement function has finished executing
    setTimeout(function () {
        let arrayLength = control.getArrayClone().length;

        $("#rightBracket").css({
            "left": 683 + ((arrayLength - 10) * 70) + "px"
        });
        if (delArray)
            $("#arrayElem" + i).remove();

        removeNode(i);
        positioningNodes(500)
    }, 1000);
}

function removeNode(i: number) {
    $("#node" + i).fadeOut(2000, function () {
        $(this).remove();
    });

    allNodes[i].parent.removeChild(allNodes[i]);
    allNodes.pop();
}

// Swap position of two graphNodes
function swapNodes(child: number, parent: number) {
    if (allNodes[parent] === undefined)
        return;

    // Get coordinates
    let tmp = allNodes[parent].value;
    let pTop = allNodes[parent].top;
    let pLeft = allNodes[parent].left;
    let cTop = allNodes[child].top;
    let cLeft = allNodes[child].left;

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
function connectNodes(child: number, parent: number) {
    if (allNodes[child] === undefined)
        return;

    // If the two nodes are the same
    if (child == parent) {
        $("#graphUL li").each(function () {
            $(this).removeClass("selected");
        });
        return;
    }
    var parentNode: GraphNode = allNodes[parent];
    var childNode: GraphNode = allNodes[child];

    //To avoid removing and re-adding a child to its own parent
    if (childNode.parent == parentNode) {
        return;
    }

    parentNode.addChild(childNode);
    positioningNodes(animationTime);

}

function selectIndex(index: number, select: boolean) {
    $("#arrayElem" + index + ", #node" + index).each(function () {
        if (select) {
            $(this).addClass("selected");
        } else {
            $(this).removeClass("selected orange");
        }
    });
}

function selectChild(index: number) {
    $("#arrayElem" + index).addClass("child");
    $("#node" + index).addClass("green");
}

function deselectNodeIndex(index: number) {
    $("#node" + index).each(function () {
        $(this).removeClass("selected");
        $(this).removeClass("green");
    });
}

function deselectArrayElement(index: number) {
    $("#arrayElem" + index).removeClass("selected child");
}

function highlightNode(index: number, color: String) {
    if (color.toLowerCase() == "green" || color.toLowerCase() == "orange") {
        $("#node" + index).each(function () {
            removeHighlight(index);
            $(this).addClass(color);
        });
        $("#arrayElem" + index).addClass(color);
    } else {
        console.log("*** WARNING: Unknown color, " + color + " *** ");
    }
}

function sortHighlightElem(index: number, color: String) {
    if (color.toLowerCase() === "green" || color.toLowerCase() === "orange") {
        removeSortHighlight(index);
        $("#sortArrayElem" + index).addClass(color);
    } else {
        console.log("*** WARNING: Unknown color, " + color + " *** ");
    }
}

function removeSortHighlight(index: number) {
    $("#sortArrayElem" + index).removeClass("orange green");
}

function removeHighlight(index: number) {
    $("#arrayElem" + index + ", #node" + index).each(function () {
        $(this).removeClass("green");
        $(this).removeClass("orange");
    });
}

function resetElementSelections() {
    firstSelected = -1;
    for (var i: number = 0; i < 10; i++) {
        selectIndex(i, false);
    }
}

function deselectNodeSelections() {
    for (var i: number = 0; i < 10; i++) {
        deselectNodeIndex(i);
    }
}

function deselectArrayElemSelections() {
    for (var i: number = 0; i < 10; i++) {
        deselectArrayElement(i);
    }
}

function screenLock(lock: boolean) {
    locked = lock;
    if (lock) {
        $("#addElem").attr({ "disabled": "true" });
        $("#removeElem").attr({ "disabled": "true" });

    } else {
        $("#addElem").removeAttr("disabled");
        $("#removeElem").removeAttr("disabled");
    }
}

function lockPlay(lock: boolean) {
    if (lock) {
        $("#play").attr({ "disabled": "true" });
    } else {
        $("#play").removeAttr("disabled");
    }
}

function lockBackForward(lock: boolean) {
    if (lock) {
        $("#backward").attr({ "disabled": "true" });
        $("#forward").attr({ "disabled": "true" });
    } else {
        $("#backward").removeAttr("disabled");
        $("#forward").removeAttr("disabled");
    }
}

function setHeaderText(text: string) {
    $("#headerText").html(text);
}

function setUpAddButton() {
    $("#addElem").click(function () {
        let val = prompt("Which value do you want to add? Integer >= 0. Maximum number of elements is 10");
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

function setUpBuildButton() {
    $("#buildHeap").click(function () {
        viewer.buildHeap();
    });
}

setUpBuildButton()

function setUpSortButton() {
    $("#sortHeap").click(function () {
        viewer.sortHeap();
    });
}

setUpSortButton()