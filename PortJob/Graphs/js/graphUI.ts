///<reference path="graphStructureController.ts"/>
declare var $;

var edgeIdList: number[][] = [[]];

/***************************************************************** */
/*********************** Click Handler *****************************/
/***************************************************************** */
var clickedId: number = -1; // If -1, no element has been clicked yet
// TODO: Noder havner noen ganger over hverandre når man skal koble sammen noder
$("#graphUI").click(function (e) {
    /** If <node> was clicked */
    if (e.target.className == "nodeUI") {
        nodeClicked(getIdFromDomId(e.target.id));
    }
    /** If <node p> was clicked */
    else if (e.target.parentNode.className == "nodeUI") {
        nodeClicked(getIdFromDomId(e.target.parentNode.id));
    }
    /** If div was clicked */
    else {
        clickedId = -1;
        deselectAllNodes();
        var parent = $(this).offset();
        var x: number = Math.round(e.pageX - parent.left);
        var y: number = Math.round(e.pageY - parent.top);
        graphUIClicked(x, y);
    }

    function nodeClicked(id: number) {
        if (clickedId == -1) {
            $("#node" + id).addClass("selected");
            clickedId = id;
        }
        else {
            twoNodesClicked(clickedId, id);
            $("#node" + id).addClass("selected");
            var n1 = clickedId, n2 = id;
            setTimeout(function () {
                deselectTwoNodes(n1, n2);
            }, 800);
            clickedId = -1;
        }
    }
});


/***************************************************************** */

/*********************** Graph UI Functions ************************/
/***************************************************************** */
function addNode(id: number, x: number, y: number) {
    edgeIdList.push([]);
    $("#graphUI").append("<div id='node" + id + "' class='nodeUI' style='left:" + (x - 40) + "px; top:" + (y - 40) + "px;'><p>" + id + "</p></div>");
}

function addEdge(id: number, n1: number, n2: number) {
    edgeIdList[n1][n2] = id;
    edgeIdList[n2][n1] = id;
    var r: number = getNodeWidth(n1) / 2;
    var p1 = getNodePosition(n1), p2 = getNodePosition(n2);
    var line = parseLine(id, p1.left + r, p1.top + r, p2.left + r, p2.top + r);
    document.getElementById('edgeSvg').appendChild(line);
}

function getEdgeId(v: number, w: number) {
    return edgeIdList[v][w];
}

function addWeightedEdge(id: number, n1: number, n2: number, weight: number) {
    addEdge(id, n1, n2);
    var edge = $("#edge" + id);
    var x1: number = parseInt(edge.attr("x1")), y1: number = parseInt(edge.attr("y1"));
    var x2: number = parseInt(edge.attr("x2")), y2: number = parseInt(edge.attr("y2"));
    var x: number = x1 + (x2 - x1) / 2, y: number = y1 + (y2 - y1) / 2;
    var normal = getNormal(x1, y1, x2, y2);
    var unit = getUnit(normal.x, normal.y);
    var unitScale = 25;
    $("#graphUI").append("<p id='edgeWeight" + id + "' " +
        "class='edgeWeight' " +
        "style='top: " + (y + unitScale * unit.y) + "px; left: " + (x + unitScale * unit.x) + "px'>" +
        weight + "</p>");
}

function addQueueElement(id: number) {
    var queueSize = $("#queueUI div").length;
    var top = queueSize * 90 + 5;
    $("#queueUI").append("<div id='queueNode" + id + "' style='left:200px; top:" + top + "px;' class='nodeUI'><p>" + id + "</p></div>");
    $("#queueNode" + id).animate({left: '15px'}, 700);
}

function popQueueElement(id: number) {
    $("#queueNode" + id).animate({left: "200px"}, 700, function () {
        $(this).remove();
    });
    $("#queueUI div").each(function () {
        var top = $(this).position().top - 90;
        $(this).animate({top: top + "px"}, 700);
    });
}

function resetGraphUI() {
    $("#graphUI div.nodeUI").each(function () {
        $(this).remove();
    });
    $("#graphUI p.edgeWeight").each(function () {
        $(this).remove();
    });
    $("#edgeSvg line").each(function () {
        $(this).remove();
    });
    $("#queueUI div").each(function () {
        $(this).remove();
    });
    edgeIdList = [[]];
}


/***************************************************************** */

/********************* HELPER FUNCTIONS ****************************/
/***************************************************************** */

function getNormal(x1: number, y1: number, x2: number, y2: number) {
    var dx = x2 - x1, dy = y2 - y1;
    return {x: -dy, y: dx};
}

function getUnit(x, y) {
    var length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    return {x: x / length, y: y / length};
}

function getIdFromDomId(domId: string): number {
    return parseInt(domId.replace("node", ""));
}

function getNodeWidth(id: number) {
    return $("#node" + id).outerWidth();
}

function getNodePosition(id: number) {
    return $("#node" + id).position();
}

function parseLine(id: number, x1: number, y1: number, x2: number, y2: number) {
    var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute("id", "edge" + id);
    line.setAttribute("x1", x1 + "");
    line.setAttribute("y1", y1 + "");
    line.setAttribute("x2", x2 + "");
    line.setAttribute("y2", y2 + "");
    return line;
}

function deselectAllNodes() {
    $("#graphUI").children().each(function () {
        $(this).removeClass("selected");
    });
}

function deselectTwoNodes(n1: number, n2: number) {
    $("#node" + n1).removeClass("selected");
    $("#node" + n2).removeClass("selected");
}

function openInfoWindow() {
    window.open("http://www.w3schools.com");
}

// <svg height="100%" width="100%"> <line x1="0" y1="0" x2="200" y2="200" style="stroke:rgb(255,0,0);stroke-width:2"></line></svg>