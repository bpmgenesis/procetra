var shell = require('shelljs');

/* if (shell.exec('node shell_wp.js').code !== 0) {
    shell.echo('Build failed');
    shell.exit(1);
} */

if (shell.exec('npm run wbuild').code !== 0) {
    shell.echo('Build failed');
    shell.exit(1);
}


shell.echo('App file creating...');
shell.cd('../../../RPA/src');

if (shell.exec('node FilePackager.js ../../Applications/BPMGenesis/ProcessMining/dist/index.js ../../DemoApp/apps/applications/ProcessMining.app').code !== 0) {
    shell.echo('Build failed');
    shell.exit(1);
}


shell.cp('-Rf', '../../DemoApp/apps/applications/ProcessMining.app', '../../pythonProjects/bpmgenesis/src/portal/static/applications/ProcessMining.app');
shell.echo('App file done.');


shell.echo('App store info updating...');
const path = require('path');
const fs = require('fs');
const a = fs.readFileSync('../../DemoApp/apps/appstore.json', 'utf8');

const appStoreInfo = JSON.parse(a);

const appInfo = require('./src/AppStoreInfo');
const result = appStoreInfo.apps.find(item => item.id === appInfo.id);
//console.log('results ' + JSON.stringify(result));
if (result) {
    const index = appStoreInfo.apps.indexOf(result);
    appStoreInfo.apps[index] = appInfo;
} else {
    appStoreInfo.apps.push(appInfo);
}
const aa = JSON.stringify(appStoreInfo);

fs.writeFileSync('../../DemoApp/apps/appstore.json', aa, 'utf8');
shell.echo('App info done.');



/* if (shell.exec('npm run bundle').code !== 0) {
    shell.echo('Bundlet failed');
    shell.exit(1);
} */

//shell.cp('-Rf', './dist/*', '../diagram/node_modules/@tuval/core');
//shell.cp('-Rf', './dist/*', '../core-graphics/node_modules/@tuval/core');
//shell.cp('-Rf', './dist/*', '../coreplus/node_modules/@tuval/core');
//shell.cp('-Rf', './dist/*', '../graphics/node_modules/@tuval/core');
//shell.cp('-Rf', './dist/*', '../forms/node_modules/@tuval/core');
//shell.cp('-Rf', './dist/*', '../winforms/node_modules/@tuval/core');
//shell.cp('-Rf', './dist/*', '../gui/node_modules/@tuval/core');
//shell.cp('-Rf', './dist/*', '../gui/node_modules/@tuval/core');

/* shell.cp('-Rf', './dist/*', '../../../DemoApp/node_modules/@tuval/components/buttons'); */
//shell.cp('-Rf', './dist/tuval-core-wp.js', '../../Tuval_Test_v_1/dist');