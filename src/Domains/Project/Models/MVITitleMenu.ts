import { IMiningModelModel } from "@procetra/common";

export interface MVITitleMenu {
    title: string;
    icon: string;
    iconColor: string;
    onClick: (item: IMiningModelModel) => void;
}