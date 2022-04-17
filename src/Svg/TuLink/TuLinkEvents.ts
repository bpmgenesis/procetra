import { TuStrokeEvents } from "../TuStroke/TuStrokeEvents";

 export class TuLinkEvents extends TuStrokeEvents {
    public static readonly RelinkableFromHandle = 1024;
    public static readonly RelinkableToHandle = 1025;
    public static readonly ChangedLinkUserFlags = 1300;
    public static readonly ChangedLinkUserObject = 1301;
    public static readonly ChangedFromPort = 1302;
    public static readonly ChangedToPort = 1303;
    public static readonly ChangedOrthogonal = 1304;
    public static readonly ChangedRelinkable = 1305;
    public static readonly ChangedAbstractLink = 1306;
    public static readonly ChangedAvoidsNodes = 1307;
    public static readonly ChangedPartID = 1309;
    public static readonly ChangedAdjustingStyle = 1310;
    public static readonly ChangedToolTipText = 1311;
    public static readonly ChangedDraggableOrthogonalSegments = 1312;

    public static readonly 1024 = 'RelinkableFromHandle';
    public static readonly 1025 = 'RelinkableToHandle';
    public static readonly 1300 = 'ChangedLinkUserFlags';
    public static readonly 1301 = 'ChangedLinkUserObject';
    public static readonly 1302 = 'ChangedFromPort';
    public static readonly 1303 = 'ChangedToPort';
    public static readonly 1304 = 'ChangedOrthogonal';
    public static readonly 1305 = 'ChangedRelinkable';
    public static readonly 1306 = 'ChangedAbstractLink';
    public static readonly 1307 = 'ChangedAvoidsNodes';
    public static readonly 1309 = 'ChangedPartID';
    public static readonly 1310 = 'ChangedAdjustingStyle';
    public static readonly 1311 = 'ChangedToolTipText';
    public static readonly 1312 = 'ChangedDraggableOrthogonalSegments';
}