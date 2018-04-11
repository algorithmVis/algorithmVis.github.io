/**
 * Created by knutandersstokke on 16.10.2016.
 *
 */
/** Manager for events stored in queue. Manager is also responsible for executing events automatically */
var EventManager = /** @class */ (function () {
    function EventManager() {
        this.delayTime = 1000; // Original value
        this.nextEvents = [];
        this.previousEvents = [];
        this.paused = true;
    }
    // Executing the next event in the queue, adding it to 'previous'
    EventManager.prototype.next = function () {
        if (this.nextEvents.length == 0) {
            return;
        }
        var event = this.nextEvents.shift();
        event.next();
        this.previousEvents.push(event);
        if (event.duration == 0)
            this.next();
    };
    // Executing the previous event
    EventManager.prototype.previous = function () {
        this.pause();
        if (this.previousEvents.length == 0)
            return;
        var event = this.previousEvents.pop();
        event.previous();
        this.nextEvents.unshift(event);
    };
    EventManager.prototype.addEvent = function (event) {
        this.nextEvents.push(event);
    };
    EventManager.prototype.start = function () {
        var manager = this; // Anonymous functions cannot access this...
        this.paused = false;
        this.eventThread = setInterval(function () {
            manager.next();
        }, manager.delayTime);
    };
    EventManager.prototype.pause = function () {
        this.paused = true;
        clearInterval(this.eventThread);
    };
    EventManager.prototype.unpause = function () {
        var manager = this;
        this.paused = false;
        this.eventThread = setInterval(function () {
            manager.next();
        }, manager.delayTime);
    };
    EventManager.prototype.clear = function () {
        clearInterval(this.eventThread);
        this.nextEvents = [];
        this.previousEvents = [];
    };
    EventManager.prototype.slow = function () {
        this.delayTime = 1500;
        this.helpSetInterval();
    };
    EventManager.prototype.medium = function () {
        this.delayTime = 1000;
        this.helpSetInterval();
    };
    EventManager.prototype.fast = function () {
        this.delayTime = 500;
        this.helpSetInterval();
    };
    EventManager.prototype.helpSetInterval = function () {
        if (!this.paused) {
            this.pause();
            this.start();
        }
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
