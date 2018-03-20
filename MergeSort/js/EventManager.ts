/**
 * Created by knutandersstokke on 16.10.2016.
 *
 */

declare var $;

/** Manager for events stored in queue. Manager is also responsible for executing events automatically */
class eventManager {
    delayTime: number = 1000; // Original value
    nextEvents: FrontendEvent[] = [];
    previousEvents: FrontendEvent[] = [];
    eventThread: number;

    // Executing the next event in the queue, adding it to 'previous'
    next() {
        if (this.nextEvents.length == 0) {
            return;
        }
        var event: FrontendEvent = (<FrontendEvent> this.nextEvents.shift());
        event.next();
        this.previousEvents.push(event);
        if (event.duration == 0)
            this.next();
    }

    // Executing the previous event
    previous() {
        if (this.previousEvents.length == 0)
            return;
        var event: FrontendEvent = (<FrontendEvent> this.previousEvents.pop());
        //this.delayTime = 500; //this line set to 0 caused: when resuming all animations are played out. Intention Delay when stepping backwards.
        event.previous();
        this.nextEvents.unshift(event);
    }

    addEvent(event: FrontendEvent) {
        this.nextEvents.push(event);
    }

    start() {
        var manager = this; // Anonymous functions cannot access this...
        this.eventThread = setInterval(function () {
            manager.next();
        }, manager.delayTime);
    }

    pause() {
        clearInterval(this.eventThread);
    }

    unpause() {
        var manager = this;
        this.eventThread = setInterval(function () {
            manager.next();
        }, manager.delayTime);
    }

    clear() {
        clearInterval(this.eventThread);
        this.nextEvents = [];
        this.previousEvents = [];
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

var manager: eventManager = new eventManager();

/*
/** How to add FrontendEvents to manager
for(var i=0; i<10; i++) {
    var f = function(k) {
        return function() {console.log("Going forward, step " + k);};
    }(i);
    var b = function(k) {
        return function() {console.log("Going backward, step " + k);}
    }(i);
    manager.addEvent(new FrontendEvent(f,b));
}
*/
