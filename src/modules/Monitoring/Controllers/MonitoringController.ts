import { UIController, UIView, UIScene, VStack, cTopLeading, HStack, cLeading, Spacer, ForEach, UIButton, Text, HDivider, ScrollView, cVertical, TApplication, Alignment, PositionTypes } from '@tuval/forms';
import { PageTitle } from '../../../UI/Views/PageHeader';
import { RegularText, SectionHeadline, SectionSubHeadline } from '../../../UI/Views/Texts';
import { TileBox } from '../../../UI/Views/TileBox';
import { MetricBoxValueText, TileBoxHeaderText } from '../../../UI/Views/Title';
import { Sparkline } from '@tuval/components/charts';
import { MVIMetricData } from '../Models/MVIMetricData';

const metrics: MVIMetricData[] = [
    {
        name: 'Unique Variants',
        chart: {
            type: 'Column',
            valueType: 'Numeric',
            highPointColor: '#0d88e6',
            lowPointColor: '#fd7f6f',
            dataSource: [
                { x: 1, yval: 5 },
                { x: 2, yval: 6 },
                { x: 3, yval: 5 },
                { x: 4, yval: 7 },
                { x: 5, yval: 4 },
                { x: 6, yval: 3 },
                { x: 7, yval: 9 },
                { x: 8, yval: 5 },
                { x: 9, yval: 5 },
                { x: 10, yval: 6 },
                { x: 11, yval: 5 },
                { x: 12, yval: 7 },
                { x: 13, yval: 4 },
                { x: 14, yval: 3 },
                { x: 15, yval: 4 },
                { x: 16, yval: 5 },
                { x: 17, yval: 4 },
                { x: 18, yval: 3 },
                { x: 19, yval: 7 },
                { x: 20, yval: 5 },
                { x: 21, yval: 5 },
                { x: 22, yval: 6 },
                { x: 23, yval: 5 },
                { x: 24, yval: 7 },
            ],
            xName: 'x',
            yName: 'yval'
        },
        value: '57.14 %',
        subValue: '(+57.1 %)'
    },
    {
        name: 'Cases with (self)loops',
        chart: {
            type: 'Line',
            lineWidth: 5,
            width: '100%',
            height: '100%',
            padding: {
                left: 10,
                right: 10
            },
            valueType: 'Numeric',
            dataSource: [
                { x: 1, yval: 5 },
                { x: 2, yval: 6 },
                { x: 3, yval: 5 },
                { x: 4, yval: 7 },
                { x: 5, yval: 4 },
                { x: 6, yval: 3 },
                { x: 7, yval: 9 },
                { x: 8, yval: 5 },
                { x: 9, yval: 6 },
                { x: 10, yval: 5 },
                { x: 11, yval: 7 },
                { x: 12, yval: 8 },
                { x: 13, yval: 4 },
                { x: 14, yval: 5 },
                { x: 15, yval: 3 },
                { x: 16, yval: 4 },
                { x: 17, yval: 11 },
                { x: 18, yval: 10 },
                { x: 19, yval: 2 },
                { x: 20, yval: 12 },
                { x: 21, yval: 4 },
                { x: 22, yval: 7 },
                { x: 23, yval: 6 },
                { x: 24, yval: 8 },
            ],
            xName: 'x',
            yName: 'yval',
            markerSettings: {
                visible: ['All'],
                border: {
                    color: '#00BDAE',
                    width: 5
                },
                fill: 'white',
                size: 10,
            }
        },
        value: '20.00 %',
        subValue: '(-75.6 %)'
    },
    {
        name: 'Automation rate',
        chart: {
            type: 'Column',
            highPointColor: '#0d88e6',
            lowPointColor: '#fd7f6f',
            valueType: 'Numeric',
            dataSource: [
                { x: 1, yval: 3 },
                { x: 2, yval: 7 },
                { x: 3, yval: 4 },
                { x: 4, yval: 8 },
                { x: 5, yval: 2 },
                { x: 6, yval: 8 },
                { x: 7, yval: 9 },
                { x: 8, yval: 6 },
                { x: 9, yval: 5 },
                { x: 10, yval: 7 },
                { x: 11, yval: 8 },
                { x: 12, yval: 9 },
                { x: 13, yval: 15 },
                { x: 14, yval: 3 },
                { x: 15, yval: 14 },
                { x: 16, yval: 15 },
                { x: 17, yval: 14 },
                { x: 18, yval: 3 },
                { x: 19, yval: 7 },
                { x: 20, yval: 5 },
                { x: 21, yval: 5 },
                { x: 22, yval: 6 },
                { x: 23, yval: 5 },
                { x: 24, yval: 7 },
            ],
            xName: 'x',
            yName: 'yval'
        },
        value: '2.78 %',
        subValue: '(+2.8 %)'
    },
    {
        name: 'Cases with long lead time',
        chart: {
            lineWidth: 1,
            type: 'Area',
            opacity: 1,
            border: {  width: 2 },
            valueType: 'Category',
            axisSettings: {
                lineSettings: {
                    visible: true
                }
            },
            dataSource: [
                { x: 1, xval: 'Jan', yval: 34 },
                { x: 2, xval: 'Feb', yval: 36 },
                { x: 3, xval: 'Mar', yval: 32 },
                { x: 4, xval: 'Apr', yval: 35 },
                { x: 5, xval: 'May', yval: 40 },
                { x: 6, xval: 'Jun', yval: 38 },
                { x: 7, xval: 'Jul', yval: 33 },
                { x: 8, xval: 'Aug', yval: 37 },
                { x: 9, xval: 'Sep', yval: 34 },
                { x: 10, xval: 'Oct', yval: 31 },
                { x: 11, xval: 'Nov', yval: 30 },
                { x: 12, xval: 'Dec', yval: 29 },
            ],
            xName: 'xval', yName: 'yval',
        },
        value: '13.33 %',
        subValue: '(-4.4 %)'
    },
    {
        name: 'Cases with many process steps',
        chart: {
            type: 'Column',
            highPointColor: '#0d88e6',
            lowPointColor: '#fd7f6f',
            valueType: 'Numeric',
            dataSource: [
                { x: 1, yval: 7 },
                { x: 2, yval: 7 },
                { x: 3, yval: 9 },
                { x: 4, yval: 8 },
                { x: 5, yval: 3 },
                { x: 6, yval: 2 },
                { x: 7, yval: 5 },
                { x: 8, yval: 8 },
                { x: 9, yval: 4 },
                { x: 10, yval: 8 },
                { x: 11, yval: 8 },
                { x: 12, yval: 9 },
                { x: 13, yval: 10 },
                { x: 14, yval: 3 },
                { x: 15, yval: 12 },
                { x: 16, yval: 5 },
                { x: 17, yval: 4 },
                { x: 18, yval: 13 },
                { x: 19, yval: 17 },
                { x: 20, yval: 15 },
                { x: 21, yval: 15 },
                { x: 22, yval: 16 },
                { x: 23, yval: 5 },
                { x: 24, yval: 7 },
            ],
            xName: 'x',
            yName: 'yval'
        },
        value: '13.33 %',
        subValue: '(+57.1 %)'
    },
    {
        name: 'Number of resources per process step',
        chart: {
            type: 'Area',
            lineWidth:5,
            highPointColor: '#0d88e6',
            lowPointColor: '#fd7f6f',
            valueType: 'Numeric',
            dataSource: [
                { x: 1, yval: 3 },
                { x: 2, yval: 7 },
                { x: 3, yval: 4 },
                { x: 4, yval: 8 },
                { x: 5, yval: 2 },
                { x: 6, yval: 8 },
                { x: 7, yval: 9 },
                { x: 8, yval: 6 },
                { x: 9, yval: 5 },
                { x: 10, yval: 7 },
                { x: 11, yval: 8 },
                { x: 12, yval: 9 },
                { x: 13, yval: 15 },
                { x: 14, yval: 3 },
                { x: 15, yval: 14 },
                { x: 16, yval: 15 },
                { x: 17, yval: 14 },
                { x: 18, yval: 3 },
                { x: 19, yval: 7 },
                { x: 20, yval: 5 },
                { x: 21, yval: 5 },
                { x: 22, yval: 6 },
                { x: 23, yval: 5 },
                { x: 24, yval: 7 },
            ],

            xName: 'x',
            yName: 'yval'
        },
        value: '2.63 %',
        subValue: '(+57.1 %)'
    }
]

