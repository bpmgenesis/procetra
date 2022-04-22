import { TTreeView, TreeNode, TreeNodeCollection } from '@tuval/forms';
import { SymbolBroker } from '../../../../BrokerClients/SymbolBroker';
import { ActivityTypes } from '../../DPFlowDialog/Activities/Activity';
import { Convert } from '@tuval/core';


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

        /*  const fileDataSourceNode = new TreeNode("11", "Import File");

         const csvNode = new TreeNode(ActivityTypes.ImportCsv, "Csv File");
         csvNode.Icon = SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'csv');

         const xesNode = new TreeNode(ActivityTypes.ImportXlsx, this.process_data[0].ProcessName);
         xesNode.Icon = 'https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data%20Connectors/xlsx';

         const xlsxNode = new TreeNode(ActivityTypes.ImportXlsx, "Xlsx File");
         xlsxNode.Icon = 'https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data%20Connectors/xlsx';


         fileDataSourceNode.Nodes.Add(csvNode);
         fileDataSourceNode.Nodes.Add(xesNode);
         fileDataSourceNode.Nodes.Add(xlsxNode);

         this.Nodes.Add(fileDataSourceNode);

         const treeNode = new TreeNode(Convert.ToString(this.process_data[0].ProcessId), this.process_data[0].ProcessName);
         treeNode.Icon = 'https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data%20Connectors/xlsx';
         this.Nodes.Add(treeNode);

         console.log('test için eklendi.'); */
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