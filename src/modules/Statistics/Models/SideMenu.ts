import { MVIPortalSideMenuItem } from "../../../UI/Views/PortalSideMenu";
import { ActivityController } from "../Controllers/Activity/ActivityController";
import { MultiOverviewController } from "../Controllers/Overview/MultiOverviewController";
import { OverviewController } from "../Controllers/Overview/OverviewController";

export const sideMenuModel: MVIPortalSideMenuItem[] = [
    {
        name: 'Overview',
        icon: '\\f0d8',
        controller: new MultiOverviewController(),
        isVisible: () => true
    },
    {
        name: 'Activity',
        icon: '\\f0e7',
        controller: new ActivityController(),
        isVisible: () => true
    },
    {
        name: 'Resource',
        icon: '\\f006',
        controller: new OverviewController(),
        isVisible: () => true
    }
]