import { CGRectangle, CGSize } from '@tuval/cg';
import { Font, StringFormat, StringAlignment } from '@tuval/graphics';
import { int } from '@tuval/core';
var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", "0");
svg.setAttribute("height", "0");
svg.setAttribute("visibility", "hidden");

document.body.appendChild(svg);
const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
svg.appendChild(path);

const text: SVGTextElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
svg.appendChild(text);

export function GetPathBoundingBox(data: string): CGRectangle {
    path.setAttribute("d", data);
    const svgRect: SVGRect = path.getBBox();
    return new CGRectangle(svgRect.x, svgRect.y, svgRect.width, svgRect.height);
}

export function GetTextWidth(content: string, font: Font): int {
    text.setAttribute("font-family", font.Name);
    text.setAttribute("font-size", font.Size + 'pt');
    text.textContent = content;
    const svgRect: SVGRect = text.getBBox();
    return Math.round(svgRect.width);
}

export function GetFontHeight(font: Font): int {
    text.setAttribute("font-family", font.Name);
    text.setAttribute("font-size", font.Size + 'pt');
    text.textContent = 'H';
    const svgRect: SVGRect = text.getBBox();
    return Math.round(svgRect.height);
}

export function MeasureString(str: string, font: Font, strFormat: StringFormat, size: CGSize): CGSize {
    text.setAttribute("font-family", font.Name);
    text.setAttribute("font-size", font.Size + 'pt');
    text.setAttribute("width", size.Width + 'px');
    text.setAttribute("height", size.Height + 'px');
    if (strFormat.Alignment === StringAlignment.Near) {
        text.setAttribute("text-anchor", 'start');
    }
    if (strFormat.Alignment === StringAlignment.Center) {
        text.setAttribute("text-anchor", 'middle');
    }
    if (strFormat.Alignment === StringAlignment.Far) {
        text.setAttribute("text-anchor", 'end');
    }
    text.textContent = str;
    const svgRect: SVGRect = text.getBBox();
    return new CGSize(Math.round(svgRect.width), Math.round(svgRect.height));
}