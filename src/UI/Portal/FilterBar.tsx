import { Teact, DomHandler, Control } from '@tuval/forms';


/* console.log('css');
console.log(css);
DomHandler.addCssToDocument(css); */

export class FilterBar extends Control<FilterBar> {

    public get ShowAppMenu(): boolean {
        return this.GetProperty('ShowAppMenu');
    }

    public set ShowAppMenu(value: boolean) {
        this.SetProperty('ShowAppMenu', value);
    }

    public get ShowStatusMenu(): boolean {
        return this.GetProperty('ShowStatusMenu');
    }

    public set ShowStatusMenu(value: boolean) {
        this.SetProperty('ShowStatusMenu', value);
    }


    public SetupControlDefaults(): void {
        super.SetupControlDefaults();
        this.ShowAppMenu = false;
        this.ShowStatusMenu = false;
    }

    public CreateElements() {
        if (!this.Visible) {
            return;
        }
        const style = {};
        style['display'] = this.ShowAppMenu ? 'flex' : 'none';
        style['zIndex'] = '100';

        const _style = {};
        _style['display'] = this.ShowStatusMenu ? 'flex' : 'none';
        _style['zIndex'] = '100';

        return (
            <div id="global-filter-root">
                <div class="global-filter flex">
                    <div class="filter-dropdown mobile-filter-toggle ">
                        <div class="filter-dropdown-title" style="width: 100%;">
                            <div class="flex">
                                <i class="fa fa-filter"></i>
                            </div>
                            <div class="flex align-center">
                                <i class="fa fa-caret-down" style="margin-left: auto;"></i>
                            </div>
                        </div>
                    </div>
                    <div class="application-dropdown filter-dropdown relative ">
                        <button type="button" class="application-name filter-dropdown-title">
                            <div class="flex">
                                <i class="icon-applications"></i></div>
                            <div class="flex-column" onclick={() => this.ShowAppMenu = !this.ShowAppMenu}>
                                <div class="flex align-center">
                                    <small>PROJECTS</small></div>
                                <div class="flex align-center">
                                    <span class="truncate-ellipsis">All</span>
                                    <i class="fa fa-caret-down"></i>
                                </div>
                            </div></button><ul class="filter-dropdown-flyout" style={style}>
                            <div class="filter-dropdown-body">
                                <li class="selected"><a href="javascript:void(0)"><em>Show All</em></a></li>
                                <li class=""><a href="javascript:void(0)">Test</a></li>
                            </div><span class="filter-dropdown-footer">
                                <a href="/account/applications">Application Settings</a>
                            </span>
                        </ul>
                    </div>
                    <div class="application-dropdown filter-dropdown relative ">
                        <button type="button" class="application-name filter-dropdown-title">
                            <div class="flex">
                                <i class="icon-applications"></i></div>
                            <div class="flex-column" onclick={() => this.ShowAppMenu = !this.ShowAppMenu}>
                                <div class="flex align-center">
                                    <small>DATASETS</small></div>
                                <div class="flex align-center">
                                    <span class="truncate-ellipsis">All</span>
                                    <i class="fa fa-caret-down"></i>
                                </div>
                            </div></button><ul class="filter-dropdown-flyout" style={style}>
                            <div class="filter-dropdown-body">
                                <li class="selected"><a href="javascript:void(0)"><em>Show All</em></a></li>
                                <li class=""><a href="javascript:void(0)">Test</a></li>
                            </div><span class="filter-dropdown-footer">
                                <a href="/account/applications">Application Settings</a>
                            </span>
                        </ul>
                    </div>
                    <div class="status-dropdown filter-dropdown relative ">
                        <button type="button" class="status-name filter-dropdown-title" title="Status: All">
                            <div class="flex"><i class="fa fa-check-circle"></i></div>
                            <div class="flex-column" onclick={() => this.ShowStatusMenu = !this.ShowStatusMenu}>
                                <div class="flex align-center">
                                    <small>STATUS</small></div>
                                <div class="flex align-center">
                                    <span class="truncate-ellipsis">All</span>
                                    <i class="fa fa-caret-down"></i></div></div>
                        </button><ul class="filter-dropdown-flyout" style={_style}>
                            <span class="filter-dropdown-header"><a href="javascript:void(0);">Select All</a>
                                <a href="javascript:void(0);">Select None</a></span><li class=""><label>
                                    <input type="checkbox" value="(No Status)" /> (No Status)</label></li><li class=""><label>
                                        <input type="checkbox" value="Fixed" /> Fixed</label></li><li class=""><label>
                                            <input type="checkbox" value="Investigating" /> Investigating</label></li><li class=""><label>
                                                <input type="checkbox" value="Prioritized" /> Prioritized</label></li>
                            <li class=""><label>
                                <input type="checkbox" value="Unable to Recreate" /> Unable to Recreate</label></li>
                            <li class=""><label>
                                <input type="checkbox" value="Won't Fix" /> Won't Fix</label>
                            </li>
                            <span class="filter-dropdown-footer"><button type="button" class="apply-status">Apply</button></span></ul></div>
                    <div class="filter-builder-container align-center"><div class="filter-builder flex-column ">
                        <div class="filter-builder-header"><i class="fa fa-filter "></i><div class="current-filters flex">
                            <span class="add-custom-filters">Add Custom Filters</span>


                        </div></div>
                        <div class="filter-builder-body flex-column " style="display: none; left: 0px; width: 100%;">
                            <div class="tabs flex" style="display: none;"><div class="tab selected"><i class="fa fa-exclamation-triangle"></i>&nbsp;Error<span class="unsaved">&nbsp;*</span></div><div class="tab">
                                <i class="fa fa-arrow-circle-right"></i>&nbsp;Entry<span class="unsaved">&nbsp;*</span>
                            </div><div class="tab"><i class="fa fa-fw icon-urls"></i>&nbsp;Url<span class="unsaved">&nbsp;*</span></div>
                                <div class="tab"><i class="icon-users"></i>&nbsp;Users<span class="unsaved">&nbsp;*</span></div>
                                <div class="tab"><i class="fa fa-code-fork"></i>&nbsp;Version<span class="unsaved">&nbsp;*</span></div>
                                <div class="tab"><i class="icon-browsers"></i>&nbsp;Browser<span class="unsaved">&nbsp;*</span></div>
                                <div class="tab"><i class="icon-metadata"></i>&nbsp;Metadata<span class="unsaved">&nbsp;*</span></div>
                                <div class="tab"><i class="icon-metadata"></i>&nbsp;Stack Trace<span class="unsaved">&nbsp;*</span></div>
                                <div class="tab"><i class="icon-metadata"></i>&nbsp;IP Address<span class="unsaved">&nbsp;*</span></div></div>
                            <div class="tab-details" style="display: none;"><div>
                                <div class="tab-filter-builder flex" style="display: none;">
                                    <div class="applied-filters"><h4>Error Message Filters</h4><hr />
                                        <span class="no-filters">No Currently Applied Error Message Filters</span><div class="add-new-filter">
                                            <input type="text" placeholder="Enter all or part of an error message to create a new filter" value="" />
                                            <div class="autocomplete-results"></div></div><label class="flex align-center filter-item">
                                            <input type="checkbox" style="margin-top: 0px;" />
                                            <span style="margin-left: 4px;">Include Only Errors With Stack Trace</span>
                                        </label></div>
                                    <div class="quick-filters">
                                        <h4 class="no-quick-filters">Sorry, there are no quick error message filters available</h4></div>
                                </div>
                                <div class="tab-filter-builder flex" style="display: none;">
                                    <div class="applied-filters"><h4>Browser Filters</h4><hr />
                                        <span class="no-filters">No Currently Applied Browser Filters</span>
                                        <div class="add-new-filter">
                                            <input type="text" placeholder="Enter a browser name or version to create a new filter" value="" />
                                            <div class="autocomplete-results"></div></div>
                                    </div><div class="quick-filters">
                                        <h4 class="no-quick-filters">Sorry, there are no quick browser filters available</h4></div>
                                </div><div class="tab-filter-builder flex" style="display: none;">
                                    <div class="applied-filters"><h4>User Filters</h4><hr />
                                        <span class="no-filters">No Currently Applied User User Filters</span>
                                        <div class="add-new-filter"><input type="text" placeholder="Enter a user ID to create a new filter" value="" />
                                            <div class="autocomplete-results"></div></div></div><div class="quick-filters">
                                        <h4 class="no-quick-filters">Sorry, there are no quick user filters available</h4></div>
                                </div><div class="tab-filter-builder flex" style="display: none;">
                                    <div class="applied-filters"><h4>Version Filters</h4><hr />
                                        <span class="no-filters">No Currently Applied Version Filters</span>
                                        <div class="add-new-filter"><input type="text" placeholder="Enter a version identifier to create a new filter" value="" />
                                            <div class="autocomplete-results"></div></div></div><div class="quick-filters">
                                        <h4 class="no-quick-filters">Sorry, there are no quick version filters available</h4>
                                    </div>
                                </div>
                                <div class="tab-filter-builder flex" style="display: none;">
                                    <div class="applied-filters"><h4>Urls</h4><hr />
                                        <span class="no-filters">No Currently Applied Url Filters</span><div class="add-new-filter">
                                            <input type="text" placeholder="Enter all or part of a domain to create a filter" value="" />
                                            <div class="autocomplete-results"></div></div></div><div class="quick-filters"><h4 class="no-quick-filters">Sorry, there are no quick url filters available</h4>
                                    </div></div>
                                <div class="tab-filter-builder flex" style="display: none;">
                                    <div class="applied-filters"><h4>Metadata Filters</h4><hr /><span class="no-filters">No Currently Applied Metadata Filters</span>
                                        <div class="add-new-filter"><input type="text" placeholder="Enter metadata values or keys to create a new filter" value="" />
                                            <div class="autocomplete-results"></div></div></div>
                                    <div class="quick-filters"><h4 class="no-quick-filters">Sorry, there are no quick metadata filters available</h4></div>
                                </div>
                                <div class="tab-filter-builder flex" style="display: none;"><div class="applied-filters"><div style="min-height: 227px;"><h4>Entry Filters</h4><hr />
                                    <span class="no-filters">No Currently Applied Entry Filters</span></div><div><h4 style="margin-top: 20px;">Platform Filters</h4><hr />
                                        <span class="no-filters">No Currently Applied Platform Filters</span></div></div><div class="quick-filters">
                                        <h4 class="no-quick-filters">Sorry, there are no entries or platforms available</h4></div></div>
                                <div class="tab-filter-builder flex" style="display: none;">
                                    <div class="applied-filters"><h4>Stack Trace Filters</h4><hr />
                                        <span class="no-filters">No Currently Applied Stack Trace Filters</span><div class="add-new-filter">
                                            <input type="text" placeholder="Enter part of a stack trace to create a filter" value="" />
                                            <div class="autocomplete-results"></div></div></div>
                                    <div class="quick-filters"></div></div>
                                <div class="tab-filter-builder flex" style="display: none;">
                                    <div class="applied-filters"><h4>IP Address Filters</h4><hr />
                                        <span class="no-filters">No Currently Applied IP Address Filters</span>
                                        <div class="add-new-filter"><input type="text" placeholder="Enter all or part of an IP address to create a filter" value="" />
                                            <div class="autocomplete-results"></div></div></div>
                                    <div class="quick-filters">
                                        <h4 class="no-quick-filters">Sorry, there are no quick IP address filters available</h4></div></div>
                            </div></div>
                            <div class="apply-cancel" style="display: none;"><button class="apply">
                                <span>Apply</span></button><button class="cancel">Cancel</button></div>
                        </div></div></div><div class="date-range-picker relative">
                        <i class="fa fa-clock-o"></i><a class="" href="javascript:void(0)">1H</a>
                        <a class="" href="javascript:void(0)">8H</a><a class="selected" href="javascript:void(0)">24H</a>
                        <a class="" href="javascript:void(0)">3D</a><a class="" href="javascript:void(0)">7D</a>
                        <a class="" href="javascript:void(0)">All</a><a href="javascript:void(0)" class="custom-date-button  ">Custom</a></div>
                    <div class="saved-filters relative "><button type="button" class="saved-filters-button" title="Share or save the current filters">
                        <div class="flex justify-center"><i class="fa fa-share-alt"></i></div></button>
                        <ul class="filter-dropdown-flyout" style="display: none;"><h4><i class="fa fa-fw fa-link"></i> Share Page</h4><div class="share-page-link flex">
                            <input type="text" readonly="" value="AAA" />
                            <button type="button"><img src="/Images/onboarding/copy.svg" /></button></div><h4>
                                <i class="fa fa-fw fa-bookmark"></i> Saved Filters</h4>
                            <div class="filter-list flex-column"><li class="no-filters">
                                <span>No Saved Filters</span></li></div><form><span class="save-your-filter filter-dropdown-footer flex-column">
                                    <h4>Save your current filter:</h4><input type="text" maxlength="100" placeholder="Enter filter name" value="" />
                                    <button type="submit" class="save-filters">Save</button></span></form>
                        </ul></div>
                </div></div>
        );
    }
}