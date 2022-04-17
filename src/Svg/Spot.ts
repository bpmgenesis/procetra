import { CGPoint, CGRectangle } from '@tuval/cg';

    export class Spot {
        public static readonly None = new Spot(-1, -1);

        public get ID(): number {
            return this.myID;
        }

        public set ID(value: number) {
            this.myID = value;
        }
        constructor(public xFactor: number, public yFactor: number, private myID?: number) {

        }
        public getSpotLocation(rect: CGRectangle): CGPoint {
            return new CGPoint(rect.X + (this.xFactor * rect.Width), rect.Y + (this.yFactor * rect.Height));
        }
        public equals(spot: Spot): boolean {
            return this.xFactor === spot.xFactor && this.yFactor === spot.yFactor;
        }
        public notEquals(spot: Spot): boolean {
            return this.xFactor !== spot.xFactor && this.yFactor !== spot.yFactor;
        }

        public static FromID(id: number): Spot {
            switch (id) {
                case 0: {
                    return NoSpot;
                }
                case 1: {
                    return Middle;
                }
                case 2: {
                    return TopLeft;
                }
                case 4: {
                    return TopRight;
                }
                case 8: {
                    return BottomRight;
                }
                case 16: {
                    return BottomLeft;
                }
                case 32: {
                    return MiddleTop;
                }
                case 64:
                    {
                        return MiddleRight;
                    }
                case 128: {
                    return MiddleBottom;
                }
                case 256: {
                    return MiddleLeft;
                }
                default: {
                    return new Spot(Number.NaN, Number.NaN, id);
                }
            }
        }
    }

    export const NoSpot: Spot = new Spot(Number.NaN, Number.NaN, 0);
    /**
    * Nesnenin tam ortasını temsil eder.
    * <pre>
    * ------------------
    * -                -
    * -       O        -
    * -                -
    * ------------------
    * </pre>
    */
    export const Middle: Spot = new Spot(0.5, 0.5, 1);
    export const MiddleCenter: Spot = new Spot(0.5, 0.5, 1);

    /**
    * Nesnenin sol köşesini temsil eder.
    * <pre>
    * 0=================
    * |                |
    * |                |
    * |                |
    * ==================
    * </pre>
    */
    export const TopLeft: Spot = new Spot(0, 0, 2);

    /**
    * Nesnenin sağ üst köşesini temsil eder.
    * <pre>
    * =================0
    * |                |
    * |                |
    * |                |
    * ==================
    * </pre>
    */
    export const TopRight: Spot = new Spot(1, 0, 4);

    /**
   * This represents a corner po in the object's bounds.
   */
    export const BottomRight: Spot = new Spot(1, 1, 8);

    /**
    * This represents a corner po in the object's bounds.
    */
    export const BottomLeft: Spot = new Spot(0, 1, 16);

    /**
     * Nesnenin üst ortasını temsil eder.
     * <pre>
     * --------O---------
     * -                -
     * -                -
     * -                -
     * ------------------
     * </pre>
     */
    export const MiddleTop: Spot = new Spot(0.5, 0, 32);

    /**
    * Nesnenin üst ortasını temsil eder.
    * <pre>
    * --------O---------
    * -                -
    * -                -
    * -                -
    * ------------------
    * </pre>
    * [[MiddleTop]]
    * [[GetSpotLocation]]
    */
    export const TopCenter: Spot = new Spot(0.5, 0, 32);

    /**
    * Nesnenin sağ ortasını temsil eder.
    * <pre>
    * ------------------
    * -                -
    * -                O
    * -                -
    * ------------------
    * </pre>
    */
    export const MiddleRight: Spot = new Spot(1, 0.5, 64);

    /**
    * Nesnenin alt ortasını temsil eder.
    * <pre>
    * ------------------
    * -                -
    * -                -
    * -                -
    * --------O---------
    * </pre>
    */
    export const MiddleBottom: Spot = new Spot(0.5, 1, 128);

    /**
     * This represents a po in the object's bounds.
     */
    export const BottomCenter: Spot = new Spot(0.5, 1, 128);

    /**
    * Nesnenin sol ortasını temsil eder.
    * <pre>
    * ------------------
    * -                -
    * O                -
    * -                -
    * ------------------
    * </pre>
    */
    export const MiddleLeft: Spot = new Spot(0, 0.5, 256);