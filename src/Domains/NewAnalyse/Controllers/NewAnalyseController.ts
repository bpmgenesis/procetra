import { is } from '@tuval/core';
import { Context, cTop, cTopLeading, ForEach, HStack, ScrollView, State, UIController, UIScene, VStack } from '@tuval/forms';
import { PageTitle } from '../../../UI/Views/PageHeader';
import { NewAnalyseTypes } from '../Models/NewAnalyseTypes';
import { NewAnalyseModelTitleBox } from '../Views/NewAnalyseModelTitleBox';
import { searchBox } from '../Views/searchBox';

//import { ProcessOverviewController } from '../../../modules/ProcessOverview/Controllers/ProcessOverviewController';


export class NewAnalyseController extends UIController {
    @State()
    private searchText: string;

    @Context()
    private onSearchTextChanged(value: string) {
        this.searchText = value;
    }
    public LoadView() {
        return (
            UIScene(
                VStack({ alignment: cTopLeading, spacing: 10 })(
                    HStack(
                        PageTitle('\\d27e', 'Mining Modules')
                    ).height().paddingTop('20px'),
                    searchBox(),
                    ScrollView(
                        HStack({ alignment: cTop, spacing: 10 })(
                            ...ForEach(NewAnalyseTypes)(item =>
                                (is.nullOrEmpty(this.searchText) ||
                                    item.title.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1)
                                && NewAnalyseModelTitleBox(this.searchText, item) as any
                            )
                        ).wrap('wrap').height().padding(10)
                    )
                )
            )
        )
    }
}