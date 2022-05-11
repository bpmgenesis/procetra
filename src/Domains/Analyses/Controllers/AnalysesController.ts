import { UIController, UIView , Text} from '@tuval/forms';
import { SectionHeadline } from '../../../UI/Views/Texts';


export class AnalysesController extends UIController {
    public LoadView():UIView {
        return (
            SectionHeadline('Ticcket Management')
        )
    }
}