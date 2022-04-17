import { Types } from './types';
import { ITuHandle } from './TuHandle/ITuHandle';
import { TuView } from './TuView/TuView';
import { CGRectangle, CGPoint } from '@tuval/cg';
import { TuObject } from "./TuObject/TuObject";
import { TuSelection } from './TuSelection/TuSelection';
import { TArray, as } from '@tuval/core';
import { TuHandle } from './TuHandle/TuHandle';

export function isEqual(a: any, b: any): boolean {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length !== bProps.length) {
        return false;
    }
    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    return true;
}

export class RotateHelper {
    public static AddRectangleHandles(myObject: TuObject, rect: CGRectangle, center: CGPoint, angle: number, sel: TuSelection, selectedObj: TuObject): void {
        const view: TuView = sel.View;
        const flag: boolean = (view == null) ? true : view.CanResizeObjects();
        const flag1: boolean = (view == null ? true : view.CanReshapeObjects());
        if (myObject.CanResize() && flag) {
            const x: number = rect.X;
            const single: number = rect.X + rect.Width / 2;
            const x1: number = rect.X + rect.Width;
            const y: number = rect.Y;
            const y1 = rect.Y + rect.Height / 2;
            const single1 = rect.Y + rect.Height;
            const num: number = angle * 3.14159265358979 / 180;
            const num1: number = Math.cos(num);
            const num2: number = Math.sin(num);
            RotateHelper.SetResizeCursor(sel.createResizeHandle(myObject, selectedObj, RotateHelper.RotatePoint1(new CGPoint({ x: x, y: y }), center, num1, num2), 2, true), angle);
            RotateHelper.SetResizeCursor(sel.createResizeHandle(myObject, selectedObj, RotateHelper.RotatePoint1(new CGPoint({ x: x1, y: y }), center, num1, num2), 4, true), angle);
            RotateHelper.SetResizeCursor(sel.createResizeHandle(myObject, selectedObj, RotateHelper.RotatePoint1(new CGPoint({ x: x1, y: single1 }), center, num1, num2), 8, true), angle);
            RotateHelper.SetResizeCursor(sel.createResizeHandle(myObject, selectedObj, RotateHelper.RotatePoint1(new CGPoint({ x: x, y: single1 }), center, num1, num2), 16, true), angle);
            if (myObject.CanReshape() && flag1) {
                RotateHelper.SetResizeCursor(sel.createResizeHandle(myObject, selectedObj, RotateHelper.RotatePoint1(new CGPoint({ x: single, y: y }), center, num1, num2), 32, true), angle);
                RotateHelper.SetResizeCursor(sel.createResizeHandle(myObject, selectedObj, RotateHelper.RotatePoint1(new CGPoint({ x: x1, y: y1 }), center, num1, num2), 64, true), angle);
                RotateHelper.SetResizeCursor(sel.createResizeHandle(myObject, selectedObj, RotateHelper.RotatePoint1(new CGPoint({ x: single, y: single1 }), center, num1, num2), 128, true), angle);
                RotateHelper.SetResizeCursor(sel.createResizeHandle(myObject, selectedObj, RotateHelper.RotatePoint1(new CGPoint({ x: x, y: y1 }), center, num1, num2), 256, true), angle);
            }
        }
    }

    public static GetRotatedBounds(r: CGRectangle, angle: number): CGRectangle {
        if (angle === 0) {
            return r;
        }
        const num: number = angle * 3.14159265358979 / 180;
        const num1: number = Math.cos(num);
        const num2: number = Math.sin(num);
        const pointF: CGPoint = new CGPoint({ x: r.X + r.Width / 2, y: r.Y + r.Height / 2 });
        const pointF1: CGPoint = RotateHelper.RotatePoint1(new CGPoint({ x: r.X, y: r.Y }), pointF, num1, num2);
        const pointF2: CGPoint = RotateHelper.RotatePoint1(new CGPoint({ x: r.X + r.Width, y: r.Y }), pointF, num1, num2);
        const pointF3: CGPoint = RotateHelper.RotatePoint1(new CGPoint({ x: r.X + r.Width, y: r.Y + r.Height }), pointF, num1, num2);
        const pointF4: CGPoint = RotateHelper.RotatePoint1(new CGPoint({ x: r.X, y: r.Y + r.Height }), pointF, num1, num2);
        const single: number = Math.min(pointF1.X, Math.min(pointF2.X, Math.min(pointF3.X, pointF4.X)));
        const single1: number = Math.max(pointF1.X, Math.max(pointF2.X, Math.max(pointF3.X, pointF4.X)));
        const single2: number = Math.min(pointF1.Y, Math.min(pointF2.Y, Math.min(pointF3.Y, pointF4.Y)));
        const single3: number = Math.max(pointF1.Y, Math.max(pointF2.Y, Math.max(pointF3.Y, pointF4.Y)));
        return new CGRectangle({ x: single, y: single2, width: single1 - single, height: single3 - single2 });
    }

