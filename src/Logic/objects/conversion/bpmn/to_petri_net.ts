import { AcceptingPetriNet, Marking, PetriNet } from "../../petri_net/petri_net";
import { PetriNetReduction } from "../../petri_net/util/reduction";

export class BpmnToPetriNetConverter {
	static uuidv4() {
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	  });
	}

	static nodeUuid() {
		let uuid = BpmnToPetriNetConverter.uuidv4();
		return "id"+uuid.replace(/-/g, "");
	}

	static apply(bpmnGraph) {
		let petriNet = new PetriNet("converted from BPMN");
		let im = new Marking(petriNet);
		let fm = new Marking(petriNet);
		let sourcePlace = petriNet.addPlace("source");
		let sinkPlace = petriNet.addPlace("sink");
		im.setTokens(sourcePlace, 1);
		fm.setTokens(sinkPlace, 1);
		let inclusiveGatewayEntry = {};
		let inclusiveGatewayExit = {};
		let flowPlace = {};
		let sourceCount = {};
		let targetCount = {};
		for (let flowId in bpmnGraph.edges) {
			let flow = bpmnGraph.edges[flowId];
			let source = flow.source;
			let target = flow.target;
			let place = petriNet.addPlace(flowId);
			flowPlace[flow] = place;
			if (!(source in sourceCount)) {
				sourceCount[source] = 0;
			}
			if (!(target in targetCount)) {
				targetCount[target] = 0;
			}
			sourceCount[source] = sourceCount[source] + 1;
			targetCount[target] = targetCount[target] + 1;
		}
		for (let flowId in bpmnGraph.edges) {
			let flow = bpmnGraph.edges[flowId];
			let source = flow.source;
			let target = flow.target;
			if (source.type.endsWith("inclusiveGateway") && sourceCount[source] > 1) {
				inclusiveGatewayExit[flowId] = 0;
			}
			if (target.type.endsWith("inclusiveGateway") && targetCount[target] > 1) {
				inclusiveGatewayEntry[flowId] = 0;
			}
		}
		let inclusivGatInters = {};
		for (let el in inclusiveGatewayEntry) {
			if (el in inclusiveGatewayExit) {
				inclusivGatInters[el] = 0;
			}
		}

		let nodesEntering = {};
		let nodesExiting = {};
		for (let nodeId in bpmnGraph.nodes) {
			let node = bpmnGraph.nodes[nodeId];
			let entryPlace = petriNet.addPlace("ent_"+nodeId);
			let exitingPlace = petriNet.addPlace("exi_"+nodeId);
			let label = null;
			if (node.type.toLowerCase().endsWith("task")) {
				label = node.name;
			}
			let transition = petriNet.addTransition(nodeId, label);
			petriNet.addArcFromTo(entryPlace, transition);
			petriNet.addArcFromTo(transition, exitingPlace);
			if (node.type.endsWith("parallelGateway") || node.type.endsWith("inclusiveGateway")) {
				let exitingObject = null;
				let enteringObject = null;
				if (sourceCount[node] > 1) {
					exitingObject = petriNet.addTransition(BpmnToPetriNetConverter.nodeUuid(), null);
					petriNet.addArcFromTo(exitingPlace, exitingObject);
				}
				else {
					exitingObject = exitingPlace;
				}

				if (targetCount[node] > 1) {
					enteringObject = petriNet.addTransition(BpmnToPetriNetConverter.nodeUuid(), null);
					petriNet.addArcFromTo(enteringObject, entryPlace);
				}
				else {
					enteringObject = entryPlace;
				}
				nodesEntering[node] = enteringObject;
				nodesExiting[node] = exitingObject;
			}
			else {
				nodesEntering[node] = entryPlace;
				nodesExiting[node] = exitingPlace;
			}

			if (node.type.toLowerCase().endsWith("startevent")) {
				let startTransition = petriNet.addTransition(BpmnToPetriNetConverter.nodeUuid(), null);
				petriNet.addArcFromTo(sourcePlace, startTransition);
				petriNet.addArcFromTo(startTransition, entryPlace);
			}
			else if (node.type.toLowerCase().endsWith("endevent")) {
				let endTransition = petriNet.addTransition(BpmnToPetriNetConverter.nodeUuid(), null);
				petriNet.addArcFromTo(exitingPlace, endTransition);
				petriNet.addArcFromTo(endTransition, sinkPlace);
			}
		}

		for (let flowId in bpmnGraph.edges) {
			let flow = bpmnGraph.edges[flowId];
			let sourceObject = nodesExiting[flow.source];
			let targetObject = nodesEntering[flow.target];
			if (sourceObject.constructor.name == "PetriNetPlace") {
				let inv1 = petriNet.addTransition(BpmnToPetriNetConverter.nodeUuid(), null);
				petriNet.addArcFromTo(sourceObject, inv1);
				sourceObject = inv1;
			}
			if (targetObject.constructor.name == "PetriNetPlace") {
				let inv2 = petriNet.addTransition(BpmnToPetriNetConverter.nodeUuid(), null);
				petriNet.addArcFromTo(inv2, targetObject);
				targetObject = inv2;
			}
			petriNet.addArcFromTo(sourceObject, flowPlace[flow]);
			petriNet.addArcFromTo(flowPlace[flow], targetObject);
		}

		// TODO: extra management of inclusiveGateways

		let acceptingPetriNet = new AcceptingPetriNet(petriNet, im, fm);
		PetriNetReduction.apply(acceptingPetriNet, false);

		return acceptingPetriNet;
	}
}