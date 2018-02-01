///<reference path="view.ts"/>
function setJElement(j, bool) {
    setColorInArrayElement(j, viewer.colors[2], bool);
}
function setColorInArrayElement(index, color, colorOn) {
    viewer.setColorInArrayElement(index, color, colorOn);
}
function setElementBeingComparedTo(j, bool) {
    setColorInArrayElement(j, viewer.colors[2], bool);
}
function storePermValue(j) {
    viewer.storePermValue(j);
}
function releasePermValue(i) {
    viewer.releasePermValue(i);
}
function switchArrayElements(indexA, indexB) {
    viewer.switchArrayElements(indexA, indexB);
}
function moveArrayElementToIndex(i, j) {
    viewer.moveArrayElementToIndex(i, j);
}
function moveArrayElementToIndexFromSpecifiedJIndex(i, j, k) {
    viewer.moveArrayElementToIndexFromSpecifiedJIndex(i, j, k);
}
function setKValue(k) {
    viewer.setKValue(k);
}
function setKLeftAndRight(i, k) {
    viewer.setKLeftAndRight(i, k);
}
