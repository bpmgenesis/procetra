import { TuGroupEvents } from './../TuGroup/TuGroupEvents';
export class TuNodeEvents extends TuGroupEvents {
    public static readonly ChangedNodeUserFlags = 2000;
    public static readonly ChangedNodeUserObject = 2001;
    public static readonly ChangedToolTipText = 2002;
    public static readonly ChangedPropertiesDelegatedToSelectionObject = 2003;
    public static readonly ChangedPartID = 2004;
}
