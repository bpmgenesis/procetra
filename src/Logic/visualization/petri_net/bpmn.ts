import { TString } from '@tuval/core';
export class PetriNetBpmnVisualizer {
    static uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    static nodeUuid() {
        let uuid = PetriNetBpmnVisualizer.uuidv4();
        return "n" + uuid.replace(/-/g, "");
    }

    static apply(acceptingPetriNet, debug = false) {
        let petriNet = acceptingPetriNet.net;
        let im = acceptingPetriNet.im;
        let fm = acceptingPetriNet.fm;
        let ret = [];
        let uidMap = {};
        ret.push("digraph G {");
        ret.push("rankdir=\"LR\"");
        for (let placeKey in petriNet.places) {
            let place = petriNet.places[placeKey];
            let nUid = PetriNetBpmnVisualizer.nodeUuid();
            let fillColor = "white";
            if (place in im.tokens) {
                fillColor = "palegreen1";
                ret.push(nUid + " [shape=circle, label=\"\", style=filled, fillcolor=" + fillColor + "]");
            }
            else if (place in fm.tokens) {
                fillColor = "orangered";
                ret.push(nUid + " [shape=doublecircle, label=\"\", style=filled, fillcolor=" + fillColor + "]");
            } else {
                let placeLabel = "X";
                if (debug == true) {
                    placeLabel = placeKey;
                }
                ret.push(nUid + " [shape=diamond, label=\"" + placeLabel + "\", style=filled, fillcolor=" + fillColor + " fontsize=\"20pt\" fontname=\"Tahoma\"]");
            }
            uidMap[place] = nUid;
        }
        for (let transKey in petriNet.transitions) {
            let trans = petriNet.transitions[transKey];
            let nUid = PetriNetBpmnVisualizer.nodeUuid();
            if (trans.label != null) {
                ret.push(nUid + " [shape=rectangle, fixedsize=\"true\",width=1.5, height=0.7, style=\"rounded,filled\", color=\"black\" fillcolor=\"lightgoldenrodyellow\", label=\"" + trans.label + "\"]");
            }
            else {
                if (true) {
                    ret.push(nUid + " [shape=point, label=\"" + " " + "\"]");
                }
                else {
                    ret.push(nUid + " [shape=rectangle, style=\"rounded,filled\" , label=\" \", style=filled, fillcolor=black]");
                }
            }
            uidMap[trans] = nUid;
        }
        for (let arcKey in petriNet.arcs) {
            let arc = petriNet.arcs[arcKey];
            let uid1 = uidMap[arc.source];
            let uid2 = uidMap[arc.target];
            ret.push(uid1 + " -> " + uid2 + "");
        }
        ret.push("}");
        return ret.join('\n');
    }
}