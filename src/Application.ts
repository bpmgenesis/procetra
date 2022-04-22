import { instance as container, TStorage, TuvalStorage } from '@tuval/core';
import { TApplication } from '@tuval/forms';
import { MiningBrokerClient } from './BrokerClients/MiningBrokerClient';

import { BrokerProjectService } from './BrokerProjectService';
import { MainView } from './MainView';
import { Resources } from './Resources';
import { StateService } from './Services/StateService';

const manifest = require('./manifest');

function make(ctorFun, argsArray) {
    // New instance attached to the prototype but the constructor
    // hasn't been called on it.
    const newInstance = Object.create(ctorFun.prototype.constructor.prototype);
    ctorFun.prototype.constructor.apply(newInstance, argsArray);
    return newInstance;
}

// If you create a utility function to create from instance, then it uses the
// inherited `constructor` property and your change would affect that.
function makeFromInstance(instance, argsArray) {
    return make(instance.constructor, argsArray);
}

declare var tuval$core;

function App(manifest: any) {
    return <T extends { new(...args: any[]): {} }>(constructor: T) => {
        if (tuval$core['__APPS__'] == null) {
            tuval$core['__APPS__'] = {};
        }
        tuval$core['__APPS__'][manifest.application.name] = constructor;
    }
}

@App(manifest)
export class ProcessMining extends TApplication {
    public static RecentlyUploadedFilesStorage: TuvalStorage = new TuvalStorage({ name: 'BPMG_P2M', storeName: 'RecentlyUploadedFilesStorage' });
    public InitComponents() {
        this.Icon = Resources.Icons.ApplicationIcon;

        //container.registerInstance('IProjectService', new LocalProjectService());

        MiningBrokerClient.Login('admin', 'admin').then(session_id => {
            StateService.SetSessionId(session_id);

            const brokerProjectService = new BrokerProjectService();
            container.registerInstance('IProjectService_Thread', brokerProjectService);

            const fileExprorer = new MainView();
            /*  const controller = new MainController();
             controller.SetView(fileExprorer); */
            this.SetMainForm(fileExprorer);




            this.Start();

            //PMAcademyService.Start();


            TStorage.SaveFile('/static/tuval-core-wp.js', 'tuval-core-wp').then(() => {
                // debugger;
                TStorage.GetFile('tuval-core-wp').then((url) => {
                    // const thread = make(PMThreadWorker, ['/static/index-wp.js']);
                    // container.registerInstance('IProjectService_Thread', thread);


                    /*  thread.load().then(() => {
                        thread.start();
                    }); */
                });
            });

        });





        /*   TuvalTracker.install({
             token: 'YOUR_TOKEN_HERE',
             window: { enabled: true }
         }); */

        /*
        TuvalTracker.addMetadata("subscription", "professional");
        TuvalTracker.addMetadata("has_sourcemaps", "false"); */

    }


}
// ModuleLoader.FireModuleLoadedEvent(manifest.application.name, ProcessMining);


