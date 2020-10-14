import { addStrings } from 'meteor/vulcan:core';
import locales from '../i18n/index';
import { convertStrings } from '../modules/i18n.js';

import projects from '../data/js/projects';
import entities from '../data/js/entities';

const convertEntities = (projects, suffix) => {
  const convertedStrings = {};
  projects.forEach(({ id, name }) => {
    convertedStrings[`entities.${id}`] = name;
  });
  return convertedStrings;
};

locales.forEach((locale) => {
  const { id, stringFiles } = locale;

  stringFiles.forEach(stringFile => {
    addStrings(id, convertStrings(stringFile));
  });

  // also add all project and entities names
  addStrings(id, convertEntities(projects));
  addStrings(id, convertEntities(entities));
});
