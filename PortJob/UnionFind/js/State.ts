/**
 * Created by Øyvind Skeie Liland
 * based on State.java
 */

class State {
    private twoDimRelationshipArray: JSON;
    private backendArrayJSON: JSON;
    private backendArray: number[];

    constructor(backendArray: number[], twoDimRelationshipArray: JSON) {
        this.backendArray = backendArray;
        this.twoDimRelationshipArray = twoDimRelationshipArray;
        //backendArrayJSON = jsonifyBackendArray(this.backendArray);
    }

    /**
     * @return The default State when a new algorithm start, used by StateController
     */
    public static getDefaultState(): State {
        let defArray: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let defRelationships: string[][] = [[], [], [], [], [], [], [], [], [], []];

        return new State(defArray, JSON.parse(JSON.stringify(defRelationships)));
    }

    private jsonifyBackendArray(backendArray: number[]): JSON {
        let arr: string[] = [];
        for (let i: number = 0; i < backendArray.length; i++) {
            arr[i] = backendArray[i] + "";
        }

        return JSON.parse(JSON.stringify(arr));
    }

    public getBackendArray(): number[] {
        return this.backendArray;
    }

    public getTwoDimRelationshipArray(): JSON {
        return this.twoDimRelationshipArray;
    }

    public getBackendArrayJSON(): JSON {
        return this.backendArrayJSON;
    }
}