const staticticInfos = [
    {
        title: 'start time',
        value: '19.09.2012'
    },
    {
        title: 'end time',
        value: '19.09.2013'
    },
    {
        title: 'cases',
        value: '968'
    },
    {
        title: 'variants',
        value: '79'
    },
    {
        title: 'process step types',
        value: '12'
    },
    {
        title: 'total process steps',
        value: '7416'
    }
]

export class MonitoringController extends UIController {
    public LoadView(): UIView {
        return (
            UIScene(
                VStack({ alignment: cTopLeading, spacing: 10 })(
                    HStack({ alignment: cLeading, spacing: 10 })(
                        PageTitle('\\d2c9', 'Process monitoring'),
                        Spacer(),
                    ).height(),
                    HDivider().height('1px').backgroundColor('rgb(120,120,120,20%)'),
                    ScrollView({ axes: cVertical })(
                        VStack({ alignment: cTopLeading, spacing: 10 })(
                            HStack(
                                SectionHeadline('Overview'),
                                Spacer(),
                                /*  PortalFilterBarWidget({ value: 23 }) */

                            )
                                // We prevent this stack to large more than its content
                                .height(),
                            SectionSubHeadline('Global metrics for monitoring.'),

                            HStack({ alignment: cLeading, spacing: 10 })(
                                ...ForEach(staticticInfos)(info =>
                                    TileBox(
                                        VStack(
                                            RegularText(info.value).fontSize('27px').fontWeight('500').foregroundColor('#14a9d5'),
                                            RegularText(info.title).textTransform('uppercase').fontSize('16px').foregroundColor('#999').fontWeight('600')
                                        ).padding(20)
                                    ).maxHeight('120px')
                                )
                            ).height(),
                            // Metrics
                            VStack({ spacing: 10 })(
                                ...ForEach([0, 1])(indexJ =>
                                    HStack({ spacing: 10 })(
                                        ...ForEach([0, 1, 2])(indexI =>
                                            TileBox(
                                                VStack(
                                                    TileBoxHeaderText(metrics[(indexJ * 3) + indexI].name).paddingTop('30px'),
                                                    HStack({ spacing: 10 })(
                                                        MetricBoxValueText(metrics[(indexJ * 3) + indexI].value),
                                                        RegularText(metrics[(indexJ * 3) + indexI].subValue).fontSize('20px').fontWeight('600').foregroundColor('#888')
                                                            .position(PositionTypes.Absolute).right('30px')
                                                    ).marginTop('20px').height(),
                                                    Sparkline()
                                                        .model(metrics[(indexJ * 3) + indexI].chart)
                                                        .padding(10)
                                                )
                                            ).height(290)
                                        )
                                    )
                                )
                            ).height()
                        )
                    )


                ).padding('10px')
            )
                .background(TApplication.IsPortal ? '#f1f1f1' : '')
                .alignment(Alignment.topLeading)
        )
    }
}

function MetricSelectionButtons(overviewTypes: any, selectedIndex: any, arg2: (index: any) => any) {
    throw new Error('Function not implemented.');
}
