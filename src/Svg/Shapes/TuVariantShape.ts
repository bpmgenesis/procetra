/* import { TuGroup } from '../TuGroup/TuGroup';
import { TuPath } from '../TuPath';
import { TuRectangle } from '../TuRectangle';
import { TuText } from '../TuText';
import { ValueOf } from '../types';
export class TuVariantShape extends TuGroup {
    protected InitComponents(): void {
        const path1 = new TuPath();
        path1.Filter = 'drop-shadow';
        path1.Fill = '#14a9D5';
        path1.GetPathCallback = () => {
            const width = ValueOf(this.Width) ?? 100;
            const height = ValueOf(this.Height) ?? 100;
            const path = ['M', 0, 0, 'H', width, 'L', width + height / 4, height / 2, 'L',
                width, height, 'H', 0, 'Z'].join(' ');

            return path;
        };
        this.Add(path1);
    }
} */