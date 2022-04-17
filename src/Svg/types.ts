import { is } from '@tuval/core';
interface TValue<T> {
    (): T;
}
export type TProperty<T> = T | TValue<T>;

export function ValueOf<T>(value: TProperty<T>): T {
    if (is.function(value)) {
        return value();
    } else {
        return value;
    }
}


export const Types = {
    TextBoxControl: Symbol('TextBoxControl'),
    ComboBoxControl:Symbol('ComboBoxControl'),
    TuOverviewRectangle: Symbol('TuOverviewRectangle'),
    TuMultiTextNodeListGroup: Symbol('TuMultiTextNodeListGroup'),
    TuLayerCache: Symbol('TuLayerCache'),
    TuDrawingData: Symbol('TuDrawingData'),
    TuHandleRotated: Symbol('TuHandleRotated'),
    TuRoundedRectangle: Symbol('TuRoundedRectangle'),
    TuCollapsibleHandle: Symbol('TuCollapsibleHandle'),
    TuCopyDelayedsCollection: Symbol('TuCopyDelayedsCollection'),
    TuToolZooming: Symbol('TuToolZooming'),
    TuToolRubberBanding: Symbol('TuToolRubberBanding'),
    TuToolRelinking: Symbol('TuToolRelinking'),
    TuToolPanning: Symbol('TuToolPanning'),
    TuToolLinkingNew: Symbol('TuToolLinkingNew'),
    TuView: Symbol('TuView'),
    TuPort: Symbol('TuPort'),
    TuLink: Symbol('TuLink'),
    ITuLink: Symbol('ITuLink'),
    TuBalloon: Symbol('TuBalloon'),
    TuDocument: Symbol('TuDocument'),
    TuObject: Symbol('TuObject'),
    TuShape: Symbol('TuShape'),
    TuGroup: Symbol('TuGroup'),
    TuControl: Symbol('TuControl'),
    ITuNode: Symbol('ITuNode'),
    ITuDragSnapper: Symbol('ITuDragSnapper'),
    ITuIdentifiablePart: Symbol('ITuIdentifiablePart'),
    ITuRoutable: Symbol('ITuRoutable'),
    ITuLabeledPart: Symbol('ITuLabeledPart'),
    TuSubGraphBase: Symbol('TuSubGraphBase'),
    TuLayer: Symbol('TuLayer'),
    DisposableBase: Symbol('DisposableBase'),
    ITuCollection: Symbol('ITuCollection'),
    ITuLayerCollectionContainer: Symbol('ITuLayerCollectionContainer'),
    ITuLayerAbilities: Symbol('ITuLayerAbilities'),
    TuLabeledLink: Symbol('TuLabeledLink'),
    ICollection: Symbol('ICollection'),
    TuLayerCollection: Symbol('TuLayerCollection'),
    TuHScrollBarElement: Symbol('TuHScrollBarElement'),
    Slider: Symbol('Slider'),
    Control: Symbol('Control'),
    TuElement: Symbol('TuElement'),
    TuHandle: Symbol('TuHandle'),
    ITuTool: Symbol('ITuTool'),
    TuTriangle: Symbol('TuTriangle'),
    TuToolDragging: Symbol('TuToolDragging'),
    TuDrawing: Symbol('TuDrawing'),
    TuFigureDrawing: Symbol('TuFigureDrawing'),
    IActionObject: Symbol('IActionObject'),
    TuTool: Symbol('TuTool'),
    TuToolAction: Symbol('TuToolAction'),
    TuToolContext: Symbol('TuToolContext'),
    TuToolCreating: Symbol('TuToolCreating'),
    TuToolSelecting: Symbol('TuToolSelecting'),
    ITuHandle: Symbol('ITuHandle'),
    TuToolResizing: Symbol('TuToolResizing'),
    TuGrid: Symbol('TuGrid'),
    ITuControlObject: Symbol('ITuControlObject'),
    TuOverview: Symbol('TuOverview'),
    TuSheet: Symbol('TuSheet'),
    TuSelection: Symbol('TuSelection'),
    TuNode: Symbol('TuNode'),
    ITuGraphPart : Symbol('ITuGraphPart'),
    ITuLabeledNode: Symbol('ITuLabeledNode'),
    TuNodeLinkEnumerator: Symbol('TuNodeLinkEnumerator'),
    TuNodeNodeEnumerator: Symbol('TuNodeNodeEnumerator'),
    TuNodePortEnumerator: Symbol('TuNodePortEnumerator'),
    ITuPort: Symbol('ITuPort'),
    TuText : Symbol('TuText'),
    TuBasicNode: Symbol('TuBasicNode'),
    TuEllipse:Symbol('TuEllipse'),
    TuPortFilteredLinkEnumerator:Symbol('TuPortFilteredLinkEnumerator'),
    TuPortLinkEnumerator: Symbol('TuPortLinkEnumerator'),
    TuSubGraph:Symbol('TuSubGraph'),
    TuGeneralNode: Symbol('TuGeneralNode'),
    TuMultiTextNode: Symbol('TuMultiTextNode'),
    TuGeneralNodePort: Symbol('TuGeneralNodePort'),
    TuBoxPort: Symbol('TuBoxPort'),
    TuCollection: Symbol('TuCollection'),
    TuCollectionEnumerator: Symbol('TuCollectionEnumerator'),
    TuCube: Symbol('TuCube'),
    TuCylinder: Symbol('TuCylinder'),
    TuUndoManager: Symbol('TuUndoManager'),
    TuUndoManagerCompoundEdit: Symbol('TuUndoManagerCompoundEdit'),
    TuGroupEnumerator: Symbol('TuGroupEnumerator'),
    TuLayerCollectionEnumerator: Symbol('TuLayerCollectionEnumerator'),
    TuLayerCollectionObjectEnumerator: Symbol('TuLayerCollectionObjectEnumerator'),
    TuLayerEnumerator: Symbol('TuLayerEnumerator'),
    Animation: Symbol('Animation'),
    TuPenInfo: Symbol('TuPenInfo'),
    TuStroke: Symbol('TuStroke'),
    TemporaryPort: Symbol('TemporaryPort'),
    TuToolManager: Symbol('TuToolManager'),
    ITuCollapsible: Symbol('ITuCollapsible'),
    TuSubGraphHandle: Symbol('TuSubGraphHandle'),
    TuArc: Symbol('TuArc'),
    TuComment: Symbol('TuComment'),
    TuPolygon: Symbol('TuPolygon'),
    TuBoxNode: Symbol('TuBoxNode'),
    TuGeneralNodePortLabel: Symbol('TuGeneralNodePortLabel'),
    ITuNodeIconConstraint : Symbol('ITuNodeIconConstraint'),
    TuImage: Symbol('TuImage'),
    TuNodeIcon: Symbol('TuNodeIcon'),
    TuBrushInfo: Symbol('TuBrushInfo'),
    TuListGroup: Symbol('TuListGroup'),
    BrushInfoEx: Symbol('BrushInfoEx'),
    TuPenInfoEx: Symbol('TuPenInfoEx'),
    TuRectangle: Symbol('TuRectangle'),
    TuPartInfo: Symbol('TuPartInfo'),
    TuDragImage: Symbol('TuDragImage'),
    TuImageInfo : Symbol('TuImageInfo'),
    TuToolLinking: Symbol('TuToolLinking')
}