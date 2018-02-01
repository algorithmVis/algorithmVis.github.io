///<reference path="view.ts"/>
function setJElement(j: number, bool: boolean) {
    setColorInArrayElement(j, viewer.colors[2], bool);
}

function setColorInArrayElement(index: number, color: string, colorOn: boolean) {
    viewer.setColorInArrayElement(index, color, colorOn);
}

function setElementBeingComparedTo(j: number, bool: boolean) {
    setColorInArrayElement(j, viewer.colors[2], bool);
}

function storePermValue(j: number) {
    viewer.storePermValue(j);
}

function releasePermValue(i: number) {
    viewer.releasePermValue(i);
}

function switchArrayElements(indexA: number, indexB: number) {
    viewer.switchArrayElements(indexA, indexB);
}


function moveArrayElementToIndex(i: number, j: number) {
    viewer.moveArrayElementToIndex(i, j);
}

function moveArrayElementToIndexFromSpecifiedJIndex(i: number, j: number, k: number) {
    viewer.moveArrayElementToIndexFromSpecifiedJIndex(i, j, k)
}


function setKValue(k: number) {
    viewer.setKValue(k);
}

function setKLeftAndRight(i: number, k: number) {
    viewer.setKLeftAndRight(i, k);
}


