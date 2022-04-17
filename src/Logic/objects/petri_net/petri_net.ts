export class PetriNet {
    name: string;
    places: any;
    transitions: any;
    arcs: any;
    constructor(name = "EMPTY") {
        this.name = name;
        this.places = {};
        this.transitions = {};
        this.arcs = {};
    }

    addPlace(name) {
        let place: any = new PetriNetPlace(name);
        this.places[place] = place;
        return place;
    }

    addTransition(name, label) {
        let trans: any = new PetriNetTransition(name, label);
        this.transitions[trans] = trans;
        return trans;
    }

    addArcFromTo(source, target, weight = 1) {
        if (source.constructor.name === target.constructor.name) {
           /*  throw 'Petri nets are bipartite graphs'; */
        }

        let arc: any = new PetriNetArc(source, target, weight);
        source.outArcs[arc] = arc;
        target.inArcs[arc] = arc;
        this.arcs[arc] = arc;
        return arc;
    }

    removePlace(place) {
        for (let arcId in place.inArcs) {
            let arc = place.inArcs[arcId];
            delete this.arcs[arcId];
            delete arc.source.outArcs[arcId];
        }
        for (let arcId in place.outArcs) {
            let arc = place.outArcs[arcId];
            delete this.arcs[arcId];
            delete arc.target.inArcs[arcId];
        }
        delete this.places[place];
    }

    removeTransition(transition) {
        for (let arcId in transition.inArcs) {
            let arc = transition.inArcs[arcId];
            delete this.arcs[arcId];
            delete arc.target.outArcs[arcId];
        }
        for (let arcId in transition.outArcs) {
            let arc = transition.outArcs[arcId];
            delete this.arcs[arcId];
            delete arc.target.inArcs[arcId];
        }
        delete this.transitions[transition];
    }

    toString() {
        return "petriNet@@" + this.name;
    }
}

export class PetriNetPlace {
    name: any;
    inArcs: {};
    outArcs: {};
    properties: {};
    constructor(name) {
        this.name = name;
        this.inArcs = {};
        this.outArcs = {};
        this.properties = {};
    }

    toString() {
        return "place@@" + this.name;
    }
}

export class PetriNetTransition {
    name: any;
    label: any;
    inArcs: {};
    outArcs: {};
    properties: {};
    constructor(name, label) {
        this.name = name;
        this.label = label;
        this.inArcs = {};
        this.outArcs = {};
        this.properties = {};
    }

    toString() {
        return "transition@@" + this.name;
    }

    getPreMarking() {
        let preMarking = {}
        for (let arcKey in this.inArcs) {
            let arc = this.inArcs[arcKey];
            let sourcePlace = arc.source;
            preMarking[sourcePlace] = arc.weight;
        }
        return preMarking;
    }

    getPostMarking() {
        let postMarking = {};
        for (let arcKey in this.outArcs) {
            let arc = this.outArcs[arcKey];
            let targetPlace = arc.target;
            postMarking[targetPlace] = arc.weight;
        }
        return postMarking;
    }

    checkPreset(marking) {
        let preMarking = this.getPreMarking();
        for (let place in preMarking) {
            if (!(place in marking.tokens) || (marking.tokens[place] < preMarking[place])) {
                return false;
            }
        }
        return true;
    }
}


export class PetriNetArc {
    source: any;
    target: any;
    weight: number;
    properties: {};
    constructor(source, target, weight = 1) {
        this.source = source;
        this.target = target;
        this.weight = weight;
        this.properties = {};
    }

    toString() {
        return "arc@@" + this.source + "@@" + this.target;
    }
}

export class Marking {
    net: any;
    tokens: {};
    constructor(net) {
        this.net = net;
        this.tokens = {};
    }

    toString() {
        let ret = "marking@@";
        let orderedKeys = Object.keys(this.tokens).sort();
        for (let place of orderedKeys) {
            ret += place + "=" + this.tokens[place] + ";"
        }
        return ret;
    }

    setTokens(place, tokens) {
        this.tokens[place] = tokens;
    }

    getEnabledTransitions() {
        let ret = [];
        for (let transKey in this.net.transitions) {
            let trans = this.net.transitions[transKey];
            if (trans.checkPreset(this)) {
                ret.push(trans);
            }
        }
        return ret;
    }

    execute(transition) {
        let newMarking = new Marking(this.net);
        for (let place in this.tokens) {
            newMarking.setTokens(place, this.tokens[place]);
        }
        let preMarking = transition.getPreMarking();
        let postMarking = transition.getPostMarking();
        for (let place in preMarking) {
            newMarking.tokens[place] -= preMarking[place];
        }
        for (let place in postMarking) {
            if (!(place in newMarking)) {
                newMarking.tokens[place] = postMarking[place];
            }
            else {
                newMarking.tokens[place] += postMarking[place];
            }
        }
        for (let place in newMarking.tokens) {
            if (newMarking.tokens[place] == 0) {
                delete newMarking.tokens[place];
            }
        }
        return newMarking;
    }

    copy() {
        let newMarking = new Marking(this.net);
        for (let place in this.tokens) {
            newMarking.setTokens(place, this.tokens[place]);
        }
        return newMarking;
    }

    equals(other) {
        let thisTokens = this.tokens;
        let otherTokens = other.tokens;
        for (let place in thisTokens) {
            if (!(place in otherTokens)) {
                return false;
            }
            else if (otherTokens[place] != thisTokens[place]) {
                return false;
            }
        }
        for (let place in otherTokens) {
            if (!(place in thisTokens)) {
                return false;
            }
        }
        return true;
    }
}

export class AcceptingPetriNet {
    net: any;
    im: any;
    fm: any;
    constructor(net, im, fm) {
        this.net = net;
        this.im = im;
        this.fm = fm;
    }
}