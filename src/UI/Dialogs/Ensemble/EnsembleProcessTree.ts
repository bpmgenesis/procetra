import { Convert } from '@tuval/core';
import { TreeNode, TreeNodeCollection, TTreeView } from '@tuval/forms';


export class EnsembleProcessTreeView extends TTreeView {
    private process_data: any[];
    protected InitComponents(): void {
        this.Height = 518;



    }
    public SetProcessData(processList: any[]) {
        this.process_data = processList;
        this.LoadTree(this.Nodes, null);
    }

    private LoadTree(nodes: TreeNodeCollection, parent_id: string) {


        for (let i = 0; i < this.process_data.length; i++) {
            if (this.process_data[i].ParentId == parent_id) {
                const treeNode = new TreeNode(Convert.ToString(this.process_data[i].ProcessId), this.process_data[i].ProcessName);
                treeNode.Icon = 'https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data%20Connectors/xlsx';
                nodes.Add(treeNode);
                this.LoadTree(treeNode.Nodes, Convert.ToString(this.process_data[i].ProcessId));
            }
        }
    }
}