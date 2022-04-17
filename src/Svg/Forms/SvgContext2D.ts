import { CGAffineTransform, CGBlendMode, CGColor, CGFont, CGInterpolationQuality, CGLineCap, CGLineJoin, CGPath, CGPathDrawingMode, CGPattern, CGPoint, CGRectangle, CGSize, CGTextDrawingMode, CGTextEncoding, IContext2D } from '@tuval/cg';
export class SvgContext2D implements IContext2D {
    InterpolationQuality: CGInterpolationQuality;
    scaleCTM(sx: number, sy: number): void {
        throw new Error('Method not implemented.');
    }
    translateCTM(tx: number, ty: number): void {
        throw new Error('Method not implemented.');
    }
    rotateCTM(angle: number): void {
        throw new Error('Method not implemented.');
    }
    concatCTM(transform: CGAffineTransform): void {
        throw new Error('Method not implemented.');
    }
    saveState(): void {
        throw new Error('Method not implemented.');
    }
    restoreState(): void {
        throw new Error('Method not implemented.');
    }
    setLineWidth(w: number): void {
        throw new Error('Method not implemented.');
    }
    setLineCap(cap: CGLineCap) {
        throw new Error('Method not implemented.');
    }
    setLineJoin(join: CGLineJoin): void {
        throw new Error('Method not implemented.');
    }
    setMiterLimit(limit: number): void {
        throw new Error('Method not implemented.');
    }
    setLineDash(phase: number, lengths: number[]): void;
    setLineDash(phase: number, lengths: number[], n: number): void;
    setLineDash(phase: any, lengths: any, n?: any): void {
        throw new Error('Method not implemented.');
    }
    setFlatness(flatness: number): void {
        throw new Error('Method not implemented.');
    }
    setAlpha(alpha: number): void {
        throw new Error('Method not implemented.');
    }
    setBlendMode(mode: CGBlendMode): void {
        throw new Error('Method not implemented.');
    }
    setTextAlign(textAlign: string): void {
        throw new Error('Method not implemented.');
    }
    setTextBaseline(textAlign: string): void {
        throw new Error('Method not implemented.');
    }
    getCTM(): CGAffineTransform {
        throw new Error('Method not implemented.');
    }
    beginPath(): void {
        throw new Error('Method not implemented.');
    }
    moveTo(x: number, y: number): void {
        throw new Error('Method not implemented.');
    }
    addLineToPoint(x: number, y: number): void {
        throw new Error('Method not implemented.');
    }
    addCurveToPoint(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void {
        throw new Error('Method not implemented.');
    }
    addQuadCurveToPoint(cpx: number, cpy: number, x: number, y: number): void {
        throw new Error('Method not implemented.');
    }
    closePath(): void {
        throw new Error('Method not implemented.');
    }
    addRect(rect: CGRectangle): void {
        throw new Error('Method not implemented.');
    }
    addRects(rects: CGRectangle[]): void {
        throw new Error('Method not implemented.');
    }
    addLines(points: CGPoint[]): void {
        throw new Error('Method not implemented.');
    }
    addEllipseInRect(rect: CGRectangle): void {
        throw new Error('Method not implemented.');
    }
    addArc(x: number, y: number, radius: number, startAngle: number, endAngle: number, clockwise: boolean): void {
        throw new Error('Method not implemented.');
    }
    addArcToPoint(x1: number, y1: number, x2: number, y2: number, radius: number): void {
        throw new Error('Method not implemented.');
    }
    addPath(path: CGPath): void {
        throw new Error('Method not implemented.');
    }
    replacePathWithStrokedPath(): void {
        throw new Error('Method not implemented.');
    }
    getPathCurrentPoint(): CGPoint {
        throw new Error('Method not implemented.');
    }
    getPathBoundingBox(): CGRectangle {
        throw new Error('Method not implemented.');
    }
    pathContainsPoint(point: CGPoint, mode: CGPathDrawingMode): boolean {
        throw new Error('Method not implemented.');
    }
    drawPath(mode: CGPathDrawingMode) {
        throw new Error('Method not implemented.');
    }
    fillPath(): void {
        throw new Error('Method not implemented.');
    }
    eOFillPath(): void {
        throw new Error('Method not implemented.');
    }
    strokePath(): void {
        throw new Error('Method not implemented.');
    }
    fillRect(rect: CGRectangle): void {
        throw new Error('Method not implemented.');
    }
    contextFillRects(rects: CGRectangle[]): void {
        throw new Error('Method not implemented.');
    }
    strokeRect(rect: CGRectangle): void {
        throw new Error('Method not implemented.');
    }
    strokeRectWithWidth(rect: CGRectangle, width: number): void {
        throw new Error('Method not implemented.');
    }
    clearRect(rect: CGRectangle): void {
        throw new Error('Method not implemented.');
    }
    fillEllipseInRect(rect: CGRectangle): void {
        throw new Error('Method not implemented.');
    }
    strokeEllipseInRect(rect: CGRectangle): void {
        throw new Error('Method not implemented.');
    }
    strokeLineSegments(points: CGPoint[]): void {
        throw new Error('Method not implemented.');
    }
    eOClip(): void {
        throw new Error('Method not implemented.');
    }
    clipToMask(rect: CGRectangle, mask: any): void {
        throw new Error('Method not implemented.');
    }
    getClipBoundingBox(): CGRectangle {
        throw new Error('Method not implemented.');
    }
    clip(): void {
        throw new Error('Method not implemented.');
    }
    clipToRect(rect: CGRectangle): void {
        throw new Error('Method not implemented.');
    }
    clipToRects(rects: CGRectangle[]): void {
        throw new Error('Method not implemented.');
    }
    setFillColor(cyan: number, magenta: number, yellow: number, black: number, alpha: number): void;
    setFillColor(gray: number, alpha: number): void;
    setFillColor(components: number[]): void;
    setFillColor(color: CGColor): void;
    setFillColor(red: number, green: number, blue: number, alpha: number): void;
    setFillColor(cyan: any, magenta?: any, yellow?: any, black?: any, alpha?: any): void {
        throw new Error('Method not implemented.');
    }
    setFillColorWithColor(color: CGColor): void {
        throw new Error('Method not implemented.');
    }
    setStrokeColor(cyan: number, magenta: number, yellow: number, black: number, alpha: number): void;
    setStrokeColor(red: number, green: number, blue: number, alpha: number): void;
    setStrokeColor(gray: number, alpha: number): void;
    setStrokeColor(components: number[]): void;
    setStrokeColor(color: CGColor): void;
    setStrokeColor(cyan: any, magenta?: any, yellow?: any, black?: any, alpha?: any): void {
        throw new Error('Method not implemented.');
    }
    setStrokeColorWithColor(color: CGColor): void {
        throw new Error('Method not implemented.');
    }
    setFillColorSpace(space: any): void {
        throw new Error('Method not implemented.');
    }
    setStrokeColorSpace(space: any): void {
        throw new Error('Method not implemented.');
    }
    setFillPattern(pattern: CGPattern, components: number[]): void {
        throw new Error('Method not implemented.');
    }
    setStrokePattern(pattern: any, components: number[]): void {
        throw new Error('Method not implemented.');
    }
    setPatternPhase(phase: CGSize): void {
        throw new Error('Method not implemented.');
    }
    setGrayFillColor(gray: number, alpha: number): void {
        throw new Error('Method not implemented.');
    }
    setGrayStrokeColor(gray: number, alpha: number): void {
        throw new Error('Method not implemented.');
    }
    setRGBFillColor(red: number, green: number, blue: number, alpha: number): void {
        throw new Error('Method not implemented.');
    }
    setRGBStrokeColor(red: number, green: number, blue: number, alpha: number): void {
        throw new Error('Method not implemented.');
    }
    setCMYKFillColor(cyan: number, magenta: number, yellow: number, black: number, alpha: number): void {
        throw new Error('Method not implemented.');
    }
    setCMYKStrokeColor(cyan: number, magenta: number, yellow: number, black: number, alpha: number): void {
        throw new Error('Method not implemented.');
    }
    setRenderingIntent(intent: any): void {
        throw new Error('Method not implemented.');
    }
    drawImage(image: any, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void {
        throw new Error('Method not implemented.');
    }
    drawTiledImage(rect: CGRectangle, image: any): void {
        throw new Error('Method not implemented.');
    }
    setShadowWithColor(offset: CGSize, blur: number, color: CGColor): void {
        throw new Error('Method not implemented.');
    }
    setShadow(offset: CGSize, blur: number): void {
        throw new Error('Method not implemented.');
    }
    drawLinearGradient(gradient: any, startPoint: CGPoint, endPoint: CGPoint, options: any): void {
        throw new Error('Method not implemented.');
    }
    drawRadialGradient(gradient: any, startCenter: CGPoint, startRadius: number, endCenter: CGPoint, endRadius: number, options: any): void {
        throw new Error('Method not implemented.');
    }
    setCharacterSpacing(spacing: number): void {
        throw new Error('Method not implemented.');
    }
    setTextDrawingMode(mode: CGTextDrawingMode): void {
        throw new Error('Method not implemented.');
    }
    setFont(font: CGFont): void {
        throw new Error('Method not implemented.');
    }
    measureText(text: string, font: CGFont): CGSize {
        throw new Error('Method not implemented.');
    }
    selectFont(name: string, size: number, textEncoding: CGTextEncoding): void {
        throw new Error('Method not implemented.');
    }
    showGlyphsAtPositions(glyphs: number[], positions: CGPoint[], size_t_count: number): void {
        throw new Error('Method not implemented.');
    }
    showText(str: string, x: number, y: number): void {
        throw new Error('Method not implemented.');
    }
    showTextAtPoint(x: number, y: number, bytes: Uint8Array): void;
    showTextAtPoint(x: number, y: number, bytes: Uint8Array, length: number): void;
    showTextAtPoint(x: number, y: number, str: string): void;
    showTextAtPoint(x: number, y: number, str: string, length: number): void;
    showTextAtPoint(x: any, y: any, str: any, length?: any): void {
        throw new Error('Method not implemented.');
    }
    showGlyphs(glyphs: Uint8Array, count: number): void;
    showGlyphs(glyphs: Uint8Array): void;
    showGlyphs(glyphs: any, count?: any): void {
        throw new Error('Method not implemented.');
    }
    showGlyphsWithAdvances(glyphs: Uint8Array, advances: CGSize[], count: number): void {
        throw new Error('Method not implemented.');
    }
    drawPDFPage(page: any): void {
        throw new Error('Method not implemented.');
    }
    beginPage(rect: CGRectangle): void {
        throw new Error('Method not implemented.');
    }
    endPage(): void {
        throw new Error('Method not implemented.');
    }
    setShouldAntialias(shouldAntialias: boolean): void {
        throw new Error('Method not implemented.');
    }
    synchronize(): void {
        throw new Error('Method not implemented.');
    }
    transferToImageBitmap(): ImageBitmap {
        throw new Error('Method not implemented.');
    }
    drawImageBitmap(image: ImageBitmap, x: number, y: number): void {
        throw new Error('Method not implemented.');
    }

}