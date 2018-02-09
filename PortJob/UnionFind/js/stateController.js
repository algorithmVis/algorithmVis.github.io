/**
 * Created by Øyvind Skeie Liland 08.02.18
 * based on: StateController.java
 */
///<reference path="controller.ts"/>
///<reference path="view.ts"/>
///<reference path="state.ts"/>
var stateController = /** @class */ (function () {
    function stateController(c, view) {
        this.previousStates = [];
        this.nextStates = [];
        this.controll = c;
        this.GUI = view;
    }
    /**
     * Method for stepping back (if possible)
     * Also saves the current state to nextStates to be able to step forward again
     */
    stateController.prototype.stepBack = function (twoDimRelationshipsJSON, backendArrayJSON) {
        if (this.previousStates.length === 0)
            return false;
        this.saveStateToNextStates(twoDimRelationshipsJSON, backendArrayJSON);
        var previousState = this.previousStates.pop();
        this.setState(previousState);
        return true;
    };
    /**
     * Method for stepping forward (if possible)
     * Also save the current state to previousStates to be able to step back again
     */
    stateController.prototype.stepForward = function (twoDimRelationshipJSON, backendArrayJSON) {
        if (this.nextStates.length === 0)
            return false;
        this.saveStateToPreviousStates(twoDimRelationshipJSON, backendArrayJSON);
        var nextState = this.nextStates.pop();
        this.setState(nextState);
        return true;
    };
    /**
     * Method for saving the current state. Sent before every unionFind()-call
     */
    stateController.prototype.saveState = function (twoDimRelationshipsJSON, backendArrayJSON) {
        this.nextStates = [];
        this.saveStateToPreviousStates(twoDimRelationshipsJSON, backendArrayJSON);
    };
    /** Private help methods to take care of states **/
    stateController.prototype.saveStateToPreviousStates = function (twoDimRelationshipsJSON, backendArrayJSON) {
        var st = this.getState(twoDimRelationshipsJSON, backendArrayJSON);
        this.previousStates.push(st);
    };
    stateController.prototype.saveStateToNextStates = function (twoDimRelationshipsJSON, backendArrayJSON) {
        var st = this.getState(twoDimRelationshipsJSON, backendArrayJSON);
        this.nextStates.push(st);
    };
    stateController.prototype.getState = function (twoDimRelationshipsJSON, backendArrayJSON) {
        var twoDimRelationship = twoDimRelationshipsJSON;
        var backendArray = [];
        for (var i = 0; i < backendArray.length; i++) {
            backendArray[i] = Number(backendArrayJSON.stringify(i));
        }
        return new state(backendArray, twoDimRelationship);
    };
    /**
     * Set the current state of the backend and frontend to parameter state
     * @param state
     */
    stateController.prototype.setState = function (st) {
        this.GUI.setThisState(st.getTwoDimRelationshipArray(), st.getBackendArrayJSON());
        this.controll.setArray(st.getBackendArray());
    };
    return stateController;
}());
var stepper = new stateController(control, viewer);
