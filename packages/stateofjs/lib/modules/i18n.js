import { registerLocale, addStrings } from 'meteor/vulcan:core';
import locales from '../i18n/index';

const convertStrings = strings => {
  const convertedStrings = {};
  strings.translations.forEach(({key, t})=> {
    convertedStrings[key] = t;
  });
  return convertedStrings;
}

locales.forEach(locale => {
  const { id, stringFiles, label } = locale;
  registerLocale({
    id,
    label
  });

  stringFiles.forEach(strings => {
    addStrings(id, convertStrings(strings));
  });
});
