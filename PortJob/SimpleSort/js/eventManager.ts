/**
 * Created by knutandersstokke on 16.10.2016.
 *
 */

declare var $;

/** Manager for events stored in queue. Manager is also responsible for executing events automatically */
class eventManager {
    delayTime: number = 500; // Original value
    nextEvents: FrontendEvent[] = [];
    previousEvents: FrontendEvent[] = [];
    eventThread;

    // Executing the next event in the queue, adding it to 'previous'
    next() {
        if (this.nextEvents.length == 0) {
            return;
        }
        var event = this.nextEvents.shift();
        console.log(this.nextEvents);
        event.next();
        this.previousEvents.push(event);
        if (event.duration == 0)
            this.next();
    }

    // Executing the previous event
    previous() {
        if (this.previousEvents.length == 0)
            return;
        var event = this.previousEvents.pop();
        this.delayTime = 0; //TODO: Should there be a delay when stepping backwards?
        event.previous();
        this.nextEvents.unshift(event);
    }

    addEvent(event) {
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

    clear() {
        clearInterval(this.eventThread);
        this.nextEvents = [];
        this.previousEvents = [];
    }
}

class FrontendEvent {
    next;
    previous;
    duration: number;

    constructor(n, p, d: number) {
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
