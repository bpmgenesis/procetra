import {
    Alignment,
    Fonts,
    ForEach,
    HStack,
    State,
    Text,
    TwoColumnLayout,
    UIController,
    UIImage,
    UIScene,
    UIView,
    VStack,
} from '@tuval/forms';
import { SymbolBroker } from '../../BrokerClients/SymbolBroker';

import { ConnectorDialog } from './ConnectorDialog';
import { ListView, ListViewItem } from '../Views/ListView';
import { AcceptButton, CancelButton } from '../Views/Buttons';

interface MIConnectorItems {
    name: string;
    title: string;
    items?: [{ name: string, imagePath: string, image?: UIView }]
}
interface MIListModel {
    name: string;
    items: MIConnectorItems[];
}

function GetImage(url): HTMLImageElement {
    const image = new Image();
    image.src = url;
    return image;
}
const Model: MIConnectorItems[] = [
    {
        name: 'Database',
        title: 'Database',
        items: [
            {
                name: 'Google BigQuery',
                imagePath: 'Integrations/Data Connectors/google_bigquery',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'google_bigquery'))
            },
            {
                name: 'Heroku PostgreSQL',
                imagePath: 'Integrations/Data Connectors/herokupostgresql',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'herokupostgresql'))
            },
            {
                name: 'MariaDB',
                imagePath: 'Integrations/Data Connectors/maria_db',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'maria_db'))
            },
            {
                name: 'MongoDB',
                imagePath: 'Integrations/Data Connectors/mongo_db',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'mongo_db'))
            },
            {
                name: 'MS SQL Server',
                imagePath: 'Integrations/Data Connectors/mssql',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'mssql'))
            },
            {
                name: 'My SQL',
                imagePath: 'Integrations/Data Connectors/mysql',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'mysql'))
            },
            {
                name: 'Oracle',
                imagePath: 'Integrations/Data Connectors/oracle_db',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'oracle_db'))
            },
            {
                name: 'PostgreSQL',
                imagePath: 'Integrations/Data Connectors/postgresql',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'postgresql'))
            },
            {
                name: 'Amazon Redshift',
                imagePath: 'Integrations/Data Connectors/redshift',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'redshift'))
            },
            {
                name: 'Segment',
                imagePath: 'Integrations/Data Connectors/segment',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'segment'))
            },
            {
                name: 'Snowflake',
                imagePath: 'Integrations/Data Connectors/snowflake',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'snowflake'))
            },

        ] as any
    },
    {
        name: 'Files',
        title: 'Files',
        items: [
            {
                name: 'CSV File',
                imagePath: 'Integrations/Data Connectors/csv',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'csv'))
            },
            {
                name: 'Xes File',
                imagePath: 'Integrations/Data Connectors/herokupostgresql',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'herokupostgresql'))
            },
            {
                name: 'Xlsx File',
                imagePath: 'Integrations/Data Connectors/xlsx',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'xlsx'))
            },
            {
                name: 'Excel Online',
                imagePath: 'Integrations/Data Connectors/excelonline',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'excelonline'))
            },
            {
                name: 'Google Spreadsheet',
                imagePath: 'Integrations/Data Connectors/google_spreadsheet',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'google_spreadsheet'))
            },
            {
                name: 'Smartsheet',
                imagePath: 'Integrations/Data Connectors/smartsheet',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'smartsheet'))
            },
            {
                name: 'Microsoft Access',
                imagePath: 'Integrations/Data Connectors/microsoft_access',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'microsoft_access'))
            },
            {
                name: 'SQLLite',
                imagePath: 'Integrations/Data Connectors/SQLite',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'SQLite'))
            }
        ]

    },
    {
        name: 'Marketing',
        title: 'Marketing',
        items: [
            {
                name: 'Google Ads',
                imagePath: 'Integrations/Data Connectors/googleadwords',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'googleadwords'))
            },
            {
                name: 'Google Analytics',
                imagePath: 'Integrations/Data Connectors/google_analytics',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'google_analytics'))
            },
            {
                name: 'GoToWebinar',
                imagePath: 'Integrations/Data Connectors/gotowebinar',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'gotowebinar'))
            },
            {
                name: 'MailChimp',
                imagePath: 'Integrations/Data Connectors/mailchimp',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'mailchimp'))
            },
            {
                name: 'Optimizely',
                imagePath: 'Integrations/Data Connectors/optimizely',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'optimizely'))
            },
            {
                name: 'Persistiq',
                imagePath: 'Integrations/Data Connectors/persistiq',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'persistiq'))
            },
            {
                name: 'SendGrid',
                imagePath: 'Integrations/Data Connectors/eba',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'eba'))
            }
        ]
    },
    {
        name: 'Operations',
        title: 'Operations',
        items: [
            {
                name: 'FreshDesk',
                imagePath: 'Integrations/Data Connectors/freshdesk',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'freshdesk'))
            },
            {
                name: 'Intercom',
                imagePath: 'Integrations/Data Connectors/intercom',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'intercom'))
            },
            {
                name: 'Paidlabs',
                imagePath: 'Integrations/Data Connectors/paidlabs',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'paidlabs'))
            },
            {
                name: 'QuickBooks Online',
                imagePath: 'Integrations/Data Connectors/quickbooks',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'quickbooks'))
            },
            {
                name: 'Optimizely',
                imagePath: 'Integrations/Data Connectors/optimizely',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'optimizely'))
            },
            {
                name: 'Stripe',
                imagePath: 'Integrations/Data Connectors/stripe',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'stripe'))
            },
            {
                name: 'ZenDesk',
                imagePath: 'Integrations/Data Connectors/zendesk',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'zendesk'))
            }
        ]
    },
    {
        name: 'Product',
        title: 'Product',
        items: [
            {
                name: 'SAP',
                imagePath: 'Integrations/Data Connectors/SAP_logo',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'SAP_logo'))
            },
            {
                name: 'SAP Business One',
                imagePath: 'Integrations/Data Connectors/sap_business_one',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'sap_business_one'))
            },
            {
                name: 'SAP Concur',
                imagePath: 'Integrations/Data Connectors/sap_concur',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'sap_concur'))
            },
            {
                name: 'SAP Hana',
                imagePath: 'Integrations/Data Connectors/sap_hana',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'sap_hana'))
            },
            {
                name: 'SAP Success Factors',
                imagePath: 'Integrations/Data Connectors/sap_success_factors',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'sap_success_factors'))
            },
            {
                name: 'eBA',
                imagePath: 'Integrations/Data Connectors/eba',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'eba'))
            },
            {
                name: 'QDMS',
                imagePath: 'Integrations/Data Connectors/qdms',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'qdms'))
            },
            {
                name: 'BEAM',
                imagePath: 'Integrations/Data Connectors/beam',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'beam'))
            },
            {
                name: 'Ensemble',
                imagePath: 'Integrations/Data Connectors/ensemble',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'ensemble'))
            },
            {
                name: 'Jira',
                imagePath: 'Integrations/Data Connectors/jira',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'jira'))
            },
            {
                name: 'Service Now',
                imagePath: 'Integrations/Data Connectors/servicenow',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'servicenow'))
            },
            {
                name: 'Asana',
                imagePath: 'Integrations/Data Connectors/asana',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'asana'))
            },
            {
                name: 'Auth0',
                imagePath: 'Integrations/Data Connectors/auth0',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'auth0'))
            },
            {
                name: 'Basecamp',
                imagePath: 'Integrations/Data Connectors/basecamp',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'basecamp'))
            },
            {
                name: 'Bitbucket',
                imagePath: 'Integrations/Data Connectors/bitbucket',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'bitbucket'))
            },
            {
                name: 'Delighted',
                imagePath: 'Integrations/Data Connectors/delighted',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'delighted'))
            },
            {
                name: 'Jenkins',
                imagePath: 'Integrations/Data Connectors/jenkins',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'jenkins'))
            },
            {
                name: 'Podio',
                imagePath: 'Integrations/Data Connectors/podio',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'podio'))
            },
            {
                name: 'Trello',
                imagePath: 'Integrations/Data Connectors/trello',
                image: GetImage(SymbolBroker.GetSymbolUrl('Integrations', 'Data Connectors', 'trello'))
            }
        ]
    }
];

