import { ActivityTypes } from './Activities/Activity';
import { TTreeView, TreeNode } from '@tuval/forms';
import { SymbolBroker } from '../../../BrokerClients/SymbolBroker';

export class DPFTreeView extends TTreeView {
    protected InitComponents(): void {
        this.Height = 518;

        const treenodeEventDataSource = new TreeNode("1", "Event Data Providers");

        const fileDataSourceNode = new TreeNode("11", "Import File");

        const csvNode = new TreeNode(ActivityTypes.ImportCsv, "Csv File");
        csvNode.Icon = SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'csv');

        const xesNode = new TreeNode(ActivityTypes.ImportXlsx, "Xes File");
        xesNode.Icon = 'https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data%20Connectors/xlsx';

        const xlsxNode = new TreeNode(ActivityTypes.ImportXlsx, "Xlsx File");
        xlsxNode.Icon = 'https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data%20Connectors/xlsx';


        fileDataSourceNode.Nodes.Add(csvNode);
        fileDataSourceNode.Nodes.Add(xesNode);
        fileDataSourceNode.Nodes.Add(xlsxNode);

        const databaseDataSourceNode = new TreeNode("12", "Database");

        const msSQLNode = new TreeNode(ActivityTypes.MSSql, "MS SQL Connection");
        msSQLNode.Icon = 'https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data%20Connectors/mssql';



        const mySQLNode = new TreeNode('MY SQL Connection', "MY SQL Connection");
        mySQLNode.Icon = 'https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data%20Connectors/mysql';

        databaseDataSourceNode.Nodes.Add(msSQLNode);
        databaseDataSourceNode.Nodes.Add(mySQLNode);

        //
        const productDatasetProvidersNode = new TreeNode('123', 'Products');

        const eBADatasetProviderNode = new TreeNode(ActivityTypes.eBA, "eBA");
        eBADatasetProviderNode.Icon = 'https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/eba';
        productDatasetProvidersNode.Nodes.Add(eBADatasetProviderNode);

        const ensembleDatasetProviderNode = new TreeNode(ActivityTypes.Ensemble, "Ensemble");
        ensembleDatasetProviderNode.Icon = 'https://bpmgenesis.com/broker/symbol/GetSymbol/Integrations/Data Connectors/ensemble';
        productDatasetProvidersNode.Nodes.Add(ensembleDatasetProviderNode);

        treenodeEventDataSource.Nodes.Add(fileDataSourceNode);
        treenodeEventDataSource.Nodes.Add(databaseDataSourceNode);
        treenodeEventDataSource.Nodes.Add(productDatasetProvidersNode);

        this.Nodes.Add(treenodeEventDataSource);

        const treeNodeOperations = new TreeNode("2", "Operations");

        const mergeDatasetNode = new TreeNode(ActivityTypes.MergeDataset, "Merge Datasets");
        const changeCaseNode = new TreeNode(ActivityTypes.ChangeCase, "Change Case");
        const JoinColumnsNode = new TreeNode(ActivityTypes.JoinColumns, "Join Columns");
        const deleteDublicatesNode = new TreeNode(ActivityTypes.DeleteDublucates, "Delete Dublicates");
        const changeTypeNode = new TreeNode(ActivityTypes.ChangeType, "Change Type");

        const combineTimestampNode = new TreeNode(ActivityTypes.CombineTimestamp, "Combine timestamp");
        const createTimestampNode = new TreeNode(ActivityTypes.CreateTimestamp, "Create timestamp");
        const dateDiffNode = new TreeNode(ActivityTypes.DateDiff, "Date diff");
        const dateAddNode = new TreeNode(ActivityTypes.DateAdd, "Date add");

        const deleteNode = new TreeNode(ActivityTypes.Delete, "Delete");
        const deriveField = new TreeNode(ActivityTypes.DeriveField, "Derive field");
        const removeSubstring = new TreeNode(ActivityTypes.RemoveSubstring, "Remove substring");
        const replaceSubstring = new TreeNode(ActivityTypes.ReplaceSubstring, "Replace substring");

        const roundTimestamp = new TreeNode(ActivityTypes.RoundTimestamp, "Round timestamp");
        const trimNode = new TreeNode(ActivityTypes.Trim, "Trim");

        treeNodeOperations.Nodes.Add(changeCaseNode);
        treeNodeOperations.Nodes.Add(mergeDatasetNode);
        treeNodeOperations.Nodes.Add(JoinColumnsNode);
        treeNodeOperations.Nodes.Add(deleteDublicatesNode);
        treeNodeOperations.Nodes.Add(changeTypeNode);

        treeNodeOperations.Nodes.Add(combineTimestampNode);
        treeNodeOperations.Nodes.Add(createTimestampNode);
        treeNodeOperations.Nodes.Add(dateDiffNode);
        treeNodeOperations.Nodes.Add(dateAddNode);

        treeNodeOperations.Nodes.Add(deleteNode);
        treeNodeOperations.Nodes.Add(deriveField);
        treeNodeOperations.Nodes.Add(removeSubstring);
        treeNodeOperations.Nodes.Add(replaceSubstring);

        treeNodeOperations.Nodes.Add(roundTimestamp);
        treeNodeOperations.Nodes.Add(trimNode);

        this.Nodes.Add(treeNodeOperations);
    }
}