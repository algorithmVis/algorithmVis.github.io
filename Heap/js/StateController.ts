/**
 * Created by Øyvind Skeie Liland 08.02.18
 * based on: StateController.java
 */
///<reference path="Controller.ts"/>
///<reference path="View.ts"/>
///<reference path="State.ts"/>
///<reference path="IView.ts"/>

declare var $;

class StateController {
    private previousStates: State[]
    private nextStates: State[]; // Both are stacks
    private controll: Controller;
    private GUI: IView;


    constructor(c: Controller, view: IView) {
        this.previousStates = [];
        this.nextStates = [];
        this.controll = c;
        this.GUI = view;
    }

    /**
     * Method for stepping back (if possible)
     * Also saves the current State to nextStates to be able to step forward again
     */
    public stepBack(twoDimRelationshipsJSON: JSON, backendArrayJSON: JSON): boolean {
        //alert(this.previousStates.length);
        if (this.previousStates.length <= 0)
            return false;

        this.saveStateToNextStates(twoDimRelationshipsJSON, backendArrayJSON);
        let previousState: State = (<State> this.previousStates.pop());
        this.setState(previousState);
        return true;
    }


    /**
     * Method for stepping forward (if possible)
     * Also save the current State to previousStates to be able to step back again
     */

    public stepForward(twoDimRelationshipJSON: JSON, backendArrayJSON: JSON): boolean {
        if (this.nextStates.length <= 0)
            return false;
        this.saveStateToPreviousStates(twoDimRelationshipJSON, backendArrayJSON);
        let nextState: State = (<State> this.nextStates.pop());
        this.setState(nextState);
        return true;
    }

    /**
     * Method for saving the current State. Sent before every unionFind()-call
     */
    public saveState(twoDimRelationshipsJSON: JSON, backendArrayJSON: JSON): void {
        this.nextStates = [];
        this.saveStateToPreviousStates(twoDimRelationshipsJSON, backendArrayJSON);
    }


    /** Private help methods to take care of states **/
    private saveStateToPreviousStates(twoDimRelationshipsJSON: JSON, backendArrayJSON: JSON): void {
        let st: State = this.getState(twoDimRelationshipsJSON, backendArrayJSON);
        this.previousStates.push(st);
    }

    private saveStateToNextStates(twoDimRelationshipsJSON: JSON, backendArrayJSON: JSON): void {
        let st: State = this.getState(twoDimRelationshipsJSON, backendArrayJSON);
        this.nextStates.push(st);
    }

    private getState(twoDimRelationshipsJSON: JSON, backendArrayJSON: JSON): State {
        let twoDimRelationship: JSON = twoDimRelationshipsJSON;

        let backendArray: number[] = [];
        let json = backendArrayJSON;
        for (let i = 0; i < Object(json).length; i++) {
            backendArray.push(Number(json[i]));
        }
        return new State(backendArray, twoDimRelationship);
    }

    /**
     * Set the current State of the backend and frontend to parameter State
     * @param State
     */
    private setState(st: State): void {
        this.GUI.setThisState(st.getTwoDimRelationshipArray(), st.getBackendArrayJSON());
        this.controll.setArray(st.getBackendArray());
    }
}

var stepper: StateController = new StateController(control, viewer);
