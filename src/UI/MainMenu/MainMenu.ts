import { RibbonMenu, RibbonTab, RibbonGroup } from '@tuval/forms';
import { ProjectTab } from './ProjectTab';

import { ExportTab } from './ExportTab';
export class MainMenu extends RibbonMenu {
    public ProjectTab: ProjectTab;
    public ExportTab: ExportTab;
    public override InitComponents() {
        this.ProjectTab = new ProjectTab();
        this.Tabs.Add(this.ProjectTab);
        //this.SetUpRibbonMenu();

        this.ExportTab = new ExportTab();
        this.Tabs.Add(this.ExportTab);
    }

    public SetUpRibbonMenu() {
        const dataTab: RibbonTab = this.Tabs.Add('Data Sets');
        const group: RibbonGroup = dataTab.Groups.Add('File');
        group.Items.AddButton('New', '');

        const modelTab: RibbonTab = this.Tabs.Add('Model');
        const _group: RibbonGroup = dataTab.Groups.Add('File');
        _group.Items.AddButton('New', '');

        const statisticsTab: RibbonTab = this.Tabs.Add('Statistic');
        const __group: RibbonGroup = dataTab.Groups.Add('File');
        __group.Items.AddButton('New', '');

        const casesTab: RibbonTab = this.Tabs.Add('Cases');
        const ___group: RibbonGroup = dataTab.Groups.Add('File');
        ___group.Items.AddButton('New', '');
    }

}