import { Event } from './Event';

export class Trace {
    public attributes: any;
    events: Event[];
    constructor() {
        this.attributes = {};
        this.events = [];
    }
}