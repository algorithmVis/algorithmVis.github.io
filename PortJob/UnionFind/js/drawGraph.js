var animationTime = 2500;
var idCounter = 0;
var GraphNode = /** @class */ (function () {
    function GraphNode(id, value) {
        this.id = id;
        this.value = value;
        this.children = new Array;
        this.connectedLines = new Array;
        this.parent = null;
        this.left = 0;
        this.top = 0;
    }
    GraphNode.prototype.positionNode = function (xLayer, yLayer, time) {
        // Basis
        if (this.children.length == 0) {
            this.moveBothDirections(xLayer * 70, yLayer * 50, time);
            return xLayer + 1;
        }
        else {
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var child = _a[_i];
                xLayer = child.positionNode(xLayer, yLayer + 1, time);
            }
            var rightChildNodeLeft = this.children[this.children.length - 1].left;
            var leftChildNodeLeft = this.children[0].left;
            var x = ((rightChildNodeLeft - leftChildNodeLeft) / 2) + leftChildNodeLeft;
            this.moveBothDirections(x, yLayer * 50, time);
            return xLayer;
        }
    };
    GraphNode.prototype.addChild = function (child) {
        // remove from last parents child list
        if (child.parent !== undefined && child.parent !== null) {
            child.parent.removeChild(child);
        }
        child.parent = this;
        this.children.push(child);
        //Add line
        var line = new Line(idCounter++, this, child);
        this.connectedLines.push(line);
        child.connectedLines.push(line);
    };
    //Remove a child from my children
    GraphNode.prototype.removeChild = function (child) {
        //Remove child from children-array
        if (this.children.indexOf(child) != -1) {
            var index = this.children.indexOf(child);
            this.children.splice(index, 1);
        }
        if (child.parent.id == -1) {
            return;
        }
        //Remove the line between us
        var line = this.removeLineToNode(child);
        child.removeLineToNode(this);
        //Remove the line from the screen
        if (line !== undefined && line !== null) {
            $("#line" + line.id).remove();
        }
    };
    GraphNode.prototype.removeLineToNode = function (node) {
        for (var i = 0; i < this.connectedLines.length; i++) {
            if (this.connectedLines[i].child.id == node.id || this.connectedLines[i].parent.id == node.id) {
                return this.connectedLines.splice(i, 1)[0]; //Remove from array and return the line (for screen removal)
            }
        }
    };
    GraphNode.prototype.moveSideways = function (newLeftValue, time) {
        this.left = newLeftValue;
        $("#node" + this.id).clearQueue().animate({ left: newLeftValue + "px" }, time);
        for (var i = 0; i < this.connectedLines.length; i++) {
            this.connectedLines[i].animateLinePoint(this, time);
        }
    };
    GraphNode.prototype.moveBothDirections = function (newLeftValue, newTopValue, time) {
        this.left = newLeftValue;
        this.top = newTopValue;
        $("#node" + this.id).clearQueue().animate({ left: newLeftValue + "px", top: newTopValue + "px" }, time);
        for (var i = 0; i < this.connectedLines.length; i++) {
            this.connectedLines[i].animateLinePoint(this, time);
        }
    };
    GraphNode.prototype.reset = function () {
        this.children = new Array;
        this.connectedLines = new Array;
        this.parent = null;
    };
    return GraphNode;
}());
// This class holds information about svg-lines between nodes
var Line = /** @class */ (function () {
    function Line(id, parent, child) {
        this.id = id;
        this.parent = parent;
        this.child = child;
        var width = $("#node" + child.id).outerWidth();
        var $parent = $("#node" + parent.id);
        var $child = $("#node" + child.id);
        // JQuery have no support for creating svg elements yet, using JavaScript instead
        var newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        newLine.setAttribute('id', 'line' + this.id);
        newLine.setAttribute('x1', $parent.position().left + width / 2);
        newLine.setAttribute('y1', $parent.position().top + width / 2);
        newLine.setAttribute('x2', $child.position().left + width / 2);
        newLine.setAttribute('y2', $child.position().top + width / 2); // TODO: Line is placed too late after node has moved
        $("#graphUL svg#lines").append(newLine);
        $("#line" + id).removeClass('hidden');
    }
    //Animate either the child side of the line or the parent side based on what node is passed
    Line.prototype.animateLinePoint = function (node, animationTime) {
        var width = $("#node" + node.id).outerWidth();
        var $line = $("#line" + this.id);
        var parentPoint = (this.parent.id == node.id);
        if (parentPoint) {
            $({ x1: $line.attr('x1') })
                .animate({ x1: this.parent.left + width / 2 }, { duration: animationTime, step: function (now) { $line.attr('x1', now); } });
            $({ y1: $line.attr('y1') })
                .animate({ y1: this.parent.top + width / 2 }, { duration: animationTime, step: function (now) { $line.attr('y1', now); } });
        }
        else {
            $({ x2: $line.attr('x2') })
                .animate({ x2: this.child.left + width / 2 }, { duration: animationTime, step: function (now) { $line.attr('x2', now); } });
            $({ y2: $line.attr('y2') })
                .animate({ y2: this.child.top + width / 2 }, { duration: animationTime, step: function (now) { $line.attr('y2', now); } });
        }
    };
    return Line;
}());
// Top node - not visible
var superNode = new GraphNode(-1, 0);
var allNodes = new Array;
function createAndDrawNodes(numberOfNodes) {
    // Delete current nodes
    $("#graphUL li, #graphUL svg#lines line").remove();
    superNode.children = new Array;
    allNodes = new Array;
    for (var i = 0; i < numberOfNodes; i++) {
        var node = new GraphNode(i, i);
        // Add node to nodeList
        allNodes.push(node);
        // Add node to superNode (Do not use addChild() here)
        node.parent = superNode;
        superNode.children.push(node);
        // Add node to html
        $("#graphUL").append('<li id="node' + i + '">' + i + '</li>');
    }
    positioningNodes(1500);
}
function positioningNodes(time) {
    // Position the whole graph
    superNode.positionNode(0, -1, time);
    centerDivWidthNodes(time);
}
function getTotalWidthOfNodes() {
    var leftNodePx = 2000;
    var rightNodePx = -2000;
    var width = 0;
    allNodes.forEach(function (node) {
        var left = node.left;
        if (left < leftNodePx) {
            leftNodePx = left;
        }
        if (left > rightNodePx) {
            rightNodePx = left;
        }
        width = $("#node" + node.id).outerWidth();
    });
    return (rightNodePx - leftNodePx) + width;
}
function getSpaceBetweenDivAndLeftNode() {
    var divWidth = $("div#nodes").width();
    return divWidth / 2 - getTotalWidthOfNodes() / 2;
}
function centerDivWidthNodes(time) {
    $("#graphUL").finish(); // if already animating, finish animation
    $("#graphUL").animate({ left: getSpaceBetweenDivAndLeftNode() }, time);
}
window.addEventListener('resize', function () { centerDivWidthNodes(animationTime); });
function getGraphState() {
    var state = [];
    for (var nodeIndex = 0; nodeIndex < allNodes.length; nodeIndex++) {
        state.push(new Array);
        for (var childIndex = 0; childIndex < allNodes[nodeIndex].children.length; childIndex++) {
            state[nodeIndex].push(allNodes[nodeIndex].children[childIndex].id);
        }
    }
    return JSON.stringify(state).toString();
}
function getArrayState() {
    var state = [];
    for (var i = 0; i < allNodes.length; i++) {
        state.push(parseInt($("#arrayElem" + i + " div.content").text()));
    }
    return JSON.stringify(state).toString();
}
