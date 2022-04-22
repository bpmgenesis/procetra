import { GeneralLogStatistics } from '../../../statistics/log/general';
import { ProcessTree, ProcessTreeOperator } from '../../../objects/process_tree/process_tree';
class FlowerMiner {
    static apply(eventLog, activityKey = "concept:name") {
        let activities = GeneralLogStatistics.getAttributeValues(eventLog, activityKey);
        let loop = new ProcessTree(null, ProcessTreeOperator.LOOP, null);
        let xor = new ProcessTree(loop, ProcessTreeOperator.EXCLUSIVE, null);
        let redo = new ProcessTree(loop, null, null);
        loop.children.push(xor);
        loop.children.push(redo);
        for (let act in activities) {
            let actNode = new ProcessTree(xor, null, act);
            xor.children.push(actNode);
        }
        //Pm4JS.registerObject(loop, "Process Tree (Flower Miner)");
        return loop;
    }
}
