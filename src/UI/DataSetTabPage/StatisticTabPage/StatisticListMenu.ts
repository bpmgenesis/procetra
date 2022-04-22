import { ListMenu } from '@tuval/forms';
import { Resources } from '../../../Resources/Resources';
import { MiningBrokerClient } from '../../Dialogs/ConnectorDialog/eBA/MiningBrokerClient';

export class StatisticListMenu extends ListMenu {
    public constructor() {
        super();
        this.Width = 210;
        this.Height = 500;
        this.ItemHeight = 50;
        this.HeaderText = 'Model Types';

        this.BackgroundColor = '#E6E6E6';
        this.ItemColor = '#FFFFFF';
        this.SelectedItemColor = '#4071BB';
        this.ItemBorder.AddBottomBorder('#DCDCDC');

        this.AddCaseOverview();
        this.AddActivityOverview();

        this.SelectedIndex = 0;

    }

    public AddCaseOverview() {
        this.Items.Add('Overview'/* , Resources.Icons.MapIcon, Resources.Icons.MapSelectedIcon */);
    }
    public AddActivityOverview() {
        this.Items.Add('Activity'/* , Resources.Icons.MapIcon, Resources.Icons.MapSelectedIcon */);
    }
    public AddResourceOverview() {
        this.Items.Add('Resource'/* , Resources.Icons.MapIcon, Resources.Icons.MapSelectedIcon */);
    }

    public async Bind(eventInfo: any) {
        if (eventInfo) {
            const activity_column_name: string[] = eventInfo.activity_column.split(';');
            for (let i = 0; i < activity_column_name.length; i++) {
                this.Items.Add(activity_column_name[i]/* , Resources.Icons.MapIcon,
                    Resources.Icons.MapSelectedIcon,
                    Resources.Icons.RightArrowIcon,
                    Resources.Icons.RightArrowSelectedIcon */);
            }
        }
    }
}