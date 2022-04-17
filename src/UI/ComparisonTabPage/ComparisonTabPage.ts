import { int } from '@tuval/core';
import { TTabPage, TTabControl, DropArea } from '@tuval/forms';
import { Padding, PaddingApplies, DropEventArgs } from '@tuval/forms';
import { IDataSet } from '../../Bussiness/IDataSet';
import { FlexLayout } from '../controls/layout/FlexLayout';
import { JustifyContents } from '../controls/layout/JustifyContents';
export class ComparisonTabPage extends TTabPage {

    private tabControl: TTabControl;
    protected override InitComponents(): void {
        this.tabControl = new TTabControl();
        this.tabControl.Padding = new Padding(0, 10, 0, 0, PaddingApplies.Top);
        this.tabControl.SelectedIndexChanged.add(this.OnTabControlSelectedIndexChanged.bind(this));
        this.Controls.Add(this.tabControl);

        const tabPageDataSet = new TTabPage();
        tabPageDataSet.Text = 'Datsets';

        const dropZone = new DropArea();
        dropZone.Text = 'Drag Dataset Here';
        dropZone.Height = 100;
        dropZone.Drop.add((e: DropEventArgs) => {
            //alert(e.dataTransfer.getData('text'));
            const dataset: IDataSet = JSON.parse(e.nativeEvent.dataTransfer.getData('text'));
            if (dataset) {
                e.sender.Text = dataset.Name;

                const dropZone1 = new DropArea();
                dropZone1.Text = 'Drag Dataset Here';
                dropZone1.Height = 100;

                const flexItem1 = layoutPanel.AddFlexItem(dropZone);
                flexItem1.Shrink = true;
                flexItem1.Grow = true;
                flexItem1.JustifyContent = JustifyContents.Center;

                e.sender.AllowDrop = false;
            }

        });

        const layoutPanel = new FlexLayout();
        const flexItem = layoutPanel.AddFlexItem(dropZone);
        flexItem.Shrink = true;
        flexItem.Grow = true;
        flexItem.JustifyContent = JustifyContents.Center;

        tabPageDataSet.Controls.Add(layoutPanel);

        this.tabControl.TabPages.Add(tabPageDataSet);

        const comTabPage = new TTabPage();
        comTabPage.Text = 'Comparison';
        this.tabControl.TabPages.Add(comTabPage);

    }

    private OnTabControlSelectedIndexChanged(index: int): void {

    }


}