/**
 * Created by Øyvind Skeie Liland
 * based on State.java
 */
var State = /** @class */ (function () {
    function State(backendArray, twoDimRelationshipArray) {
        this.backendArray = backendArray;
        this.twoDimRelationshipArray = twoDimRelationshipArray;
        this.backendArrayJSON = this.jsonifyBackendArray(this.backendArray);
    }
    /**
     * @return The default State when a new algorithm start, used by StateController
     */
    State.getDefaultState = function () {
        var defArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        var defRelationships = [[], [], [], [], [], [], [], [], [], []];
        return new State(defArray, $.parseJSON($.stringifyJSON(defRelationships)));
    };
    State.prototype.jsonifyBackendArray = function (backendArray) {
        var arr = [];
        for (var i = 0; i < backendArray.length; i++) {
            arr[i] = backendArray[i] + "";
        }
        return JSON.parse(JSON.stringify(arr).toString());
    };
    State.prototype.getBackendArray = function () {
        return this.backendArray;
    };
    State.prototype.getTwoDimRelationshipArray = function () {
        return this.twoDimRelationshipArray;
    };
    State.prototype.getBackendArrayJSON = function () {
        return this.backendArrayJSON;
    };
    return State;
}());
