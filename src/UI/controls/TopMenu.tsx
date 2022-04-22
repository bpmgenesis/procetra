import { Control, Teact, DomHandler, Fragment } from '@tuval/forms';

DomHandler.addCssToDocument(require('./Topmenu.css'));

export class TopMenu extends Control<TopMenu> {
    public override CreateElements(): any {
        return (
            <Fragment>
                <div class='tuval-topmenu'>
                    <div class='button'></div>
                    <ul class='tabs-holder'>
                        <li>Test</li>
                        <li>Test1</li>
                    </ul>
                </div>
                <div class='tuval-topmenu-border'></div>
            </Fragment>);
    }

}