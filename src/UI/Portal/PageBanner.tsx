import { Teact, DomHandler, Control, Property } from '@tuval/forms';

export class PageBanner extends Control<PageBanner> {

    @Property()
    public Title: string;

    @Property()
    public SubTitle: string;

    @Property()
    public Description: string;

    public SetupControlDefaults(): void {
        super.SetupControlDefaults();
    }

    public CreateElements() {
        if (!this.Visible) {
            return;
        }
        return (
            <div id="page-banner">
                <div class="onboarding-banner flex-column">
                    <div class="flex align-baseline">
                        <h1>{this.Title}</h1><h3>{this.SubTitle}</h3>
                    </div>
                    <p class="flex ">
                        {this.Description}
                    </p>
                </div>
            </div>
        );
    }
}