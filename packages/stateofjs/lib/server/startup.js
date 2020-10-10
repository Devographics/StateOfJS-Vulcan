/*

Startup

*/
import scripts from './scripts.js';
import { getSetting } from 'meteor/vulcan:core';
import { convertAllYAML  }from './yaml';

const startup = getSetting('startup', []);
const environment = getSetting('environment');

Meteor.startup(async function () {
  // for some reason JSON arrays are of the form: { '0': 'testScript', '1': 'testScript2' },
  // convert it to regular array first to make things easier
  const scriptsToRun = Object.keys(startup).map((k) => startup[k]);
  console.log(`// Found ${scriptsToRun.length} startup scripts to run`); // eslint-disable-line
  for (const script of scriptsToRun) {
    console.log(`// Running script ${script}…`); // eslint-disable-line
    try {
      const f = scripts[script];
      await f();
    } catch (error) {
      console.log(`-> error while running script ${script}:`); // eslint-disable-line
      console.log(error); // eslint-disable-line
    }
  }

  if (environment === 'development') {
    await convertAllYAML();
  }
});
