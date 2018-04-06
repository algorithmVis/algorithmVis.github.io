/**
 * File created by Øyvind Skeie Liland 08.02.18
 * Based on IView.java
 **/

interface IView {
    displayThisArray(array: number[]): void;

    selectThisIndex(index: number, b: boolean): void;

    saveState(relationshipsJSON: string, backendArray: string): void;

    setThisArrow(index: number): void;

    setValueAtThisIndex(i: number, bValue: any, oldVal:any): void;

    connectThisNodes(child: number, parent: number): void;

    executeSaveMethodInJavaScript(clonedBackendArray: number[]): void;

    highlightThisNode(index: number, color: string): void;

    removeThisHighlight(node: number): void;

    displayNodeSize(root: number, size: number): void;

    setThisState(arrayObject: JSON, array: JSON): void;

    screenLockThis(locked: boolean): void;
}