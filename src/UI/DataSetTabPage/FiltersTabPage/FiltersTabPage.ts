import { FilterSelectDialog } from './../../Dialogs/FilterSelectDialog/FilterSelectDialog';
import { ReworkFilterListMenuItem } from './../../Components/FiltersListMenu/ReworkFilterMenuItem';
import { ActivityFilterListMenuItem } from './../../Components/FiltersListMenu/ActivityFilterListMenuItem';
import { AttributeFilterListMenuItem } from './../../Components/FiltersListMenu/AttributeFilterListMenuItem';
import { EndPointsFilterListMenuItem } from './../../Components/FiltersListMenu/EndPointsFilterListMenuItem';
import { PerformanceFilterListMenuItem } from './../../Components/FiltersListMenu/PerformanceFilterListMenuItem';
import { int } from '@tuval/core';
import { FiltersListMenu } from './../../Components/FiltersListMenu/FiltersListMenu';
import { TTabPage, LayoutPanel, SizingModes, Button } from '@tuval/forms';
import { TimeFrameFilterListItem } from '../../Components/FiltersListMenu/TimeFrameFilterListItem';
import { VariationFilterListMenuItem } from '../../Components/FiltersListMenu/VariationFilterListMenuItem';

export class FiltersTabPage extends TTabPage {
    private layoutPanel: LayoutPanel;
    private filtersListMenu: FiltersListMenu;
    public override InitComponents() {

        const button = new Button();
        button.Text = 'Test';
        const filterSelectDialog = new FilterSelectDialog();
        button.Clicked.add(()=> filterSelectDialog.ShowDialog() );

        this.layoutPanel = new LayoutPanel();
        this.layoutPanel.SizingMode = SizingModes.LeftFixed;
        this.layoutPanel.LeftSize = 250;

        //#region Prepare Filter List Menu
        this.filtersListMenu = new FiltersListMenu();
        this.filtersListMenu.ItemColor = 'white';
        this.filtersListMenu.Appearance.Width = '250px';
        this.filtersListMenu.Appearance.Height = '250px';

        this.filtersListMenu.Items.Add(new TimeFrameFilterListItem());

        this.filtersListMenu.Items.Add(new PerformanceFilterListMenuItem());
        this.filtersListMenu.Items.Add(new VariationFilterListMenuItem());
        this.filtersListMenu.Items.Add(new EndPointsFilterListMenuItem());
        this.filtersListMenu.Items.Add(new AttributeFilterListMenuItem());
        this.filtersListMenu.Items.Add(new ActivityFilterListMenuItem());
        this.filtersListMenu.Items.Add(new ReworkFilterListMenuItem());

        //#endregion

        this.layoutPanel.LeftControl = this.filtersListMenu;

        this.Controls.Add(button);
        this.Controls.Add(this.layoutPanel);
    }
    public override OnFormResized(w: int, h: int) {

        this.filtersListMenu.Appearance.Height = `${h-100}px`;
       /*  const rect = this.layoutPanel.GetLeftPanelRect();
        this.freqModel.Height = h - 215;
        if (rect != null && rect.width > 0) {
            this.freqModel.Width = rect.width;
        } */

    }

    public override OnActivate() {
       /*  if (this.dataset != null) {
            this.freqModel.createModel(this.dataset.ProjectId, this.dataset.Id, 0.5);
        } */
        this.SendResizeRequest();
    }
}