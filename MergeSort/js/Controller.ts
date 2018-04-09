/**
 * File created by Kenneth Apeland 04.04.18.
 */
///<reference path="View.ts"/>

class controller {

    lowerElements(elems: number[]) {
        viewer.lowerElements(elems);
    }

    setPivotElement(index: number) {
        viewer.setPivotElement(index);
    }

    deselectPivotElement(index: number) {
        viewer.deselectPivotElement(index);
    }

    moveElementToPlace(element: number, px: number, back: number) {
        viewer.moveElementToPlace(element, px, back);
    }

    moveElementsToPlace(element: number[], px: number[], back: number[]) {
        viewer.moveElementsToPlace(element, px, back);
    }

    setColorInArrayElement(index: number, color: number) {
        viewer.setColorInArrayElement(index, color);
    }

    setColorInArrayElements(index: number[], color: number) {
        viewer.setColorInArrayElements(index, color);
    }

    setPause() {
        viewer.setPause();
    }
}

let control: controller = new controller();