import { UIView, VStack, HStack, Spacer, UIButton, Icon, Alignment, RoundedRectangle, UIImage, ForEach, cTopLeading, cTop, Color, Text, cLeading } from '@tuval/forms';
import { SectionHeadline, SectionSubHeadline, RegularText, SectionTitle, SectionContent } from '../../../../../UI/Views/Texts';
import { TileBox } from '../../../../../UI/Views/TileBox';


export function BottleneckSection(): UIView {
    return (
        VStack(
            HStack(
                SectionHeadline('Bottlenecks'),
                Spacer(),
                UIButton(
                    Icon('\\f04a').size(20).foregroundColor({ default: 'rgb(120,120,120, 50%)', hover: 'rgb(120,120,120, 80%)' }),
                )
            )
                // We prevent this stack to large more than its content
                .height(),
            SectionSubHeadline('These connections increase process throughput time considerably'),

            VStack({ spacing: 15 })(
                ...ForEach([1, 2, 3, 4, 5], (index) =>
                    HStack({ alignment: cTop })(
                        RoundedRectangle().width(3).backgroundColor('rgb(255, 136, 132)'),
                        VStack({ alignment: cTopLeading })(
                            HStack({ spacing: 5 })(
                                RegularText('Change Price').fontSize('16px').fontWeight('500').foregroundColor('#1d6c83'),
                                UIImage('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMThweCIgaGVpZ2h0PSIxMHB4IiB2aWV3Qm94PSIwIDAgMTggMTAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogc2tldGNodG9vbCA0MC4zICgzMzgzOSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+NDY5OEVGQ0UtNDQ0NC00MjU5LUE3NjItMzFGMDBGQjRFRDlFPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBza2V0Y2h0b29sLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQcm9jZXNzLW1ldHJpY3MiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJQcm9jZXNzLS0tdGhyb3VnaHB1dC10aW1lIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNDIyLjAwMDAwMCwgLTExODMuMDAwMDAwKSIgZmlsbD0iIzBCNUY3OCI+CiAgICAgICAgICAgIDxnIGlkPSJNQUlOIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxODcuMDAwMDAwLCA1NC4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJCb3R0bGVuZWNrcyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMS4wMDAwMDAsIDEwNDMuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9IkJvdHRsZW5lY2staXRlbSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMi4wMDAwMDAsIDY5LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iSGVhZGVyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNC4wMDAwMDAsIDExLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9IkNvbm5lY3Rpb24iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIxNy4wMDAwMDAsIDExLjAwMDAwMCkgcm90YXRlKC05MC4wMDAwMDApIHRyYW5zbGF0ZSgtMjE3LjAwMDAwMCwgLTExLjAwMDAwMCkgdHJhbnNsYXRlKDIxMi4wMDAwMDAsIDIuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTQsOS42IEwtMS43NzYzNTY4NGUtMTUsOCBMNSwxOCBMMTAsOCBMNiw5LjYgTDYsMCBMNCwwIEw0LDkuNiBaIiBpZD0iaWNvbi1hcnJvdy1yaWdodCI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4='),
                                RegularText('Change Price').fontSize('16px').fontWeight('500').foregroundColor('#1d6c83')
                            ).width().height().padding('10px 15px 10px 15px'),
                            Text('View cases in…').paddingLeft('15px'),
                            HStack({ alignment: cLeading, spacing: 20 })(
                                VStack({ alignment: cLeading })(
                                    SectionTitle('Throughput time'),
                                    SectionContent('10 work day(s)')
                                ).width(), //auto
                                VStack({ alignment: cLeading })(
                                    SectionTitle('Cases affected'),
                                    SectionContent('14%')
                                ).width()//auto
                            ).paddingLeft('15px')
                        ).padding()
                    )
                        .background(Color.white.opacity(0.5))
                        .shadow({ default: '0 2px 5px 0 rgb(0 0 0 / 5%), 0 1px 3px 0 rgb(0 0 0 / 10%)', hover: '0 2px 10px rgb(0 0 0 / 16%), 0 2px 5px rgb(0 0 0 / 26%)' })
                        .height(122)
                )
            ).height().padding()
        )

            .alignment(Alignment.topLeading)
        // We want to space 10px between every vertical block
    )
}