import { createCollection } from 'meteor/vulcan:core';
import schema from './schema.js';

export const Projects = createCollection({
  collectionName: 'Projects',

  typeName: 'Project',

  schema,

  // queries: null,

  mutations: {
    create: null,
    update: null,
    upsert: null,
    delete: null
  },

  permissions: {
    canRead: ['guests'],
  },
});

export default Projects;
