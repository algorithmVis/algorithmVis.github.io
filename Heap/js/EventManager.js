/**
 * Created by knutandersstokke on 16.10.2016.
 * Modified by Øyvind Skeie Liland
 */
/** Manager for events stored in queue. Manager is also responsible for executing events automatically */
var EventManager = /** @class */ (function () {
    function EventManager() {
        this.delayTime = 1250; // Original value
        this.nextEvents = [];
        this.previousEvents = [];
    }
    // Executing the next event in the queue, adding it to 'previous'
    EventManager.prototype.next = function () {
        viewer.playButtonState();
        if (this.nextEvents.length == 0) {
            screenLock(false);
            if (control.getAlgoName() === "MaxHeapCombined") {
                $("#removeElem").attr({ "disabled": "true" });
                if (control.getAlgorithm().finished)
                    screenLock(true);
            }
            return;
        }
        screenLock(true);
        var event = this.nextEvents.shift();
        event.next();
        this.previousEvents.push(event);
        if (event.duration == 0)
            this.next();
    };
    // Executing the previous event
    EventManager.prototype.previous = function () {
        if (this.previousEvents.length == 0) {
            screenLock(false);
            return;
        }
        screenLock(true);
        var event = this.previousEvents.pop();
        event.previous();
        this.nextEvents.unshift(event);
    };
    EventManager.prototype.addEvent = function (event) {
        this.nextEvents.push(event);
    };
    EventManager.prototype.start = function () {
        clearInterval(this.eventThread);
        var manager = this; // Anonymous functions cannot access this...
        this.eventThread = setInterval(function () {
            manager.next();
        }, manager.delayTime);
    };
    EventManager.prototype.pause = function () {
        clearInterval(this.eventThread);
    };
    return EventManager;
}());
var FrontendEvent = /** @class */ (function () {
    function FrontendEvent(n, p, d) {
        this.next = n;
        this.previous = p;
        this.duration = d;
    }
    return FrontendEvent;
}());
var manager = new EventManager();
