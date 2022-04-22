import { KeyFrameCollection , KeyFrame} from '@tuval/forms';

class SlideDown extends  KeyFrameCollection {
    public constructor() {
        super('slideDown');

        const keyFrame1 = new KeyFrame('from');
        keyFrame1.style.Transform = 'translateY(-20px)';
        keyFrame1.style.Opacity = '0';
        this.Add(keyFrame1);

        const keyFrame2 = new KeyFrame('to');
        keyFrame2.style.Opacity = '1';
        this.Add(keyFrame2);
    }
}

export const SlideDownAnimation = new SlideDown();