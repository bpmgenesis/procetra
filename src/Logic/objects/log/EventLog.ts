import {Trace} from './Trace';

export class EventLog {
    public attributes: any;
    public traces: Trace[];
    private extensions: any;
    private globals: any;
    private classifiers: any;
	constructor() {
		this.attributes = {};
		this.traces = [];
		this.extensions = {};
		this.globals = {};
		this.classifiers = {};
	}
}