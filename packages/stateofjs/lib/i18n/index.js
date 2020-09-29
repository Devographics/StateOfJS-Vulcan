import {default as enCommon} from './common/js/en-US.js';
import {default as enCSS} from './state-of-css/js/en-US.js';
import {default as enJS} from './state-of-js/js/en-US.js';

const locales = [
  {
    id: 'en',
    label: 'English',
    stringFiles: [ enCommon, enCSS, enJS ]
  }
];

export default locales;
