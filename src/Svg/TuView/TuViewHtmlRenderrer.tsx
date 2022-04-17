import { TuView } from "./TuView";
import { Teact } from '@tuval/forms';
import { CGRectangle, CGSize, CGColor } from '@tuval/cg';
import { SystemPens_WindowFrame } from "../Globals";
import { BorderStyle } from "../Forms/BorderStyle";
import { Pens, SolidBrush } from '@tuval/graphics';
import { TuViewSheetStyle } from "./TuViewSheetStyle";
import { TuLayer } from "../TuLayer/TuLayer";
import { CONTINUE, foreach } from '@tuval/core';

export class TuViewHtmlRenderrer {

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

                const style = {};
                style['position'] = 'absolute';
                style['left'] = rect.X + 'px';
                style['top'] = rect.Y + 'px';
                style['width'] = rect.Width + 'px';
                style['height'] = rect.Height + 'px';
                style['backgroundColor'] = 'transparent';
                style['borderColor'] = color;
                style['borderWidth'] = penWidth;
                style['borderStyle'] = 'solid';

                result.push(<div class="TuViewBorder" style={style}></div>);
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

        TuViewHtmlRenderrer.renderBorder(result, view, clientRectangle, clipRectangle);

        view.beginUpdate();
        (view as any).updateDelayedSelectionHandles();
        view.endUpdate();

        TuViewHtmlRenderrer.renderView(result, view, doc);

        view.EndUpdate();
        return result;
    }

    private static renderView(result: any[], view: TuView, clipRect: CGRectangle) {
        TuViewHtmlRenderrer.renderPaperColor(result, view, clipRect);
        TuViewHtmlRenderrer.renderBackgroundDecoration(result, view, clipRect);
        TuViewHtmlRenderrer.renderObjects(result, view, true, true, clipRect);
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

        const style = {};
        style['position'] = 'absolute';
        style['left'] = clipRect.X + 'px';
        style['top'] = clipRect.Y + 'px';
        style['width'] = clipRect.Width + 'px';
        style['height'] = clipRect.Height + 'px';
        style['backgroundColor'] = view.BackgroundBrush.Color.toString('#rrggbb');
        style['borderColor'] = 'transparent';
        style['borderWidth'] = '0px';
        style['borderStyle'] = 'solid';

        result.push(<div class="TuViewPaperColor" style={style}></div>)
    }

    private static renderBackgroundDecoration(result: any[], view: TuView, clipRect: CGRectangle) {

    }
    private static renderObjects(result: any[], view: TuView, doc: boolean, isView: boolean, clipRect: CGRectangle): void {
        foreach(view.Layers, (layer: TuLayer) => {
            if ((!doc || !layer.IsInDocument) && (!isView || !layer.IsInView)) {
                return CONTINUE;
            }
            /* layer.renderPaint(result, view, clipRect); */
            result.push((layer as any).CreateMainElement({
                view: view,
                clipRect: clipRect
            }));
        });
    }

    public static Apply(view: TuView) {
        const style = {};
        style['width'] = view.Width + 'px';
        style['height'] = view.Height + 'px';
        style['position'] = 'relative';
        style['left'] = '0px';
        style['top'] = '0px';
        style['overflow'] = 'hidden';

        return (<div class="TuView" ref={(e) => view.Ref = e} style={style}>
            {TuViewHtmlRenderrer.renderCanvas(view)}
        </div>
        );

    }
}