import { default as enCommon } from './common/js/en-US.js';
import { default as enCSS } from './state-of-css/js/en-US.js';
import { default as enJS } from './state-of-js/js/en-US.js';

import { default as itCommon } from './common/js/it-IT.js';
import { default as itCSS } from './state-of-css/js/it-IT.js';
import { default as itJS } from './state-of-js/js/it-IT.js';

const locales = [
  {
    id: 'en',
    label: 'English',
    stringFiles: [enCommon, enCSS, enJS],
  },
  {
    id: 'it',
    label: 'Italiano',
    stringFiles: [itCommon, itCSS, itJS],
  },
];

export default locales;