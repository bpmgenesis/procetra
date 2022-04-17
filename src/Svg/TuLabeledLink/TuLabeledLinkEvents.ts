import { TuGroupEvents } from "../TuGroup/TuGroupEvents";

export class TuLabeledLinkEvents extends TuGroupEvents {
    public static readonly ChangedLink = 1311;
    public static readonly ChangedFromLabel = 1312;
    public static readonly ChangedMidLabel = 1313;
    public static readonly ChangedToLabel = 1314;
    public static readonly ChangedFromLabelCentered = 1315;
    public static readonly ChangedMidLabelCentered = 1316;
    public static readonly ChangedToLabelCentered = 1317;

    public static readonly 1311 = 'ChangedLink';
    public static readonly 1312 = 'ChangedFromLabel';
    public static readonly 1313 = 'ChangedMidLabel';
    public static readonly 1314 = 'ChangedToLabel';
    public static readonly 1315 = 'ChangedFromLabelCentered';
    public static readonly 1316 = 'ChangedMidLabelCentered';
    public static readonly 1317 = 'ChangedToLabelCentered';
}