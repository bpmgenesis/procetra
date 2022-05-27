import { cTopLeading, Fonts, HDivider, Text, UIView, VStack } from '@tuval/forms';

export function RecentProjects(): UIView {
    return (
        VStack({ alignment: cTopLeading })(
            Text('Recent Projects').font(Fonts.title).padding('5px'),
            HDivider(),
        ).grow()
    );
}