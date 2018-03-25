///<reference path="drawGraph.ts"/>
///<reference path="Controller.ts"/>
///<reference path="View.ts"/>
/**
 * Methods called from Viewer and Algorithms
 * @author Øyvind
 *
 */
//declare var javaBinder; // Used to communicate with java
var firstSelected: number = -1;
var locked: boolean = false;
var contentHidden: boolean = false;

// Displays new array
function displayArray(jsonString: string): void {
    var $array = $.parseJSON(jsonString);
    createAndDrawNodes($array);
}

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
            if (isHighlighted(parseInt(idInt))) {
                deselectArrayElemSelections();
                deselectNodeSelections();
                return;
            }
            selectElement(parseInt(idInt));
        });
    });
}

function isHighlighted(id: number): boolean {
    if ($("#arrayElem" + id).hasClass("selected"))
        return true;
    return false;
}

setOnClickListener();

function setKeyListener() {
    this.addEventListener("keyup", function (e) {
        if (locked) {
            return;
        }
        var key = e.which || e.keyCode;

        // Enter (reset algorithm)
        if (key == 13) {
            resetElementSelections();
            viewer.changeToCurrentAlgorithm();
        }

        // left arrow (step back)
        else if (key == 37) {
            stepBack();
        }

        // right arrow (step forward)
        else if (key == 39) {
            viewer.stepForward(getGraphState(), getArrayState());
        }
    });
}

setKeyListener();

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
        console.log(highlightChildren);
        if (highlightChildren.length > 0) {
            for (var i = 0; i < highlightChildren.length; i++) {
                highlightNode(highlightChildren[i].id, "green");
            }
            selectIndex(index * 2 + 1, true);
            selectIndex(index * 2 + 2, true);
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
    console.log(index);
    var $arrow = $("#arrow");
    if (index == -1) {
        $arrow.addClass("hidden");
        $arrow.animate({left: ($("#sortArrayElem0").position().left + 9) + "px"}, 0);
        return;
    }
    var left: number = $("#sortArrayElem" + index).position().left + 9;
    if ($arrow.hasClass("hidden")) {
        $arrow.removeClass("hidden");
    } else {
        $arrow.animate({left: left + "px"}, 200);
    }
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
    console.log(allNodes);
    let arrayLength = control.getArrayClone().length;
    $("#rightBracket").css({
        "left": 683 + ((arrayLength - 10) * 70) + "px"
    });
    $("#arrayUL").append("<li id='arrayElem" + i + "'><div class='index'>" + i + "</div><div class='content' id='arrayContent" + i + "'>" + val + "</div></li>");
    var left = (i * 70) + "px";
    $("#arrayElem" + i).animate({left: left}, 0);

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

        console.log(allNodes[i].parent);
        //allNodes[i].reset();
        $("#node" + i).fadeOut(2000, function () {
            $(this).remove();
        });

        allNodes[i].parent.removeChild(allNodes[i]);
        //allNodes[i].reset();
        allNodes.pop();
    }, 1000);
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
        $("#node" + parent).css({'left': pLeft + 'px', 'top': pTop + 'px'});
    });
    $("#node" + child).animate({
        left: allNodes[parent].left + 'px',
        top: allNodes[parent].top + 'px'
    }, 1000, function () {
        if (allNodes[child] == undefined)
            return;
        allNodes[child].changeValue(tmp);
        // Reset node position
        $("#node" + child).css({'left': cLeft + 'px', 'top': cTop + 'px'});

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
            $(this).removeClass("selected");
        }
    });
}

function deselectNodeIndex(index: number) {
    $("#node" + index).each(function () {
        $(this).removeClass("selected");
        $(this).removeClass("green");
    });
}

function deselectArrayElement(index: number) {
    $("#arrayElem" + index).removeClass("selected");
}

function highlightNode(index: number, color: String) {
    if (color.toLowerCase() == "green" || color.toLowerCase() == "orange") {
        $("#arrayElem" + index + ", #node" + index).each(function () {
            removeHighlight(index);
            $(this).addClass(color);
        });
    } else {
        console.log("*** WARNING: Unknown color, " + color + " *** ");
    }
}

function sortHighlightElem(index: number, color: String) {
    if (color.toLowerCase() == "green" || color.toLowerCase() == "orange") {
        removeSortHighlight(index);
        $("#sortArrayContent" + index).addClass("highlight" + color);
    } else {
        console.log("*** WARNING: Unknown color, " + color + " *** ");
    }
}

function removeSortHighlight(index: number) {
    $("#sortArrayContent" + index).removeClass("highlightgreen highlightorange");
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

function saveState(backendArray: string) {
    viewer.saveState(getGraphState(), backendArray);
}

function setState(backendArrayJSON: string, twoDimRelationshipArrayJSON: string) {
    let twoDimRelationshipArray = JSON.parse(twoDimRelationshipArrayJSON);
    let backendArray = JSON.parse(backendArrayJSON);
    superNode.children = new Array;
    $("#graphUL svg#lines line").each(function () {
        $(this).remove();
    });
    idCounter = 0;

    // Reset all nodes and remove all lines
    for (var node of allNodes) {
        node.reset();
        node.parent = superNode;
        superNode.children.push(node);
    }

    // Connect nodes
    for (var j: number = 0; j < twoDimRelationshipArray.length; j++) {
        for (var i: number = 0; i < twoDimRelationshipArray[j].length; i++) {
            allNodes[j].addChild(allNodes[twoDimRelationshipArray[j][i]]);
        }
    }

    // Set the frontend array based on the given param (using setValueAtIndex())
    for (var i: number = 0; i < backendArray.length; i++) {
        setValueAtIndex(i, backendArray[i]);
    }

    for (var node of allNodes) {
        $("#node" + node.id).finish();
    }

    //Animation time = 0
    positioningNodes(0);
}


function screenLock(lock: boolean) {
    locked = lock;
    if (lock) {
        $("#addElem").attr({"disabled": "true"});
        $("#removeElem").attr({"disabled": "true"});

    } else {
        $("#addElem").removeAttr("disabled");
        $("#removeElem").removeAttr("disabled");
    }
}

function lockPlay(lock: boolean) {
    if (lock) {
        $("#play").attr({"disabled": "true"});
    } else {
        $("#play").removeAttr("disabled");
    }
}

function stepBack() {
    if (firstSelected != -1) {
        selectIndex(firstSelected, false);
        firstSelected = -1;
    } else {
        viewer.stepBack(getGraphState(), getArrayState());
    }
}

function setHeaderText(text: string) {
    $("#headerText").html(text);
}

function setUpAddButton() {
    $("#addElem").click(function () {
        let val = prompt("Which value do you want to add? Integer >= 0. Maximum number of elements is 10");
        if (isNaN(parseInt(val)) || control.getArrayClone().length >= 10) {
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
