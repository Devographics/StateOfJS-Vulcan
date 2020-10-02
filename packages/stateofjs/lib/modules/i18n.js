import { registerLocale, addStrings } from 'meteor/vulcan:core';
import locales from '../i18n/index';

const convertStrings = (stringFile) => {
  const convertedStrings = {};
  const { namespace, translations } = stringFile;
  translations.forEach(({key, t})=> {
    // survey namespaces are not currently supported
    // const translationKey = namespace ? `${namespace}.${key}`: key;
    const translationKey = key;
    convertedStrings[translationKey] = t;
  });
  return convertedStrings;
}

locales.forEach(locale => {
  const { id, stringFiles, label } = locale;
  registerLocale({
    id,
    label
  });

  stringFiles.forEach(stringFile => {
    addStrings(id, convertStrings(stringFile));
  });
});
