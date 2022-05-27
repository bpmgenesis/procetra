import { MIMiningModel } from "../../../UI/Models/MIAnalyseModel";
import { MVIMiningModel } from "./MVIAnalyseModel";

export interface MVITitleMenu {
    title: string;
    icon: string;
    iconColor: string;
    onClick:(item:MIMiningModel)=> void;
}