import { KeyFrameCollection , KeyFrame} from '@tuval/forms';

class ListBounce extends  KeyFrameCollection {
    public constructor() {
        super('list-bounce');

        const keyFrame1 = new KeyFrame('from');
        keyFrame1.style.Transform = 'translate(0px, 20px)';
        keyFrame1.style.Opacity = '0';
        this.Add(keyFrame1);

        const keyFrame2 = new KeyFrame('to');
        keyFrame2.style.Transform = 'translate(0px, 0px)';
        keyFrame2.style.Opacity = '1';
        this.Add(keyFrame2);
    }
}

export const ListBounceAnimation = new ListBounce();