import { registerLocale, addStrings } from 'meteor/vulcan:core';
import locales from '../i18n/index';

import projects from '../data/js/projects';
import entities from '../data/js/entities';

const convertStrings = (stringFile) => {
  const convertedStrings = {};
  const { namespace, translations } = stringFile;
  translations.forEach(({ key, t }) => {
    // survey namespaces are not currently supported
    // const translationKey = namespace ? `${namespace}.${key}`: key;
    const translationKey = key;
    convertedStrings[translationKey] = t;
  });
  return convertedStrings;
};

const convertEntities = (projects, suffix) => {
  const convertedStrings = {};
  projects.forEach(({ id, name }) => {
    convertedStrings[`entities.${id}`] = name;
  });
  return convertedStrings;
};

locales.forEach((locale) => {
  const { id, stringFiles, label } = locale;
  registerLocale({
    id,
    label,
  });

  stringFiles.forEach(stringFile => {
    addStrings(id, convertStrings(stringFile));
  });

  // also add all project and entities names
  addStrings(id, convertEntities(projects));
  addStrings(id, convertEntities(entities));
});
