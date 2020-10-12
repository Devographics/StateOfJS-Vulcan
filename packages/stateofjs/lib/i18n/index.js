import { default as enCommon } from './common/js/en-US.js';
import { default as enCSS } from './state-of-css/js/en-US.js';
import { default as enJS } from './state-of-js/js/en-US.js';

import { default as itCommon } from './common/js/it-IT.js';
import { default as itCSS } from './state-of-css/js/it-IT.js';
import { default as itJS } from './state-of-js/js/it-IT.js';

import { default as zhCommon } from './common/js/zh-Hans.js';
import { default as zhCSS } from './state-of-css/js/zh-Hans.js';
import { default as zhJS } from './state-of-js/js/zh-Hans.js';

import { default as ruCommon } from './common/js/ru-RU.js';
import { default as ruCSS } from './state-of-css/js/ru-RU.js';
import { default as ruJS } from './state-of-js/js/ru-RU.js';

import { default as frCommon } from './common/js/fr-FR.js';
import { default as frCSS } from './state-of-css/js/fr-FR.js';
// import { default as frJS } from './state-of-js/js/fr-FR.js'; // not translated yet

const locales = [
  {
    id: 'en',
    label: 'English',
    stringFiles: [enCommon, enCSS, enJS],
    translators: []
  },
  {
    id: 'it',
    label: 'Italiano',
    stringFiles: [itCommon, itCSS, itJS],
    translators: []
  },
  {
    id: 'zh',
    label: '中文',
    stringFiles: [zhCommon, zhCSS, zhJS],
    translators: []
  },
  {
    id: 'ru-RU',
    label: 'Русский',
    stringFiles: [ruCommon, ruCSS, ruJS],
    translators: ['lex111', 'Omhet']
  },
  {
    id: 'fr-FR',
    label: 'Français',
    stringFiles: [frCommon, frCSS],
    translators: ['arnauddrain']
  },
];


export default locales;
