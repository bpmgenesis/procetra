import { UIView, VStack, Fonts, Text, HDivider, Alignment } from '@tuval/forms';
export function RecentProjects(): UIView {
    return (
        VStack(
            Text('Recent Projects').font(Fonts.title).padding('5px'),
            HDivider(),

        ).grow().alignment(Alignment.topLeading)
    );
}