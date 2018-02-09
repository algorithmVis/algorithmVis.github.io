/**
 * Created by Øyvind Skeie Liland
 * based on State.java
 */
var state = /** @class */ (function () {
    function state(backendArray, twoDimRelationshipArray) {
        this.backendArray = backendArray;
        this.twoDimRelationshipArray = twoDimRelationshipArray;
        //backendArrayJSON = jsonifyBackendArray(this.backendArray);
    }
    /**
     * @return The default state when a new algorithm start, used by StateController
     */
    state.getDefaultState = function () {
        var defArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        var defRelationships = [[], [], [], [], [], [], [], [], [], []];
        // Usikker på JSON.parse(JSON.stringify(defRelationships))
        return new state(defArray, JSON.parse(JSON.stringify(defRelationships)));
    };
    state.prototype.jsonifyBackendArray = function (backendArray) {
        var arr = [];
        for (var i = 0; i < backendArray.length; i++) {
            arr[i] = backendArray[i] + "";
        }
        // Samme som over
        return JSON.parse(JSON.stringify(arr));
    };
    state.prototype.getBackendArray = function () {
        return this.backendArray;
    };
    state.prototype.getTwoDimRelationshipArray = function () {
        return this.twoDimRelationshipArray;
    };
    state.prototype.getBackendArrayJSON = function () {
        return this.backendArrayJSON;
    };
    return state;
}());