const BI: MIConnectorItems[] = [
    {
        name: 'Custom Page',
        title: 'Custom Page',
        items: [
            {
                name: 'Custom Page',
                imagePath: 'Integrations/Data Connectors/google_bigquery'
            }
        ]
    }
];

const ListModel: MIListModel[] = [
    {
        name: 'Mining Dataset',
        items: Model
    },
    {
        name: 'BI Services',
        items: BI
    }];

export class ConnectorDialogController extends UIController {

    private dialog: ConnectorDialog;
    @State()
    private selectedModelItem: MIConnectorItems;

    @State()
    private selectedItem: any;

    protected InitController(): void {
        this.selectedModelItem = Model[0];
    }

    public OnBindModel(dialog: ConnectorDialog): void {
        this.dialog = dialog;
    }

    private onOK() {
        this.dialog.Hide();
    }
    private onCancel() {
        this.dialog.Hide();
    }
    public LoadView(): UIView {
        return (
            UIScene(
                TwoColumnLayout({
                    left: [
                        ListView(
                            Text('Select Item').textAlign('start').font(Fonts.title3),
                            ...ForEach(ListModel)((listModelItem: MIListModel) => {
                                return (
                                    VStack(
                                        Text(listModelItem.name).padding('5px').fontWeight('bold'),
                                        ...ForEach(listModelItem.items)((modelItem: MIConnectorItems) =>
                                            ListViewItem(
                                                /*   Icon(projectItem.icon).size(20).width('auto'), */
                                                Text(modelItem.title).paddingLeft('10px').width('100%')
                                            )
                                                .foregroundColor(this.selectedModelItem === modelItem ? 'white' : '')
                                                .cornerRadius(5)
                                                .transition('margin-left 0.35s, background-color 0.35s, shadow 0.35s')
                                                .shadow(this.selectedModelItem === modelItem ? 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px' : '')
                                                .marginLeft(this.selectedModelItem === modelItem ? '20px' : '15px')
                                                .minHeight(this.selectedModelItem === modelItem ? '50px' : '40px')
                                                .backgroundImage(this.selectedModelItem === modelItem ? 'linear-gradient(#25A4FFAA, #028AEBAA)' : '')
                                                .onSelected(() => { this.selectedModelItem = modelItem; })
                                        )
                                    ).alignment(Alignment.topLeading).width('100%').height('auto')
                                )
                            })

                        ).width(200).background('rgb(120,120,120,10%)').cornerRadius('12px 0px 0px 12px').grow(),
                    ],
                    right: [
                        VStack(
                            HStack(
                                ...ForEach(this.selectedModelItem?.items)((item: any/* { name: string, imagePath: string, image: HTMLImageElement } */) =>
                                    VStack(
                                        UIImage(SymbolBroker.GetSymbolUrl(item.imagePath.split('/')[0], item.imagePath.split('/')[1], item.imagePath.split('/')[2])).width('104px'),
                                        Text(item.name).textAlign('center')
                                    )
                                        .cursor('pointer')
                                        // selection frame
                                        .border(this.selectedItem === item ? '2px solid rgb(37,159,245, 50%)' : '2px solid #eef0f4')
                                        .shadow(this.selectedItem === item ? 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' : '')
                                        .width('136px')
                                        .height('192px')
                                        .padding('10px')
                                        .margin('10px')
                                        .onClick(() => this.selectedItem = item)
                                )
                            )
                                .alignContent('baseline')
                                .alignment(Alignment.topLeading)
                                .width('100%')
                                .wrap('wrap')
                                .overflowY('auto'),
                            HStack(
                                AcceptButton('OK').action(() => this.onOK()),
                                CancelButton('Cancel').action(() => this.onCancel())
                            ).alignment(Alignment.trailing).width('100%').height(50)
                        ).width('100%')
                    ]
                })
            )
        )
    }
}

