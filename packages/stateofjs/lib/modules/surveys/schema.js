import { statuses, statusesOptions } from '../constants.js';

const schema = {
  // default properties

  _id: {
    type: String,
    optional: true,
    canRead: ['guests'],
  },
  createdAt: {
    type: Date,
    optional: true,
    canRead: ['admins'],
    onCreate: () => {
      return new Date();
    },
  },
  updatedAt: {
    type: Date,
    optional: true,
    canRead: ['admins'],
    onUpdate: () => {
      return new Date();
    },
  },
  userId: {
    type: String,
    optional: true,
    canRead: ['admins'],
    resolveAs: {
      fieldName: 'user',
      type: 'User',
      relation: 'hasOne',
    },
  },

  // custom properties

  name: {
    type: String,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
  },
  year: {
    type: Number,
    canRead: ['guests'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
  },
  status: {
    type: Number,
    optional: true,
    input: 'select',
    canRead: ['admins'],
    canCreate: ['admins'],
    canUpdate: ['admins'],
    defaultValue: statuses.preview,
    options: statusesOptions,
  },
};

export default schema;
