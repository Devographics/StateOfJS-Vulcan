import { default as enCommon } from "./common/js/en-US.js";
import { default as enCSS } from "./state-of-css/js/en-US.js";
import { default as enJS } from "./state-of-js/js/en-US.js";
import { default as hiCommon } from "./common/js/hi-IN.js";
import { default as hiCSS } from "./state-of-css/js/hi-IN.js";
import { default as hiJS } from "./state-of-js/js/hi-IN.js";

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
  },
];

export default locales;
