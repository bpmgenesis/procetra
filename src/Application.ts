import { instance as container, TStorage, TuvalStorage } from '@tuval/core';
import { TApplication } from '@tuval/forms';
import { MiningBrokerClient,BrokerProjectService } from '@procetra/common';

import { MainView } from './MainView';
import { Resources } from './Resources';
import { Services } from '@procetra/common';

const manifest = require('./manifest');

function make(ctorFun, argsArray) {
    const newInstance = Object.create(ctorFun.prototype.constructor.prototype);
    ctorFun.prototype.constructor.apply(newInstance, argsArray);
    return newInstance;
}


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

        const brokerProjectService = new BrokerProjectService();
        container.registerInstance('IProjectService_Thread', brokerProjectService);

        const fileExprorer = new MainView();
        this.SetMainForm(fileExprorer);
        setTimeout(() => this.Start(), 100); // Uygulamayı başlatıyoruz.


        //PMAcademyService.Start();


        TStorage.SaveFile('/static/tuval-core-wp.js', 'tuval-core-wp').then(() => {
            TStorage.GetFile('tuval-core-wp').then((url) => {
                // const thread = make(PMThreadWorker, ['/static/index-wp.js']);
                // container.registerInstance('IProjectService_Thread', thread);

                /*  thread.load().then(() => {
                    thread.start();
                }); */
            });
        });

    }
}



