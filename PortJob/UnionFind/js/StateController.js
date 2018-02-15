/**
 * Created by Øyvind Skeie Liland 08.02.18
 * based on: StateController.java
 */
///<reference path="Controller.ts"/>
///<reference path="View.ts"/>
///<reference path="State.ts"/>
///<reference path="IView.ts"/>
var StateController = /** @class */ (function () {
    function StateController(c, view) {
        this.previousStates = [];
        this.nextStates = [];
        this.controll = c;
        this.GUI = view;
    }
    /**
     * Method for stepping back (if possible)
     * Also saves the current State to nextStates to be able to step forward again
     */
    StateController.prototype.stepBack = function (twoDimRelationshipsJSON, backendArrayJSON) {
        if (this.previousStates.length <= 0)
            return false;
        this.saveStateToNextStates(twoDimRelationshipsJSON, backendArrayJSON);
        var previousState = this.previousStates.pop();
        this.setState(previousState);
        return true;
    };
    /**
     * Method for stepping forward (if possible)
     * Also save the current State to previousStates to be able to step back again
     */
    StateController.prototype.stepForward = function (twoDimRelationshipJSON, backendArrayJSON) {
        if (this.nextStates.length <= 0)
            return false;
        this.saveStateToPreviousStates(twoDimRelationshipJSON, backendArrayJSON);
        var nextState = this.nextStates.pop();
        this.setState(nextState);
        return true;
    };
    /**
     * Method for saving the current State. Sent before every unionFind()-call
     */
    StateController.prototype.saveState = function (twoDimRelationshipsJSON, backendArrayJSON) {
        this.nextStates = [];
        this.saveStateToPreviousStates(twoDimRelationshipsJSON, backendArrayJSON);
    };
    /** Private help methods to take care of states **/
    StateController.prototype.saveStateToPreviousStates = function (twoDimRelationshipsJSON, backendArrayJSON) {
        var st = this.getState(twoDimRelationshipsJSON, backendArrayJSON);
        this.previousStates.push(st);
    };
    StateController.prototype.saveStateToNextStates = function (twoDimRelationshipsJSON, backendArrayJSON) {
        var st = this.getState(twoDimRelationshipsJSON, backendArrayJSON);
        this.nextStates.push(st);
    };
    StateController.prototype.getState = function (twoDimRelationshipsJSON, backendArrayJSON) {
        var twoDimRelationship = twoDimRelationshipsJSON;
        var backendArray = [];
        for (var i = 0; i < backendArray.length; i++) {
            backendArray[i] = Number(backendArrayJSON.stringify(i));
        }
        return new State(backendArray, twoDimRelationship);
    };
    /**
     * Set the current State of the backend and frontend to parameter State
     * @param State
     */
    StateController.prototype.setState = function (st) {
        this.GUI.setThisState(st.getTwoDimRelationshipArray(), st.getBackendArrayJSON());
        this.controll.setArray(st.getBackendArray());
    };
    return StateController;
}());
var stepper = new StateController(control, viewer);
