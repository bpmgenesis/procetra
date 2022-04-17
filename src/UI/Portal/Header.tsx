import { Teact, DomHandler, Control } from '@tuval/forms';

export class Header extends Control<Header> {

    public SetupControlDefaults(): void {
        super.SetupControlDefaults();
    }

    public CreateElements() {
        if (!this.Visible) {
            return;
        }
        return (
            <header class="navbar remove-radius remove-box-shadow header-topbar">
                <div class="navbar-wrap">
                    <a class="navbar-logo" href="/" title="">
                        <img src="/images/brand/logo_icon_white_charcoal.svg" alt=""/>
                    </a>
                    <button type="button" class="navbar-toggle pull-right" data-toggle="collapse" data-target=".mobile-dropdown,.primary-nav">
                        <span class="sr-only">Toggle Navigation</span>
                        <span class="fa fa-bars"></span>
                    </button>

                    <ul class="nav pull-right super-nav hidden-xs">
                        <li style="min-width: 220px;" class="account-dropdown">

                            <a data-toggle="dropdown" href="javascript:void(0);">
                                <div class="account-label">
                                    MERT
                                    &nbsp;<i class="fa fa-caret-down"></i></div>
                                <div class="clearfix">
                                    <div class="pull-left">
                                        <strong class="">Poser</strong>
                                    </div>
                                    <div class="pull-right">
                                        <span><img alt="gravatar" src="https://www.gravatar.com/avatar/34c66af0ecca518a616892b6791b08e5?s=40&amp;d=mm" class="gravatar"/></span>
                                    </div>
                                </div>
                            </a>

                            <ul class="dropdown-menu" role="menu" style="width:100%">
                                <li>
                                    <a href="/account/settings">
                                        <i class="fa icon-settings fa-fw"></i>&nbsp;Settings
                                    </a>
                                </li>
                                <li>
                                    <a href="/install"><i class="fa-check fa fa-fw"></i>&nbsp;Install</a>
                                </li>
                                <li>
                                    <a href="#" target="_blank"><i class="fa-file fa fa-fw"></i>&nbsp;Docs</a>
                                </li>
                                <li>
                                    <a href="/usage"><i class="fa-bar-chart-o fa fa-fw"></i>&nbsp;Usage Metrics</a>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <a href="/account/switch"><i class="fa-users fa fa-fw"></i>&nbsp;Switch Account</a>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <a href="/customer/logout" data-no-ajax="true"><i class="fa-sign-out fa fa-fw"></i>&nbsp;Sign Out</a>
                                </li>

                            </ul>
                        </li>
                    </ul>

                    <ul class="nav pull-right search-nav">
                        <li>
                            <form class="js-search-form search-form" method="get" action="/search">
                                <input type="search" name="query" class="form-control " id="js-search-string" placeholder="Search" value=""/>
                                <button class ="btn" type ="submit"><i class ="fa fa-search"></i></button>
                            </form>
                        </li>
                    </ul>

                </div>
            </header>
        );
    }
}