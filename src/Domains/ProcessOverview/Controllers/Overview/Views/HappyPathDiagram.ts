import { UIView, VStack, Text, Alignment, HStack, ForEach, Icon, RoundedRectangle, If, UIImage, Spacer } from '@tuval/forms';
import { int } from '@tuval/core';
import { Image } from '@tuval/graphics';
import { TileBoxHeaderText } from '../../../../../UI/Views/Title';
export interface MVIHappyPathDiagramItem {
    name: string
}
export function HappyPathDiagram(items: MVIHappyPathDiagramItem[]): UIView {
    return (
        VStack(
            TileBoxHeaderText('Algorithmic happy path'),
            HStack(
                ...ForEach(items)((item: MVIHappyPathDiagramItem, index: int) =>
                    VStack(
                        Text(item.name).marginBottom('10px').fontSize('14px').fontWeight('500'),
                        HStack(
                            If(index === 0)(Spacer().width('100%'))
                                .else(
                                    RoundedRectangle().height(3).background('#e4e4e4').marginTop('-1px')
                                ),
                            If(index === 0)(null)
                                .else(
                                    UIImage('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTNweCIgaGVpZ2h0PSIxM3B4IiB2aWV3Qm94PSIwIDAgMTMgMTMiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogc2tldGNodG9vbCA0MC4xICgzMzgwNCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+OTBDRDYzRDItOENGNy00OERFLTgzQTAtQUUzMTdERTg0MjVDPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBza2V0Y2h0b29sLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQcm9jZXNzLW1ldHJpY3MiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJQcm9jZXNzLS0tb3ZlcnZpZXciIHRyYW5zZm9ybT0idHJhbnNsYXRlKC04NTYuMDAwMDAwLCAtMTE0OC4wMDAwMDApIiBmaWxsPSIjQ0NDQ0NDIj4KICAgICAgICAgICAgPGcgaWQ9Ik1BSU4iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE5MC4wMDAwMDAsIDU2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9IkhhcHB5LXBhdGgiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLCA2NjEuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9IkhhcHB5LXBhdGgtdml6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjAwMDAwMCwgMjk1LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iTmV3LWhhcHB5LXBhdGgtdml6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMC4wMDAwMDAsIDc2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlJlY3RhbmdsZS00IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2NDIuNTAwMDAwLCA2Ni41MDAwMDApIHJvdGF0ZSgtMjcwLjAwMDAwMCkgdHJhbnNsYXRlKC02NDIuNTAwMDAwLCAtNjYuNTAwMDAwKSAiIHBvaW50cz0iNjQyLjUgNjAgNjQ5IDczIDY0Mi41IDY5Ljc1IDYzNiA3MyI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=').marginLeft('-3px')
                                ),
                            Icon('\\f0e1').size(30).foregroundColor('#14A9D5'),
                            If(index === items.length - 1)(Spacer().width('100%'))
                                .else(
                                    RoundedRectangle().height(3).background('#e4e4e4').marginTop('-1px'),
                                )
                        )
                    )
                        .height() // auto
                        .marginTop('20px')
                )
            )

        )
            .backgroundColor('rgb(255,255,255,60%)').cornerRadius('12px').height(154).alignment(Alignment.topLeading)
            .shadow({ default: '0 1px 3px 0 rgb(0 0 0 / 10%), 0 2px 5px 0 rgb(0 0 0 / 5%)', focus: '0 0 3px 1px #00c3ff' })
            .marginHorizontal('2px')
            .tabIndex(0)
    )
}