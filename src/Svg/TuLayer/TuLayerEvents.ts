
export class TuLayerEvents {
    public static readonly ChangedObject = 901;
    public static readonly InsertedObject = 902;
    public static readonly RemovedObject = 903;
    public static readonly ChangedObjectLayer = 904;
    public static readonly ChangedObjectZOrder = 905;
    public static readonly ChangedAllowView = 910;
    public static readonly ChangedAllowSelect = 911;
    public static readonly ChangedAllowMove = 912;
    public static readonly ChangedAllowCopy = 913;
    public static readonly ChangedAllowResize = 914;
    public static readonly ChangedAllowReshape = 915;
    public static readonly ChangedAllowDelete = 916;
    public static readonly ChangedAllowInsert = 917;
    public static readonly ChangedAllowLink = 918;
    public static readonly ChangedAllowEdit = 919;
    public static readonly ChangedAllowPrint = 920;
    public static readonly ChangedIdentifier = 930;

    public static readonly 901 = 'ChangedObject';
    public static readonly 902 = 'InsertedObject';
    public static readonly 903 = 'RemovedObject';
    public static readonly 904 = 'ChangedObjectLayer';
    public static readonly 905 = 'ChangedObjectZOrder';
    public static readonly 910 = 'ChangedAllowView';
    public static readonly 911 = 'ChangedAllowSelect';
    public static readonly 912 = 'ChangedAllowMove';
    public static readonly 913 = 'ChangedAllowCopy';
    public static readonly 914 = 'ChangedAllowResize';
    public static readonly 915 = 'ChangedAllowReshape';
    public static readonly 916 = 'ChangedAllowDelete';
    public static readonly 917 = 'ChangedAllowInsert';
    public static readonly 918 = 'ChangedAllowLink';
    public static readonly 919 = 'ChangedAllowEdit';
    public static readonly 920 = 'ChangedAllowPrint';
    public static readonly 930 = 'ChangedIdentifier';
}

const AllEvents: any = {};
Object.assign(AllEvents,TuLayerEvents);