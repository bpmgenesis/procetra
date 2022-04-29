import { MVIAnalyseModel } from "./MVIAnalyseModel";

export interface MVITitleMenu {
    title: string;
    icon: string;
    onClick:(item:MVIAnalyseModel)=> void;
}