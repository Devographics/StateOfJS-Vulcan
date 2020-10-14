import { default as enCommon } from "./common/js/en-US.js";
import { default as enCSS } from "./state-of-css/js/en-US.js";
import { default as enJS } from "./state-of-js/js/en-US.js";
import { default as hiCommon } from "./common/js/hi-IN.js";
import { default as hiCSS } from "./state-of-css/js/hi-IN.js";
import { default as hiJS } from "./state-of-js/js/hi-IN.js";

import { default as zhCommon } from "./common/js/zh-Hans.js";
import { default as zhCSS } from "./state-of-css/js/zh-Hans.js";
import { default as zhJS } from "./state-of-js/js/zh-Hans.js";

import { default as ruCommon } from "./common/js/ru-RU.js";
import { default as ruCSS } from "./state-of-css/js/ru-RU.js";
import { default as ruJS } from "./state-of-js/js/ru-RU.js";

import { default as frCommon } from "./common/js/fr-FR.js";
import { default as frCSS } from "./state-of-css/js/fr-FR.js";
// import { default as frJS } from './state-of-js/js/fr-FR.js'; // not translated yet

import { default as svCommon } from "./common/js/sv-SE.js";
import { default as svCSS } from "./state-of-css/js/sv-SE.js";
import { default as svJS } from "./state-of-js/js/sv-SE.js";

const locales = [
  {
    id: "en",
    label: "English",
    stringFiles: [enCommon, enCSS, enJS],
  },
  {
    id: "hi",
    label: "Hindi",
    stringFiles: [hiCommon, hiCSS, hiJS],
    translators: ["jaideepghosh"],
  },
  {
    id: "it",
    label: "Italiano",
    stringFiles: [itCommon, itCSS, itJS],
    translators: ["polettoweb"],
  },
  {
    id: "zh",
    label: "中文",
    stringFiles: [zhCommon, zhCSS, zhJS],
    translators: [],
  },
  {
    id: "ru-RU",
    label: "Русский",
    stringFiles: [ruCommon, ruCSS, ruJS],
    translators: ["lex111", "Omhet"],
  },
  {
    id: "fr-FR",
    label: "Français",
    stringFiles: [frCommon, frCSS],
    translators: ["arnauddrain"],
  },
  {
    id: "sv-SE",
    label: "Svenska",
    stringFiles: [svCommon, svCSS, svJS],
    translators: ["m-hagberg"],
  },
];

export default locales;
