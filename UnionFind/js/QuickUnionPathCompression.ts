/**
 * Created by Øyvind Skeie Liland 13.02.18
 * Inspired by: QuickUnionPathCompression.java
 */

///<reference path="QuickUnion.ts"/>

class QuickUnionPathCompression extends QuickUnion {

    constructor(size: number) {
        super(size);
    }

    public union(a: number, b: number): void {
        super.union(a, b);
    }

    public simpleFind(pIndex: number, color: string): number {
        let root: number = pIndex
        let savedIndex: number = pIndex;

        while (root != this.getArray()[root]) {
            this.highlightSingleNode(root, "orange");
            root = this.getArray()[root];
        }

        this.highlightSingleNode(root, color);

        let nodeStack: number[] = [];

        while (pIndex != root) {
            this.highlightSingleNode(pIndex, "orange");
            control.connectNodes(pIndex, root);
            control.setValueAtIndex(pIndex, root);
            nodeStack.push(pIndex);

            let newP: number = this.getArray()[pIndex];
            this.getArray()[pIndex] = root;
            pIndex = newP;
        }

        nodeStack.forEach(n => this.removeHighlighting(n));

        control.setSelectedIndex(savedIndex, true);
        this.highlightSingleNode(root, color);

        return root;
    }

    public getName(): string {
        return "QuickUnionPathCompression";
    }
}