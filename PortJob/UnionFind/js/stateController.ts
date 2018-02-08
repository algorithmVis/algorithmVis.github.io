/**
 * Created by Øyvind Skeie Liland 08.02.18
 * based on: StateController.java
 */
///<reference path="controller.ts"/>
///<reference path="view.ts"/>
///<reference path="state.ts"/>

declare var $;

class stateController {
    private previousStates: state[]
    private nextStates: state[]; // Both are stacks
    private controll: controller;
    private GUI: IView;


    constructor(c: controller, view: IView) {
        this.previousStates = [];
        this.nextStates = [];
        this.controll = c;
        this.GUI = view;
    }

    /**
     * Method for stepping back (if possible)
     * Also saves the current state to nextStates to be able to step forward again
     */
    public stepBack(twoDimRelationshipsJSON: JSON, backendArrayJSON: JSON): boolean {
        if (this.previousStates.length === 0)
            return false;

        this.saveStateToNextStates(twoDimRelationshipsJSON, backendArrayJSON);
        let previousState: state = (<state> this.previousStates.pop());
        this.setState(previousState);
        return true;
    }


    /**
     * Method for stepping forward (if possible)
     * Also save the current state to previousStates to be able to step back again
     */

    public stepForward(twoDimRelationshipJSON: JSON, backendArrayJSON: JSON): boolean {
        if (this.nextStates.length === 0)
            return false;

        this.saveStateToPreviousStates(twoDimRelationshipJSON, backendArrayJSON);
        let nextState: state = (<state> this.nextStates.pop());
        this.setState(nextState);
        return true;
    }

    /**
     * Method for saving the current state. Sent before every unionFind()-call
     */
    public saveState(twoDimRelationshipsJSON: JSON, backendArrayJSON: JSON): void {
        this.nextStates = [];
        this.saveStateToPreviousStates(twoDimRelationshipsJSON, backendArrayJSON);
    }


    /** Private help methods to take care of states **/
    private saveStateToPreviousStates(twoDimRelationshipsJSON: JSON, backendArrayJSON: JSON): void {
        let st: state = this.getState(twoDimRelationshipsJSON, backendArrayJSON);
        this.previousStates.push(st);
    }

    private saveStateToNextStates(twoDimRelationshipsJSON: JSON, backendArrayJSON: JSON): void {
        let st: state = this.getState(twoDimRelationshipsJSON, backendArrayJSON);
        this.nextStates.push(st);
    }

    private getState(twoDimRelationshipsJSON: JSON, backendArrayJSON: JSON): state {
        let twoDimRelationship: JSON = twoDimRelationshipsJSON;
        let backendArray: number[] = [];

        for (let i = 0; i < backendArray.length; i++) {
            backendArray[i] = Number(backendArrayJSON.stringify(i));
        }

        return new state(backendArray, twoDimRelationship);
    }

    /**
     * Set the current state of the backend and frontend to parameter state
     * @param state
     */
    private setState(st: state): void {
        this.GUI.setThisState(st.getTwoDimRelationshipArray(), st.getBackendArrayJSON());
        this.controll.setArray(st.getBackendArray());
    }
}

var stepper: stateController = new stateController(control, viewer);
