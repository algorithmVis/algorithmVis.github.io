/**
 * File created by Knut Anders Stokke, Kristiand Rosland, Ragnhild AAlvik
 * Modified by Philip Hoang 21.03.2018
 */

///<reference path="graphUI.ts"/>
///<reference path="View.ts"/>
///<reference path="KruskalAlgorithm.ts"/>
///<reference path="View.ts"/>
///<reference path="EventManager.ts"/>
    ///<reference path="Methods.ts"/>

class graphController {

    private randomWeight = 0;
    private nodes: number = 0;
    private MAX_NODES: number = 8;
    private edges: number = 0;

    addNode(x: number, y: number) {
        viewer.addNodeToGraph(x, y);
    }

    /**
     * Connect two nodes and give the edge a weight
     *
     * @param {number} node1 First node
     * @param {number} node2 Second node
     */
    connectTwoNodes(node1: number, node2: number) {
        viewer.connectTheseNodes(node1, node2);
    }

    resetGraph() {
        resetGraphUI();
        nodes = 0;
        edges = 0;
        manager = new EventManager();
    }

    highlightMyEdge(edgeId: number, highlight: boolean) {
        console.log("graph");
        //$("#edge" + 2).css({"stroke": "rgb(16, 130, 219)", "stroke-width": "6"});
        viewer.setHighlightEdge(edgeId, highlight);

    }

    removeMyEdge(edgeId: number) {
        viewer.removeEdge(edgeId);
    }

}

var controller: graphController = new graphController();

