/**
 * File created by Øyvind Skeie Liland on 15.02.18
 * Inspired by WeightedUnionPathCompression.java
 */
///<reference path="QuickUnionPathCompression.ts"/>

class WeightedUnionPathCompression extends QuickUnionPathCompression {
    private treeSize: number[]; // number of elements in tree rooted at index
    private paused: boolean = false;

    constructor(size: number) {
        super(size);
        this.treeSize = [];
        for (let i = 0; i < size; i++)
            this.treeSize[i] = 1;

        this.paused = false;
    }

    public union(aIndex: number, bIndex: number): void {
        let aRoot: number = this.simpleFind(aIndex, "green");
        control.displaySize(aRoot, this.treeSize[aRoot]);

        let bRoot: number = this.simpleFind(bIndex, "green");
        control.displaySize(bRoot, this.treeSize[bRoot]);

        control.saveState(this.getArray());

        //Only connectNodes if they were not already in the same tree
        if (aRoot != bRoot) {
            if (this.treeSize[bRoot] < this.treeSize[aRoot]) {
                control.connectNodes(bRoot, aRoot);
                control.setValueAtIndex(bRoot, aRoot);
                this.getArray()[bRoot] = aRoot;
                this.treeSize[aRoot] += this.treeSize[bRoot];
            } else {
                control.connectNodes(aRoot, bRoot);
                control.setValueAtIndex(aRoot, bRoot);
                this.getArray()[aRoot] = bRoot;
                this.treeSize[bRoot] += this.treeSize[aRoot];
            }
        }
        //delay((getDelayTime() * 2));
        this.removeHighlighting(aRoot);
        this.removeHighlighting(bRoot);
        control.setSelectedIndex(aIndex, false);
        control.setSelectedIndex(bIndex, false);
    }

    public getName(): string {
        return "WeightedUnionPathCompression";
    }

    private refreshSizeArray(array: number[]): void {
        this.treeSize = [];
        for (let i = 0; i < array.length; i++) {
            let root: number = super.getRoot((array[i]));
            this.treeSize[root]++;
        }
    }

}