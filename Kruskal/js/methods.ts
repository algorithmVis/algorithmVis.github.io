///<reference path="KruskalAlgorithm.ts"/>

var highlightEventDuration = 500;

function setHighlightEdge(edgeId: number, highlight: boolean) {
    var forward = function (id, h) {
        return function () {
            if (h) {
                $("#edge" + id).css({"stroke": "rgb(16, 130, 219)", "stroke-width": "6"});
            } //add highlight
            else {
                $("#edge" + id).css({"stroke": "rgb(0, 0, 0)", "stroke-width": "4"});
            } //remove highlight
        };
    }(edgeId, highlight);

    var backward = function (id, h) {
        return function () {
            if (h) {
                $("#edge" + id).css({"stroke": "rgb(0, 0, 0)", "stroke-width": "4"});
            } //remove highlight
            else {
                $("#edge" + id).css({"stroke": "rgb(16, 130, 219)", "stroke-width": "6"});
            } // add highlight
        };
    }(edgeId, highlight);

    manager.addEvent(new FrontendEvent(forward, backward, highlightEventDuration))
}

function removeEdge(edgeId: number) {
    var forward = function (edgeId) {
        return function () {
            $("#edge" + edgeId).remove();
            $("#edgeWeight" + edgeId).remove();
        }
    }(edgeId);

    var backward = function (edgeId) {
        return function () {
            $("#edge" + edgeId).remove();
            $("#edgeWeight" + edgeId).remove();
        }
    }(edgeId);

    manager.addEvent(new FrontendEvent(forward, backward, highlightEventDuration))

}
