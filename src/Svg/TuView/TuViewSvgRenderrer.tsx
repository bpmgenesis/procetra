import { TuView } from './TuView';
import { Teact } from '@tuval/forms';
import { CGRectangle, CGSize, CGColor } from '@tuval/cg';
import { BorderStyle } from '../Forms/BorderStyle';
import { SystemPens_WindowFrame } from '../Globals';
import { Pens, SolidBrush } from '@tuval/graphics';
import { TuViewSheetStyle } from './TuViewSheetStyle';
import { CONTINUE, foreach } from '@tuval/core';
import { TuLayer } from '../TuLayer/TuLayer';
export class TuViewSvgRenderrer {

    private static renderBorder(result: any[], view: TuView, rect: CGRectangle, clipRect: CGRectangle) {
        switch (view.BorderStyle) {
            case BorderStyle.None: {
                return;
            }
            case BorderStyle.FixedSingle: {
                if (clipRect.X > (rect.X + view.BorderSize.Width) && clipRect.Y > (rect.Y + view.BorderSize.Height) && (clipRect.X + clipRect.Width) < ((rect.X + rect.Width) - view.BorderSize.Width) && (clipRect.Y + clipRect.Height) < ((rect.Y + rect.Height) - view.BorderSize.Height)) {
                    return;
                }
                const color = SystemPens_WindowFrame.Color.toString('#rrggbb');
                const penWidth = SystemPens_WindowFrame.Width;
                rect = rect.inflate(new CGSize(-penWidth, -penWidth));

                result.push(<rect
                    x={rect.X}
                    y={rect.Y}
                    width={rect.Width}
                    height={rect.Height}
                    fill='transparent'
                    stroke={color}
                    stroke-width={penWidth}>
                </rect>);

            }
            case BorderStyle.Fixed3D: {
                if (clipRect.X > (rect.X + view.BorderSize.Width) && clipRect.Y > (rect.Y + view.BorderSize.Height) && (clipRect.X + clipRect.Width) < ((rect.X + rect.Width) - view.BorderSize.Width) &&
                    (clipRect.Y + clipRect.Height) < ((rect.Y + rect.Height) - view.BorderSize.Height)) {
                    return;
                }
                //ControlPaint.DrawBorder3D(g, rect, this.Border3DStyle);
                const color = Pens.Black.Color.toString('#rrggbb');
                const penWidth = Pens.Black.Width;
                rect = rect.inflate(new CGSize(-penWidth, -penWidth));
                result.push(<rect
                    x={rect.X}
                    y={rect.Y}
                    width={rect.Width}
                    height={rect.Height}
                    fill='transparent'
                    stroke={color}
                    stroke-width={penWidth}>
                </rect>)
            }
            default:
                {
                    if (clipRect.X > (rect.X + view.BorderSize.Width) && clipRect.Y > (rect.Y + view.BorderSize.Height) &&
                        (clipRect.X + clipRect.Width) < ((rect.X + rect.Width) - view.BorderSize.Width) &&
                        (clipRect.Y + clipRect.Height) < ((rect.Y + rect.Height) - view.BorderSize.Height)) {
                        return;
                    }
                    //ControlPaint.DrawBorder3D(g, rect, this.Border3DStyle);
                    return;
                }
        }
    }
    private static renderCanvas(view: TuView) {
        view.BeginUpdate();
        const clipRectangle: CGRectangle = view.ClientRectangle;
        if (clipRectangle.Width <= 0 || clipRectangle.Height <= 0) {
            return;
        }
        // TODO : ClientRectangle
        const clientRectangle: CGRectangle = view.ClientRectangle;
        if (clientRectangle.Width <= 0 || clientRectangle.Height <= 0) {
            return;
        }

        const rectangle: CGRectangle = CGRectangle.Intersect(clipRectangle, view.DisplayRectangle);
        const doc: CGRectangle = view.convertViewToDoc(rectangle);

        const result = [];

        TuViewSvgRenderrer.renderBorder(result, view, clientRectangle, clipRectangle);

        /*  this.beginUpdate();
         this.updateDelayedSelectionHandles();
         this.endUpdate(); */



        TuViewSvgRenderrer.renderView(result, view, doc);
        view.EndUpdate();
        return result;
    }

    private static renderView(result: any[], view: TuView, clipRect: CGRectangle) {
        TuViewSvgRenderrer.renderPaperColor(result, view, clipRect);
        TuViewSvgRenderrer.renderBackgroundDecoration(result, view, clipRect);
        TuViewSvgRenderrer.renderObjects(result, view, true, true, clipRect);
    }

    private static renderPaperColor(result: any[], view: TuView, clipRect: CGRectangle) {
        let backColor: CGColor = (view.SheetStyle === TuViewSheetStyle.None ? view.Document.PaperColor : CGColor.Empty);
        if (backColor.Equals(CGColor.Empty)) {
            backColor = view.BackColor;
        }
        if (view.BackgroundBrush == null || view.BackgroundBrush.Color.notEquals(backColor)) {
            if (view.BackgroundBrush != null) {
                view.BackgroundBrush.Dispose();
            }

            view.BackgroundBrush = new SolidBrush(backColor);

        }
        clipRect = clipRect.inflate(-2, -2);

        result.push(<rect
            x={clipRect.X}
            y={clipRect.Y}
            width={clipRect.Width}
            height={clipRect.Height}
            fill={view.BackgroundBrush.Color.toString('#rrggbb')}
            stroke-width={1}>
        </rect>);


    }

    private static renderBackgroundDecoration(result: any[], view: TuView, clipRect: CGRectangle) {

    }
    private static renderObjects(result: any[], view: TuView, doc: boolean, isView: boolean, clipRect: CGRectangle): void {
        foreach(view.Layers, (layer: TuLayer) => {
            if ((!doc || !layer.IsInDocument) && (!isView || !layer.IsInView)) {
                return CONTINUE;
            }
            result.push((layer as any).CreateMainElement({
                view: view,
                clipRect: clipRect
            }));
        });
    }

    public static Apply(view: TuView) {

        return (<svg ref={(e) => view.Ref = e} width={view.Width} height={view.Height} viewBox={`0 0 ${view.Width} ${view.Height}`} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="drop-shadow" height="200%" width="200%" x="-50%" y="-50%" filterUnits="objectBoundingBox">
                    <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                    <feGaussianBlur stdDeviation="1.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                    <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.075 0" in="shadowBlurOuter1" type="matrix" result="shadowMatrixOuter1"></feColorMatrix>
                    <feMerge><feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                        <feMergeNode in="SourceGraphic"></feMergeNode></feMerge>
                </filter>
            </defs>
            {TuViewSvgRenderrer.renderCanvas(view)}
        </svg>
        );

    }
}