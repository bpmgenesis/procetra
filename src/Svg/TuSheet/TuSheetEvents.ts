import { TuGroupEvents } from "../TuGroup/TuGroupEvents";

export class TuSheetEvents extends TuGroupEvents {
    public static readonly ChangedTopLeftMargin = 3101;
    public static readonly ChangedBottomRightMargin = 3102;
    public static readonly ChangedBackgroundImageSpot = 3103;
    public static readonly ChangedShowsMargins = 3104;
    public static readonly ChangedMarginColor = 3105;
    public static readonly ChangedPaper = 3110;
    public static readonly ChangedBackgroundImage = 3111;
    public static readonly ChangedGrid = 3112;

    public static readonly 3101 = 'ChangedTopLeftMargin';
    public static readonly 3102 = 'ChangedBottomRightMargin';
    public static readonly 3103 = 'ChangedBackgroundImageSpot';
    public static readonly 3104 = 'ChangedShowsMargins';
    public static readonly 3105 = 'ChangedMarginColor';
    public static readonly 3110 = 'ChangedPaper';
    public static readonly 3111 = 'ChangedBackgroundImage';
    public static readonly 3112 = 'ChangedGrid';
}