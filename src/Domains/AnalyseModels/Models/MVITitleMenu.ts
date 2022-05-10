import { MVIAnalyseModel } from "./MVIAnalyseModel";

export interface MVITitleMenu {
    title: string;
    icon: string;
    iconColor: string;
    onClick:(item:MVIAnalyseModel)=> void;
}