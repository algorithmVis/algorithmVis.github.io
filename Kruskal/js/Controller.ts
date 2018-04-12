/**
 * File created by Philip Hoang 21.03.2018
 */

///<reference path="graphUI.ts"/>
///<reference path="View.ts"/>
///<reference path="KruskalAlgorithm.ts"/>
///<reference path="View.ts"/>
///<reference path="EventManager.ts"/>
    ///<reference path="Methods.ts"/>

class Controller {
    highlightEdge(node1: number, node2: number, edgeId: number, weight: number) {
        viewer.setHighlightEdge(node1, node2, edgeId, weight);
    }

    dehighlightEdge(node1: number, node2: number, edgeId: number) {
        viewer.dehighlightEdge(node1, node2, edgeId);
    }

    selectTwoNodes(node1: number, node2: number) {
        viewer.selectTheseNodes(node1, node2);
    }

    excludeEdges(edgeList : any) {
        viewer.excludeEdges(edgeList);
    }
}

let controller: Controller = new Controller();

