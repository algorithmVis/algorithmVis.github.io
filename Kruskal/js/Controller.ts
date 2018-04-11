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
    addNode(x: number, y: number) {
        viewer.addNodeToGraph(x, y);
    }

    connectTwoNodes(node1: number, node2: number) {
        viewer.connectTheseNodes(node1, node2);
    }

    resetGraph() {
        viewer.resetMyAll();
    }

    highlightMyEdge(edgeId: number, weight: number) {
        viewer.setHighlightEdge(edgeId, weight);
    }

    dehighlightMyEdge(edgeId: number) {
        viewer.setDehighlightEdge(edgeId);
    }

    removeMyEdge(edgeId: number) {
        viewer.removeEdge(edgeId);
    }

    selectTwoNodes(node1: number, node2: number) {
        viewer.selectTheseNodes(node1, node2);
    }

    deselectTwoNodes(node1: number, node2: number){
        viewer.deselectTheseNodes(node1, node2);
    }

    excludeEdgeText(index: number) {
        viewer.excludeText(index);
    }

    excludeEdges(edgeList : any) {
        viewer.excludeEdges(edgeList);
    }
}

let controller: Controller = new Controller();

