/**
 * Created by Øyvind Skeie Liland 09.02.18
 * Inspired by WeightedUnion.java
 */

///<reference path="Controller.ts"/>


class WeightedUnion extends QuickUnion {
    private treeSize: number[]; // number of elements in tree rooted at index
    private paused: boolean = false;

    constructor(arrSize: number) {
        super(arrSize);
        this.treeSize = [];
        for (let i = 0; i < arrSize; i++)
            this.treeSize[i] = 1;

        this.paused = false;
    }

    public union(aIndex: number, bIndex: number): void {
        let aRoot: number = this.simpleFind(aIndex, "green");
        control.displaySize(aRoot, this.treeSize[aRoot]);

        let bRoot: number = this.simpleFind(bIndex, "green");
        control.displaySize(bRoot, this.treeSize[bRoot]);

        control.saveState(super.getArray());

        //Only connectNodes if they were not already in the same tree
        if (aRoot != bRoot) {
            if (this.treeSize[bRoot] < this.treeSize[aRoot]) {
                control.connectNodes(bRoot, aRoot);
                control.setValueAtIndex(bRoot, aRoot);
                super.getArray()[bRoot] = aRoot;
                this.treeSize[aRoot] += this.treeSize[bRoot];
            } else {
                control.connectNodes(aRoot, bRoot);
                control.setValueAtIndex(aRoot, bRoot);
                super.getArray()[aRoot] = bRoot;
                this.treeSize[bRoot] += this.treeSize[aRoot];
            }
        }
        super.delay(super.getDelayTime() * 2);

        super.removeHighlighting(aRoot);
        super.removeHighlighting(bRoot);
        control.setSelectedIndex(aIndex, false);
        control.setSelectedIndex(bIndex, false);
    }

    public invertPause(): void {
        this.paused = !this.paused;
    }

    public setController(c: Controller): void {
        super.setController(c);
    }

    public simpleFind(pIndex: number, color: string): number {
        let root: number = pIndex;
        while (root != super.getArray()[root]) {
            super.highlightSingleNode(root, "orange");
            super.delay(super.getDelayTime());
            super.removeHighlighting(root);
            root = super.getArray()[root];
        }

        super.highlightSingleNode(root, color);

        return root;
    }

    public getName(): string {
        return "Weighted Union";
    }

    public setArray(array: number[]): void {
        super.setArray(array);
        this.refreshSizeArray(array);
    }


    public connectedNoGUIUpdate(a: number, b: number): boolean {
        return this.getRoot(a) == this.getRoot(b);
    }

    /**
     * After a new array has been set (by StateControl), sizeTree needs to be refreshed
     * @param array
     */
    private refreshSizeArray(array: number[]): void {
        this.treeSize = [];
        for (let i = 0; i < array.length; i++) {
            let root = this.getRoot(array[i]);
            this.treeSize[root]++;
        }
    }

    public getRoot(index: number): number {
        let root: number = index;
        while (root != super.getArray()[root]) {
            root = super.getArray()[root];
        }
        return root;
    }
}