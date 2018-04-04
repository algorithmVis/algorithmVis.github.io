/**
 * File created by Øyvind Skeie Liland 01.02.18.
 */
///<reference path="View.ts"/>
let iColor = 2;
let jColor = 0;

class controller {

    setJElement(j: number, bool: boolean) {
        this.setColorInArrayElement(j, viewer.colors[jColor], bool);
    }

    setColorInArrayElement(index: number, color: string, colorOn: boolean) {
        viewer.setColorInArrayElement(index, color, colorOn);
    }

    setElementBeingComparedTo(j: number, bool: boolean) {
        this.setColorInArrayElement(j, viewer.colors[iColor], bool);
    }

    storePermValue(j: number) {
        viewer.storePermValue(j);
    }

    releasePermValue(i: number) {
        viewer.releasePermValue(i);
    }

    switchArrayElements(indexA: number, indexB: number) {
        viewer.switchArrayElements(indexA, indexB);
    }

    moveArrayElementToIndex(i: number, j: number) {
        viewer.moveArrayElementToIndex(i, j);
    }

    moveArrayElementToIndexFromSpecifiedJIndex(i: number, j: number, k: number) {
        viewer.moveArrayElementToIndexFromSpecifiedJIndex(i, j, k)
    }

    setKValue(k: number) {
        viewer.setKValue(k);
    }

    setKLeftAndRight(i: number, k: number) {
        viewer.setKLeftAndRight(i, k);
    }

    setHeadText(str: string) {
        viewer.setHeadText(str);
    }

    unhideK() {
        viewer.unhideK();
    }

    hideK() {
        viewer.hideK();
    }
}

var control: controller = new controller();

