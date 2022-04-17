import { CGPoint, CGRectangle } from '@tuval/cg';
export class Cursor {
    private myName: string = '';
    public static Position: CGPoint;
    public static Current: Cursor;
    public static Clip: CGRectangle;
    public get Name(): string {
        return this.myName;
    }
    public constructor(name: string) {
        this.myName = name;
    }
}