    public static RescalePoint(oldr: CGRectangle, newr: CGRectangle, rp: CGPoint, angle: number): CGPoint {
        let pointF: CGPoint = rp;
        let num: number = 1;
        let num1: number = 0;
        if (angle !== 0) {
            const num2: number = angle * 3.14159265358979 / 180;
            num = Math.cos(num2);
            num1 = Math.sin(num2);
            pointF = RotateHelper.RotatePoint1(rp, new CGPoint({ x: oldr.X + oldr.Width / 2, y: oldr.Y + oldr.Height / 2 }), num, -num1);
        }
        const single: number = (oldr.Width <= 0 ? 1 : newr.Width / oldr.Width);
        const single1: number = (oldr.Height <= 0 ? 1 : newr.Height / oldr.Height);
        const x: number = newr.X + (pointF.X - oldr.X) * single;
        const y: number = newr.Y + (pointF.Y - oldr.Y) * single1;
        let pointF1: CGPoint = new CGPoint({ x: x, y: y });
        if (angle !== 0) {
            pointF1 = RotateHelper.RotatePoint1(pointF1, new CGPoint({ x: newr.X + newr.Width / 2, y: newr.Y + newr.Height / 2 }), num, num1);
        }
        return pointF1;
    }

    public static RotatePoint(p: CGPoint, c: CGPoint, angle: number): CGPoint {
        if (angle === 0 || p === c) {
            return p;
        }
        const num: number = angle * 3.14159265358979 / 180;
        const num1: number = Math.cos(num);
        const num2: number = Math.sin(num);
        const x: number = p.X - c.X;
        const y: number = p.Y - c.Y;
        return new CGPoint({ x: (c.X + num1 * x - num2 * y), y: (c.Y + num2 * x + num1 * y) });
    }

    public static RotatePoint1(p: CGPoint, c: CGPoint, cosine: number, sine: number): CGPoint {
        if (isEqual(p, c)) {
            return p;
        }
        const x: number = p.X - c.X;
        const y = p.Y - c.Y;
        return new CGPoint({ x: (c.X + cosine * x - sine * y), y: (c.Y + sine * x + cosine * y) });
    }

    public static RotatePoints(u: CGPoint[], r: CGPoint[], rotatePoint: CGPoint, angle: number): void {
        if (angle === 0) {
            const int32: number = Math.min(u.length, r.length);
            TArray.Copy(u, r, int32);
            return;
        }
        const num: number = angle * 3.14159265358979 / 180;
        const num1: number = Math.cos(num);
        const num2 = Math.sin(num);
        RotateHelper.RotatePoints1(u, r, rotatePoint, num1, num2);
    }

    public static RotatePoints1(u: CGPoint[], r: CGPoint[], rotatePoint: CGPoint, cosine: number, sine: number) {
        const int32: number = Math.min(u.length, r.length);
        if (cosine === 1 && sine === 0) {
            TArray.Copy(u, r, int32);
            return;
        }
        for (let i = 0; i < int32; i++) {
            r[i] = RotateHelper.RotatePoint1(u[i], rotatePoint, cosine, sine);
        }
    }

    private static SetResizeCursor(handle: ITuHandle, angle: number): void {
        const goHandle: TuHandle = as(handle, Types.TuHandle);
        if (goHandle != null) {
            let single: number = angle;
            const handleID: number = goHandle.HandleID;
            if (handleID <= 16) {
                if (handleID <= 4) {
                    if (handleID === 2) {
                        single = single + 225;
                    }
                    else {
                        if (handleID !== 4) {
                            return;
                        }
                        single = single + 315;
                    }
                }
                else if (handleID === 8) {
                    single = single + 45;
                }
                else {
                    if (handleID !== 16) {
                        return;
                    }
                    single = single + 135;
                }
            }
            else if (handleID <= 64) {
                if (handleID === 32) {
                    single = single + 270;
                }
                else {
                    if (handleID !== 64) {
                        return;
                    }
                    single = single + 0;
                }
            }
            else if (handleID === 128) {
                single = single + 90;
            }
            else {
                if (handleID !== 256) {
                    return;
                }
                single = single + 180;
            }
            if (single < 0) {
                single = single + 360;
            }
            else if (single >= 360) {
                single = single - 360;
            }
            if (single < 22.5) {
                goHandle.CursorName = "e-resize";
                return;
            }
            if (single < 67.5) {
                goHandle.CursorName = "se-resize";
                return;
            }
            if (single < 112.5) {
                goHandle.CursorName = "s-resize";
                return;
            }
            if (single < 157.5) {
                goHandle.CursorName = "sw-resize";
                return;
            }
            if (single < 202.5) {
                goHandle.CursorName = "w-resize";
                return;
            }
            if (single < 247.5) {
                goHandle.CursorName = "nw-resize";
                return;
            }
            if (single < 292.5) {
                goHandle.CursorName = "n-resize";
                return;
            }
            if (single < 337.5) {
                goHandle.CursorName = "ne-resize";
                return;
            }
            goHandle.CursorName = "e-resize";
        }
    }


}