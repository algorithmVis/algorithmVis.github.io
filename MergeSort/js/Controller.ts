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

    setColorInArrayElement(index: number, color: number, colorOn: boolean) {
        viewer.setColorInArrayElement(index, color, colorOn);
    }

    setColorInArrayElements(index: number[], color: number, colorOn: boolean) {
        viewer.setColorInArrayElements(index, color, colorOn);
    }

    setPause() {
        viewer.setPause();
    }
}

var control: controller = new controller();