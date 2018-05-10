/**
 * Created by knutandersstokke on 16.10.2016.
 * Modified by Øyvind Skeie Liland
 */

declare var $: any;

/** Manager for events stored in queue. Manager is also responsible for executing events automatically */
class EventManager {
    delayTime: number = 1250; // Original value
    nextEvents: FrontendEvent[] = [];
    previousEvents: FrontendEvent[] = [];
    eventThread: number;

    // Executing the next event in the queue, adding it to 'previous'
    next() {
        viewer.playButtonState();
        if (this.nextEvents.length == 0) {
            screenLock(false);
            if (control.getAlgoName() === "MaxHeapCombined") {
                $("#removeElem").attr({ "disabled": "true" });
                if ((<MaxHeapCombined>control.getAlgorithm()).finished)
                    screenLock(true);
            }
            return;
        }
        screenLock(true);
        var event = (<FrontendEvent>this.nextEvents.shift());
        event.next();
        this.previousEvents.push(event);
        if (event.duration == 0)
            this.next();
    }

    // Executing the previous event
    previous() {
        if (this.previousEvents.length == 0) {
            screenLock(false);
            return;
        }
        screenLock(true);
        var event: FrontendEvent = (<FrontendEvent>this.previousEvents.pop());
        event.previous();
        this.nextEvents.unshift(event);
    }

    addEvent(event: FrontendEvent) {
        this.nextEvents.push(event);
    }

    start() {
        clearInterval(this.eventThread);
        var manager = this; // Anonymous functions cannot access this...
        this.eventThread = setInterval(function () {
            manager.next();
        }, manager.delayTime);
    }

    pause() {
        clearInterval(this.eventThread);
    }
}

class FrontendEvent {
    next: Function;
    previous: Function;
    duration: number;

    constructor(n: Function, p: Function, d: number) {
        this.next = n;
        this.previous = p;
        this.duration = d;
    }
}

var manager: EventManager = new EventManager();